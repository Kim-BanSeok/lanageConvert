# 🌿 Git 브랜치 전략 가이드

## 🎯 목표

**Vercel 무료 플랜 제한:**
- 하루 배포 100회 제한
- 모든 브랜치 푸시마다 Preview 배포 생성 (제한에 포함!)

**해결책:**
- 개발 브랜치에서 작업
- Preview 배포 비활성화 또는 제한
- main에 머지할 때만 Production 배포

---

## 📋 브랜치 전략

### 브랜치 구조

```
main (Production)
  └─ develop (개발 브랜치)
      └─ feature/xxx (기능 브랜치, 선택사항)
```

### 브랜치 역할

| 브랜치 | 용도 | 배포 |
|--------|------|------|
| `main` | 프로덕션 코드 | ✅ Production 배포 |
| `develop` | 개발 중인 코드 | ⚠️ Preview 배포 (설정에 따라) |
| `feature/*` | 기능 개발 | ❌ 배포 안 함 (권장) |

---

## 🚀 사용 방법

### 1단계: 개발 브랜치 생성

```bash
# develop 브랜치 생성 및 전환
git checkout -b develop

# GitHub에 푸시
git push -u origin develop
```

### 2단계: 개발 브랜치에서 작업

```bash
# develop 브랜치에서 작업
git checkout develop

# 파일 수정 후
git add .
git commit -m "feat: 새 기능 추가"
git push origin develop
```

**→ 이렇게 하면 Preview 배포만 생성됨 (제한에 포함되지만, Production 배포보다 덜 중요)**

### 3단계: 완성 후 main에 머지

```bash
# main 브랜치로 전환
git checkout main

# develop 브랜치 머지
git merge develop

# GitHub에 푸시 (이때만 Production 배포!)
git push origin main
```

---

## ⚙️ Vercel 설정 최적화

### 방법 1: Preview 배포 비활성화 (추천!)

**Vercel Dashboard에서:**

1. 프로젝트 → **Settings** 탭
2. **Git** 메뉴
3. **"Production Branch"** 섹션
4. **"Ignore Build Step"** 설정:
   ```
   개발 브랜치에서는 빌드 안 함
   ```

**또는 더 정확하게:**

**Settings → Git → Ignore Build Step:**
```
git diff HEAD^ HEAD --quiet .
```

**또는 특정 브랜치만 배포:**

**Settings → Git → Production Branch:**
- Production Branch: `main`만 선택
- 다른 브랜치는 Preview도 안 만들기

---

### 방법 2: Preview 배포 제한

**Settings → Git → Preview Deployments:**

1. **"Only deploy previews for pull requests"** 활성화
2. 또는 **"Deploy previews for all branches"** 비활성화

**결과:**
- ✅ Pull Request만 Preview 배포
- ✅ 일반 브랜치 푸시는 배포 안 함
- ✅ main 머지 시에만 Production 배포

---

### 방법 3: Deploy Hook으로 수동 제어

**Settings → Git → Deploy Hooks:**

1. **"Create Hook"** 클릭
2. Hook 이름: `Manual Deploy`
3. Git Branch: `main`
4. **"Create Hook"** 클릭

**사용:**
- 필요할 때만 Hook URL 호출
- 자동 배포 비활성화
- 완전 수동 제어

---

## 📊 배포 횟수 비교

### ❌ 기존 방식 (main에 직접 커밋)

```
하루 커밋 50번 = 50번 배포
→ 2일이면 제한 초과! 😱
```

### ✅ 새 방식 (develop 브랜치 사용)

```
develop 브랜치: 50번 커밋 (Preview 배포 비활성화)
main 머지: 1번 (Production 배포)
→ 하루 1번만 Production 배포! ✅
```

---

## 🔄 워크플로우 예시

### 시나리오: 새 기능 개발

```bash
# 1. develop 브랜치로 전환
git checkout develop

# 2. 새 기능 개발 (여러 번 커밋)
git add .
git commit -m "feat: 버튼 스타일 추가"
git push origin develop

git add .
git commit -m "feat: 모달 UI 개선"
git push origin develop

git add .
git commit -m "fix: 오류 수정"
git push origin develop

# 3. 테스트 완료 후 main에 머지
git checkout main
git merge develop
git push origin main  # ← 이때만 Production 배포!

# 4. develop 브랜치 업데이트
git checkout develop
git merge main  # main의 변경사항 반영
```

---

## 🛡️ 안전장치

### 1. main 브랜치 보호

**GitHub Repository → Settings → Branches:**

1. **"Add rule"** 클릭
2. Branch name pattern: `main`
3. ✅ **"Require pull request reviews"** (선택사항)
4. ✅ **"Require status checks"** (선택사항)
5. **"Create"** 클릭

**결과:**
- main에 직접 푸시 불가
- Pull Request 필수
- 코드 리뷰 후 머지

---

### 2. develop 브랜치 자동 업데이트

**main 머지 후:**

```bash
# develop 브랜치도 최신 상태 유지
git checkout develop
git merge main
git push origin develop
```

---

## 📝 커밋 메시지 규칙

### 개발 브랜치에서 자유롭게

```
feat: 새 기능
fix: 버그 수정
refactor: 리팩토링
style: 스타일 변경
docs: 문서 수정
test: 테스트 추가
chore: 기타 작업
```

### main 머지 시 정리

```bash
# 여러 커밋을 하나로 합치기 (선택사항)
git checkout main
git merge --squash develop
git commit -m "feat: 새 기능 완성

- 버튼 스타일 추가
- 모달 UI 개선
- 오류 수정"
```

---

## 🎯 최적 전략 (추천!)

### 1. develop 브랜치 생성

```bash
git checkout -b develop
git push -u origin develop
```

### 2. Vercel 설정

**Settings → Git → Ignore Build Step:**
```
git diff HEAD^ HEAD --quiet . || echo "skip"
```

**또는 더 간단하게:**
```
# develop 브랜치는 빌드 안 함
[ "$VERCEL_GIT_COMMIT_REF" = "main" ] && echo "build" || echo "skip"
```

### 3. 개발 워크플로우

```bash
# develop에서 작업
git checkout develop
# ... 작업 ...
git push origin develop  # Preview 배포 안 됨!

# 완성 후 main 머지
git checkout main
git merge develop
git push origin main  # Production 배포만!
```

---

## ✅ 체크리스트

### 초기 설정

- [ ] develop 브랜치 생성
- [ ] Vercel Preview 배포 비활성화 또는 제한
- [ ] GitHub Branch Protection 설정 (선택사항)

### 일상 작업

- [ ] develop 브랜치에서 작업
- [ ] 여러 번 커밋해도 OK (배포 안 됨)
- [ ] 완성 후 main에 머지
- [ ] main 머지 시에만 Production 배포

---

## 🔍 배포 횟수 모니터링

### Vercel Dashboard에서 확인

1. **Usage** 탭
2. **Deployments** 섹션
3. 일일 배포 횟수 확인
4. 제한: 100회/일

### 예상 사용량

**개발 브랜치 전략 사용 시:**
- develop 푸시: 0회 (Preview 비활성화)
- main 머지: 1-5회/일
- **총: 1-5회/일** ✅

**기존 방식:**
- main 직접 커밋: 50-100회/일
- **총: 50-100회/일** ❌

---

## 💡 추가 팁

### 1. 여러 기능 동시 개발

```bash
# feature 브랜치 사용
git checkout -b feature/new-ui
# ... 작업 ...
git checkout develop
git merge feature/new-ui
git push origin develop
```

### 2. Hotfix (긴급 수정)

```bash
# main에서 직접 수정 (긴급한 경우만)
git checkout main
git checkout -b hotfix/critical-bug
# ... 수정 ...
git checkout main
git merge hotfix/critical-bug
git push origin main
```

### 3. 배포 전 테스트

```bash
# 로컬에서 테스트
npm run build
npm run start

# 문제 없으면 main 머지
```

---

## 📚 참고 자료

- [Vercel Branch Deployments](https://vercel.com/docs/concepts/git/deployments)
- [Git Branching Strategies](https://www.atlassian.com/git/tutorials/comparing-workflows)
- [GitHub Branch Protection](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches)

---

**마지막 업데이트:** 2025-12-13
**다음 점검:** develop 브랜치 생성 후

