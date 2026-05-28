const fs = require('fs');

async function main() {
  console.log('=== Attempting to fetch formula1.com ===');
  
  try {
    const res = await fetch('https://www.formula1.com/en/racing/2026/canada', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'identity'
      },
      signal: AbortSignal.timeout(15000)
    });
    
    console.log('Status:', res.status);
    console.log('Headers:', JSON.stringify(Object.fromEntries(res.headers.entries())));
    const text = await res.text();
    console.log('Body length:', text.length);
    
    fs.writeFileSync('/tmp/f1page.html', text);
    
    // Check for __NEXT_DATA__ or similar embedded JSON
    const nextDataMatch = text.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/);
    if (nextDataMatch) {
      console.log('\n=== Found __NEXT_DATA__ ===');
      console.log(nextDataMatch[1].substring(0, 5000));
    }
    
    // Check for other script data
    const scriptDataMatches = text.match(/window\.__[A-Z_]+__\s*=\s*(\{[\s\S]*?\});/g);
    if (scriptDataMatches) {
      console.log('\n=== Found window data ===');
      for (const m of scriptDataMatches.slice(0, 3)) {
        console.log(m.substring(0, 1000));
      }
    }
    
    // Print first and last portions
    console.log('\n=== FIRST 2000 chars ===');
    console.log(text.substring(0, 2000));
    console.log('\n=== LAST 1000 chars ===');
    console.log(text.substring(text.length - 1000));
    
  } catch(e) {
    console.log('FETCH ERROR:', e.message);
  }
}

main();
