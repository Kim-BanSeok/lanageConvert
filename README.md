# 🌐 나만의 언어 생성기 - My Language Generator

> 3D 스타일의 암호화 언어 생성 도구 | PWA 지원 | AI 자동 생성

[![Next.js](https://img.shields.io/badge/Next.js-15.0-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.3-blue)](https://react.dev/)
[![PWA](https://img.shields.io/badge/PWA-enabled-4285F4)](https://web.dev/progressive-web-apps/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

## ✨ 주요 기능

### 🔐 암호화/복호화
- 사용자 정의 규칙 기반 텍스트 변환
- 정확한 역순 복호화 지원
- 실시간 변환 미리보기

### 🤖 AI 언어 자동 생성
- **4가지 생성 모드**:
  1. 문자 기반 암호 언어
  2. 음절 기반 판타지 언어
  3. 접두사/접미사 규칙 언어
  4. 난수 기반 암호 언어
- 한국어/영어 모두 지원

### 🧠 단어 규칙 학습
- 원문과 변환문을 비교하여 자동 규칙 생성
- 단어 단위 매핑 학습

### ⚠️ 충돌 검사기
- 중복 규칙 자동 감지
- 순환 참조 검사
- 자동 수정 기능

### 🧪 테스트 번역기
- 규칙 테스트 및 변환 과정 시각화
- 단계별 변환 추적

### 🔊 TTS (음성 재생)
- Web Speech API 기반 음성 재생
- 다양한 음성 선택 가능

### 💾 프리셋 관리
- 언어 규칙 저장/불러오기
- 프리셋 공유 (URL 링크)
- JSON 파일로 내보내기/가져오기

### ✨ AI 이름 생성기
- 언어 특성 분석 기반 이름 자동 생성
- 브랜드 네이밍 지원

### 📱 PWA (Progressive Web App)
- 앱처럼 설치 가능
- 오프라인 지원
- 자동 캐싱

## 🚀 시작하기

### 설치

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 열기

### 빌드

```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm run start
```

## 📦 배포

### Vercel (추천)

```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel --prod
```

### Netlify

1. Netlify 대시보드에서 새 사이트 추가
2. Git 저장소 연결
3. 빌드 설정:
   - Build command: `npm run build`
   - Publish directory: `.next`

### 기타 플랫폼

Next.js를 지원하는 모든 플랫폼에서 배포 가능:
- AWS Amplify
- Cloudflare Pages
- Railway
- Render

## 🛠️ 기술 스택

- **Framework**: Next.js 15 (App Router)
- **UI**: React 18.3
- **스타일링**: TailwindCSS
- **PWA**: next-pwa
- **배포**: Vercel (권장)

## 📁 프로젝트 구조

```
my-language-generator/
├── app/
│   ├── components/      # React 컴포넌트
│   ├── gallery/         # 갤러리 페이지
│   ├── offline/         # 오프라인 페이지
│   ├── utils/           # 유틸리티 함수
│   └── page.js          # 메인 페이지
├── public/
│   ├── icons/           # PWA 아이콘
│   └── manifest.json    # PWA 매니페스트
└── scripts/             # 빌드 스크립트
```

## 🎨 주요 기능 상세

### 암호화/복호화
- 긴 단어 우선 적용으로 정확한 변환
- sessionStorage를 통한 복호화 규칙 추적
- 실시간 변환 결과 표시

### AI 언어 생성
- 4가지 알고리즘으로 다양한 언어 패턴 생성
- 한국어/영어 자동 감지 및 지원
- 실시간 미리보기

### 충돌 검사
- From 중복 감지
- To 중복 경고
- 순환 참조 감지
- 자기 참조 감지
- 원클릭 자동 수정

## 📱 PWA 기능

- ✅ 홈 화면에 설치 가능
- ✅ 오프라인에서도 작동
- ✅ 자동 업데이트
- ✅ 네이티브 앱 경험

자세한 내용은 [PWA-GUIDE.md](./PWA-GUIDE.md) 참고

## 🤝 기여하기

이슈나 Pull Request는 언제나 환영합니다!

## 📄 라이선스

MIT License - 자유롭게 사용, 수정, 배포 가능합니다.

## 🙏 감사의 말

- Next.js 팀
- React 팀
- TailwindCSS 팀
- next-pwa 커뮤니티

---

**Made with ❤️ using Next.js**

