# React Native Notification Channels (Android 8+)

A package for react-native consisting of native android helper functions to create Notification channels.

iOS  | Android
------------- | -------------
❌ | ✅

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
  const channelCreated = await NotificationChannels.createChannel({
    channelId: 'my_new_channel',
    channelName: 'Important Notifications',
    channelDescription: 'A notification channel which will receive all the important notifications from this app',
    importance: CHANNEL_IMPORTANCE.IMPORTANCE_HIGH
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

## Channel Importance

| importance  | sound | vibrate | status bar | drawer | heads up |
| ------------- | ------------- | ------------- | ------------- | ------------- | ------------- |
| IMPORTANCE_DEFAULT | ✅  | ❌  | ✅ | ✅ | ❌ |
| IMPORTANCE_HIGH | ✅  | ✅  | ✅ | ✅ | ✅ |
| IMPORTANCE_LOW | ❌  | ❌  | ✅ | ✅ | ❌ |
| IMPORTANCE_MIN | ❌  | ❌  | ❌ | ✅ | ❌ |

Read more here: https://developer.android.com/training/notify-user/channels

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
