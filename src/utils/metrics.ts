import { PullRequest, PRMetrics } from '../types';

export const calculateTimeToApproval = (createdAt: string, approvedAt: string | null): number => {
  if (!approvedAt) return 0;
  return (new Date(approvedAt).getTime() - new Date(createdAt).getTime()) / (1000 * 60 * 60);
};

export const calculateParticipantCount = (pr: PullRequest): number => {
  const uniqueParticipants = new Set(pr.comments.map(comment => comment.author.email));
  return uniqueParticipants.size;
};

export const calculatePRMetrics = (pr: PullRequest): PRMetrics => {
  return {
    timeToApproval: calculateTimeToApproval(pr.createdAt, pr.approvedAt),
    commentCount: pr.comments.length,
    participantCount: calculateParticipantCount(pr)
  };
};