package com.abox.main;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;

import com.phonegap.DroidGap;
public class Abox_Activity extends DroidGap {
	/** Called when the activity is first created. */
	@Override
	public void onCreate(Bundle savedInstanceState) {

		writeFilesFromResources(R.raw.mpg_test);
		writeFilesFromResources(R.raw.pdf_test);
		writeFilesFromResources(R.raw.word_test);
		writeFilesFromResources(R.raw.gp3_test);
		writeFilesFromResources(R.raw.mp4_test);
		writeFilesFromResources(R.raw.ppt_test);
		Intent i = this.getIntent();
		Uri u = null ;
		if(i != null)
		{
			u = i.getData();
			if(u != null)
			{
				
				super.onCreate(savedInstanceState);
				super.loadUrl("file:///android_asset/www/index.html?" + u.toString());
			}

			else
			{
				super.onCreate(savedInstanceState);
				super.loadUrl("file:///android_asset/www/index.html");
			}
		}

	}

	private void writeFilesFromResources(int resourceId)
	{
		File extStore = Environment.getExternalStorageDirectory();
		String writePathString  = extStore.getPath() + "/Test_Doc/";
		String writeFileName = this.getResources().getResourceEntryName(resourceId);

		File writePath = new File(writePathString);	

		if(writeFileName.contains("pdf"))
		{
			writeFileName += ".pdf";
		}

		else if(writeFileName.contains("mpg"))
		{
			writeFileName += ".mpg";
		}
		else if(writeFileName.contains("word"))
		{
			writeFileName += ".docx";
		}
		else if(writeFileName.contains("gp3"))
		{
			writeFileName += ".3gp";
		}
		else if(writeFileName.contains("mp4"))
		{
			writeFileName += ".mp4";
		}

		else if(writeFileName.contains("ppt"))
		{
			writeFileName += ".ppt";
		}

		File PdfFile_Out = new File(writePath,writeFileName);
		if(!PdfFile_Out.exists())
		{
			InputStream input = this.getResources().openRawResource(resourceId);

			OutputStream os;
			try 
			{
				writePath.mkdirs();
				os = new FileOutputStream(PdfFile_Out);
				byte[] data = new byte[input.available()];
				input.read(data);
				os.write(data);
				input.close();
				os.close();
			}
			catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

	private void deleteFiles() 
	{
		File extStore = Environment.getExternalStorageDirectory();
		String writePathString  = extStore.getPath() + "/Test_Doc/";
		File fileDir = new File(writePathString);
		File array[]  = fileDir.listFiles();
		for (File file : array) {
			file.delete();
		}
		fileDir.delete();
	}

	@Override
	public void onBackPressed() {
		deleteFiles();
		super.onBackPressed();
	}
}
