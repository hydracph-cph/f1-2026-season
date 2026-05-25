import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { drivers, races } from '../data/f1Data';

const DriverDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const driver = drivers.find(d => d.id === id);

  if (!driver) {
    return (
      <div className="pt-20 text-center">
        <i className="fa-solid fa-user-slash text-5xl text-gray-600 mb-4" />
        <p className="text-gray-500 text-lg">未找到该车手</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors"
        >
          返回首页
        </button>
      </div>
    );
  }

  const rank = [...drivers].sort((a, b) => b.points - a.points).findIndex(d => d.id === id) + 1;
  const driverWins = races.filter(r => r.winner === driver.name);

  const stats = [
    { label: '积分榜排名', value: `P${rank}`, icon: 'fa-ranking-star' },
    { label: '总积分', value: driver.points, icon: 'fa-star' },
    { label: '分站冠军', value: driver.wins, icon: 'fa-trophy' },
    { label: '领奖台', value: driver.podiums, icon: 'fa-medal' },
    { label: '杆位', value: driver.poles, icon: 'fa-bolt' },
    { label: '最快圈速', value: driver.fastestLaps, icon: 'fa-gauge-high' },
  ];

  return (
    <div className="pt-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors mb-6 group"
      >
        <i className="fa-solid fa-arrow-left group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-medium">返回</span>
      </button>

      <div className="relative overflow-hidden rounded-2xl bg-f1-card border border-f1-border">
        <div className="h-2" style={{ backgroundColor: driver.teamColor }} />
        <div className="relative p-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-72 flex-shrink-0">
              <div className="w-full aspect-square rounded-2xl overflow-hidden bg-gradient-to-b from-gray-800 to-f1-card border border-f1-border">
                <img
                  src={driver.image}
                  alt={driver.nameZh}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-2">
                <span
                  className="text-5xl font-black opacity-20"
                  style={{ color: driver.teamColor }}
                >
                  {driver.number}
                </span>
                <div
                  className="px-3 py-1 rounded-full text-xs font-bold text-white"
                  style={{ backgroundColor: driver.teamColor }}
                >
                  {driver.teamZh}
                </div>
              </div>
              <h1 className="text-4xl font-black text-white mb-1">{driver.nameZh}</h1>
              <p className="text-gray-500 text-sm mb-1">{driver.name}</p>
              <p className="text-gray-400 flex items-center gap-2 mb-6">
                <i className="fa-solid fa-location-dot" />
                {driver.nationalityZh}
                <span className="text-gray-600 mx-1">&middot;</span>
                <i className="fa-solid fa-cake-candles" />
                {driver.dob}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-f1-dark rounded-xl p-4 border border-f1-border"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <i className={`fa-solid ${stat.icon} text-primary text-sm`} />
                      <span className="text-xs text-gray-500 tracking-wider">{stat.label}</span>
                    </div>
                    <p className="text-2xl font-black text-white">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {driverWins.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-black mb-4 flex items-center gap-2">
            <i className="fa-solid fa-trophy text-yellow-500" />
            2026 赛季胜场
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {driverWins.map((race) => (
              <div
                key={race.round}
                className="bg-f1-card border border-f1-border rounded-xl p-4 flex items-center gap-4"
              >
                <div className="text-3xl">{race.flag}</div>
                <div>
                  <h3 className="text-white font-bold text-sm">{race.nameZh}</h3>
                  <p className="text-gray-500 text-xs mt-0.5">第 {race.round} 站 &middot; {race.circuit}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-xl font-black mb-4 flex items-center gap-2">
          <i className="fa-solid fa-users text-primary" />
          队友
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {drivers
            .filter(d => d.team === driver.team && d.id !== driver.id)
            .map((teammate) => (
              <div
                key={teammate.id}
                onClick={() => navigate(`/driver/${teammate.id}`)}
                className="bg-f1-card border border-f1-border rounded-xl p-4 flex items-center gap-4 cursor-pointer hover:border-gray-600 transition-all group"
              >
                <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-800 flex-shrink-0">
                  <img src={teammate.image} alt={teammate.nameZh} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-bold text-sm group-hover:text-primary transition-colors">
                    {teammate.nameZh}
                  </h3>
                  <p className="text-gray-500 text-xs">#{teammate.number} &middot; {teammate.points} 分</p>
                </div>
                <i className="fa-solid fa-chevron-right text-gray-600 group-hover:text-primary transition-colors" />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DriverDetail;
