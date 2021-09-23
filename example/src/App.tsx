import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import NotificationChannels, {
  CHANNEL_IMPORTANCE,
} from 'react-native-notification-channels';

export default function App() {
  const [result, setResult] = React.useState<string | undefined>();

  async function configChannels() {
    const channelCreated = await NotificationChannels.createChannel({
      channelId: 'your_channel_id',
      channelName: 'Important Notifications',
      channelDescription: 'These channel will receive important notifications',
      importance: CHANNEL_IMPORTANCE.IMPORTANCE_HIGH,
    });

    setResult(channelCreated ? 'Channel created' : 'Failed to create Channel');
  }
  React.useEffect(() => {
    configChannels();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
