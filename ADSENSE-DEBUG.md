# 🔍 AdSense 광고가 안 보이는 이유 및 해결 방법

## ✅ 코드 개선 완료

AdSense 컴포넌트를 개선하여 스크립트 로드 대기 로직을 추가했습니다.

## 🔍 광고가 안 보이는 주요 원인

### 1. AdSense 계정 승인 대기 ⏳
**가장 흔한 원인**
- AdSense 계정이 아직 승인되지 않았을 수 있습니다
- 승인까지 보통 **24-48시간** 소요됩니다
- **확인 방법**: AdSense 대시보드 > 사이트 > 승인 상태 확인

### 2. 광고 차단 프로그램 🚫
- 브라우저 확장 프로그램(AdBlock, uBlock 등)이 광고를 차단
- **해결**: 광고 차단 프로그램을 비활성화하고 테스트

### 3. Vercel 환경 변수 미설정 ⚙️
- 배포된 사이트에서 환경 변수가 설정되지 않았을 수 있음
- **확인 방법**: Vercel 대시보드 > Settings > Environment Variables
- **필수 변수**:
  - `NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-7373977880685678`
  - `NEXT_PUBLIC_ADSENSE_SLOT=4329998296`

### 4. 개발 환경 (localhost) 🏠
- 로컬 개발 환경에서는 광고가 표시되지 않을 수 있음
- **해결**: 배포된 사이트(https://lanage-convert.vercel.app)에서 확인

### 5. 브라우저 캐시 💾
- 오래된 캐시로 인해 광고가 표시되지 않을 수 있음
- **해결**: 
  - Ctrl+Shift+R (Windows/Linux)
  - Cmd+Shift+R (Mac)
  - 또는 브라우저 캐시 삭제

## 🛠️ 디버깅 방법

### 1. 브라우저 개발자 도구로 확인

1. **F12** 키를 눌러 개발자 도구 열기
2. **Console 탭** 확인
   - AdSense 관련 오류가 있는지 확인
   - `adsbygoogle` 관련 메시지 확인

3. **Elements 탭** 확인
   - `<head>` 태그에 AdSense 스크립트가 있는지 확인:
     ```html
     <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7373977880685678" crossorigin="anonymous"></script>
     ```
   - `<body>` 태그에 `<ins class="adsbygoogle">` 태그가 있는지 확인

4. **Network 탭** 확인
   - `adsbygoogle.js` 파일이 로드되는지 확인
   - `pagead2.googlesyndication.com` 도메인 요청 확인

### 2. AdSense 대시보드 확인

1. **사이트 상태 확인**
   - AdSense 대시보드 > 사이트
   - 승인 상태가 "준비됨"인지 확인

2. **광고 단위 확인**
   - 광고 단위 > 사이트_배너광고
   - Slot ID가 `4329998296`인지 확인

3. **수익 확인**
   - 수익 > 광고 단위
   - 광고가 표시되고 있는지 확인

### 3. 코드 확인

배포된 사이트에서 페이지 소스 보기:
1. https://lanage-convert.vercel.app 접속
2. 우클릭 > "페이지 소스 보기"
3. 다음 코드가 있는지 확인:
   ```html
   <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7373977880685678" crossorigin="anonymous"></script>
   ```
4. `<ins class="adsbygoogle"` 태그가 3개 있는지 확인

## 📋 체크리스트

광고가 안 보일 때 다음을 확인하세요:

- [ ] AdSense 계정이 승인되었는가?
- [ ] 광고 차단 프로그램이 비활성화되어 있는가?
- [ ] Vercel 환경 변수가 설정되어 있는가?
- [ ] 배포된 사이트에서 확인했는가? (localhost가 아님)
- [ ] 브라우저 캐시를 지웠는가?
- [ ] 개발자 도구 Console에 오류가 없는가?
- [ ] `<head>`에 AdSense 스크립트가 있는가?
- [ ] `<body>`에 `<ins class="adsbygoogle">` 태그가 있는가?

## 🚀 빠른 해결 방법

1. **Vercel 환경 변수 확인 및 설정**
   ```bash
   # Vercel 대시보드에서 확인
   NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-7373977880685678
   NEXT_PUBLIC_ADSENSE_SLOT=4329998296
   ```

2. **재배포**
   - 환경 변수 설정 후 자동 재배포 대기 (1-3분)

3. **브라우저에서 확인**
   - 광고 차단 프로그램 비활성화
   - 시크릿 모드에서 테스트
   - 다른 브라우저에서 테스트

4. **AdSense 대시보드 확인**
   - 사이트 승인 상태 확인
   - 광고 단위 상태 확인

## ⏰ 예상 시간

- **AdSense 승인**: 24-48시간
- **광고 표시 시작**: 승인 후 몇 분 ~ 1시간
- **Vercel 재배포**: 1-3분

## 📞 추가 도움

여전히 광고가 보이지 않으면:
1. 브라우저 개발자 도구 Console 스크린샷
2. AdSense 대시보드 스크린샷
3. 페이지 소스의 `<head>` 부분 스크린샷

이 정보를 공유해주시면 더 정확한 진단이 가능합니다.

