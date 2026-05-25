import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/HomePage';
import DriversPage from './components/DriversPage';
import StandingsPage from './components/StandingsPage';
import DriverDetail from './components/DriverDetail';

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="min-h-screen bg-f1-dark text-white">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/drivers" element={<DriversPage />} />
            <Route path="/standings" element={<StandingsPage />} />
            <Route path="/driver/:id" element={<DriverDetail />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
};

export default App;
