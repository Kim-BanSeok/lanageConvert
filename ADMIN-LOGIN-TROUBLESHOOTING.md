# 🔧 관리자 로그인 문제 해결 가이드

## 문제: 비밀번호를 정확히 입력했는데도 로그인이 안 됨

### 원인

Next.js는 **서버 시작 시에만** `.env.local` 파일의 환경 변수를 읽습니다. 개발 서버를 재시작하지 않으면 환경 변수가 로드되지 않습니다.

### 해결 방법

#### 1. 개발 서버 재시작 (가장 중요!)

1. **현재 실행 중인 개발 서버 중지**
   - 터미널에서 `Ctrl + C` (또는 `Cmd + C`)

2. **개발 서버 다시 시작**
   ```bash
   npm run dev
   ```

3. **브라우저에서 다시 로그인 시도**

#### 2. 환경 변수 확인

현재 설정된 비밀번호 확인:
```bash
grep ADMIN_PASSWORD .env.local
```

**기본 비밀번호**: `admin123`

#### 3. 환경 변수가 제대로 로드되었는지 확인

로그인 시도 후 터미널 콘솔을 확인하세요:
- `[DEBUG] Login attempt - Expected: 설정됨` → 환경 변수 로드됨
- `[DEBUG] Login attempt - Expected: 기본값(admin)` → 환경 변수 로드 안 됨

### 확인 체크리스트

- [ ] 개발 서버를 재시작했는가?
- [ ] `.env.local` 파일에 `ADMIN_PASSWORD=admin123`이 있는가?
- [ ] 비밀번호를 정확히 `admin123`으로 입력했는가? (공백 없이)
- [ ] 터미널 콘솔에 디버깅 로그가 표시되는가?

### 비밀번호 변경 방법

`.env.local` 파일을 열고:
```env
ADMIN_PASSWORD=새로운_비밀번호
```

변경 후 **반드시 개발 서버를 재시작**하세요.

### Vercel 배포 시

Vercel에서는 환경 변수를 대시보드에서 설정해야 합니다:
1. Vercel 대시보드 > Settings > Environment Variables
2. `ADMIN_PASSWORD` 추가
3. 재배포

### 추가 디버깅

여전히 문제가 있으면:

1. **브라우저 개발자 도구 확인**
   - Network 탭에서 `/api/admin/login` 요청 확인
   - Response 확인

2. **서버 로그 확인**
   - 터미널에서 에러 메시지 확인
   - 디버깅 로그 확인

3. **환경 변수 직접 확인**
   ```bash
   node -e "console.log(process.env.ADMIN_PASSWORD)"
   ```
   (이건 Node.js에서만 작동, Next.js API Route에서는 다를 수 있음)

### 주의사항

- `.env.local` 파일은 Git에 커밋하지 마세요 (이미 `.gitignore`에 포함됨)
- 환경 변수 변경 후에는 **항상 서버 재시작** 필요
- 프로덕션에서는 디버깅 로그가 자동으로 비활성화됩니다

