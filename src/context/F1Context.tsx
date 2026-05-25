import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  driverNameZh, teamNameZh, teamColors, nationalityZh,
  raceNameZh, countryZhMap, countryFlag
} from '../data/driverMeta';

export interface Driver {
  id: string;
  name: string;
  nameZh: string;
  firstName: string;
  lastName: string;
  team: string;
  teamId: string;
  teamZh: string;
  number: number;
  nationality: string;
  nationalityZh: string;
  points: number;
  wins: number;
  podiums: number;
  fastestLaps: number;
  dob: string;
  image: string;
  teamColor: string;
  position: number;
}

export interface Race {
  round: number;
  name: string;
  nameZh: string;
  circuit: string;
  country: string;
  countryZh: string;
  date: string;
  status: 'completed' | 'upcoming' | 'next';
  winnerId?: string;
  winner?: string;
  winnerZh?: string;
  flag: string;
}

interface F1ContextType {
  drivers: Driver[];
  races: Race[];
  loading: boolean;
  error: string | null;
  season: string;
}

const F1Context = createContext<F1ContextType>({
  drivers: [], races: [], loading: true, error: null, season: '2026'
});

export const useF1 = () => useContext(F1Context);

const API = 'https://api.jolpi.ca/ergast/f1/current';

function buildImageUrl(firstName: string, lastName: string, year: string): string {
  const fn = firstName.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const ln = lastName.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const code = (fn.substring(0, 3) + ln.substring(0, 3)).toUpperCase();
  return `https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/${year}Drivers/${code}01_${fn}_${ln}/${code.toLowerCase()}01.png.transform/2col-retina/image.png`;
}

export const F1Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<F1ContextType>({
    drivers: [], races: [], loading: true, error: null, season: '2026'
  });

  useEffect(() => { loadData(); }, []);

  async function loadData() {
    try {
      const [sRes, schRes, rRes, of1Res] = await Promise.allSettled([
        fetch(`${API}/driverStandings.json`).then(r => r.json()),
        fetch(`${API}.json`).then(r => r.json()),
        fetch(`${API}/results.json?limit=500`).then(r => r.json()),
        fetch('https://api.openf1.org/v1/drivers?session_key=latest').then(r => r.json()),
      ]);

      const rawStandings = sRes.status === 'fulfilled'
        ? sRes.value?.MRData?.StandingsTable?.StandingsLists?.[0]?.DriverStandings ?? [] : [];
      const rawSchedule = schRes.status === 'fulfilled'
        ? schRes.value?.MRData?.RaceTable?.Races ?? [] : [];
      const rawResults = rRes.status === 'fulfilled'
        ? rRes.value?.MRData?.RaceTable?.Races ?? [] : [];
      const of1Drivers = of1Res.status === 'fulfilled' && Array.isArray(of1Res.value)
        ? of1Res.value : [];

      const imgMap: Record<string, { url: string; color: string }> = {};
      for (const d of of1Drivers) {
        if (d.last_name && d.headshot_url) {
          imgMap[d.last_name.toLowerCase()] = {
            url: d.headshot_url, color: d.team_colour ? `#${d.team_colour}` : '',
          };
        }
      }

      const podiums: Record<string, number> = {};
      const fls: Record<string, number> = {};
      const winners: Record<string, { name: string; id: string }> = {};
      for (const race of rawResults) {
        for (const r of (race.Results || [])) {
          const did = r.Driver?.driverId;
          if (!did) continue;
          const pos = parseInt(r.position);
          if (pos <= 3) podiums[did] = (podiums[did] || 0) + 1;
          if (r.FastestLap?.rank === '1') fls[did] = (fls[did] || 0) + 1;
          if (pos === 1) {
            winners[race.round] = {
              name: `${r.Driver.givenName} ${r.Driver.familyName}`, id: did,
            };
          }
        }
      }

      const completedRounds = new Set(rawResults.map((r: any) => r.round));

      const drivers: Driver[] = rawStandings.map((s: any, i: number) => {
        const d = s.Driver;
        const c = s.Constructors?.[0];
        const dId = d.driverId;
        const fn = d.givenName;
        const ln = d.familyName;
        const of1 = imgMap[ln.toLowerCase()];
        return {
          id: dId, name: `${fn} ${ln}`, nameZh: driverNameZh[dId] || `${fn} ${ln}`,
          firstName: fn, lastName: ln,
          team: c?.name || '', teamId: c?.constructorId || '',
          teamZh: teamNameZh[c?.constructorId] || c?.name || '',
          number: parseInt(d.permanentNumber) || 0,
          nationality: d.nationality || '',
          nationalityZh: nationalityZh[d.nationality] || d.nationality || '',
          points: parseFloat(s.points) || 0, wins: parseInt(s.wins) || 0,
          podiums: podiums[dId] || 0, fastestLaps: fls[dId] || 0,
          dob: d.dateOfBirth || '',
          image: of1?.url || buildImageUrl(fn, ln, '2026'),
          teamColor: of1?.color || teamColors[c?.constructorId] || '#666',
          position: parseInt(s.position) || (i + 1),
        };
      });

      const races: Race[] = rawSchedule.map((r: any) => {
        const round = r.round;
        const country = r.Circuit?.Location?.country || '';
        const rn = r.raceName || '';
        const w = winners[round];
        return {
          round: parseInt(round), name: rn,
          nameZh: raceNameZh[rn] || rn,
          circuit: r.Circuit?.circuitName || '', country,
          countryZh: countryZhMap[country] || country,
          date: r.date || '',
          status: completedRounds.has(round) ? 'completed' as const : 'upcoming' as const,
          winnerId: w?.id, winner: w?.name,
          winnerZh: w ? (driverNameZh[w.id]?.split('·').pop() || w.name) : undefined,
          flag: countryFlag[country] || '🏁',
        };
      });

      const first = races.find(r => r.status === 'upcoming');
      if (first) first.status = 'next';

      const detectedSeason = rawSchedule?.[0]?.season || '2026';
      setState({ drivers, races, loading: false, error: null, season: detectedSeason });
    } catch (e: any) {
      setState(prev => ({ ...prev, loading: false, error: e.message }));
    }
  }

  return <F1Context.Provider value={state}>{children}</F1Context.Provider>;
};
