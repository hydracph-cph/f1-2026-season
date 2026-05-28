import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { F1Provider } from './context/F1Context';
import Header from './components/Header';
import HomePage from './components/HomePage';
import DriversPage from './components/DriversPage';
import StandingsPage from './components/StandingsPage';
import DriverDetail from './components/DriverDetail';
import RaceDetail from './components/RaceDetail';

const App: React.FC = () => {
  return (
    <F1Provider>
      <HashRouter>
        <div className="min-h-screen bg-f1-dark text-white">
          <Header />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/drivers" element={<DriversPage />} />
              <Route path="/standings" element={<StandingsPage />} />
              <Route path="/driver/:id" element={<DriverDetail />} />
              <Route path="/race/:round" element={<RaceDetail />} />
            </Routes>
          </main>
        </div>
      </HashRouter>
    </F1Provider>
  );
};

export default App;
