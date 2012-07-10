package com.phonegap.downloader;


import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;

import org.json.JSONArray;
import org.json.JSONException;

import android.os.Environment;

import com.phonegap.api.Plugin;
import com.phonegap.api.PluginResult;

public class Downloader extends Plugin{

	/** Temporary Directory and File Name.. to be removed later **/
	static String DIR_NAME  = "/Test_Doc";
	static String TEMP_FILE_NAME = "temp";

	@Override
	public PluginResult execute(String action, JSONArray args, String callbackId) {
		if (action.equals("downloadFile")) {
			try 
			{
				//				Toast.makeText(this.ctx, "Downloading....", Toast.LENGTH_LONG).show();
				return this.downloadUrl(args.getString(0),args.getString(1),args.getString(2),args.getString(3));
			} 
			catch (JSONException e) 
			{
				return new PluginResult(PluginResult.Status.ERROR, "Param errrors");
			}
		}
		else 
		{
			return new PluginResult(PluginResult.Status.INVALID_ACTION);
		}
	}

	private PluginResult downloadUrl(String fileUrl, String dirName, String fileName, String overwrite){
		File file = null;
		try
		{
			File extStore = Environment.getExternalStorageDirectory();
			File dir = new File(extStore.getPath() + DIR_NAME);
			dir.mkdirs();

			String filename = null;
			if(fileUrl.contains("="))
			{
				filename = fileUrl.substring(fileUrl.lastIndexOf("=") + 1, fileUrl.lastIndexOf("."));
			}

			else if(fileUrl.contains("/"))
			{
				filename = fileUrl.substring(fileUrl.lastIndexOf("/") + 1, fileUrl.lastIndexOf("."));
			}
			else
				filename = TEMP_FILE_NAME;


			String ext = fileUrl.substring(fileUrl.length() - 4);

			file = new File(dir.getPath() + "/" + filename + ext);

			if(("false").equals(overwrite) && file.exists()){

				return new PluginResult(PluginResult.Status.OK, "exist");
			}

			URL url = new URL(fileUrl);
			HttpURLConnection ucon = (HttpURLConnection) url.openConnection();
			ucon.setRequestMethod("GET");
			ucon.setDoOutput(true);
			ucon.connect();


			InputStream is = ucon.getInputStream();

			byte[] buffer = new byte[1024];

			int len1 = 0;

			FileOutputStream fos = new FileOutputStream(file);

			while ( (len1 = is.read(buffer)) > 0 ) 
			{
				fos.write(buffer,0, len1);
			}

			fos.close();
		}
		catch (IOException e) 
		{

			return new PluginResult(PluginResult.Status.ERROR, "Error: " + e);
		}

		return new PluginResult(PluginResult.Status.OK, file.getName());
	}
}