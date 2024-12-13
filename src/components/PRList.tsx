import React from 'react';
import type { PullRequest } from '../types';
import { calculatePRMetrics } from '../utils/metrics';
import { PRStatus } from './PRStatus';
import { PRMetricsDisplay } from './PRMetricsDisplay';
import { CommentList } from './CommentList';

interface PRListProps {
  pullRequests: PullRequest[];
}

export const PRList: React.FC<PRListProps> = ({ pullRequests }) => {
  return (
    <div className="space-y-4">
      {pullRequests.map((pr) => {
        const metrics = calculatePRMetrics(pr);
        
        return (
          <div key={pr.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{pr.title}</h3>
                <p className="mt-1 text-sm text-gray-600">{pr.description}</p>
              </div>
              <PRStatus status={pr.status} />
            </div>
            
            <PRMetricsDisplay createdAt={pr.createdAt} metrics={metrics} />
            <CommentList comments={pr.comments} />
          </div>
        );
      })}
    </div>
  );
};