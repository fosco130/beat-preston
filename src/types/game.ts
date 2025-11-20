// Game data types

export interface UserData {
  name: string;
  agencyName: string;
  email: string;
  mobile?: string;
  biggestChallenge?: string;
}

export interface TaskScore {
  taskNumber: 1 | 2 | 3;
  userScore: number;
  prestonScore: number;
  completedAt: number; // timestamp
  details?: any;
}

export interface GameSession {
  id?: string;
  userData: UserData;
  taskScores: TaskScore[];
  totalUserScore: number;
  totalPrestonScore: number;
  futureReadinessScore: number;
  completedAt?: number;
  rank?: number;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  agencyName: string;
  totalScore: number;
  futureReadinessScore: number;
  completedAt: number;
}

// Task 1: Lead Response
export interface Lead {
  id: string;
  name: string;
  type: 'Portal Enquiry' | 'Phone Call' | 'Walk-in' | 'Referral';
  message: string;
  property: string;
  correctAction: 'book_viewing' | 'book_valuation' | 'nurture' | 'follow_up';
  points: number;
}

// Task 2: Hot Seller
export interface SellerData {
  id: string;
  name: string;
  propertyType: string;
  lastSale: string;
  portalViews: number;
  engagementScore: number;
  activity: 'High' | 'Medium' | 'Low';
  isHot: boolean; // Preston assessment
}

// Task 3: Admin Task
export interface AdminTask {
  id: string;
  title: string;
  description: string;
  category: 'Admin' | 'Communication' | 'Follow-up' | 'Research';
  correctAnswer: 'ai' | 'human';
  points: number;
  timeSaved: number; // hours per week
}
