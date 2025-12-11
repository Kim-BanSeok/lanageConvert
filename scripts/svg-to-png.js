/**
 * SVG를 PNG로 변환 (sharp 라이브러리 사용)
 */

const fs = require('fs');
const path = require('path');

// sharp가 설치되어 있지 않으면 안내 메시지 출력
try {
  const sharp = require('sharp');
  
  const iconsDir = path.join(__dirname, '../public/icons');
  const svgFiles = fs.readdirSync(iconsDir).filter(f => f.endsWith('.svg'));

  console.log(`🔄 ${svgFiles.length}개의 SVG 파일을 PNG로 변환 중...\n`);

  Promise.all(
    svgFiles.map(async (file) => {
      const svgPath = path.join(iconsDir, file);
      const pngPath = svgPath.replace('.svg', '.png');
      
      try {
        await sharp(svgPath)
          .png()
          .toFile(pngPath);
        
        console.log(`✅ ${file} → ${file.replace('.svg', '.png')}`);
      } catch (error) {
        console.error(`❌ ${file} 변환 실패:`, error.message);
      }
    })
  ).then(() => {
    console.log('\n🎉 모든 아이콘 변환 완료!');
  });

} catch (error) {
  console.log('📦 sharp 라이브러리가 설치되지 않았습니다.');
  console.log('\n설치 방법:');
  console.log('  npm install sharp --save-dev\n');
  console.log('또는 온라인 변환 도구를 사용하세요:');
  console.log('  https://cloudconvert.com/svg-to-png');
  console.log('  https://svgtopng.com/\n');
}

