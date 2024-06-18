export type Post = {
  id: string;
  userId: string;
  imageLink: string;
  title: string;
  location: {latitude: number; longitude: number} | null;
  loves: string[];
  views: string[];
};
