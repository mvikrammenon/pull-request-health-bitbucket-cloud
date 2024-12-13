import React from 'react';
import { Comment } from '../types';

interface CommentListProps {
  comments: Comment[];
  limit?: number;
}

export const CommentList: React.FC<CommentListProps> = ({ comments, limit = 3 }) => (
  <div className="mt-4">
    <h4 className="text-sm font-medium text-gray-900">Recent Comments</h4>
    <div className="mt-2 space-y-2">
      {comments.slice(0, limit).map((comment) => (
        <div key={comment.id} className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
          <p className="font-medium text-gray-900">{comment.author.name}</p>
          <p className="mt-1">{comment.content}</p>
        </div>
      ))}
    </div>
  </div>
);