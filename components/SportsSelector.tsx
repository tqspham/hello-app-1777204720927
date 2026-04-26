'use client';

import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface Sport {
  id: string;
  name: string;
}

export default function SportsSelector(): React.ReactElement {
  const [sports, setSports] = useState<Sport[]>([]);
  const [selectedSport, setSelectedSport] = useState<Sport | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSports = async (): Promise<void> => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch('/api/sports');
        if (!response.ok) {
          throw new Error('Failed to fetch sports');
        }
        const data = (await response.json()) as { sports: Sport[] };
        setSports(data.sports);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSports();
  }, []);

  const handleSelectSport = (sport: Sport): void => {
    setSelectedSport(sport);
    setIsOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <p className="text-slate-600">Loading sports...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-4">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative">
        <button
          onClick={(): void => setIsOpen(!isOpen)}
          className="w-full px-4 py-3 bg-white border-2 border-slate-300 rounded-lg text-left font-medium text-slate-800 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-colors flex items-center justify-between"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span>{selectedSport ? selectedSport.name : 'Select a sport'}</span>
          <ChevronDown className="h-5 w-5 text-slate-600 transition-transform" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
        </button>

        {isOpen && (
          <ul className="absolute z-10 w-full mt-2 bg-white border-2 border-slate-300 rounded-lg shadow-lg overflow-hidden">
            {sports.map((sport) => (
              <li key={sport.id}>
                <button
                  onClick={(): void => handleSelectSport(sport)}
                  className="w-full text-left px-4 py-3 hover:bg-slate-100 focus:bg-slate-100 focus:outline-none transition-colors font-medium text-slate-800"
                  role="option"
                  aria-selected={selectedSport?.id === sport.id}
                >
                  {sport.name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {selectedSport && (
        <div className="mt-6 p-4 bg-slate-100 rounded-lg">
          <p className="text-slate-700">
            You selected: <span className="font-bold text-slate-900">{selectedSport.name}</span>
          </p>
        </div>
      )}
    </div>
  );
}
