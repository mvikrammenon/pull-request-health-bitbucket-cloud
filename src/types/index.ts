export interface Developer {
  email: string;
  name: string;
}

export interface PullRequest {
  id: string;
  title: string;
  description: string;
  author: Developer;
  createdAt: string;
  approvedAt: string | null;
  comments: Comment[];
  status: 'OPEN' | 'MERGED' | 'DECLINED';
}

export interface Comment {
  id: string;
  content: string;
  author: Developer;
  createdAt: string;
}

export interface PRMetrics {
  timeToApproval: number; // in hours
  commentCount: number;
  participantCount: number;
}