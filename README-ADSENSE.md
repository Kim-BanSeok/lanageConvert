# Google AdSense 설정 가이드

## 1. AdSense 계정 설정

1. [Google AdSense](https://www.google.com/adsense/)에 가입 및 로그인
2. 사이트 추가 및 승인 대기
3. 승인 후 광고 단위 생성

## 2. 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 아래 내용을 추가하세요:

```env
# AdSense Publisher ID (ca-pub-로 시작)
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXX

# AdSense 광고 단위 Slot ID
NEXT_PUBLIC_ADSENSE_SLOT=1234567890
```

## 3. 광고 배치 위치

현재 광고는 다음 위치에 배치되어 있습니다:
- 테스트 번역기 아래
- 규칙 편집 카드 위

## 4. 광고 스타일

광고는 3D 카드 스타일로 감싸져 있어 앱의 디자인과 일관성을 유지합니다.

## 5. 주의사항

- **PWA Standalone 모드**: 설치된 PWA에서는 광고가 제한될 수 있습니다 (Chrome 정책)
- **개발 환경**: 로컬 개발 환경에서는 광고가 표시되지 않을 수 있습니다
- **승인 전**: AdSense 승인 전까지는 광고가 표시되지 않습니다

## 6. 추가 광고 단위

더 많은 광고를 추가하려면 `app/page.js`에서 `<Adsense />` 컴포넌트를 추가하세요:

```jsx
<Adsense 
  slot="다른_SLOT_ID" 
  style={{ display: "block", minHeight: "90px" }}
/>
```

## 7. 자동 광고

자동 광고를 사용하려면 AdSense 대시보드에서 "자동 광고"를 활성화하세요.
별도의 코드 수정 없이 자동으로 광고가 표시됩니다.

