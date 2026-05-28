import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useF1 } from '../context/F1Context';

const StandingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { drivers, loading, season } = useF1();
  const sorted = [...drivers].sort((a, b) => b.points - a.points);
  const maxPoints = sorted[0]?.points || 1;

  const teamStandings = Object.values(
    drivers.reduce((acc, d) => {
      if (!acc[d.teamZh]) {
        acc[d.teamZh] = { team: d.teamZh, points: 0, color: d.teamColor, drivers: [] as string[] };
      }
      acc[d.teamZh].points += d.points;
      acc[d.teamZh].drivers.push(d.nameZh);
      return acc;
    }, {} as Record<string, { team: string; points: number; color: string; drivers: string[] }>)
  ).sort((a, b) => b.points - a.points);

  const maxTeamPoints = teamStandings[0]?.points || 1;

  if (loading) {
    return (
      <div className="pt-20 flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-400">正在加载积分数据...</p>
      </div>
    );
  }

  return (
    <div className="pt-8 space-y-10">
      <section>
        <h1 className="text-3xl font-black mb-6">
          <i className="fa-solid fa-ranking-star mr-3 text-primary" />
          {season} 车手积分榜
        </h1>
        <div className="bg-f1-card border border-f1-border rounded-xl overflow-hidden">
          <div className="grid grid-cols-[60px_1fr_100px_80px_80px_80px] gap-2 px-6 py-3 bg-black/40 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <span>排名</span>
            <span>车手</span>
            <span>积分</span>
            <span className="text-center">冠军</span>
            <span className="text-center">领奖台</span>
            <span className="text-center">最快圈</span>
          </div>
          {sorted.map((driver, index) => (
            <div
              key={driver.id}
              onClick={() => navigate(`/driver/${driver.id}`)}
              className="grid grid-cols-[60px_1fr_100px_80px_80px_80px] gap-2 px-6 py-4 border-t border-f1-border items-center cursor-pointer hover:bg-white/[0.03] transition-colors group"
            >
              <div className="flex items-center">
                {index < 3 ? (
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm ${
                    index === 0 ? 'bg-yellow-500/20 text-yellow-400' :
                    index === 1 ? 'bg-gray-400/20 text-gray-300' :
                    'bg-amber-700/20 text-amber-500'
                  }`}>
                    {index + 1}
                  </span>
                ) : (
                  <span className="w-8 h-8 flex items-center justify-center text-gray-500 font-semibold text-sm">
                    {index + 1}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="w-1 h-10 rounded-full flex-shrink-0"
                  style={{ backgroundColor: driver.teamColor }}
                />
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-800 flex-shrink-0">
                  <img
                    src={driver.image}
                    alt={driver.nameZh}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const img = e.target as HTMLImageElement;
                      if (img.dataset.fallback === '2') return;
                      if (!img.dataset.fallback && driver.fallbackImage) {
                        img.dataset.fallback = '1';
                        img.src = driver.fallbackImage;
                      } else {
                        img.dataset.fallback = '2';
                        img.src = `https://placehold.co/80x80/1e1e2e/666?text=${driver.number}`;
                      }
                    }}
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-white font-bold text-sm group-hover:text-primary transition-colors truncate">
                    {driver.nameZh}
                  </p>
                  <p className="text-gray-500 text-xs truncate">{driver.teamZh}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-f1-border rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${(driver.points / maxPoints) * 100}%`,
                      backgroundColor: driver.teamColor,
                    }}
                  />
                </div>
                <span className="text-white font-bold text-sm w-8 text-right">{driver.points}</span>
              </div>
              <p className="text-center text-gray-400 text-sm font-medium">{driver.wins}</p>
              <p className="text-center text-gray-400 text-sm font-medium">{driver.podiums}</p>
              <p className="text-center text-gray-400 text-sm font-medium">{driver.fastestLaps}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-black mb-6">
          <i className="fa-solid fa-people-group mr-3 text-primary" />
          车队积分榜
        </h2>
        <div className="space-y-3">
          {teamStandings.map((team, index) => (
            <div
              key={team.team}
              className="bg-f1-card border border-f1-border rounded-xl p-5 hover:border-gray-600 transition-all duration-200"
            >
              <div className="flex items-center gap-4">
                <span className={`w-9 h-9 rounded-full flex items-center justify-center font-black text-sm flex-shrink-0 ${
                  index === 0 ? 'bg-yellow-500/20 text-yellow-400' :
                  index === 1 ? 'bg-gray-400/20 text-gray-300' :
                  index === 2 ? 'bg-amber-700/20 text-amber-500' :
                  'bg-f1-border text-gray-500'
                }`}>
                  {index + 1}
                </span>
                <div
                  className="w-1.5 h-10 rounded-full flex-shrink-0"
                  style={{ backgroundColor: team.color }}
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-bold">{team.team}</h3>
                  <p className="text-gray-500 text-xs mt-0.5">{team.drivers.join(' / ')}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-32 h-2 bg-f1-border rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${(team.points / maxTeamPoints) * 100}%`,
                        backgroundColor: team.color,
                      }}
                    />
                  </div>
                  <span className="text-white font-bold text-lg w-12 text-right">{team.points}</span>
                  <span className="text-gray-600 text-xs">分</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default StandingsPage;
