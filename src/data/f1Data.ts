export interface Driver {
  id: string;
  name: string;
  nameZh: string;
  team: string;
  teamZh: string;
  number: number;
  nationality: string;
  nationalityZh: string;
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
  nameZh: string;
  circuit: string;
  country: string;
  countryZh: string;
  date: string;
  status: 'completed' | 'upcoming' | 'next';
  winner?: string;
  winnerZh?: string;
  flag: string;
}

export const drivers: Driver[] = [
  { id: 'verstappen', name: 'Max Verstappen', nameZh: '马克斯·维斯塔潘', team: 'Red Bull Racing', teamZh: '红牛车队', number: 1, nationality: 'Netherlands', nationalityZh: '荷兰', points: 192, wins: 7, podiums: 9, poles: 6, fastestLaps: 4, dob: '1997-09-30', image: 'https://img.onedayboot.com/ai-image/2025-05-25/70936eb6-2e15-4de6-b19e-bbae16aaedb3.png', teamColor: '#3671C6', isHot: true },
  { id: 'norris', name: 'Lando Norris', nameZh: '兰多·诺里斯', team: 'McLaren', teamZh: '迈凯伦车队', number: 4, nationality: 'United Kingdom', nationalityZh: '英国', points: 178, wins: 5, podiums: 8, poles: 4, fastestLaps: 2, dob: '1999-11-13', image: 'https://img.onedayboot.com/ai-image/2025-05-25/e19dba57-8d5a-411e-b69e-38d0da2fdca9.png', teamColor: '#FF8000', isHot: true },
  { id: 'leclerc', name: 'Charles Leclerc', nameZh: '夏尔·勒克莱尔', team: 'Ferrari', teamZh: '法拉利车队', number: 16, nationality: 'Monaco', nationalityZh: '摩纳哥', points: 165, wins: 4, podiums: 8, poles: 3, fastestLaps: 2, dob: '1997-10-16', image: 'https://img.onedayboot.com/ai-image/2025-05-25/b56e60f3-0ca9-4f2f-a7e6-3f2e6e4edd81.png', teamColor: '#E8002D', isHot: true },
  { id: 'hamilton', name: 'Lewis Hamilton', nameZh: '刘易斯·汉密尔顿', team: 'Ferrari', teamZh: '法拉利车队', number: 44, nationality: 'United Kingdom', nationalityZh: '英国', points: 148, wins: 3, podiums: 7, poles: 2, fastestLaps: 1, dob: '1985-01-07', image: 'https://img.onedayboot.com/ai-image/2025-05-25/a92e4cf7-2a12-42b1-a74b-cb63f58f1d18.png', teamColor: '#E8002D', isHot: true },
  { id: 'piastri', name: 'Oscar Piastri', nameZh: '奥斯卡·皮亚斯特里', team: 'McLaren', teamZh: '迈凯伦车队', number: 81, nationality: 'Australia', nationalityZh: '澳大利亚', points: 140, wins: 3, podiums: 6, poles: 2, fastestLaps: 2, dob: '2001-04-06', image: 'https://img.onedayboot.com/ai-image/2025-05-25/fe2d1c88-3c8b-44a3-a9b1-b82e14a6e5c9.png', teamColor: '#FF8000', isHot: true },
  { id: 'russell', name: 'George Russell', nameZh: '乔治·拉塞尔', team: 'Mercedes', teamZh: '梅赛德斯车队', number: 63, nationality: 'United Kingdom', nationalityZh: '英国', points: 118, wins: 2, podiums: 5, poles: 3, fastestLaps: 1, dob: '1998-02-15', image: 'https://img.onedayboot.com/ai-image/2025-05-25/c7df3b6c-39a3-487e-94ae-39bf06b3ce4e.png', teamColor: '#27F4D2' },
  { id: 'antonelli', name: 'Kimi Antonelli', nameZh: '基米·安东内利', team: 'Mercedes', teamZh: '梅赛德斯车队', number: 12, nationality: 'Italy', nationalityZh: '意大利', points: 95, wins: 1, podiums: 4, poles: 1, fastestLaps: 1, dob: '2006-08-25', image: 'https://img.onedayboot.com/ai-image/2025-05-25/fd9f4487-7e8e-4eba-8bc8-a94e9b65a5d5.png', teamColor: '#27F4D2' },
  { id: 'sainz', name: 'Carlos Sainz', nameZh: '卡洛斯·塞恩斯', team: 'Williams', teamZh: '威廉姆斯车队', number: 55, nationality: 'Spain', nationalityZh: '西班牙', points: 72, wins: 1, podiums: 3, poles: 1, fastestLaps: 0, dob: '1994-09-01', image: 'https://img.onedayboot.com/ai-image/2025-05-25/9e82faa2-1c41-4685-9b31-21e116e59a85.png', teamColor: '#64C4FF' },
  { id: 'alonso', name: 'Fernando Alonso', nameZh: '费尔南多·阿隆索', team: 'Aston Martin', teamZh: '阿斯顿·马丁车队', number: 14, nationality: 'Spain', nationalityZh: '西班牙', points: 65, wins: 0, podiums: 3, poles: 0, fastestLaps: 1, dob: '1981-07-29', image: 'https://img.onedayboot.com/ai-image/2025-05-25/84e39b6e-d19e-4b11-b3e6-07c34f87cc08.png', teamColor: '#229971' },
  { id: 'lawson', name: 'Liam Lawson', nameZh: '利亚姆·劳森', team: 'Red Bull Racing', teamZh: '红牛车队', number: 30, nationality: 'New Zealand', nationalityZh: '新西兰', points: 58, wins: 0, podiums: 2, poles: 0, fastestLaps: 1, dob: '2002-02-11', image: 'https://img.onedayboot.com/ai-image/2025-05-25/e6d5c6af-7a16-41aa-89e3-1ca67b3e2df2.png', teamColor: '#3671C6' },
  { id: 'tsunoda', name: 'Yuki Tsunoda', nameZh: '角田裕毅', team: 'Racing Bulls', teamZh: '红牛二队', number: 22, nationality: 'Japan', nationalityZh: '日本', points: 45, wins: 0, podiums: 1, poles: 0, fastestLaps: 1, dob: '2000-05-11', image: 'https://img.onedayboot.com/ai-image/2025-05-25/6f2e9c80-5319-4b2f-b5e3-9a29a1e7f504.png', teamColor: '#6692FF' },
  { id: 'gasly', name: 'Pierre Gasly', nameZh: '皮埃尔·加斯利', team: 'Alpine', teamZh: '阿尔派车队', number: 10, nationality: 'France', nationalityZh: '法国', points: 42, wins: 0, podiums: 1, poles: 0, fastestLaps: 0, dob: '1996-02-07', image: 'https://img.onedayboot.com/ai-image/2025-05-25/e1bb5ce3-1bc1-444c-9d07-fa29bef9d5c2.png', teamColor: '#0093CC' },
  { id: 'stroll', name: 'Lance Stroll', nameZh: '兰斯·斯特罗尔', team: 'Aston Martin', teamZh: '阿斯顿·马丁车队', number: 18, nationality: 'Canada', nationalityZh: '加拿大', points: 38, wins: 0, podiums: 1, poles: 0, fastestLaps: 0, dob: '1998-10-29', image: 'https://img.onedayboot.com/ai-image/2025-05-25/a7a5cfd5-0b19-4adb-a2eb-6f7b5a05e50e.png', teamColor: '#229971' },
  { id: 'hulkenberg', name: 'Nico Hulkenberg', nameZh: '尼科·霍肯伯格', team: 'Audi', teamZh: '奥迪车队', number: 27, nationality: 'Germany', nationalityZh: '德国', points: 30, wins: 0, podiums: 0, poles: 0, fastestLaps: 0, dob: '1987-08-19', image: 'https://img.onedayboot.com/ai-image/2025-05-25/f30f4076-0c28-435e-9fe7-35f46d7b5beb.png', teamColor: '#C0C0C0' },
  { id: 'doohan', name: 'Jack Doohan', nameZh: '杰克·杜汉', team: 'Alpine', teamZh: '阿尔派车队', number: 7, nationality: 'Australia', nationalityZh: '澳大利亚', points: 28, wins: 0, podiums: 0, poles: 0, fastestLaps: 0, dob: '2003-01-20', image: 'https://img.onedayboot.com/ai-image/2025-05-25/a6adfe41-69a8-4a2e-a88f-3b5e6e6e22f3.png', teamColor: '#0093CC' },
  { id: 'albon', name: 'Alexander Albon', nameZh: '亚历山大·阿尔本', team: 'Williams', teamZh: '威廉姆斯车队', number: 23, nationality: 'Thailand', nationalityZh: '泰国', points: 25, wins: 0, podiums: 0, poles: 0, fastestLaps: 0, dob: '1996-03-23', image: 'https://img.onedayboot.com/ai-image/2025-05-25/f0c91c59-0ce2-4c96-bf6f-02f3e01e2b2f.png', teamColor: '#64C4FF' },
  { id: 'ocon', name: 'Esteban Ocon', nameZh: '埃斯特班·奥孔', team: 'Haas', teamZh: '哈斯车队', number: 31, nationality: 'France', nationalityZh: '法国', points: 22, wins: 0, podiums: 0, poles: 0, fastestLaps: 0, dob: '1996-09-17', image: 'https://img.onedayboot.com/ai-image/2025-05-25/00dadd3a-5e41-47e1-9dcb-aae6d4e0f1b5.png', teamColor: '#B6BABD' },
  { id: 'hadjar', name: 'Isack Hadjar', nameZh: '伊萨克·哈贾尔', team: 'Racing Bulls', teamZh: '红牛二队', number: 6, nationality: 'France', nationalityZh: '法国', points: 20, wins: 0, podiums: 0, poles: 0, fastestLaps: 0, dob: '2004-09-28', image: 'https://img.onedayboot.com/ai-image/2025-05-25/b6b2fa22-86f6-406a-8d67-a4d77f32bba5.png', teamColor: '#6692FF' },
  { id: 'bortoleto', name: 'Gabriel Bortoleto', nameZh: '加布里埃尔·博尔托莱托', team: 'Audi', teamZh: '奥迪车队', number: 5, nationality: 'Brazil', nationalityZh: '巴西', points: 18, wins: 0, podiums: 0, poles: 0, fastestLaps: 0, dob: '2004-10-14', image: 'https://img.onedayboot.com/ai-image/2025-05-25/d16e6eb1-3eca-4eff-8590-ce29e1e5ade1.png', teamColor: '#C0C0C0' },
  { id: 'bearman', name: 'Oliver Bearman', nameZh: '奥利弗·贝尔曼', team: 'Haas', teamZh: '哈斯车队', number: 87, nationality: 'United Kingdom', nationalityZh: '英国', points: 15, wins: 0, podiums: 0, poles: 0, fastestLaps: 0, dob: '2005-05-08', image: 'https://img.onedayboot.com/ai-image/2025-05-25/4cc51758-e3f7-4cb3-9a30-3acbc7a11bb1.png', teamColor: '#B6BABD' },
];

export const races: Race[] = [
  { round: 1, name: 'Australian Grand Prix', nameZh: '澳大利亚大奖赛', circuit: 'Albert Park Circuit', country: 'Australia', countryZh: '澳大利亚', date: '2026-03-15', status: 'completed', winner: 'Max Verstappen', winnerZh: '维斯塔潘', flag: '🇦🇺' },
  { round: 2, name: 'Chinese Grand Prix', nameZh: '中国大奖赛', circuit: 'Shanghai International Circuit', country: 'China', countryZh: '中国', date: '2026-03-22', status: 'completed', winner: 'Charles Leclerc', winnerZh: '勒克莱尔', flag: '🇨🇳' },
  { round: 3, name: 'Japanese Grand Prix', nameZh: '日本大奖赛', circuit: 'Suzuka Circuit', country: 'Japan', countryZh: '日本', date: '2026-04-05', status: 'completed', winner: 'Lando Norris', winnerZh: '诺里斯', flag: '🇯🇵' },
  { round: 4, name: 'Bahrain Grand Prix', nameZh: '巴林大奖赛', circuit: 'Bahrain International Circuit', country: 'Bahrain', countryZh: '巴林', date: '2026-04-12', status: 'completed', winner: 'Max Verstappen', winnerZh: '维斯塔潘', flag: '🇧🇭' },
  { round: 5, name: 'Saudi Arabian Grand Prix', nameZh: '沙特阿拉伯大奖赛', circuit: 'Jeddah Corniche Circuit', country: 'Saudi Arabia', countryZh: '沙特阿拉伯', date: '2026-04-19', status: 'completed', winner: 'Lewis Hamilton', winnerZh: '汉密尔顿', flag: '🇸🇦' },
  { round: 6, name: 'Miami Grand Prix', nameZh: '迈阿密大奖赛', circuit: 'Miami International Autodrome', country: 'USA', countryZh: '美国', date: '2026-05-03', status: 'completed', winner: 'Lando Norris', winnerZh: '诺里斯', flag: '🇺🇸' },
  { round: 7, name: 'Emilia Romagna Grand Prix', nameZh: '艾米利亚-罗马涅大奖赛', circuit: 'Autodromo Enzo e Dino Ferrari', country: 'Italy', countryZh: '意大利', date: '2026-05-17', status: 'completed', winner: 'Charles Leclerc', winnerZh: '勒克莱尔', flag: '🇮🇹' },
  { round: 8, name: 'Monaco Grand Prix', nameZh: '摩纳哥大奖赛', circuit: 'Circuit de Monaco', country: 'Monaco', countryZh: '摩纳哥', date: '2026-05-24', status: 'next', flag: '🇲🇨' },
  { round: 9, name: 'Spanish Grand Prix', nameZh: '西班牙大奖赛', circuit: 'Circuit de Barcelona-Catalunya', country: 'Spain', countryZh: '西班牙', date: '2026-06-07', status: 'upcoming', flag: '🇪🇸' },
  { round: 10, name: 'Canadian Grand Prix', nameZh: '加拿大大奖赛', circuit: 'Circuit Gilles Villeneuve', country: 'Canada', countryZh: '加拿大', date: '2026-06-14', status: 'upcoming', flag: '🇨🇦' },
  { round: 11, name: 'Austrian Grand Prix', nameZh: '奥地利大奖赛', circuit: 'Red Bull Ring', country: 'Austria', countryZh: '奥地利', date: '2026-06-28', status: 'upcoming', flag: '🇦🇹' },
  { round: 12, name: 'British Grand Prix', nameZh: '英国大奖赛', circuit: 'Silverstone Circuit', country: 'United Kingdom', countryZh: '英国', date: '2026-07-05', status: 'upcoming', flag: '🇬🇧' },
  { round: 13, name: 'Belgian Grand Prix', nameZh: '比利时大奖赛', circuit: 'Circuit de Spa-Francorchamps', country: 'Belgium', countryZh: '比利时', date: '2026-07-26', status: 'upcoming', flag: '🇧🇪' },
  { round: 14, name: 'Hungarian Grand Prix', nameZh: '匈牙利大奖赛', circuit: 'Hungaroring', country: 'Hungary', countryZh: '匈牙利', date: '2026-08-02', status: 'upcoming', flag: '🇭🇺' },
  { round: 15, name: 'Dutch Grand Prix', nameZh: '荷兰大奖赛', circuit: 'Circuit Zandvoort', country: 'Netherlands', countryZh: '荷兰', date: '2026-08-30', status: 'upcoming', flag: '🇳🇱' },
  { round: 16, name: 'Italian Grand Prix', nameZh: '意大利大奖赛', circuit: 'Autodromo Nazionale Monza', country: 'Italy', countryZh: '意大利', date: '2026-09-06', status: 'upcoming', flag: '🇮🇹' },
  { round: 17, name: 'Azerbaijan Grand Prix', nameZh: '阿塞拜疆大奖赛', circuit: 'Baku City Circuit', country: 'Azerbaijan', countryZh: '阿塞拜疆', date: '2026-09-20', status: 'upcoming', flag: '🇦🇿' },
  { round: 18, name: 'Singapore Grand Prix', nameZh: '新加坡大奖赛', circuit: 'Marina Bay Street Circuit', country: 'Singapore', countryZh: '新加坡', date: '2026-10-04', status: 'upcoming', flag: '🇸🇬' },
  { round: 19, name: 'United States Grand Prix', nameZh: '美国大奖赛', circuit: 'Circuit of the Americas', country: 'USA', countryZh: '美国', date: '2026-10-18', status: 'upcoming', flag: '🇺🇸' },
  { round: 20, name: 'Mexico City Grand Prix', nameZh: '墨西哥城大奖赛', circuit: 'Autodromo Hermanos Rodriguez', country: 'Mexico', countryZh: '墨西哥', date: '2026-10-25', status: 'upcoming', flag: '🇲🇽' },
  { round: 21, name: 'Brazilian Grand Prix', nameZh: '巴西大奖赛', circuit: 'Autodromo Jose Carlos Pace', country: 'Brazil', countryZh: '巴西', date: '2026-11-08', status: 'upcoming', flag: '🇧🇷' },
  { round: 22, name: 'Las Vegas Grand Prix', nameZh: '拉斯维加斯大奖赛', circuit: 'Las Vegas Strip Circuit', country: 'USA', countryZh: '美国', date: '2026-11-21', status: 'upcoming', flag: '🇺🇸' },
  { round: 23, name: 'Qatar Grand Prix', nameZh: '卡塔尔大奖赛', circuit: 'Lusail International Circuit', country: 'Qatar', countryZh: '卡塔尔', date: '2026-11-29', status: 'upcoming', flag: '🇶🇦' },
  { round: 24, name: 'Abu Dhabi Grand Prix', nameZh: '阿布扎比大奖赛', circuit: 'Yas Marina Circuit', country: 'UAE', countryZh: '阿联酋', date: '2026-12-06', status: 'upcoming', flag: '🇦🇪' },
];
