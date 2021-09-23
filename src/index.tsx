import { NativeModules } from 'react-native';

type NotificationChannelsType = {
  multiply(a: number, b: number): Promise<number>;
};

const { NotificationChannels } = NativeModules;

export default NotificationChannels as NotificationChannelsType;
