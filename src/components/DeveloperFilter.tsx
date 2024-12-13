import React from 'react';
import type { Developer } from '../types';

interface DeveloperFilterProps {
  developers: Developer[];
  selectedDevelopers: string[];
  onDeveloperSelect: (email: string) => void;
}

export const DeveloperFilter: React.FC<DeveloperFilterProps> = ({
  developers,
  selectedDevelopers,
  onDeveloperSelect,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Filter by Developer</h2>
      <div className="space-y-2">
        {developers.map((developer) => (
          <label key={developer.email} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedDevelopers.includes(developer.email)}
              onChange={() => onDeveloperSelect(developer.email)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">{developer.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
};