import React from 'react';
import { NavLink } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-black border-b border-f1-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <NavLink to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-primary rounded flex items-center justify-center">
              <span className="text-white font-black text-lg">F1</span>
            </div>
            <span className="text-white font-bold text-xl tracking-wide group-hover:text-primary transition-colors">
              FORMULA 1
            </span>
          </NavLink>
          <nav className="flex items-center gap-1">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`
              }
            >
              <i className="fa-solid fa-flag-checkered mr-2" />
              Race Schedule
            </NavLink>
            <NavLink
              to="/drivers"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`
              }
            >
              <i className="fa-solid fa-helmet-safety mr-2" />
              Drivers
            </NavLink>
            <NavLink
              to="/standings"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`
              }
            >
              <i className="fa-solid fa-trophy mr-2" />
              Standings
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
