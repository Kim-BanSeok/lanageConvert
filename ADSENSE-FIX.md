# 🔧 AdSense 검증 오류 해결 방법

## 문제 원인

AdSense 크롤러가 사이트를 확인할 수 없는 이유:
1. **조건부 렌더링**: 환경 변수가 없으면 스크립트가 렌더링되지 않음
2. **서버 사이드 렌더링**: Next.js App Router에서 환경 변수가 제대로 전달되지 않을 수 있음
3. **재배포 지연**: 환경 변수 추가 후 재배포가 완료되지 않았을 수 있음

## 해결 방법

### ✅ 수정 완료

`app/layout.js`를 수정하여:
- 조건부 렌더링 제거
- AdSense 스크립트를 항상 렌더링하도록 변경
- 환경 변수가 없어도 기본값(`ca-pub-7373977880685678`) 사용

### 변경 사항

**이전:**
```jsx
{adSenseClientId && (
  <script ... />
)}
```

**수정 후:**
```jsx
<script
  async
  src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adSenseClientId}`}
  crossOrigin="anonymous"
/>
```

## 다음 단계

### 1. 재배포 대기
- GitHub에 푸시했으므로 Vercel이 자동으로 재배포합니다
- 배포 완료까지 1-3분 소요

### 2. 배포 확인
배포 완료 후:
1. https://lanage-convert.vercel.app 접속
2. 우클릭 > 소스 보기
3. `<head>` 태그 안에 다음 코드 확인:
   ```html
   <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7373977880685678" crossorigin="anonymous"></script>
   ```

### 3. AdSense 재검증
1. AdSense 대시보드로 돌아가기
2. "코드를 삽입했습니다" 체크박스 선택
3. "확인" 버튼 클릭
4. 몇 분 대기 후 다시 시도

## 추가 확인 사항

### Vercel 환경 변수 확인
1. Vercel 대시보드 > Settings > Environment Variables
2. `NEXT_PUBLIC_ADSENSE_CLIENT_ID`가 설정되어 있는지 확인
3. 값이 `ca-pub-7373977880685678`인지 확인

### robots.txt 확인
- `/public/robots.txt`가 크롤러를 차단하지 않는지 확인
- 현재 설정: `Allow: /` (정상)

### 캐시 문제
- 브라우저 캐시를 지우고 다시 확인
- 시크릿 모드에서 확인
- 또는 몇 시간 후 다시 시도

## 대안 방법

만약 여전히 작동하지 않는다면:

### 방법 1: 메타 태그 방식
AdSense 대시보드에서 "메타 태그" 옵션 선택

### 방법 2: Ads.txt 파일
`public/ads.txt` 파일 생성:
```
google.com, pub-7373977880685678, DIRECT, f08c47fec0942fa0
```

## 참고

- AdSense 검증은 보통 몇 분~몇 시간 소요됩니다
- 크롤러가 사이트를 방문하는 데 시간이 걸릴 수 있습니다
- 재배포 후 최소 10-15분 대기 후 다시 시도하는 것을 권장합니다

