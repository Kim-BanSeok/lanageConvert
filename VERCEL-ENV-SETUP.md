# 🚀 Vercel 환경 변수 설정 가이드

## 📋 Vercel 대시보드에서 환경 변수 설정하기

### 1. Vercel 프로젝트 접속
1. [Vercel 대시보드](https://vercel.com/dashboard)에 로그인
2. 프로젝트 선택 (my-language-generator)

### 2. 환경 변수 추가
1. **Settings** 탭 클릭
2. 왼쪽 메뉴에서 **Environment Variables** 선택
3. **Add New** 버튼 클릭

### 3. AdSense 환경 변수 추가

#### 첫 번째 변수 추가:
- **Key**: `NEXT_PUBLIC_ADSENSE_CLIENT_ID`
- **Value**: `ca-pub-XXXXXXXXXXXX` (실제 AdSense Publisher ID)
- **Environment**: 
  - ✅ Production
  - ✅ Preview
  - ✅ Development (선택사항)
- **Add** 클릭

#### 두 번째 변수 추가:
- **Key**: `NEXT_PUBLIC_ADSENSE_SLOT`
- **Value**: `1234567890` (실제 AdSense Slot ID)
- **Environment**: 
  - ✅ Production
  - ✅ Preview
  - ✅ Development (선택사항)
- **Add** 클릭

### 4. 배포 재실행
환경 변수를 추가한 후:
1. **Deployments** 탭으로 이동
2. 최신 배포 옆 **⋯** 메뉴 클릭
3. **Redeploy** 선택
4. 또는 새 커밋을 푸시하면 자동으로 재배포됨

## 🔍 AdSense ID 찾는 방법

### Publisher ID (Client ID)
1. [Google AdSense](https://www.google.com/adsense/) 로그인
2. **사이트** 메뉴 선택
3. 사이트 목록에서 사이트 선택
4. **사이트 설정** 또는 **코드 가져오기** 클릭
5. `ca-pub-`로 시작하는 ID 확인

### Slot ID
1. AdSense 대시보드에서 **광고** 메뉴 선택
2. **광고 단위** 클릭
3. 광고 단위 생성 또는 기존 단위 선택
4. 광고 단위 코드에서 `data-ad-slot="1234567890"` 부분의 숫자 확인

## ✅ 확인 방법

배포 후 다음을 확인하세요:

1. **브라우저 콘솔 확인**
   - F12 > Console 탭
   - AdSense 스크립트 로드 확인
   - 에러 메시지 확인

2. **페이지 소스 확인**
   - 페이지 우클릭 > 소스 보기
   - `adsbygoogle.js` 스크립트 태그 확인

3. **광고 표시 확인**
   - 광고가 표시되는지 확인
   - 승인 전에는 광고가 표시되지 않을 수 있음

## ⚠️ 주의사항

- **승인 전**: AdSense 승인 전까지는 광고가 표시되지 않습니다
- **개발 환경**: 로컬 개발 환경에서는 환경 변수가 없어도 에러 없이 작동합니다
- **PWA Standalone**: 설치된 PWA에서는 광고가 제한될 수 있습니다 (Chrome 정책)

## 📝 환경 변수 목록

| 변수명 | 설명 | 예시 |
|--------|------|------|
| `NEXT_PUBLIC_ADSENSE_CLIENT_ID` | AdSense Publisher ID | `ca-pub-1234567890123456` |
| `NEXT_PUBLIC_ADSENSE_SLOT` | 광고 단위 Slot ID | `1234567890` |

## 🔗 관련 문서

- [README-ADSENSE.md](./README-ADSENSE.md) - AdSense 상세 설정 가이드
- [DEPLOYMENT-CHECKLIST.md](./DEPLOYMENT-CHECKLIST.md) - 배포 체크리스트

