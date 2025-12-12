# ✅ AdSense 검증 완료 가이드

## 🎯 현재 상태

### ✅ 이미 완료된 작업
1. **AdSense 코드 추가 완료**
   - `app/layout.js`에 AdSense 스크립트가 이미 설정되어 있습니다
   - 환경 변수 기반으로 동작하도록 구성되어 있습니다

2. **환경 변수 설정**
   - 로컬: `.env.local` 파일에 Publisher ID 설정 완료
   - 실제 ID: `ca-pub-7373977880685678`

## 📋 AdSense 검증 단계

### 1단계: 코드 확인 (이미 완료됨 ✅)

현재 `app/layout.js`에 다음 코드가 있습니다:

```jsx
{/* Google AdSense */}
{adSenseClientId && (
  <script
    async
    src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adSenseClientId}`}
    crossOrigin="anonymous"
  />
)}
```

이 코드는 환경 변수 `NEXT_PUBLIC_ADSENSE_CLIENT_ID`를 사용하여 자동으로 올바른 스크립트를 생성합니다.

### 2단계: Vercel 환경 변수 설정 (필수!)

**중요**: 로컬에서는 설정했지만, **Vercel 배포 사이트에도 환경 변수를 설정해야** AdSense가 작동합니다.

#### Vercel 환경 변수 설정 방법:

1. [Vercel 대시보드](https://vercel.com/dashboard) 접속
2. 프로젝트 선택 (`lanage-convert`)
3. **Settings** 탭 클릭
4. 왼쪽 메뉴에서 **Environment Variables** 선택
5. **Add New** 버튼 클릭
6. 다음 변수 추가:

   **변수 1:**
   - Key: `NEXT_PUBLIC_ADSENSE_CLIENT_ID`
   - Value: `ca-pub-7373977880685678`
   - Environment: ✅ Production, ✅ Preview, ✅ Development
   - **Add** 클릭

   **변수 2 (광고 단위 생성 후):**
   - Key: `NEXT_PUBLIC_ADSENSE_SLOT`
   - Value: `1234567890` (실제 Slot ID로 교체)
   - Environment: ✅ Production, ✅ Preview
   - **Add** 클릭

7. **Deployments** 탭으로 이동
8. 최신 배포 옆 **⋯** 메뉴 클릭
9. **Redeploy** 선택 (환경 변수 적용)

### 3단계: 배포 확인

배포 후 다음을 확인하세요:

1. **페이지 소스 확인**
   - 배포된 사이트에서 우클릭 > 소스 보기
   - `<head>` 태그 안에 다음 코드가 있는지 확인:
   ```html
   <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7373977880685678" crossorigin="anonymous"></script>
   ```

2. **브라우저 콘솔 확인**
   - F12 > Console 탭
   - AdSense 관련 에러가 없는지 확인

### 4단계: AdSense 검증 완료

1. **AdSense 대시보드로 돌아가기**
   - Google AdSense 페이지로 돌아갑니다

2. **"코드를 삽입했습니다" 체크박스 선택**
   - ✅ 코드를 삽입했습니다.

3. **"확인" 버튼 클릭**
   - 사이트 소유권 확인이 진행됩니다

4. **검토 요청**
   - 소유권 확인 후 "검토 요청" 버튼이 활성화됩니다
   - 클릭하여 사이트 검토를 요청합니다

## ⚠️ 중요 사항

### 1. Vercel 환경 변수 필수
- 로컬 `.env.local`만으로는 배포된 사이트에 적용되지 않습니다
- **반드시 Vercel 대시보드에서도 환경 변수를 설정해야 합니다**

### 2. 재배포 필요
- 환경 변수를 추가한 후 **반드시 재배포**해야 합니다
- 또는 새 커밋을 푸시하면 자동으로 재배포됩니다

### 3. 검증 시간
- 소유권 확인: 몇 분 ~ 몇 시간
- 사이트 검토: 보통 1-2주 소요

### 4. 광고 단위 생성
- 검토 승인 후 광고 단위를 생성하면 Slot ID를 받을 수 있습니다
- Slot ID를 받으면 `NEXT_PUBLIC_ADSENSE_SLOT` 환경 변수에 추가하세요

## 🔍 확인 방법

### 코드가 올바르게 삽입되었는지 확인:

1. **배포된 사이트 접속**
   - https://lanage-convert.vercel.app

2. **페이지 소스 보기**
   - 우클릭 > 소스 보기 (또는 Ctrl+U)
   - `<head>` 태그 안에 AdSense 스크립트 확인

3. **브라우저 개발자 도구**
   - F12 > Network 탭
   - `adsbygoogle.js` 파일이 로드되는지 확인

## 📝 체크리스트

- [x] 로컬 환경 변수 설정 (`.env.local`)
- [ ] **Vercel 환경 변수 설정** (중요!)
- [ ] Vercel 재배포
- [ ] 배포된 사이트에서 코드 확인
- [ ] AdSense 대시보드에서 "코드를 삽입했습니다" 체크
- [ ] "확인" 버튼 클릭
- [ ] 검토 요청

## 🚀 빠른 설정

Vercel CLI로 환경 변수 설정 (선택사항):

```bash
# Vercel CLI 설치
npm i -g vercel

# 환경 변수 추가
vercel env add NEXT_PUBLIC_ADSENSE_CLIENT_ID production
# 값 입력: ca-pub-7373977880685678

# 재배포
vercel --prod
```

---

**다음 단계**: Vercel 환경 변수 설정 후 재배포 → AdSense 검증 완료!

