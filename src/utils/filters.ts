import { PullRequest } from '../types';

export const filterPRsByDevelopers = (
  pullRequests: PullRequest[],
  selectedDevelopers: string[]
): PullRequest[] => {
  if (selectedDevelopers.length === 0) return pullRequests;
  
  return pullRequests.filter(pr =>
    selectedDevelopers.includes(pr.author.email) ||
    pr.comments.some(comment => selectedDevelopers.includes(comment.author.email))
  );
};