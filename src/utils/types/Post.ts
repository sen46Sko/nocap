export type Post = {
  id: string;
  type: 'photo' | 'video' | 'onspot';
  userId: string;
  imageLink: string;
  title: string;
  location: {latitude: number; longitude: number} | null;
  deviceInfo: string | null;
  loves: string[];
  views: string[];
};
