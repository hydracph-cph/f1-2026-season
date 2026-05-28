import { writeFileSync } from 'fs';

async function main() {
  const url = 'https://www.formula1.com/en/racing/2026/canada';
  console.log('Fetching: ' + url);
  
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.9'
    }
  });
  
  const status = res.status;
  const text = await res.text();
  
  const result = {
    status,
    length: text.length,
    headers: Object.fromEntries(res.headers.entries()),
    hasNextData: text.includes('__NEXT_DATA__'),
    hasWindowData: text.includes('window.__'),
    first3000: text.substring(0, 3000),
    last1000: text.substring(Math.max(0, text.length - 1000))
  };
  
  writeFileSync('/tmp/f1result.json', JSON.stringify(result, null, 2));
  writeFileSync('/tmp/f1page.html', text);
  console.log('Done. Status=' + status + ' Length=' + text.length);
}

main().catch(e => {
  writeFileSync('/tmp/f1result.json', JSON.stringify({ error: e.message }));
  console.log('ERROR: ' + e.message);
});
