package com.phonegap.webintent;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Environment;
import android.text.ClipboardManager;
import android.webkit.MimeTypeMap;

import com.phonegap.api.Plugin;
import com.phonegap.api.PluginResult;

/**
 * WebIntent is a PhoneGap plugin that bridges Android intents and web applications:
 *  
 * 1. web apps can spawn intents that call native Android applications. 
 * 2. (after setting up correct intent filters for PhoneGap applications), Android
 * 	  intents can be handled by PhoneGap web applications.
 *
 */
public class WebIntent extends Plugin {

	private static final String errorUnknown = "Unknown Error";
	private ClipboardManager mClipboardManager;

	/**
	 * Executes the request and returns PluginResult.
	 * 
	 * @param action 		The action to execute.
	 * @param args 			JSONArray of arguments for the plugin.
	 * @param callbackId	The callback id used when calling back into JavaScript.
	 * @return 				A PluginResult object with a status and message.
	 */
	public PluginResult execute(String action, JSONArray args, String callbackId) {
		try {
			if (action.equals("startActivity")) 
			{
				if(args.length() != 1) {
					return new PluginResult(PluginResult.Status.INVALID_ACTION);
				}

				// Parse the arguments
				JSONObject obj = args.getJSONObject(0);
				String type = obj.has("type") ? obj.getString("type") : null;
				
				File extStore = Environment.getExternalStorageDirectory();
				
				String uriString  = "file://" + extStore.getPath() + "/Test_Doc/";
			

				if(("application").compareToIgnoreCase(obj.getString("type")) == 0)
				{
					uriString += obj.getString("url");
					type = MimeTypeMap.getSingleton().getMimeTypeFromExtension(MimeTypeMap.getFileExtensionFromUrl(uriString));
				}

				else if(("stream").compareToIgnoreCase(obj.getString("type")) == 0)
				{
					uriString = obj.getString("url");
					type = MimeTypeMap.getSingleton().getMimeTypeFromExtension(MimeTypeMap.getFileExtensionFromUrl(uriString));
				}

				if(("email").compareToIgnoreCase(obj.getString("type")) == 0)
				{
					uriString += obj.getString("url");
					type = MimeTypeMap.getSingleton().getMimeTypeFromExtension(MimeTypeMap.getFileExtensionFromUrl(uriString));
				}

				Uri uri = obj.has("url") ? Uri.parse(uriString) : null;
				JSONObject extras = obj.has("extras") ? obj.getJSONObject("extras") : null;
				Map<String, String> extrasMap = new HashMap<String, String>();

				// Populate the extras if any exist
				if (extras != null) {
					JSONArray extraNames = extras.names();
					for (int i = 0; i < extraNames.length(); i++) {
						String key = extraNames.getString(i);
						String value = extras.getString(key);
						extrasMap.put(key, value);
					}
				}

				startActivity(obj.getString("action"), uri, type, extrasMap);
				return new PluginResult(PluginResult.Status.OK);

			} else if (action.equals("hasExtra")) {
				if (args.length() != 1) {
					return new PluginResult(PluginResult.Status.INVALID_ACTION);
				}
				Intent i = this.ctx.getIntent();
				String extraName = args.getString(0);
				return new PluginResult(PluginResult.Status.OK, i.hasExtra(extraName));

			} else if (action.equals("getExtra")) {
				if (args.length() != 1) {
					return new PluginResult(PluginResult.Status.INVALID_ACTION);
				}
				Intent i = this.ctx.getIntent();
				String extraName = args.getString(0);
				if (i.hasExtra(extraName)) {
					return new PluginResult(PluginResult.Status.OK, i.getStringExtra(extraName));
				} else {
					return new PluginResult(PluginResult.Status.ERROR);
				}
			} else if (action.equals("getDataString")) {
				if (args.length() != 0) {
					return new PluginResult(PluginResult.Status.INVALID_ACTION);
				}
				Intent i = this.ctx.getIntent();

				return new PluginResult(PluginResult.Status.OK, i.getDataString());
			}
			if (action.equals("copyData")) {
				JSONObject obj = args.getJSONObject(0);
				JSONObject extras = obj.has("extras") ? obj.getJSONObject("extras") : null;
				Map<String, String> extrasMap = new HashMap<String, String>();

				if (extras != null) {
					JSONArray extraNames = extras.names();
					for (int i = 0; i < extraNames.length(); i++) {
						String key = extraNames.getString(i);
						String value = extras.getString(key);
						extrasMap.put(key, value);
					}

					String arg = "";
					try {
						mClipboardManager = (ClipboardManager)ctx.getSystemService(Context.CLIPBOARD_SERVICE);
						arg = (String) extrasMap.get("stringData");
						mClipboardManager.setText(arg);
					} catch (Exception e) {
						return new PluginResult(PluginResult.Status.ERROR, errorUnknown);
					}
					return new PluginResult(PluginResult.Status.OK);

				}
			}
			return new PluginResult(PluginResult.Status.INVALID_ACTION);
		} catch (JSONException e) {
			e.printStackTrace();
			return new PluginResult(PluginResult.Status.JSON_EXCEPTION);
		}

	}


	void startActivity(String action, Uri uri, String type, Map<String, String> extras) {
		//		Intent i = (uri != null ? new Intent(action, uri) : new Intent(action));
		Intent i = new  Intent(action);

		if(extras.containsKey("Intent.EXTRA_STREAM"))
		{
			Uri temp = uri;extras.remove("Intent.EXTRA_STREAM");
			i.putExtra(Intent.EXTRA_STREAM, temp);  
			uri = null;
		}

		if(type != null && uri != null)
		{
			i.setDataAndType(uri, type);
		}

		else if (type != null)
		{
			i.setType(type);
		}

		else if(uri != null)
		{
			i.setData(uri);
		}

		for (String key : extras.keySet()) {
			String value = extras.get(key);
			i.putExtra(key, value);
		}

		this.ctx.startActivity(i);

	}
}
