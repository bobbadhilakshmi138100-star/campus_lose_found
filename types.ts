export type ItemType = 'lost' | 'found';

export type ItemCategory =
  | 'All Categories'
  | 'Electronics'
  | 'ID Cards/Documents'
  | 'Keys'
  | 'Bags'
  | 'Clothing'
  | 'Others';

export type ItemStatus = 'Active' | 'Under Verification' | 'Claimed' | 'Resolved';

export type CampusLocation =
  | 'all'
  | 'Central Library'
  | 'Building A Canteen'
  | 'PG Hostel Block B'
  | 'Main Auditorium'
  | 'Sports Ground'
  | 'Bus & Visitor Parking'
  | 'Faculty Cabin / Admin';

export interface ItemPost {
  id: string;
  type: ItemType;
  title: string;
  category: ItemCategory;
  location: string;
  locationDetail?: string;
  date: string;
  timestamp: number;
  status: ItemStatus;
  description: string;
  contactPref: 'In-App Chat' | 'Security Desk' | 'Student Phone';
  author: string;
  avatarInitials: string;
  imageSvgType?: string;
  photoUrl?: string;
}

export interface ClaimRecord {
  id: string;
  postId: string;
  itemTitle: string;
  claimantName: string;
  claimantId: string;
  proof: string;
  channel: string;
  status: string;
  timestamp: number;
}

export interface ChatMessage {
  id: string;
  sender: 'me' | 'them';
  text: string;
  time: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'alert' | 'claim' | 'return';
}
