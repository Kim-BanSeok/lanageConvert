/**
 * 🔒 세션 관리 유틸리티
 * 세션 타임아웃 및 자동 만료 관리
 */

const SESSION_TIMEOUT_MS = 60 * 60 * 1000; // 1시간
const SESSION_CHECK_INTERVAL_MS = 5 * 60 * 1000; // 5분마다 체크
const LAST_ACTIVITY_KEY = 'admin_last_activity';

/**
 * 마지막 활동 시간 업데이트
 */
export function updateLastActivity() {
  if (typeof window === 'undefined') return;
  
  try {
    sessionStorage.setItem(LAST_ACTIVITY_KEY, Date.now().toString());
  } catch (error) {
    // sessionStorage 접근 실패 시 무시
    if (process.env.NODE_ENV === 'development') {
      console.warn('세션 활동 시간 업데이트 실패:', error);
    }
  }
}

/**
 * 마지막 활동 시간 가져오기
 * @returns {number|null} 마지막 활동 타임스탬프
 */
export function getLastActivity() {
  if (typeof window === 'undefined') return null;
  
  try {
    const timestamp = sessionStorage.getItem(LAST_ACTIVITY_KEY);
    return timestamp ? parseInt(timestamp, 10) : null;
  } catch (error) {
    return null;
  }
}

/**
 * 세션이 만료되었는지 확인
 * @returns {boolean}
 */
export function isSessionExpired() {
  const lastActivity = getLastActivity();
  if (!lastActivity) return true;
  
  const now = Date.now();
  const elapsed = now - lastActivity;
  
  return elapsed > SESSION_TIMEOUT_MS;
}

/**
 * 세션 만료 시간까지 남은 시간 (밀리초)
 * @returns {number}
 */
export function getTimeUntilExpiry() {
  const lastActivity = getLastActivity();
  if (!lastActivity) return 0;
  
  const now = Date.now();
  const elapsed = now - lastActivity;
  const remaining = SESSION_TIMEOUT_MS - elapsed;
  
  return Math.max(0, remaining);
}

/**
 * 세션 만료까지 남은 시간 (분)
 * @returns {number}
 */
export function getMinutesUntilExpiry() {
  const remaining = getTimeUntilExpiry();
  return Math.floor(remaining / (60 * 1000));
}

/**
 * 세션 초기화
 */
export function resetSession() {
  if (typeof window === 'undefined') return;
  
  try {
    sessionStorage.removeItem(LAST_ACTIVITY_KEY);
    updateLastActivity();
  } catch (error) {
    // 무시
  }
}

/**
 * 세션 만료 처리
 * @param {Function} onExpire - 만료 시 실행할 함수
 */
export function handleSessionExpiry(onExpire) {
  if (isSessionExpired()) {
    resetSession();
    if (onExpire) {
      onExpire();
    }
  }
}

/**
 * 세션 모니터링 시작
 * @param {Function} onExpire - 만료 시 실행할 함수
 * @returns {Function} 정리 함수
 */
export function startSessionMonitoring(onExpire) {
  if (typeof window === 'undefined') {
    return () => {}; // 서버 사이드에서는 빈 함수 반환
  }

  // 초기 활동 시간 설정
  updateLastActivity();

  // 주기적으로 세션 체크
  const intervalId = setInterval(() => {
    handleSessionExpiry(onExpire);
  }, SESSION_CHECK_INTERVAL_MS);

  // 페이지 포커스 시 활동 시간 업데이트
  const handleFocus = () => {
    updateLastActivity();
  };

  // 마우스/키보드 활동 시 업데이트
  const handleActivity = () => {
    updateLastActivity();
  };

  window.addEventListener('focus', handleFocus);
  window.addEventListener('mousedown', handleActivity);
  window.addEventListener('keydown', handleActivity);

  // 정리 함수
  return () => {
    clearInterval(intervalId);
    window.removeEventListener('focus', handleFocus);
    window.removeEventListener('mousedown', handleActivity);
    window.removeEventListener('keydown', handleActivity);
  };
}

/**
 * 세션 상태 정보 가져오기
 * @returns {{isExpired: boolean, minutesRemaining: number, lastActivity: number|null}}
 */
export function getSessionStatus() {
  const lastActivity = getLastActivity();
  const isExpired = isSessionExpired();
  const minutesRemaining = getMinutesUntilExpiry();

  return {
    isExpired,
    minutesRemaining,
    lastActivity,
    timeoutMinutes: Math.floor(SESSION_TIMEOUT_MS / (60 * 1000))
  };
}

