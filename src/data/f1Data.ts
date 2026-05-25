export interface Driver {
  id: string;
  name: string;
  team: string;
  number: number;
  nationality: string;
  points: number;
  wins: number;
  podiums: number;
  poles: number;
  fastestLaps: number;
  dob: string;
  image: string;
  teamColor: string;
  isHot?: boolean;
}

export interface Race {
  round: number;
  name: string;
  circuit: string;
  country: string;
  date: string;
  status: 'completed' | 'upcoming' | 'next';
  winner?: string;
  flag: string;
}

export const drivers: Driver[] = [
  { id: 'verstappen', name: 'Max Verstappen', team: 'Red Bull Racing', number: 1, nationality: 'Netherlands', points: 192, wins: 7, podiums: 9, poles: 6, fastestLaps: 4, dob: '1997-09-30', image: 'https://img.onedayboot.com/ai-image/2025-05-25/70936eb6-2e15-4de6-b19e-bbae16aaedb3.png', teamColor: '#3671C6', isHot: true },
  { id: 'norris', name: 'Lando Norris', team: 'McLaren', number: 4, nationality: 'United Kingdom', points: 178, wins: 5, podiums: 8, poles: 4, fastestLaps: 2, dob: '1999-11-13', image: 'https://img.onedayboot.com/ai-image/2025-05-25/e19dba57-8d5a-411e-b69e-38d0da2fdca9.png', teamColor: '#FF8000', isHot: true },
  { id: 'leclerc', name: 'Charles Leclerc', team: 'Ferrari', number: 16, nationality: 'Monaco', points: 165, wins: 4, podiums: 8, poles: 3, fastestLaps: 2, dob: '1997-10-16', image: 'https://img.onedayboot.com/ai-image/2025-05-25/b56e60f3-0ca9-4f2f-a7e6-3f2e6e4edd81.png', teamColor: '#E8002D', isHot: true },
  { id: 'hamilton', name: 'Lewis Hamilton', team: 'Ferrari', number: 44, nationality: 'United Kingdom', points: 148, wins: 3, podiums: 7, poles: 2, fastestLaps: 1, dob: '1985-01-07', image: 'https://img.onedayboot.com/ai-image/2025-05-25/a92e4cf7-2a12-42b1-a74b-cb63f58f1d18.png', teamColor: '#E8002D', isHot: true },
  { id: 'piastri', name: 'Oscar Piastri', team: 'McLaren', number: 81, nationality: 'Australia', points: 140, wins: 3, podiums: 6, poles: 2, fastestLaps: 2, dob: '2001-04-06', image: 'https://img.onedayboot.com/ai-image/2025-05-25/fe2d1c88-3c8b-44a3-a9b1-b82e14a6e5c9.png', teamColor: '#FF8000', isHot: true },
  { id: 'russell', name: 'George Russell', team: 'Mercedes', number: 63, nationality: 'United Kingdom', points: 118, wins: 2, podiums: 5, poles: 3, fastestLaps: 1, dob: '1998-02-15', image: 'https://img.onedayboot.com/ai-image/2025-05-25/c7df3b6c-39a3-487e-94ae-39bf06b3ce4e.png', teamColor: '#27F4D2' },
  { id: 'antonelli', name: 'Kimi Antonelli', team: 'Mercedes', number: 12, nationality: 'Italy', points: 95, wins: 1, podiums: 4, poles: 1, fastestLaps: 1, dob: '2006-08-25', image: 'https://img.onedayboot.com/ai-image/2025-05-25/fd9f4487-7e8e-4eba-8bc8-a94e9b65a5d5.png', teamColor: '#27F4D2' },
  { id: 'sainz', name: 'Carlos Sainz', team: 'Williams', number: 55, nationality: 'Spain', points: 72, wins: 1, podiums: 3, poles: 1, fastestLaps: 0, dob: '1994-09-01', image: 'https://img.onedayboot.com/ai-image/2025-05-25/9e82faa2-1c41-4685-9b31-21e116e59a85.png', teamColor: '#64C4FF' },
  { id: 'alonso', name: 'Fernando Alonso', team: 'Aston Martin', number: 14, nationality: 'Spain', points: 65, wins: 0, podiums: 3, poles: 0, fastestLaps: 1, dob: '1981-07-29', image: 'https://img.onedayboot.com/ai-image/2025-05-25/84e39b6e-d19e-4b11-b3e6-07c34f87cc08.png', teamColor: '#229971' },
  { id: 'lawson', name: 'Liam Lawson', team: 'Red Bull Racing', number: 30, nationality: 'New Zealand', points: 58, wins: 0, podiums: 2, poles: 0, fastestLaps: 1, dob: '2002-02-11', image: 'https://img.onedayboot.com/ai-image/2025-05-25/e6d5c6af-7a16-41aa-89e3-1ca67b3e2df2.png', teamColor: '#3671C6' },
  { id: 'tsunoda', name: 'Yuki Tsunoda', team: 'Racing Bulls', number: 22, nationality: 'Japan', points: 45, wins: 0, podiums: 1, poles: 0, fastestLaps: 1, dob: '2000-05-11', image: 'https://img.onedayboot.com/ai-image/2025-05-25/6f2e9c80-5319-4b2f-b5e3-9a29a1e7f504.png', teamColor: '#6692FF' },
  { id: 'gasly', name: 'Pierre Gasly', team: 'Alpine', number: 10, nationality: 'France', points: 42, wins: 0, podiums: 1, poles: 0, fastestLaps: 0, dob: '1996-02-07', image: 'https://img.onedayboot.com/ai-image/2025-05-25/e1bb5ce3-1bc1-444c-9d07-fa29bef9d5c2.png', teamColor: '#0093CC' },
  { id: 'stroll', name: 'Lance Stroll', team: 'Aston Martin', number: 18, nationality: 'Canada', points: 38, wins: 0, podiums: 1, poles: 0, fastestLaps: 0, dob: '1998-10-29', image: 'https://img.onedayboot.com/ai-image/2025-05-25/a7a5cfd5-0b19-4adb-a2eb-6f7b5a05e50e.png', teamColor: '#229971' },
  { id: 'hulkenberg', name: 'Nico Hulkenberg', team: 'Audi', number: 27, nationality: 'Germany', points: 30, wins: 0, podiums: 0, poles: 0, fastestLaps: 0, dob: '1987-08-19', image: 'https://img.onedayboot.com/ai-image/2025-05-25/f30f4076-0c28-435e-9fe7-35f46d7b5beb.png', teamColor: '#C0C0C0' },
  { id: 'doohan', name: 'Jack Doohan', team: 'Alpine', number: 7, nationality: 'Australia', points: 28, wins: 0, podiums: 0, poles: 0, fastestLaps: 0, dob: '2003-01-20', image: 'https://img.onedayboot.com/ai-image/2025-05-25/a6adfe41-69a8-4a2e-a88f-3b5e6e6e22f3.png', teamColor: '#0093CC' },
  { id: 'albon', name: 'Alexander Albon', team: 'Williams', number: 23, nationality: 'Thailand', points: 25, wins: 0, podiums: 0, poles: 0, fastestLaps: 0, dob: '1996-03-23', image: 'https://img.onedayboot.com/ai-image/2025-05-25/f0c91c59-0ce2-4c96-bf6f-02f3e01e2b2f.png', teamColor: '#64C4FF' },
  { id: 'ocon', name: 'Esteban Ocon', team: 'Haas', number: 31, nationality: 'France', points: 22, wins: 0, podiums: 0, poles: 0, fastestLaps: 0, dob: '1996-09-17', image: 'https://img.onedayboot.com/ai-image/2025-05-25/00dadd3a-5e41-47e1-9dcb-aae6d4e0f1b5.png', teamColor: '#B6BABD' },
  { id: 'hadjar', name: 'Isack Hadjar', team: 'Racing Bulls', number: 6, nationality: 'France', points: 20, wins: 0, podiums: 0, poles: 0, fastestLaps: 0, dob: '2004-09-28', image: 'https://img.onedayboot.com/ai-image/2025-05-25/b6b2fa22-86f6-406a-8d67-a4d77f32bba5.png', teamColor: '#6692FF' },
  { id: 'bortoleto', name: 'Gabriel Bortoleto', team: 'Audi', number: 5, nationality: 'Brazil', points: 18, wins: 0, podiums: 0, poles: 0, fastestLaps: 0, dob: '2004-10-14', image: 'https://img.onedayboot.com/ai-image/2025-05-25/d16e6eb1-3eca-4eff-8590-ce29e1e5ade1.png', teamColor: '#C0C0C0' },
  { id: 'bearman', name: 'Oliver Bearman', team: 'Haas', number: 87, nationality: 'United Kingdom', points: 15, wins: 0, podiums: 0, poles: 0, fastestLaps: 0, dob: '2005-05-08', image: 'https://img.onedayboot.com/ai-image/2025-05-25/4cc51758-e3f7-4cb3-9a30-3acbc7a11bb1.png', teamColor: '#B6BABD' },
];

export const races: Race[] = [
  { round: 1, name: 'Australian Grand Prix', circuit: 'Albert Park Circuit', country: 'Australia', date: '2026-03-15', status: 'completed', winner: 'Max Verstappen', flag: '🇦🇺' },
  { round: 2, name: 'Chinese Grand Prix', circuit: 'Shanghai International Circuit', country: 'China', date: '2026-03-22', status: 'completed', winner: 'Charles Leclerc', flag: '🇨🇳' },
  { round: 3, name: 'Japanese Grand Prix', circuit: 'Suzuka Circuit', country: 'Japan', date: '2026-04-05', status: 'completed', winner: 'Lando Norris', flag: '🇯🇵' },
  { round: 4, name: 'Bahrain Grand Prix', circuit: 'Bahrain International Circuit', country: 'Bahrain', date: '2026-04-12', status: 'completed', winner: 'Max Verstappen', flag: '🇧🇭' },
  { round: 5, name: 'Saudi Arabian Grand Prix', circuit: 'Jeddah Corniche Circuit', country: 'Saudi Arabia', date: '2026-04-19', status: 'completed', winner: 'Lewis Hamilton', flag: '🇸🇦' },
  { round: 6, name: 'Miami Grand Prix', circuit: 'Miami International Autodrome', country: 'USA', date: '2026-05-03', status: 'completed', winner: 'Lando Norris', flag: '🇺🇸' },
  { round: 7, name: 'Emilia Romagna Grand Prix', circuit: 'Autodromo Enzo e Dino Ferrari', country: 'Italy', date: '2026-05-17', status: 'completed', winner: 'Charles Leclerc', flag: '🇮🇹' },
  { round: 8, name: 'Monaco Grand Prix', circuit: 'Circuit de Monaco', country: 'Monaco', date: '2026-05-24', status: 'next', flag: '🇲🇨' },
  { round: 9, name: 'Spanish Grand Prix', circuit: 'Circuit de Barcelona-Catalunya', country: 'Spain', date: '2026-06-07', status: 'upcoming', flag: '🇪🇸' },
  { round: 10, name: 'Canadian Grand Prix', circuit: 'Circuit Gilles Villeneuve', country: 'Canada', date: '2026-06-14', status: 'upcoming', flag: '🇨🇦' },
  { round: 11, name: 'Austrian Grand Prix', circuit: 'Red Bull Ring', country: 'Austria', date: '2026-06-28', status: 'upcoming', flag: '🇦🇹' },
  { round: 12, name: 'British Grand Prix', circuit: 'Silverstone Circuit', country: 'United Kingdom', date: '2026-07-05', status: 'upcoming', flag: '🇬🇧' },
  { round: 13, name: 'Belgian Grand Prix', circuit: 'Circuit de Spa-Francorchamps', country: 'Belgium', date: '2026-07-26', status: 'upcoming', flag: '🇧🇪' },
  { round: 14, name: 'Hungarian Grand Prix', circuit: 'Hungaroring', country: 'Hungary', date: '2026-08-02', status: 'upcoming', flag: '🇭🇺' },
  { round: 15, name: 'Dutch Grand Prix', circuit: 'Circuit Zandvoort', country: 'Netherlands', date: '2026-08-30', status: 'upcoming', flag: '🇳🇱' },
  { round: 16, name: 'Italian Grand Prix', circuit: 'Autodromo Nazionale Monza', country: 'Italy', date: '2026-09-06', status: 'upcoming', flag: '🇮🇹' },
  { round: 17, name: 'Azerbaijan Grand Prix', circuit: 'Baku City Circuit', country: 'Azerbaijan', date: '2026-09-20', status: 'upcoming', flag: '🇦🇿' },
  { round: 18, name: 'Singapore Grand Prix', circuit: 'Marina Bay Street Circuit', country: 'Singapore', date: '2026-10-04', status: 'upcoming', flag: '🇸🇬' },
  { round: 19, name: 'United States Grand Prix', circuit: 'Circuit of the Americas', country: 'USA', date: '2026-10-18', status: 'upcoming', flag: '🇺🇸' },
  { round: 20, name: 'Mexico City Grand Prix', circuit: 'Autodromo Hermanos Rodriguez', country: 'Mexico', date: '2026-10-25', status: 'upcoming', flag: '🇲🇽' },
  { round: 21, name: 'Brazilian Grand Prix', circuit: 'Autodromo Jose Carlos Pace', country: 'Brazil', date: '2026-11-08', status: 'upcoming', flag: '🇧🇷' },
  { round: 22, name: 'Las Vegas Grand Prix', circuit: 'Las Vegas Strip Circuit', country: 'USA', date: '2026-11-21', status: 'upcoming', flag: '🇺🇸' },
  { round: 23, name: 'Qatar Grand Prix', circuit: 'Lusail International Circuit', country: 'Qatar', date: '2026-11-29', status: 'upcoming', flag: '🇶🇦' },
  { round: 24, name: 'Abu Dhabi Grand Prix', circuit: 'Yas Marina Circuit', country: 'UAE', date: '2026-12-06', status: 'upcoming', flag: '🇦🇪' },
];
