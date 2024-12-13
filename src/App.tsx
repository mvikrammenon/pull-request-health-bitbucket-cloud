import React, { useState, useEffect } from 'react';
import { Settings } from 'lucide-react';
import { PRList } from './components/PRList';
import { DeveloperFilter } from './components/DeveloperFilter';
import type { PullRequest, Developer } from './types';

function App() {
  const [pullRequests, setPullRequests] = useState<PullRequest[]>([]);
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [selectedDevelopers, setSelectedDevelopers] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/pull-requests');
        const data = await response.json();
        setPullRequests(data.pullRequests);
        setDevelopers(data.developers);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeveloperSelect = (email: string) => {
    setSelectedDevelopers(prev =>
      prev.includes(email)
        ? prev.filter(e => e !== email)
        : [...prev, email]
    );
  };

  const filteredPRs = selectedDevelopers.length > 0
    ? pullRequests.filter(pr =>
        selectedDevelopers.includes(pr.author.email) ||
        pr.comments.some(comment => selectedDevelopers.includes(comment.author.email))
      )
    : pullRequests;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">
              PR Quality Dashboard
            </h1>
            <Settings className="w-6 h-6 text-gray-500" />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <DeveloperFilter
              developers={developers}
              selectedDevelopers={selectedDevelopers}
              onDeveloperSelect={handleDeveloperSelect}
            />
          </div>
          <div className="lg:col-span-3">
            <PRList pullRequests={filteredPRs} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;