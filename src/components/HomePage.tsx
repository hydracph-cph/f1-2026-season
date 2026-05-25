import React from 'react';
import { useNavigate } from 'react-router-dom';
import { races, drivers } from '../data/f1Data';
import { format, parseISO } from 'date-fns';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const hotDrivers = drivers.filter(d => d.isHot);
  const nextRace = races.find(r => r.status === 'next');

  return (
    <div className="pt-8 space-y-10">
      {nextRace && (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/20 via-f1-card to-f1-card border border-primary/30 p-8">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-primary text-white text-xs font-bold rounded-full uppercase tracking-wider animate-pulse">
                Next Race
              </span>
            </div>
            <h2 className="text-3xl font-black mb-2">
              {nextRace.flag} {nextRace.name}
            </h2>
            <p className="text-gray-400 text-lg">{nextRace.circuit}</p>
            <p className="text-gray-500 mt-1">
              {format(parseISO(nextRace.date), 'MMMM d, yyyy')} &middot; Round {nextRace.round}
            </p>
          </div>
        </div>
      )}

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black flex items-center gap-3">
            <i className="fa-solid fa-fire text-primary" />
            Hot Drivers
          </h2>
          <button
            onClick={() => navigate('/drivers')}
            className="text-sm text-gray-400 hover:text-primary transition-colors font-medium"
          >
            View All <i className="fa-solid fa-arrow-right ml-1" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {hotDrivers.map((driver) => (
            <div
              key={driver.id}
              onClick={() => navigate(`/driver/${driver.id}`)}
              className="group bg-f1-card border border-f1-border rounded-xl overflow-hidden cursor-pointer hover:border-gray-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20"
            >
              <div
                className="h-1.5"
                style={{ backgroundColor: driver.teamColor }}
              />
              <div className="relative h-48 overflow-hidden bg-gradient-to-b from-gray-800 to-f1-card">
                <img
                  src={driver.image}
                  alt={driver.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm rounded-lg px-2 py-1">
                  <span className="text-white font-black text-lg">#{driver.number}</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-white font-bold text-base group-hover:text-primary transition-colors">
                  {driver.name}
                </h3>
                <p className="text-gray-500 text-sm mt-0.5">{driver.team}</p>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-f1-border">
                  <div>
                    <p className="text-xs text-gray-500">Points</p>
                    <p className="text-white font-bold">{driver.points}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Wins</p>
                    <p className="text-white font-bold">{driver.wins}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Podiums</p>
                    <p className="text-white font-bold">{driver.podiums}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-black flex items-center gap-3 mb-6">
          <i className="fa-solid fa-calendar-days text-primary" />
          2025 Race Calendar
        </h2>
        <div className="space-y-3">
          {races.map((race) => (
            <div
              key={race.round}
              className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 ${
                race.status === 'next'
                  ? 'bg-primary/10 border-primary/40'
                  : race.status === 'completed'
                  ? 'bg-f1-card/50 border-f1-border hover:border-gray-600'
                  : 'bg-f1-card border-f1-border hover:border-gray-600'
              }`}
            >
              <div className="w-10 text-center">
                <span className={`text-sm font-bold ${race.status === 'completed' ? 'text-gray-600' : 'text-gray-400'}`}>
                  R{race.round}
                </span>
              </div>
              <div className="text-2xl w-10 text-center">{race.flag}</div>
              <div className="flex-1 min-w-0">
                <h3 className={`font-bold text-sm ${race.status === 'completed' ? 'text-gray-500' : 'text-white'}`}>
                  {race.name}
                </h3>
                <p className="text-gray-600 text-xs mt-0.5">{race.circuit}</p>
              </div>
              <div className="text-right">
                <p className={`text-sm font-medium ${race.status === 'completed' ? 'text-gray-600' : 'text-gray-400'}`}>
                  {format(parseISO(race.date), 'MMM d')}
                </p>
                {race.status === 'completed' && race.winner && (
                  <p className="text-xs text-gray-600 mt-0.5">
                    <i className="fa-solid fa-trophy text-yellow-600 mr-1" />
                    {race.winner}
                  </p>
                )}
                {race.status === 'next' && (
                  <span className="inline-block mt-1 px-2 py-0.5 bg-primary text-white text-xs font-bold rounded-full">
                    NEXT
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
