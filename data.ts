import { ItemPost, ClaimRecord, NotificationItem } from './types';

export const MARWADI_LOGO_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBz9NhRiUHJj_mVMMymX3ARYGvs4c9rJMwdIo20shokBPzqd-OSU2bGMc252RRMj_-PnU_PW1SADlpdBVEZVM8mkmMLcGbNwyXKfyU5hMeoEaaHqz1UGCXmEyj1awzTK328UpiNUChZeu3qBJvpD_Qx_R4w9KPsdcSW681Qli9uBnR3GT08OLMi_NeDAd9gz-iR2VqiJ8ZQHSwh_ZG5VEGF7gyYjLKoIotCd3dhTLhzqxwTl2jmJMfdrQ';

export const INITIAL_POSTS: ItemPost[] = [
  {
    id: 'post-1',
    type: 'found',
    title: 'Student ID Card (B.Tech CSE - 3rd Year)',
    category: 'ID Cards/Documents',
    location: 'Building A Canteen',
    locationDetail: 'Table near Nescafe counter',
    date: 'Today, 11:30 AM',
    timestamp: Date.now() - 3600000 * 2,
    status: 'Active',
    description:
      'Found blue lanyard student identity card belonging to Harshil Mehta (Enrollment: 92100103...). Deposited at cafeteria counter manager.',
    contactPref: 'Security Desk',
    author: 'Pooja V. (Faculty)',
    avatarInitials: 'PV',
    imageSvgType: 'id-card',
  },
  {
    id: 'post-2',
    type: 'lost',
    title: 'Apple AirPods Pro in Matte Gray Case',
    category: 'Electronics',
    location: 'Central Library',
    locationDetail: 'Second floor quiet study cubicle #14',
    date: 'Today, 09:15 AM',
    timestamp: Date.now() - 3600000 * 4,
    status: 'Active',
    description:
      'Case has a small silver anime sticker on back and a tiny scratch on right bud stem. Reward offered to whoever returns it!',
    contactPref: 'In-App Chat',
    author: 'Devang Sharma (Student)',
    avatarInitials: 'DS',
    imageSvgType: 'airpods',
  },
  {
    id: 'post-3',
    type: 'found',
    title: 'Hyundai Car Key with Red Leather Tag',
    category: 'Keys',
    location: 'Bus & Visitor Parking',
    locationDetail: 'Paved walkway near Gate 2 bus shelter',
    date: 'Yesterday, 04:45 PM',
    timestamp: Date.now() - 3600000 * 24,
    status: 'Under Verification',
    description:
      'Electronic remote fob with a red woven keychain and small silver ring. Kept securely with Main Security Gate 2 officer.',
    contactPref: 'Security Desk',
    author: 'Campus Guard Ramesh',
    avatarInitials: 'RG',
    imageSvgType: 'key',
  },
  {
    id: 'post-4',
    type: 'lost',
    title: 'HP 65W USB-C Laptop Charger',
    category: 'Electronics',
    location: 'Main Auditorium',
    locationDetail: 'Row H, Seat 12 during TechFest briefing',
    date: 'Yesterday, 02:00 PM',
    timestamp: Date.now() - 3600000 * 26,
    status: 'Active',
    description:
      'Black power brick with coiled cable. Has yellow tape mark around the adapter cord.',
    contactPref: 'In-App Chat',
    author: 'Meera Rao',
    avatarInitials: 'MR',
    imageSvgType: 'charger',
  },
  {
    id: 'post-5',
    type: 'found',
    title: 'Wildcraft Black & Teal Backpack',
    category: 'Bags',
    location: 'PG Hostel Block B',
    locationDetail: 'Lobby sofa near Table Tennis room',
    date: '2 Days ago',
    timestamp: Date.now() - 3600000 * 48,
    status: 'Claimed',
    description:
      'Contains Engineering Mathematics spiral notebook and a blue metal water bottle. Name on notebook reads K. Trivedi.',
    contactPref: 'In-App Chat',
    author: 'Hostel Warden Office',
    avatarInitials: 'HW',
    imageSvgType: 'backpack',
  },
  {
    id: 'post-6',
    type: 'lost',
    title: 'Scientific Calculator Casio fx-991EX',
    category: 'Electronics',
    location: 'Building A Canteen',
    locationDetail: 'Juice bar wooden bench',
    date: '3 Days ago',
    timestamp: Date.now() - 3600000 * 70,
    status: 'Resolved',
    description: 'White slide-on cover with initial "NP" etched on top left corner.',
    contactPref: 'In-App Chat',
    author: 'Nikhil Patel',
    avatarInitials: 'NP',
    imageSvgType: 'calculator',
  },
  {
    id: 'post-7',
    type: 'found',
    title: 'Prescription Glasses (Brown Tortoise Frame)',
    category: 'Others',
    location: 'Central Library',
    locationDetail: 'Ground floor newspaper stand',
    date: 'Today, 01:10 PM',
    timestamp: Date.now() - 3600000 * 1,
    status: 'Active',
    description: 'Reading glasses in an amber translucent hard case. Ray-Ban branded frame.',
    contactPref: 'In-App Chat',
    author: 'Library Staff (Rekha B.)',
    avatarInitials: 'RB',
    imageSvgType: 'glasses',
  },
];

export const INITIAL_CLAIMS: ClaimRecord[] = [
  {
    id: 'claim-1',
    postId: 'post-3',
    itemTitle: 'Hyundai Car Key with Red Leather Tag',
    claimantName: 'Aarav Patel',
    claimantId: 'MU2022CS089',
    proof: 'There is a small circular brass temple token on the same ring.',
    channel: 'Security Gate Verification',
    status: 'Pending Verification by Guard Ramesh',
    timestamp: Date.now() - 3600000 * 12,
  },
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Verification In Progress',
    message: 'Campus Guard Ramesh is reviewing your claim on Hyundai Car Key.',
    time: '2 hrs ago',
    read: false,
    type: 'claim',
  },
  {
    id: 'notif-2',
    title: 'Item Returned',
    message: 'Nikhil Patel successfully marked Casio Calculator as Resolved.',
    time: 'Yesterday',
    read: true,
    type: 'return',
  },
  {
    id: 'notif-3',
    title: 'New Found Item Logged',
    message: 'Student ID card was submitted at Building A Canteen.',
    time: '4 hrs ago',
    read: false,
    type: 'alert',
  },
];

export const INITIAL_CHAT_HISTORY: Record<
  string,
  Array<{ id: string; sender: 'me' | 'them'; text: string; time: string }>
> = {
  'post-1': [
    {
      id: 'm1',
      sender: 'them',
      text: 'Hello! I found this ID card near the Nescafe counter in Building A Canteen.',
      time: '11:40 AM',
    },
    {
      id: 'm2',
      sender: 'me',
      text: 'Hi Pooja Ma’am, I believe this belongs to my batchmate Harshil Mehta.',
      time: '11:42 AM',
    },
    {
      id: 'm3',
      sender: 'them',
      text: 'Please ask him to present his enrollment proof or collect it from the cafeteria counter desk!',
      time: '11:45 AM',
    },
  ],
  'post-2': [
    {
      id: 'm4',
      sender: 'them',
      text: 'Hi Devang! Where in the Central Library did you last use the AirPods?',
      time: '09:30 AM',
    },
    {
      id: 'm5',
      sender: 'me',
      text: 'At cubicle #14 on the 2nd floor, left side quiet section. Offering a small reward for return!',
      time: '09:33 AM',
    },
  ],
  'post-3': [
    {
      id: 'm6',
      sender: 'them',
      text: 'Key is placed in the Main Gate 2 security locker. Please bring your RC book or duplicate key to verify.',
      time: 'Yesterday, 05:10 PM',
    },
  ],
  'post-4': [
    {
      id: 'm7',
      sender: 'them',
      text: 'Auditorium housekeeping found a black charger after the TechFest briefing.',
      time: 'Yesterday, 03:15 PM',
    },
  ],
};
