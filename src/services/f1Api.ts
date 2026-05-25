const SEASON = '2025';
const ERGAST = `https://api.jolpi.ca/ergast/f1/${SEASON}`;

export async function fetchDriverStandings() {
  const res = await fetch(`${ERGAST}/driverStandings.json`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  return data?.MRData?.StandingsTable?.StandingsLists?.[0]?.DriverStandings ?? [];
}

export async function fetchConstructorStandings() {
  const res = await fetch(`${ERGAST}/constructorStandings.json`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  return data?.MRData?.StandingsTable?.StandingsLists?.[0]?.ConstructorStandings ?? [];
}

export async function fetchSchedule() {
  const res = await fetch(`${ERGAST}.json`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  return data?.MRData?.RaceTable?.Races ?? [];
}

export async function fetchResults() {
  const res = await fetch(`${ERGAST}/results.json?limit=500`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  return data?.MRData?.RaceTable?.Races ?? [];
}

export async function fetchDriverImages(): Promise<any[]> {
  const res = await fetch('https://api.openf1.org/v1/drivers?session_key=latest');
  if (!res.ok) return [];
  return res.json();
}

export function getSeason() {
  return SEASON;
}
