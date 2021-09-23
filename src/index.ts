import { NativeModules } from 'react-native';

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
  listChannels(): Promise<string[]>;
  channelBlocked(channel_id: string): Promise<boolean>;
  channelExists(channel_id: string): Promise<boolean>;
  deleteChannel(channel_id: string): Promise<boolean>;
  createChannel(channelInfo: ChannelInfoType): Promise<boolean>;
};

const { NotificationChannels } = NativeModules;

export default NotificationChannels as NotificationChannelsType;
