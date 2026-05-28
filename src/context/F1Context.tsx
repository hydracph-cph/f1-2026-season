import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  driverNameZh, teamNameZh, teamColors, nationalityZh,
  raceNameZh, countryZhMap, countryFlag
} from '../data/driverMeta';

// 部分车手的 Wikipedia 页面标题与"FirstName LastName"不完全相同，
// 在这里手动列出需要重定向的车手。其他 95% 的车手都能直接命中页面。
const wikiTitleOverrides: Record<string, string> = {
  'sainz': 'Carlos Sainz Jr.',
  'hulkenberg': 'Nico Hülkenberg',
  'leclerc': 'Charles Leclerc',
};

export interface Driver {
  id: string;
  name: string;
  nameZh: string;
  firstName: string;
  lastName: string;
  fallbackImage?: string;
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
  time: string;
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

// F1 \u5b98\u7f51 2024+ \u65b0\u7248\u8def\u5f84\uff1a\u6309 "\u8f66\u624b\u4ee3\u53f7\u9996\u5b57\u6bcd" \u5206\u76ee\u5f55
// CODE = firstName \u524d 3 + lastName \u524d 3\uff0c\u6240\u4ee5\u9996\u5b57\u6bcd\u5b9e\u9645\u5c31\u662f firstName \u7684\u9996\u5b57\u6bcd
// \u4f8b\uff1aGeorge Russell \u2192 GEORUS \u2192 /G/GEORUS01_George_Russell/georus01.png
// \u4f8b\uff1aLewis Hamilton \u2192 LEWHAM \u2192 /L/LEWHAM01_Lewis_Hamilton/lewham01.png
function buildImageUrl(firstName: string, lastName: string): string {
  const fn = firstName.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const ln = lastName.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const code = (fn.substring(0, 3) + ln.substring(0, 3)).toUpperCase();
  const letter = code.charAt(0); // = firstName \u7684\u9996\u5b57\u6bcd
  return `https://media.formula1.com/content/dam/fom-website/drivers/${letter}/${code}01_${fn}_${ln}/${code.toLowerCase()}01.png`;
}

// \u901a\u8fc7 MediaWiki API \u6279\u91cf\u67e5 Wikipedia \u9875\u9762\u7684\u4e3b\u56fe\u3002\u8fd4\u56de { driverId -> \u56fe\u7247URL }\u3002
// \u4e00\u6b21\u8bf7\u6c42\u6700\u591a 50 \u4e2a\u6807\u9898\uff0c\u5355\u6b21\u8c03\u7528\u641e\u5b9a\u5168\u90e8 20 \u4e2a\u8f66\u624b\u3002
async function fetchWikipediaImages(
  drivers: Array<{ id: string; firstName: string; lastName: string }>
): Promise<Record<string, string>> {
  if (!drivers.length) return {};
  // \u7ed9\u6bcf\u4e2a\u8f66\u624b\u8ba1\u7b97\u7528\u4e8e\u67e5\u8be2\u7684 Wikipedia \u6807\u9898
  const titleToId: Record<string, string> = {};
  const titles: string[] = [];
  for (const d of drivers) {
    const title = wikiTitleOverrides[d.id] || `${d.firstName} ${d.lastName}`;
    const normalized = title.replace(/ /g, '_');
    titleToId[normalized.toLowerCase()] = d.id;
    titleToId[title.toLowerCase()] = d.id;
    titles.push(title);
  }
  const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*` +
    `&prop=pageimages&pithumbsize=400&redirects=1` +
    `&titles=${encodeURIComponent(titles.join('|'))}`;
  const res = await fetch(url);
  const data = await res.json();
  const pages = data?.query?.pages || {};
  const out: Record<string, string> = {};
  for (const p of Object.values<any>(pages)) {
    const src: string | undefined = p?.thumbnail?.source;
    const title: string | undefined = p?.title;
    if (!src || !title) continue;
    const key = title.toLowerCase();
    const normKey = title.replace(/ /g, '_').toLowerCase();
    const id = titleToId[key] || titleToId[normKey];
    if (id) out[id] = src;
  }
  // \u5982\u679c\u6709 redirects \u5b57\u6bb5\uff0c\u4e5f\u628a from \u6807\u9898\u6620\u5c04\u56de\u53bb
  for (const r of (data?.query?.redirects || [])) {
    const id = titleToId[(r.from || '').toLowerCase()];
    if (!id) continue;
    const targetKey = (r.to || '').toLowerCase();
    for (const p of Object.values<any>(pages)) {
      if (p?.title?.toLowerCase() === targetKey && p?.thumbnail?.source) {
        out[id] = p.thumbnail.source;
      }
    }
  }
  return out;
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
          let hdUrl: string = d.headshot_url;

          // 关键修复 1：去掉 Cloudinary 的 "fallback image" 指令
          // 这个指令会在原图找不到时返回一张银色剪影占位图（HTTP 200），
          // 导致浏览器以为加载成功、onError 永远不触发。
          hdUrl = hdUrl.replace(/\/d_driver_fallback_image\.png\//, '/');

          // 关键修复 2：把过期的 /{year}Drivers/ 路径改写成新版 /{车手代号首字母}/
          // F1 官网 2024 年起按 driver code 的首字母分目录（即 firstName 的首字母）
          const fnNorm = (d.first_name || '').normalize('NFD').replace(/[̀-ͯ]/g, '');
          const letter = (fnNorm.charAt(0) || d.name_acronym?.charAt(0) || 'X').toUpperCase();
          hdUrl = hdUrl.replace(/\/\d{4}Drivers\//, `/${letter}/`);

          // 用高清版本
          hdUrl = hdUrl
            .replace(/\/1col\//, '/2col-retina/')
            .replace(/\/2col\//, '/2col-retina/')
            .replace(/\/1col-retina\//, '/2col-retina/');
          if (!hdUrl.includes('/2col-retina/') && /\.png$/.test(hdUrl)) {
            hdUrl = hdUrl.replace(/\.png$/, '.png.transform/2col-retina/image.png');
          }

          imgMap[d.last_name.toLowerCase()] = {
            url: hdUrl, color: d.team_colour ? `#${d.team_colour}` : '',
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

      // 先把车手 id+姓名提取出来，一次性批量查 Wikipedia 头像
      const driverBasics = rawStandings.map((s: any) => ({
        id: s.Driver.driverId,
        firstName: s.Driver.givenName,
        lastName: s.Driver.familyName,
      }));
      let wikiImages: Record<string, string> = {};
      try {
        wikiImages = await fetchWikipediaImages(driverBasics);
      } catch (err) {
        console.warn('Wikipedia 头像批量请求失败:', err);
      }

      const drivers: Driver[] = rawStandings.map((s: any, i: number) => {
        const d = s.Driver;
        const c = s.Constructors?.[0];
        const dId = d.driverId;
        const fn = d.givenName;
        const ln = d.familyName;
        const of1 = imgMap[ln.toLowerCase()];
        // 头像优先级：Wikipedia API 返回的真实 URL（首选）
        //         → OpenF1 实时 headshot（兜底 1）
        //         → F1 官网模板（兜底 2）
        const primaryImage = wikiImages[dId] || of1?.url || buildImageUrl(fn, ln);
        const fallbackImage = of1?.url && of1.url !== primaryImage
          ? of1.url
          : buildImageUrl(fn, ln);
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
          image: primaryImage,
          fallbackImage,
          teamColor: of1?.color || teamColors[c?.constructorId] || '#666',
          position: parseInt(s.position) || (i + 1),
        };
      });

      const races: Race[] = rawSchedule.map((r: any) => {
        const round = r.round;
        const country = r.Circuit?.Location?.country || '';
        const rn = r.raceName || '';
        const w = winners[round];
        const rawTime = r.time || '';
        let timeDisplay = '';
        if (rawTime) {
          const match = rawTime.match(/(\d{2}):(\d{2})/);
          if (match) {
            let h = parseInt(match[1]) + 8;
            const m = match[2];
            const nextDay = h >= 24;
            if (nextDay) h -= 24;
            timeDisplay = `${String(h).padStart(2, '0')}:${m} (UTC+8)`;
          }
        }
        return {
          round: parseInt(round), name: rn,
          nameZh: raceNameZh[rn] || rn,
          circuit: r.Circuit?.circuitName || '', country,
          countryZh: countryZhMap[country] || country,
          date: r.date || '',
          time: timeDisplay,
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
