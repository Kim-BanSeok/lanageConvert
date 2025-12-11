/**
 * PWA 아이콘 자동 생성 스크립트
 * Node.js에서 실행하여 필요한 모든 아이콘 크기를 생성합니다.
 */

const fs = require('fs');
const path = require('path');

// 아이콘 디렉토리 생성
const iconsDir = path.join(__dirname, '../public/icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// SVG 아이콘 템플릿 (언어 생성기 로고)
function generateIconSVG(size, maskable = false) {
  const padding = maskable ? size * 0.1 : 0;
  const innerSize = size - (padding * 2);
  const center = size / 2;
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <!-- 배경 -->
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1e293b;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#0f172a;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="iconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#60a5fa;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#a855f7;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#22c55e;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- 배경 원 -->
  <circle cx="${center}" cy="${center}" r="${center}" fill="url(#bgGrad)"/>
  
  <!-- 메인 로고: A → 가 -->
  <g transform="translate(${padding}, ${padding})">
    <!-- 글자 "A" -->
    <text x="${innerSize * 0.25}" y="${innerSize * 0.45}" 
          font-family="Arial, sans-serif" 
          font-size="${innerSize * 0.3}" 
          font-weight="bold" 
          fill="url(#iconGrad)"
          text-anchor="middle">A</text>
    
    <!-- 화살표 -->
    <path d="M ${innerSize * 0.38} ${innerSize * 0.35} 
             L ${innerSize * 0.62} ${innerSize * 0.35}
             L ${innerSize * 0.58} ${innerSize * 0.3}
             M ${innerSize * 0.62} ${innerSize * 0.35}
             L ${innerSize * 0.58} ${innerSize * 0.4}"
          stroke="url(#iconGrad)" 
          stroke-width="${innerSize * 0.03}" 
          fill="none"
          stroke-linecap="round"/>
    
    <!-- 글자 "가" -->
    <text x="${innerSize * 0.75}" y="${innerSize * 0.45}" 
          font-family="AppleGothic, sans-serif" 
          font-size="${innerSize * 0.3}" 
          font-weight="bold" 
          fill="url(#iconGrad)"
          text-anchor="middle">가</text>
    
    <!-- 하단 텍스트 -->
    <text x="${innerSize * 0.5}" y="${innerSize * 0.75}" 
          font-family="Arial, sans-serif" 
          font-size="${innerSize * 0.12}" 
          font-weight="600" 
          fill="#e2e8f0"
          text-anchor="middle"
          opacity="0.9">언어생성</text>
  </g>
  
  <!-- 외곽 빛 효과 -->
  <circle cx="${center}" cy="${center}" r="${center - 2}" 
          fill="none" 
          stroke="url(#iconGrad)" 
          stroke-width="2" 
          opacity="0.3"/>
</svg>`;
}

// SVG를 PNG로 변환하는 안내 (실제 변환은 별도 도구 필요)
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

console.log('🎨 PWA 아이콘 SVG 생성 중...\n');

sizes.forEach(size => {
  const svgContent = generateIconSVG(size, false);
  const svgPath = path.join(iconsDir, `icon-${size}.svg`);
  fs.writeFileSync(svgPath, svgContent);
  console.log(`✅ 생성됨: icon-${size}.svg`);
});

// Maskable 아이콘 생성
[192, 512].forEach(size => {
  const svgContent = generateIconSVG(size, true);
  const svgPath = path.join(iconsDir, `icon-maskable-${size}.svg`);
  fs.writeFileSync(svgPath, svgContent);
  console.log(`✅ 생성됨: icon-maskable-${size}.svg`);
});

console.log('\n✨ SVG 아이콘 생성 완료!\n');
console.log('📌 다음 단계:');
console.log('1. 온라인 변환 도구 사용: https://cloudconvert.com/svg-to-png');
console.log('2. 또는 ImageMagick 설치: brew install imagemagick');
console.log('3. 변환 명령어: npm run convert-icons\n');

// ImageMagick 변환 스크립트도 생성
const convertScript = '#!/bin/bash\n' +
'# SVG를 PNG로 변환하는 스크립트\n\n' +
'cd "$(dirname "$0")/../public/icons"\n\n' +
'echo "🔄 SVG를 PNG로 변환 중..."\n\n' +
'for file in *.svg; do\n' +
'  if [[ -f "$file" ]]; then\n' +
'    filename="${file%.svg}"\n' +
'    echo "변환: $filename.svg → $filename.png"\n' +
'    convert "$file" "$filename.png"\n' +
'  fi\n' +
'done\n\n' +
'echo "✅ 변환 완료!"\n';

const convertScriptPath = path.join(__dirname, 'convert-icons.sh');
fs.writeFileSync(convertScriptPath, convertScript);
fs.chmodSync(convertScriptPath, '755');

console.log('💡 자동 변환 스크립트도 생성됨: scripts/convert-icons.sh\n');

