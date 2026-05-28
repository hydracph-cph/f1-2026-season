import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useF1 } from '../context/F1Context';
import { driverNameZh } from '../data/driverMeta';

interface SessionTime {
  name: string;
  date: string;
  time: string;
}

interface RaceResult {
  position: number;
  driverId: string;
  driverName: string;
  driverNameZh: string;
  team: string;
  grid: number;
  laps: number;
  time: string;
  status: string;
  points: number;
}

const API = 'https://api.jolpi.ca/ergast/f1/current';

function toUTC8(date: string, time: string): string {
  if (!time) return date;
  const match = time.match(/(\d{2}):(\d{2})/);
  if (!match) return date;
  let h = parseInt(match[1]) + 8;
  const m = match[2];
  let d = date;
  if (h >= 24) {
    h -= 24;
    const parts = date.split('-');
    if (parts.length === 3) {
      const dt = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]) + 1);
      d = `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(dt.getDate()).padStart(2, '0')}`;
    }
  }
  return `${d} ${String(h).padStart(2, '0')}:${m} (UTC+8)`;
}

const RaceDetail: React.FC = () => {
  const { round } = useParams<{ round: string }>();
  const navigate = useNavigate();
  const { races, loading: contextLoading } = useF1();
  const [sessions, setSessions] = useState<SessionTime[]>([]);
  const [results, setResults] = useState<RaceResult[]>([]);
  const [loadingDetail, setLoadingDetail] = useState(true);
  const [circuitImg, setCircuitImg] = useState('');

  const race = races.find(r => r.round === parseInt(round || '0'));

  useEffect(() => {
    if (!round) return;
    fetchRaceDetail(round);
  }, [round]);

  async function fetchRaceDetail(rnd: string) {
    setLoadingDetail(true);
    try {
      const [schedRes, resultRes, qualRes] = await Promise.allSettled([
        fetch(`${API}/${rnd}.json`).then(r => r.json()),
        fetch(`${API}/${rnd}/results.json`).then(r => r.json()),
        fetch(`${API}/${rnd}/qualifying.json`).then(r => r.json()),
      ]);

      if (schedRes.status === 'fulfilled') {
        const raceData = schedRes.value?.MRData?.RaceTable?.Races?.[0];
        if (raceData) {
          const sessArr: SessionTime[] = [];
          if (raceData.FirstPractice) {
            sessArr.push({ name: '练习赛 1', date: raceData.FirstPractice.date, time: raceData.FirstPractice.time || '' });
          }
          if (raceData.SecondPractice) {
            sessArr.push({ name: '练习赛 2', date: raceData.SecondPractice.date, time: raceData.SecondPractice.time || '' });
          }
          if (raceData.ThirdPractice) {
            sessArr.push({ name: '练习赛 3', date: raceData.ThirdPractice.date, time: raceData.ThirdPractice.time || '' });
          }
          if (raceData.Sprint) {
            sessArr.push({ name: '冲刺赛', date: raceData.Sprint.date, time: raceData.Sprint.time || '' });
          }
          if (raceData.SprintQualifying) {
            sessArr.push({ name: '冲刺排位赛', date: raceData.SprintQualifying.date, time: raceData.SprintQualifying.time || '' });
          }
          if (raceData.Qualifying) {
            sessArr.push({ name: '排位赛', date: raceData.Qualifying.date, time: raceData.Qualifying.time || '' });
          }
          sessArr.push({ name: '正赛', date: raceData.date, time: raceData.time || '' });
          sessArr.sort((a, b) => {
            const da = `${a.date} ${a.time}`;
            const db = `${b.date} ${b.time}`;
            return da.localeCompare(db);
          });
          setSessions(sessArr);

          const wikiUrl = raceData.Circuit?.url || '';
          if (wikiUrl) {
            const title = decodeURIComponent(wikiUrl.split('/wiki/').pop() || '');
            if (title) {
              try {
                const wRes = await fetch(
                  `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=pageimages&pithumbsize=600&redirects=1&titles=${encodeURIComponent(title)}`
                );
                const wData = await wRes.json();
                const pages = wData?.query?.pages || {};
                for (const p of Object.values<any>(pages)) {
                  if (p?.thumbnail?.source) {
                    setCircuitImg(p.thumbnail.source);
                    break;
                  }
                }
              } catch (_) {}
            }
          }
        }
      }

      if (resultRes.status === 'fulfilled') {
        const raceResults = resultRes.value?.MRData?.RaceTable?.Races?.[0]?.Results || [];
        const parsed: RaceResult[] = raceResults.map((r: any) => ({
          position: parseInt(r.position),
          driverId: r.Driver?.driverId || '',
          driverName: `${r.Driver?.givenName || ''} ${r.Driver?.familyName || ''}`,
          driverNameZh: driverNameZh[r.Driver?.driverId] || `${r.Driver?.givenName || ''} ${r.Driver?.familyName || ''}`,
          team: r.Constructor?.name || '',
          grid: parseInt(r.grid) || 0,
          laps: parseInt(r.laps) || 0,
          time: r.Time?.time || r.status || '',
          status: r.status || '',
          points: parseFloat(r.points) || 0,
        }));
        setResults(parsed);
      }
    } catch (e) {
      console.error(e);
    }
    setLoadingDetail(false);
  }

  if (contextLoading || loadingDetail) {
    return (
      <div className="pt-20 flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-400">加载比赛详情...</p>
      </div>
    );
  }

  if (!race) {
    return (
      <div className="pt-20 text-center">
        <i className="fa-solid fa-flag-checkered text-5xl text-gray-600 mb-4" />
        <p className="text-gray-500 text-lg">未找到该比赛</p>
        <button onClick={() => navigate('/')} className="mt-4 px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors">
          返回首页
        </button>
      </div>
    );
  }

  return (
    <div className="pt-8">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors mb-6 group">
        <i className="fa-solid fa-arrow-left group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-medium">返回</span>
      </button>

      <div className="relative overflow-hidden rounded-2xl bg-f1-card border border-f1-border mb-8">
        <div className="h-2 bg-primary" />
        <div className="p-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl">{race.flag}</span>
                <div>
                  <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                    race.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                    race.status === 'next' ? 'bg-primary/20 text-primary' :
                    'bg-gray-500/20 text-gray-400'
                  }`}>
                    {race.status === 'completed' ? '已完赛' : race.status === 'next' ? '下一站' : '即将到来'}
                  </span>
                </div>
              </div>
              <h1 className="text-3xl font-black text-white mb-1">{race.nameZh}</h1>
              <p className="text-gray-500 text-sm mb-1">{race.name}</p>
              <p className="text-gray-400 flex items-center gap-2 mt-3">
                <i className="fa-solid fa-location-dot" />
                {race.circuit}
              </p>
              <p className="text-gray-400 flex items-center gap-2 mt-1">
                <i className="fa-solid fa-calendar" />
                {race.date} &middot; 第 {race.round} 站
              </p>
              {race.winnerZh && (
                <p className="text-yellow-400 flex items-center gap-2 mt-3 font-semibold">
                  <i className="fa-solid fa-trophy" />
                  冠军: {race.winnerZh}
                </p>
              )}
            </div>
            {circuitImg && (
              <div className="lg:w-80 flex-shrink-0">
                <div className="bg-white/5 rounded-xl p-4 border border-f1-border">
                  <img
                    src={circuitImg}
                    alt="赛道图"
                    className="w-full h-auto object-contain"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                  <p className="text-center text-gray-500 text-xs mt-2">赛道布局</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {sessions.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-black mb-4 flex items-center gap-2">
            <i className="fa-solid fa-clock text-primary" />
            赛程时间表
          </h2>
          <div className="bg-f1-card border border-f1-border rounded-xl overflow-hidden">
            {sessions.map((s, idx) => (
              <div key={idx} className={`flex items-center justify-between px-6 py-4 ${idx > 0 ? 'border-t border-f1-border' : ''}`}>
                <div className="flex items-center gap-3">
                  <i className={`fa-solid ${s.name === '正赛' ? 'fa-flag-checkered text-primary' : s.name.includes('排位') ? 'fa-stopwatch text-yellow-500' : s.name.includes('冲刺') ? 'fa-bolt text-orange-500' : 'fa-gauge-high text-blue-400'} text-sm w-5`} />
                  <span className={`font-semibold text-sm ${s.name === '正赛' ? 'text-white' : 'text-gray-300'}`}>{s.name}</span>
                </div>
                <span className="text-gray-400 text-sm font-mono">{toUTC8(s.date, s.time)}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {results.length > 0 && (
        <section>
          <h2 className="text-xl font-black mb-4 flex items-center gap-2">
            <i className="fa-solid fa-ranking-star text-primary" />
            正赛结果
          </h2>
          <div className="bg-f1-card border border-f1-border rounded-xl overflow-hidden">
            <div className="grid grid-cols-[50px_1fr_140px_60px_80px_80px] gap-2 px-4 py-3 bg-black/40 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              <span>名次</span>
              <span>车手</span>
              <span>车队</span>
              <span className="text-center">圈数</span>
              <span className="text-right">用时/状态</span>
              <span className="text-right">积分</span>
            </div>
            {results.map((r) => (
              <div
                key={r.position}
                onClick={() => r.driverId && navigate(`/driver/${r.driverId}`)}
                className="grid grid-cols-[50px_1fr_140px_60px_80px_80px] gap-2 px-4 py-3 border-t border-f1-border items-center cursor-pointer hover:bg-white/[0.03] transition-colors"
              >
                <div>
                  {r.position <= 3 ? (
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center font-black text-xs ${
                      r.position === 1 ? 'bg-yellow-500/20 text-yellow-400' :
                      r.position === 2 ? 'bg-gray-400/20 text-gray-300' :
                      'bg-amber-700/20 text-amber-500'
                    }`}>{r.position}</span>
                  ) : (
                    <span className="text-gray-500 font-semibold text-sm pl-1.5">{r.position}</span>
                  )}
                </div>
                <span className="text-white text-sm font-medium truncate">{r.driverNameZh}</span>
                <span className="text-gray-500 text-xs truncate">{r.team}</span>
                <span className="text-gray-400 text-xs text-center">{r.laps}</span>
                <span className="text-gray-400 text-xs text-right truncate">{r.time}</span>
                <span className="text-white text-xs text-right font-semibold">{r.points > 0 ? `+${r.points}` : '-'}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default RaceDetail;
