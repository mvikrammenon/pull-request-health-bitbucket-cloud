import React from 'react';

interface PRStatusProps {
  status: 'OPEN' | 'MERGED' | 'DECLINED';
}

const statusStyles = {
  MERGED: 'bg-green-100 text-green-800',
  OPEN: 'bg-blue-100 text-blue-800',
  DECLINED: 'bg-red-100 text-red-800'
};

export const PRStatus: React.FC<PRStatusProps> = ({ status }) => (
  <span className={`px-3 py-1 rounded-full text-sm ${statusStyles[status]}`}>
    {status}
  </span>
);