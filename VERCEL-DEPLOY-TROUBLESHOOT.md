# 🚀 Vercel 배포 문제 해결 가이드

## 🚨 증상

- GitHub에 푸시했지만 Vercel이 자동 배포 안 함
- Deployments 목록에 새 배포가 안 나타남
- 37분 전 이후로 배포 중단

## ✅ 확인: 토큰/제한 문제 아님

### Vercel 무료 플랜 (Hobby) 제한

| 항목 | 제한 | 걱정 필요? |
|------|------|-----------|
| 배포 횟수 | 사실상 무제한 | ✅ No |
| 빌드 시간 | 6,000분/월 | ✅ No |
| 대역폭 | 100GB/월 | ✅ No |
| 동시 빌드 | 1개 | ✅ No |

**→ 배포 횟수 제한이나 토큰 제한 없음!**

## 🔍 실제 원인

### 1. GitHub Webhook 문제

**증상:**
- GitHub 푸시 → Vercel이 알림 못 받음
- 배포 자동 트리거 안 됨

**원인:**
- 일시적인 네트워크 문제
- GitHub Webhook 전송 실패
- Vercel Webhook 수신 실패

### 2. 자동 배포 설정 문제

**확인 필요:**
- Production Branch 설정
- Auto Deploy 활성화 여부
- Deploy Hooks 상태

## 🛠️ 해결 방법

### 방법 1: Redeploy (⭐ 가장 빠름!)

**Vercel Dashboard에서:**

1. 프로젝트 → **Deployments** 탭
2. 최신 배포 (37분 전) 찾기
3. 오른쪽 **점 3개 (⋮)** 클릭
4. **"Redeploy"** 선택
5. 확인 팝업에서 **"Redeploy"** 다시 클릭

**결과:**
- ✅ 최신 커밋 자동으로 가져옴
- ✅ 모든 변경사항 반영됨
- ⏰ 2-3분 소요

---

### 방법 2: 빈 커밋으로 강제 트리거

**터미널에서:**

```bash
cd /Users/gimbanseog/Desktop/sideproject/myLanguage

# 빈 커밋 생성 (변경사항 없이)
git commit --allow-empty -m "chore: trigger vercel deploy"

# GitHub에 푸시
git push origin main
```

**결과:**
- GitHub에 새 커밋 추가
- Webhook 다시 트리거
- Vercel 자동 배포 시작

---

### 방법 3: GitHub Webhook 수동 재발송

**GitHub Repository에서:**

1. **Settings** → **Webhooks** 클릭
2. Vercel Webhook 찾기 (예: `hooks.vercel.com`)
3. Webhook 클릭
4. **"Recent Deliveries"** 탭
5. 가장 최근 delivery 클릭
6. **"Redeliver"** 버튼 클릭

**결과:**
- Webhook 다시 전송
- Vercel이 재인식
- 자동 배포 시작

---

### 방법 4: Git Integration 재연결

**Vercel Dashboard에서:**

1. 프로젝트 → **Settings** 탭
2. **Git** 메뉴
3. **"Disconnect"** 클릭 (일시적)
4. **"Connect Git Repository"** 다시 클릭
5. GitHub 선택 → Repository 재선택

**주의:** 설정이 초기화될 수 있음!

---

## 🔧 설정 확인

### Vercel 프로젝트 설정

**Settings → Git 에서 확인:**

```
✅ Connected: GitHub
✅ Repository: Kim-BanSeok/lanageConvert
✅ Production Branch: main
✅ Auto Deploy: Enabled
```

**Production Branch 설정:**
- Branch: `main`
- ✅ Automatically deploy when pushing to branch

**Deploy Hooks:**
- 최소 1개 이상의 Deploy Hook 활성화
- Webhook URL 확인

---

### GitHub Webhook 확인

**Repository → Settings → Webhooks:**

1. Vercel Webhook 찾기
2. **Recent Deliveries** 확인:
   - ✅ Response: 200 (성공)
   - ❌ Response: 4xx, 5xx (실패)

**실패 시:**
- **"Redeliver"** 버튼으로 재전송
- 또는 Vercel에서 Webhook 재생성

---

## 📊 정상 작동 확인

### 배포 후 확인사항

**1. Deployments 탭:**
```
🆕 새 배포 나타남
✅ Status: Building → Ready
📝 Commit: 8249fb0 (최신)
⏰ 시간: 방금 전
```

**2. 사이트 접속:**
```
https://lanage-convert.vercel.app
```
- 모바일 → 도구 → 규칙 통계
- ✅ 오류 없이 작동

**3. Git 로그 확인:**
```bash
git log -1 --oneline
# 배포된 커밋이 최신 커밋과 일치하는지 확인
```

---

## 🔄 자동 배포 재활성화

### Redeploy 후 자동 배포 복구

보통 수동 Redeploy 한 번 하면:
- ✅ GitHub Webhook 다시 활성화
- ✅ 다음 푸시부터 자동 배포됨
- ✅ 별도 설정 필요 없음

### 테스트 방법

**작은 변경사항으로 테스트:**

```bash
# README 파일 수정
echo "\n<!-- test -->" >> README.md

# 커밋 및 푸시
git add README.md
git commit -m "test: vercel auto deploy"
git push origin main
```

**확인:**
- 1-2분 내에 Vercel Deployments에 새 배포 나타나야 함
- ✅ 나타나면: 자동 배포 복구됨!
- ❌ 안 나타나면: 설정 재확인 필요

---

## 🚨 여전히 안 될 때

### 체크리스트

- [ ] Vercel 프로젝트가 GitHub에 연결되어 있는가?
- [ ] Production Branch가 `main`으로 설정되어 있는가?
- [ ] GitHub Repository가 올바른가?
- [ ] Vercel 계정에 GitHub 권한이 있는가?
- [ ] GitHub Webhook이 활성화되어 있는가?
- [ ] 최근 Webhook Deliveries가 성공(200)인가?

### Vercel 상태 확인

**Vercel Status Page:**
```
https://www.vercel-status.com
```
- Vercel 서비스 장애 확인
- GitHub Integration 상태 확인

### 고급: Deploy Hook 생성

**Settings → Git → Deploy Hooks:**

1. **"Create Hook"** 클릭
2. Hook 이름: `GitHub Auto Deploy`
3. Git Branch: `main`
4. **"Create Hook"** 클릭
5. 생성된 Webhook URL 복사

**GitHub에서:**
1. Repository → Settings → Webhooks
2. **"Add webhook"**
3. Payload URL: (위에서 복사한 URL)
4. Content type: `application/json`
5. Events: `Just the push event`
6. **"Add webhook"**

---

## 💡 예방 방법

### 1. 정기적인 Redeploy

- 한 달에 한 번 수동 Redeploy
- 캐시 정리 및 최신 상태 유지

### 2. Deploy Hook 백업

- Deploy Hook URL 저장
- 필요 시 수동 트리거 가능

### 3. Vercel CLI 준비

```bash
# Vercel CLI 설치 (없으면)
npm i -g vercel

# 로그인
vercel login

# 수동 배포 (비상시)
vercel --prod
```

---

## 📝 요약

### 빠른 해결:
1. ⭐ **Redeploy** (가장 빠름!)
2. 🔄 빈 커밋 푸시
3. 🔧 Webhook 재발송

### 설정 확인:
1. Vercel Git 연동
2. GitHub Webhook
3. Auto Deploy 설정

### 토큰/제한:
- ❌ 배포 횟수 제한 없음
- ❌ 토큰 만료 아님
- ✅ 일시적 연동 문제일 뿐!

---

**마지막 업데이트:** 2025-12-13
**다음 점검:** Redeploy 후 자동 배포 테스트

