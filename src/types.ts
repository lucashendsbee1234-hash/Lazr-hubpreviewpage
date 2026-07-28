export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalMs: number;
  isExpired: boolean;
}

export interface FeatureItem {
  id: string;
  title: string;
  iconName: string;
  badge: string;
  description: string;
  color: string;
}

export interface NotificationSubscriber {
  email: string;
  subscribedAt: string;
}
