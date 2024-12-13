import React from 'react';
import { MessageSquare, GitPullRequest, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { PRMetrics } from '../types';

interface PRMetricsDisplayProps {
  createdAt: string;
  metrics: PRMetrics;
}

export const PRMetricsDisplay: React.FC<PRMetricsDisplayProps> = ({ createdAt, metrics }) => (
  <div className="mt-4 flex items-center space-x-6 text-sm text-gray-500">
    <div className="flex items-center">
      <GitPullRequest className="w-4 h-4 mr-1" />
      <span>Created {formatDistanceToNow(new Date(createdAt))} ago</span>
    </div>
    <div className="flex items-center">
      <MessageSquare className="w-4 h-4 mr-1" />
      <span>{metrics.commentCount} comments</span>
    </div>
    <div className="flex items-center">
      <Clock className="w-4 h-4 mr-1" />
      <span>{Math.round(metrics.timeToApproval)}h to approve</span>
    </div>
  </div>
);