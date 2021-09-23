package com.reactnativenotificationchannels

import android.app.NotificationChannel
import android.app.NotificationManager
import android.content.Context
import com.facebook.react.bridge.*

class NotificationChannelsModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {


  private val notificationManager: NotificationManager = reactContext.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager

  override fun getName(): String {
      return "NotificationChannels"
  }

  @ReactMethod
  fun listChannels(promise: Promise) {
    val channels: MutableList<String> = ArrayList()
    val listChannels: List<NotificationChannel> = notificationManager.notificationChannels
    for (channel in listChannels) {
      channels.add(channel.id)
    }
    promise.resolve(channels)
  }

  fun channelBlocked(channel_id: String?, promise: Promise) {
    val channel = notificationManager.getNotificationChannel(channel_id)
    promise.resolve(NotificationManager.IMPORTANCE_NONE == channel.importance)
  }

  fun channelExists(channel_id: String?, promise: Promise) {
    val channel = notificationManager.getNotificationChannel(channel_id)
    promise.resolve(channel != null)
  }

  fun deleteChannel(channel_id: String?,promise: Promise) {
    notificationManager.deleteNotificationChannel(channel_id)
    promise.resolve("Channel Deleted")
  }

  private fun checkOrCreateChannel(channel_id: String?, channel_name: String?, channel_description: String?, importance: Int): Boolean {
    var channel = notificationManager.getNotificationChannel(channel_id)
    if (channel == null && channel_name != null && channel_description != null ||
      channel != null &&
      (channel_name != null && channel_name != channel.name ||
        channel_description != null && channel_description != channel.description)) {
      // If channel doesn't exist create a new one.
      // If channel name or description is updated then update the existing channel.
      channel = NotificationChannel(channel_id, channel_name, importance)
      channel.description = channel_description
      //            channel.enableLights(true);
//            channel.enableVibration(vibratePattern != null);
//            channel.setVibrationPattern(vibratePattern);

//            if (soundUri != null) {
//                AudioAttributes audioAttributes = new AudioAttributes.Builder()
//                .setContentType(AudioAttributes.CONTENT_TYPE_SONIFICATION)
//                .setUsage(AudioAttributes.USAGE_NOTIFICATION)
//                .build();
//
//                channel.setSound(soundUri, audioAttributes);
//            } else {
//                channel.setSound(null, null);
//            }
      notificationManager.createNotificationChannel(channel)
      return true
    }
    return false
  }

  fun createChannel(channelInfo: ReadableMap, promise: Promise) {
    val channelId = channelInfo.getString("channelId")
    val channelName = channelInfo.getString("channelName")
    val channelDescription = if (channelInfo.hasKey("channelDescription")) channelInfo.getString("channelDescription") else ""
    //        boolean playSound = !channelInfo.hasKey("playSound") || channelInfo.getBoolean("playSound");
//        String soundName = channelInfo.hasKey("soundName") ? channelInfo.getString("soundName") : "default";
    val importance = if (channelInfo.hasKey("importance")) channelInfo.getInt("importance") else 4
    //        boolean vibrate = channelInfo.hasKey("vibrate") && channelInfo.getBoolean("vibrate");
//        long[] vibratePattern = vibrate ? new long[] { 0, DEFAULT_VIBRATION } : null;
//        Uri soundUri = playSound ? getSoundUri(soundName) : null;
    promise.resolve(checkOrCreateChannel(channelId, channelName, channelDescription, importance))
  }


}
