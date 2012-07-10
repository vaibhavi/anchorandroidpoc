package com.abox.main;


import android.app.Activity;
import android.database.Cursor;
import android.os.Environment;
import android.provider.MediaStore;

public class FetchGalleryImages extends Activity{
	private Cursor videocursor;
	private int video_column_index;
	int count;

	@SuppressWarnings("unused")
	private void init_phone_video_grid() {
		System.gc();
		final String[] selectionArgs = { CAMERA_IMAGE_BUCKET_ID };
		final String selection = MediaStore.Images.Media.BUCKET_ID + " = ?";
		String[] proj = { MediaStore.Images.Media._ID,
				MediaStore.Images.Media.DATA,
				MediaStore.Images.Media.DISPLAY_NAME,
				MediaStore.Images.Media.SIZE };
		videocursor = managedQuery(MediaStore.Images.Media.EXTERNAL_CONTENT_URI,
				proj, selection, selectionArgs, null);
		count = videocursor.getCount();
		System.out.println("Count " + String.valueOf(count));
		video_column_index = videocursor.getColumnIndexOrThrow(MediaStore.Images.Media.DATA);
		videocursor.moveToFirst();
		while(videocursor.isAfterLast())
			System.out.println("File Name-- " + videocursor.getString(video_column_index));;
			videocursor.moveToNext();
	}

	public static final String CAMERA_IMAGE_BUCKET_NAME = Environment.getExternalStorageDirectory().toString()+ "/DCIM/Camera";
	public static final String CAMERA_IMAGE_BUCKET_ID = getBucketId(CAMERA_IMAGE_BUCKET_NAME);

	/**
	 * Matches code in MediaProvider.computeBucketValues. Should be a common
	 * function.
	 */
	public static String getBucketId(String path) {
		return String.valueOf(path.toLowerCase().hashCode());
	}
}
