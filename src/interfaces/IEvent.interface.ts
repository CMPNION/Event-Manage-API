export interface IEvent {
  eventUid: string;
  name: string;
  description: string;
  category: number;
  date: Date;
  bannerurl: string;
  ownerId: number;
  allowed: boolean;
}
