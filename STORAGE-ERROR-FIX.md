# 🔧 스토리지 접근 오류 해결

## 오류 설명

```
Uncaught (in promise) Error: Access to storage is not allowed from this context.
```

이 오류는 iframe, Service Worker, 또는 제한된 브라우저 컨텍스트에서 `localStorage`나 `sessionStorage`에 접근할 때 발생합니다.

## 원인

1. **iframe 컨텍스트**: iframe 내부에서는 스토리지 접근이 제한될 수 있음
2. **Service Worker**: Service Worker 컨텍스트에서는 스토리지 접근 불가
3. **쿠키/스토리지 차단**: 브라우저 설정에서 쿠키/스토리지가 차단된 경우
4. **사설 브라우징 모드**: 일부 브라우저의 사설 모드에서 스토리지 제한

## ✅ 해결 방법

### 안전한 스토리지 유틸리티 추가

`app/utils/storage.js` 파일을 생성하여 모든 스토리지 접근을 안전하게 처리하도록 개선했습니다.

### 주요 기능

1. **스토리지 접근 가능 여부 확인**
   - iframe 컨텍스트 확인
   - 실제 접근 테스트 수행

2. **안전한 getItem/setItem**
   - try-catch로 오류 처리
   - 접근 불가 시 기본값 반환

3. **조용한 실패 처리**
   - 오류 발생 시 콘솔 경고만 출력
   - 앱이 중단되지 않도록 처리

### 적용된 파일

- ✅ `app/utils/encodeDecode.js` - sessionStorage 접근
- ✅ `app/page.js` - localStorage 접근 (프리셋)
- ✅ `app/gallery/page.js` - localStorage 접근 (프리셋)
- ✅ `app/components/PWAInstallPrompt.js` - localStorage 접근 (PWA 설치 상태)

## 사용 방법

### 기존 코드
```javascript
const value = localStorage.getItem("key");
localStorage.setItem("key", "value");
```

### 개선된 코드
```javascript
import { safeLocalStorageGet, safeLocalStorageSet } from "./utils/storage";

const value = safeLocalStorageGet("key", "defaultValue");
safeLocalStorageSet("key", "value");
```

## 효과

### 이전
- 스토리지 접근 불가 시 앱이 중단됨
- 콘솔에 오류 메시지 표시
- 사용자 경험 저하

### 개선 후
- 스토리지 접근 불가 시 조용히 처리
- 기본값 반환으로 앱 정상 작동
- 사용자 경험 개선

## AdSense 403 오류

```
ads?client=ca-pub-7373977880685678&output=html&adk=...:1 
Failed to load resource: the server responded with a status of 403 ()
```

이 오류는 **정상적인 현상**입니다:
- AdSense 계정이 아직 승인되지 않았을 때 발생
- 승인 대기 중에는 403 오류가 정상
- 승인 완료 후 자동으로 해결됨

### 해결 방법
1. AdSense 대시보드에서 사이트 승인 상태 확인
2. 승인 대기 중이면 24-48시간 대기
3. 승인 완료 후 광고 자동 표시

자세한 내용은 `ADSENSE-403-FIX.md` 참고

## 테스트

### 확인 사항
- [ ] 스토리지 접근 오류가 사라졌는지 확인
- [ ] 프리셋 저장/불러오기가 정상 작동하는지 확인
- [ ] PWA 설치 프롬프트가 정상 작동하는지 확인
- [ ] 콘솔에 오류 메시지가 없는지 확인

### 테스트 환경
- 일반 브라우저
- iframe 내부 (있는 경우)
- 사설 브라우징 모드
- 스토리지 차단된 브라우저

## 참고

- 스토리지 접근이 불가능한 환경에서는 기능이 제한될 수 있음
- 하지만 앱은 정상적으로 작동하며, 스토리지 관련 기능만 비활성화됨
- 사용자에게는 오류 메시지가 표시되지 않음

