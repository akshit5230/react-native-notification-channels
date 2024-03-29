# React Native Notification Channels (Android 8+)

A package for react-native consisting of native android helper functions to create Notification channels.

iOS  | Android
------------- | -------------
❌ | ✅

![Screenshot_1669532032](https://user-images.githubusercontent.com/43376244/204123232-3514e6f2-a0e9-47c7-ac54-c200969d0513.jpg)
![Screenshot_1669532041](https://user-images.githubusercontent.com/43376244/204123233-74699229-1839-4eeb-9ee5-20499c71a9de.jpg)


## Installation

```sh
npm install react-native-notification-channels
```

## Usage

```js
import NotificationChannels, { 
  CHANNEL_IMPORTANCE 
} from "react-native-notification-channels";

// ...

async function configChannels() {

  let channelExists = await NotificationChannels.channelExists('my_new_channel')
  if (channelExists) {
    NotificationChannels.deleteChannel('my_new_channel')
    console.log('my_new_channel was deleted')
  }
  
  const list = await NotificationChannels.listChannels()
  console.log('channel list:', list)

  const groupCreated = await NotificationChannels.createChannelGroup(
    'my_new_group', 'Personal Only'
  )
  console.log('groupCreated', groupCreated)
  
  const channelCreated = await NotificationChannels.createChannel({
    channelId: 'my_new_channel',
    channelName: 'Important Notifications',
    channelDescription: 'A notification channel which will receive all the important notifications from this app',
    importance: CHANNEL_IMPORTANCE.IMPORTANCE_HIGH,
    groupId: 'my_new_group' // optional
  })
  console.log(channelCreated ? "Channel created" : "Failed to create channel")
}

useEffect(() => {
  configChannels()
}, []);

// ...

```

## Methods

### createChannel()

Creates a new channel if a channel with the given channelId does not exist.
Pass an object of following properties:

| property  | description | example
| ------------- | ------------- | ------------- |
| channelId  | a unique identifier for channel  | 'my_new_channel'  |
| channelName  | a name to display in app notification settings  | 'Reminders' |
| channelDescription  | a description to display in app notification settings  | 'This channel will receive blah blah blah...' |
| importance  | to set importance level of channel notifications  | see below for details |
| groupId  | a unique id for a group (that was already created using createChannelGroup method), if you want to associate the group with the channel  | 'my_new_group' |

### listChannels()

Returns a list of channels available.

```js

async function configChannels() {
  const list = await NotificationChannels.listChannels()
  console.log(list)
}

```

### channelBlocked(channelId)

Returns a boolean true if a channel with provided id is blocked, otherwise false

### channelExists(channelId)

Returns a boolean true if a channel with provided id already exists, otherwise false

### deleteChannel(channelId)

Deletes a channel with given id, if exists, and returns a boolean

### createChannelGroup(groupId, groupName)

Creates groups for all your channels to be sorted within, with given name, and returns a boolean

## Channel Importance

| importance  | sound | vibrate | status bar | drawer | heads up |
| ------------- | ------------- | ------------- | ------------- | ------------- | ------------- |
| IMPORTANCE_DEFAULT | ✅  | ❌  | ✅ | ✅ | ❌ |
| IMPORTANCE_HIGH | ✅  | ✅  | ✅ | ✅ | ✅ |
| IMPORTANCE_LOW | ❌  | ❌  | ✅ | ✅ | ❌ |
| IMPORTANCE_MIN | ❌  | ❌  | ❌ | ✅ | ❌ |

Read more here: https://developer.android.com/training/notify-user/channels

## Motivation

The @react-native-firebase/messaging library provided a way to create channels in their older versions but they dropped it and refer to another library called Notifee which is paid and have great many features for notifications.

Also, there is another library react-native-push-notification which does provide these features but if you use rn-firebase, then this library is a bit heavy to add if you just need something to handle channel management on android.

And of course channel management is a crucial task because the default channel created by rn-firebase, has a weird name "Miscellaneous" and also it has "sound" disabled by default so unless the user enables sound and vibration by going to notification settings, it just doesn't work if you need them to make a sound. 

Of course, you can add some metadata about the channel in the manifest and change the channel config, but still, if you need to handle multiple channels, this is a good lightweight package for you.

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
