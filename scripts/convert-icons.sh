#!/bin/bash
# SVG를 PNG로 변환하는 스크립트

cd "$(dirname "$0")/../public/icons"

echo "🔄 SVG를 PNG로 변환 중..."

for file in *.svg; do
  if [[ -f "$file" ]]; then
    filename="${file%.svg}"
    echo "변환: $filename.svg → $filename.png"
    convert "$file" "$filename.png"
  fi
done

echo "✅ 변환 완료!"
