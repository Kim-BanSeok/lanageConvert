# 🚀 배포 가이드

## Git 저장소에 올리기

### 1. Git 초기화

```bash
# Git 저장소 초기화
git init

# 모든 파일 추가
git add .

# 첫 커밋
git commit -m "Initial commit: 나만의 언어 생성기"
```

### 2. GitHub에 저장소 생성

1. [GitHub](https://github.com)에 로그인
2. "New repository" 클릭
3. 저장소 이름 입력 (예: `my-language-generator`)
4. Public 또는 Private 선택
5. "Create repository" 클릭

### 3. 원격 저장소 연결 및 푸시

```bash
# 원격 저장소 추가 (YOUR_USERNAME과 REPO_NAME을 실제 값으로 변경)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# 메인 브랜치로 이름 변경 (필요시)
git branch -M main

# 푸시
git push -u origin main
```

## 배포 플랫폼별 가이드

### 🌟 Vercel (가장 쉬움, 추천)

#### 방법 1: GitHub 연동 (자동 배포)

1. [Vercel](https://vercel.com)에 로그인
2. "Add New Project" 클릭
3. GitHub 저장소 선택
4. 자동으로 설정 감지됨
5. "Deploy" 클릭
6. 완료! 🎉

#### 방법 2: Vercel CLI

```bash
# Vercel CLI 설치
npm install -g vercel

# 로그인
vercel login

# 배포
vercel --prod
```

**장점:**
- ✅ 무료
- ✅ 자동 HTTPS
- ✅ 자동 배포 (Git push 시)
- ✅ Next.js 최적화
- ✅ 글로벌 CDN

---

### Netlify

1. [Netlify](https://netlify.com)에 로그인
2. "Add new site" → "Import an existing project"
3. GitHub 저장소 선택
4. 빌드 설정:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
5. "Deploy site" 클릭

**장점:**
- ✅ 무료
- ✅ 자동 HTTPS
- ✅ 폼 처리 지원
- ✅ 서버리스 함수 지원

---

### Cloudflare Pages

1. [Cloudflare Pages](https://pages.cloudflare.com)에 로그인
2. "Create a project" 클릭
3. GitHub 저장소 연결
4. 빌드 설정:
   - **Framework preset**: Next.js
   - **Build command**: `npm run build`
   - **Build output directory**: `.next`
5. "Save and Deploy" 클릭

**장점:**
- ✅ 무료
- ✅ 빠른 CDN
- ✅ 무제한 대역폭

---

## 환경 변수 설정 (필요시)

현재 프로젝트는 환경 변수가 필요 없지만, 향후 추가할 경우:

### Vercel
1. 프로젝트 설정 → Environment Variables
2. 변수 추가

### Netlify
1. Site settings → Environment variables
2. 변수 추가

## 커스텀 도메인 연결

### Vercel
1. 프로젝트 설정 → Domains
2. 도메인 추가
3. DNS 설정 안내 따르기

### Netlify
1. Site settings → Domain management
2. "Add custom domain"
3. DNS 설정 안내 따르기

## 자동 배포 설정

### GitHub Actions (선택사항)

`.github/workflows/deploy.yml` 파일 생성:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      # 배포 스크립트 추가
```

## 배포 후 확인사항

1. ✅ 사이트가 정상적으로 로드되는지 확인
2. ✅ PWA 설치 프롬프트가 나타나는지 확인
3. ✅ 모든 기능이 정상 작동하는지 테스트
4. ✅ HTTPS가 적용되었는지 확인
5. ✅ Lighthouse로 PWA 점수 확인

## 문제 해결

### 빌드 실패 시

```bash
# 로컬에서 빌드 테스트
npm run build

# 에러 확인 및 수정
```

### PWA가 작동하지 않을 때

1. `next.config.js`에서 PWA 설정 확인
2. `manifest.json` 경로 확인
3. Service Worker가 생성되었는지 확인 (`public/sw.js`)

### 환경 변수 문제

- `.env.local` 파일은 Git에 올리지 않음 (`.gitignore`에 포함됨)
- 배포 플랫폼에서 환경 변수 설정 필요

---

**배포 완료 후 공유하세요! 🎉**

