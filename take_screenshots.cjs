const { execSync } = require('child_process');
const chromePath = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';

try {
  console.log('Taking screenshot of live maanwin2.com...');
  execSync(`"${chromePath}" --headless=new --window-size=430,932 --screenshot=maanwin_live_shot.png --virtual-time-budget=10000 https://maanwin2.com/`);
  console.log('Saved maanwin_live_shot.png');

  console.log('Taking screenshot of neetadevi.github.io/Maanwin/...');
  execSync(`"${chromePath}" --headless=new --window-size=430,932 --screenshot=neetadevi_gh_shot.png --virtual-time-budget=10000 https://neetadevi.github.io/Maanwin/`);
  console.log('Saved neetadevi_gh_shot.png');
} catch (e) {
  console.error('Error:', e.message);
}
