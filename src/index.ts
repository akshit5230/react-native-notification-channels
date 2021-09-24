import { NativeModules, Platform } from 'react-native';

export enum CHANNEL_IMPORTANCE {
  IMPORTANCE_DEFAULT = 3,
  IMPORTANCE_HIGH = 4,
  IMPORTANCE_LOW = 2,
  IMPORTANCE_MIN = 1,
}

type ChannelInfoType = {
  channelId: string;
  channelName: string;
  channelDescription: string;
  importance: CHANNEL_IMPORTANCE;
};

type NotificationChannelsType = {
  listChannels(): Promise<string[] | undefined>;
  channelBlocked(channel_id: string): Promise<boolean | undefined>;
  channelExists(channel_id: string): Promise<boolean | undefined>;
  deleteChannel(channel_id: string): Promise<boolean | undefined>;
  createChannel(channelInfo: ChannelInfoType): Promise<boolean | undefined>;
};

const { NotificationChannels } = NativeModules;

let NotifChannels = NotificationChannels;

if (Platform.OS === 'ios') {
  const iOSNotifChannels: NotificationChannelsType = {
    listChannels: async () => Promise.resolve(undefined),
    channelBlocked: async () => Promise.resolve(undefined),
    channelExists: async () => Promise.resolve(undefined),
    deleteChannel: async () => Promise.resolve(undefined),
    createChannel: async () => Promise.resolve(undefined),
  };
  NotifChannels = iOSNotifChannels;
}

export default NotifChannels as NotificationChannelsType;
