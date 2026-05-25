import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { drivers } from '../data/f1Data';

const teams = ['All', ...Array.from(new Set(drivers.map(d => d.team)))];

const DriversPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTeam, setSelectedTeam] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = drivers.filter(d => {
    const teamMatch = selectedTeam === 'All' || d.team === selectedTeam;
    const searchMatch = d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.team.toLowerCase().includes(searchQuery.toLowerCase());
    return teamMatch && searchMatch;
  });

  return (
    <div className="pt-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl font-black">
          <i className="fa-solid fa-users mr-3 text-primary" />
          All Drivers
        </h1>
        <div className="relative">
          <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search drivers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-f1-card border border-f1-border rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors w-64"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6 scrollbar-thin overflow-x-auto pb-2">
        {teams.map((team) => (
          <button
            key={team}
            onClick={() => setSelectedTeam(team)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
              selectedTeam === team
                ? 'bg-primary text-white'
                : 'bg-f1-card border border-f1-border text-gray-400 hover:text-white hover:border-gray-500'
            }`}
          >
            {team}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filtered.map((driver) => (
          <div
            key={driver.id}
            onClick={() => navigate(`/driver/${driver.id}`)}
            className="group bg-f1-card border border-f1-border rounded-xl overflow-hidden cursor-pointer hover:border-gray-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20"
          >
            <div className="h-1.5" style={{ backgroundColor: driver.teamColor }} />
            <div className="flex items-center gap-4 p-4">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-800 flex-shrink-0 border-2 border-f1-border group-hover:border-gray-500 transition-colors">
                <img
                  src={driver.image}
                  alt={driver.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-white font-bold text-sm group-hover:text-primary transition-colors truncate">
                    {driver.name}
                  </h3>
                  <span className="text-gray-600 font-bold text-xs">#{driver.number}</span>
                </div>
                <p className="text-gray-500 text-xs mt-0.5">{driver.team}</p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-xs text-gray-500">
                    <i className="fa-solid fa-star text-yellow-500 mr-1" />{driver.points} PTS
                  </span>
                  <span className="text-xs text-gray-500">
                    <i className="fa-solid fa-trophy text-yellow-600 mr-1" />{driver.wins} W
                  </span>
                </div>
              </div>
              <i className="fa-solid fa-chevron-right text-gray-600 group-hover:text-primary transition-colors" />
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <i className="fa-solid fa-user-slash text-4xl text-gray-600 mb-4" />
          <p className="text-gray-500">No drivers found</p>
        </div>
      )}
    </div>
  );
};

export default DriversPage;
