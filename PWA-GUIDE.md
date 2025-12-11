# 📱 PWA (Progressive Web App) 설치 가이드

## 🎉 완성된 기능

"나만의 언어 생성기"가 이제 **PWA(Progressive Web App)**로 업그레이드되었습니다!

### ✅ 구현된 PWA 기능

1. **📱 앱처럼 설치 가능**
   - 스마트폰 홈 화면에 아이콘 추가
   - Windows/Mac에서 독립 앱으로 설치
   - 전체화면 모드로 실행

2. **🔌 오프라인 지원**
   - 인터넷 없이도 기본 기능 사용 가능
   - 자동 캐싱으로 빠른 로딩
   - 오프라인 전용 페이지 제공

3. **⚡ 성능 최적화**
   - Service Worker 기반 자동 캐싱
   - 정적 리소스 미리 로드
   - 네트워크 우선 전략으로 항상 최신 데이터

4. **🎨 네이티브 앱 경험**
   - 커스텀 아이콘 (10개 크기)
   - 브랜드 컬러 테마
   - 스플래시 화면
   - 설치 프롬프트 자동 표시

---

## 🚀 설치 방법

### 📱 **Android (Chrome)**

1. 크롬 브라우저로 사이트 접속
2. 화면 하단에 "앱 설치" 프롬프트가 자동으로 표시됨
3. 또는 메뉴(⋮) → "앱 설치" 클릭
4. "설치" 버튼 클릭
5. 홈 화면에 아이콘이 추가됨 ✅

### 🍎 **iOS (Safari)**

1. Safari 브라우저로 사이트 접속
2. 화면 하단의 "공유" 버튼 (□↑) 클릭
3. "홈 화면에 추가" 선택
4. 이름 확인 후 "추가" 클릭
5. 홈 화면에 아이콘이 추가됨 ✅

### 💻 **Windows/Mac (Chrome/Edge)**

1. 브라우저로 사이트 접속
2. 주소창 오른쪽의 "설치" 아이콘 (⊕) 클릭
3. 또는 메뉴 → "앱 설치" 선택
4. "설치" 버튼 클릭
5. 독립 앱 창으로 실행됨 ✅

---

## 🧪 PWA 작동 확인

### Chrome DevTools에서 확인

1. **F12** 또는 **우클릭 → 검사**
2. **Application** 탭 선택
3. 왼쪽 메뉴에서 확인 항목:
   - **Manifest**: 앱 정보 확인
   - **Service Workers**: 등록 상태 확인
   - **Storage**: 캐시 데이터 확인

### Lighthouse로 PWA 점수 확인

1. Chrome DevTools → **Lighthouse** 탭
2. **Progressive Web App** 체크
3. **Analyze page load** 클릭
4. 모든 항목이 초록색이면 성공! ✅

---

## 📊 PWA 기능 상세

### 🔹 Service Worker

- **경로**: `/sw.js`
- **캐싱 전략**: NetworkFirst (항상 최신 데이터 우선)
- **캐시 항목**:
  - 정적 파일 (JS, CSS)
  - 이미지 및 아이콘
  - HTML 페이지
  - API 응답 (200개 제한)

### 🔹 Manifest 설정

```json
{
  "name": "나만의 언어 생성기",
  "short_name": "언어 생성기",
  "display": "standalone",
  "theme_color": "#60a5fa",
  "background_color": "#0f172a",
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192" },
    { "src": "/icons/icon-512.png", "sizes": "512x512" }
  ]
}
```

### 🔹 오프라인 기능

**사용 가능한 기능:**
- ✅ 언어 규칙 추가/수정/삭제
- ✅ 텍스트 암호화/복호화
- ✅ 저장된 프리셋 사용
- ✅ AI 언어 자동 생성
- ✅ 테스트 번역기

**제한되는 기능:**
- ⚠️ 프리셋 공유 (링크 생성)
- ⚠️ 음성 재생 (일부 브라우저)

---

## 🎨 아이콘 정보

### 생성된 아이콘 크기

- **72×72** - 작은 화면용
- **96×96** - 중간 화면용
- **128×128** - 일반 화면용
- **144×144** - 고해상도용
- **152×152** - iOS 터치 아이콘
- **192×192** - Android 표준
- **384×384** - 대형 화면용
- **512×512** - 최고 해상도
- **Maskable 아이콘** (192, 512) - Android 적응형

### 디자인 특징

- **A → 가** 변환 심볼 (브랜드 정체성)
- 3D 그라디언트 효과
- 다크 배경 + 밝은 아이콘
- 외곽 빛 효과

---

## 🔧 개발자 정보

### 파일 구조

```
public/
├── manifest.json          # PWA 매니페스트
├── sw.js                  # Service Worker (자동 생성)
├── workbox-*.js           # Workbox 라이브러리
└── icons/                 # 앱 아이콘
    ├── icon-192.png
    ├── icon-512.png
    └── ... (10개 크기)

app/
├── layout.js              # PWA 메타데이터
├── components/
│   └── PWAInstallPrompt.js  # 설치 프롬프트
└── offline/
    └── page.js            # 오프라인 페이지
```

### 빌드 명령어

```bash
# 개발 모드 (PWA 비활성화)
npm run dev

# 프로덕션 빌드 (PWA 활성화)
npm run build
npm run start

# 아이콘 재생성
node scripts/generate-icons.js
node scripts/svg-to-png.js
```

### next.config.js 설정

```javascript
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});
```

---

## 🌐 브라우저 지원

| 브라우저 | PWA 지원 | 설치 가능 |
|---------|---------|----------|
| Chrome (Android) | ✅ | ✅ |
| Chrome (Desktop) | ✅ | ✅ |
| Edge | ✅ | ✅ |
| Safari (iOS 16.4+) | ✅ | ✅ |
| Safari (Mac) | ⚠️ 제한적 | ❌ |
| Firefox | ⚠️ 제한적 | ❌ |

---

## ❓ FAQ

### Q1: PWA가 설치되었는지 어떻게 확인하나요?

**A:** 
- Android: 앱 서랍에서 "언어 생성기" 아이콘 확인
- iOS: 홈 화면에서 아이콘 확인
- Desktop: 시작 메뉴 또는 애플리케이션 폴더 확인

### Q2: 오프라인에서 모든 기능이 작동하나요?

**A:** 대부분의 핵심 기능(암호화, 복호화, 규칙 관리)은 오프라인에서 작동합니다. 
단, 프리셋 공유 링크 생성은 온라인 연결이 필요합니다.

### Q3: 설치 프롬프트가 안 뜨는데요?

**A:** 
- 이미 설치되었거나 24시간 이내에 닫은 경우 표시되지 않습니다.
- 수동 설치: 브라우저 메뉴 → "앱 설치" 선택

### Q4: 캐시를 지우려면?

**A:**
- Chrome DevTools → Application → Storage → Clear site data
- 또는 브라우저 설정에서 사이트 데이터 삭제

### Q5: 업데이트는 어떻게 되나요?

**A:** 
Service Worker가 자동으로 새 버전을 감지하고 백그라운드에서 업데이트합니다.
앱을 닫았다가 다시 열면 최신 버전이 적용됩니다.

---

## 🎯 다음 단계

PWA가 완성되었습니다! 이제 다음 기능도 추가할 수 있습니다:

1. **푸시 알림** - 새로운 언어 프리셋 공유 알림
2. **백그라운드 동기화** - 오프라인에서 작성한 내용 자동 동기화
3. **웹 공유 API** - 네이티브 공유 기능 통합
4. **자동 업데이트 알림** - 새 버전 출시 시 사용자에게 알림
5. **앱 숏컷** - 홈 화면 아이콘 롱프레스로 빠른 기능 접근

---

## 📞 문의 및 지원

PWA 관련 문제가 있으면:
1. Chrome DevTools 콘솔 확인
2. Lighthouse PWA 점수 확인
3. Service Worker 등록 상태 확인

**PWA 구현 완료! 🎉**

