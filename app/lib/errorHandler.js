// 🛡️ 전역 에러 처리 시스템

/**
 * 에러 타입 정의
 */
export const ErrorTypes = {
  QUOTA_EXCEEDED: 'QuotaExceededError',
  STORAGE_UNAVAILABLE: 'StorageUnavailableError',
  JSON_PARSE: 'JsonParseError',
  NETWORK: 'NetworkError',
  UNKNOWN: 'UnknownError'
};

/**
 * 사용자 친화적 에러 메시지
 */
const errorMessages = {
  [ErrorTypes.QUOTA_EXCEEDED]: {
    title: '⚠️ 저장 공간 부족',
    message: '브라우저 저장 공간이 가득 찼습니다.\n일부 프리셋을 삭제하거나 백업 후 초기화하세요.',
    actions: ['백업하기', '프리셋 삭제', '초기화']
  },
  [ErrorTypes.STORAGE_UNAVAILABLE]: {
    title: '❌ 저장소 접근 불가',
    message: '브라우저 설정에서 쿠키/저장소가 차단되었습니다.\n시크릿 모드에서는 일부 기능이 제한될 수 있습니다.',
    actions: ['확인']
  },
  [ErrorTypes.JSON_PARSE]: {
    title: '⚠️ 데이터 손상',
    message: '저장된 데이터가 손상되었습니다.\n해당 데이터를 삭제하고 다시 시작합니다.',
    actions: ['확인']
  },
  [ErrorTypes.NETWORK]: {
    title: '🌐 네트워크 오류',
    message: '네트워크 연결을 확인해주세요.\n오프라인에서는 일부 기능이 제한됩니다.',
    actions: ['확인']
  },
  [ErrorTypes.UNKNOWN]: {
    title: '❌ 오류 발생',
    message: '예상치 못한 오류가 발생했습니다.\n페이지를 새로고침해보세요.',
    actions: ['새로고침', '취소']
  }
};

/**
 * 에러 타입 감지
 * @param {Error} error 
 * @returns {string} ErrorType
 */
export function detectErrorType(error) {
  if (!error) return ErrorTypes.UNKNOWN;

  const errorName = error.name || '';
  const errorMessage = error.message || '';

  // QuotaExceededError 감지
  if (
    errorName === 'QuotaExceededError' ||
    errorMessage.includes('quota') ||
    errorMessage.includes('exceeded')
  ) {
    return ErrorTypes.QUOTA_EXCEEDED;
  }

  // Storage 접근 불가
  if (
    errorMessage.includes('storage') ||
    errorMessage.includes('localStorage') ||
    errorMessage.includes('not allowed')
  ) {
    return ErrorTypes.STORAGE_UNAVAILABLE;
  }

  // JSON 파싱 에러
  if (
    errorName === 'SyntaxError' ||
    errorMessage.includes('JSON') ||
    errorMessage.includes('parse')
  ) {
    return ErrorTypes.JSON_PARSE;
  }

  // 네트워크 에러
  if (
    errorName === 'NetworkError' ||
    errorMessage.includes('network') ||
    errorMessage.includes('fetch')
  ) {
    return ErrorTypes.NETWORK;
  }

  return ErrorTypes.UNKNOWN;
}

/**
 * 에러 정보 가져오기
 * @param {string} errorType 
 * @returns {Object}
 */
export function getErrorInfo(errorType) {
  return errorMessages[errorType] || errorMessages[ErrorTypes.UNKNOWN];
}

/**
 * 에러 로깅 (선택적)
 * @param {Error} error 
 * @param {Object} context 
 */
export function logError(error, context = {}) {
  const errorType = detectErrorType(error);
  const timestamp = new Date().toISOString();
  
  const logEntry = {
    timestamp,
    errorType,
    message: error.message,
    stack: error.stack,
    context
  };

  // 콘솔에 로깅
  console.error('🚨 Error:', logEntry);

  // 추후 확장: 외부 로깅 서비스 전송 가능
  // sendToLoggingService(logEntry);

  return logEntry;
}

/**
 * 에러 복구 시도
 * @param {string} errorType 
 * @param {Function} retryFn 
 */
export async function attemptRecovery(errorType, retryFn) {
  try {
    switch (errorType) {
      case ErrorTypes.QUOTA_EXCEEDED:
        // 용량 초과 시 복구 시도
        console.log('🔄 용량 초과 복구 시도...');
        // 임시 데이터 정리
        cleanupTemporaryData();
        break;

      case ErrorTypes.JSON_PARSE:
        // 손상된 데이터 제거
        console.log('🔄 손상된 데이터 제거...');
        break;

      case ErrorTypes.STORAGE_UNAVAILABLE:
        // 메모리 기반 fallback
        console.log('🔄 메모리 기반 모드로 전환...');
        break;

      default:
        console.log('🔄 일반 복구 시도...');
        break;
    }

    // 재시도
    if (retryFn) {
      await retryFn();
      return true;
    }
  } catch (recoveryError) {
    console.error('❌ 복구 실패:', recoveryError);
    return false;
  }

  return false;
}

/**
 * 임시 데이터 정리 (용량 확보)
 */
function cleanupTemporaryData() {
  try {
    // 진화 추천 상태 초기화
    localStorage.removeItem('evolution_recommend_state');
    
    // PWA 설치 프롬프트 상태 초기화
    localStorage.removeItem('pwa-install-dismissed');
    
    // 자동 백업 타임스탬프 초기화
    localStorage.removeItem('last_auto_backup');

    console.log('✅ 임시 데이터 정리 완료');
    return true;
  } catch (error) {
    console.error('❌ 임시 데이터 정리 실패:', error);
    return false;
  }
}

/**
 * 전역 에러 핸들러 설정
 * @param {Function} alertFn - 알림 표시 함수
 */
export function setupGlobalErrorHandler(alertFn) {
  // 전역 에러 이벤트 리스너
  window.addEventListener('error', (event) => {
    const error = event.error;
    if (!error) return;

    logError(error, { type: 'window.error', event });
    
    const errorType = detectErrorType(error);
    const errorInfo = getErrorInfo(errorType);

    if (alertFn) {
      alertFn(
        `${errorInfo.title}\n\n${errorInfo.message}`,
        'error',
        5000
      );
    }
  });

  // Promise rejection 이벤트 리스너
  window.addEventListener('unhandledrejection', (event) => {
    const error = event.reason;
    logError(error, { type: 'unhandledrejection', event });

    const errorType = detectErrorType(error);
    const errorInfo = getErrorInfo(errorType);

    if (alertFn) {
      alertFn(
        `${errorInfo.title}\n\n${errorInfo.message}`,
        'error',
        5000
      );
    }
  });

  console.log('✅ 전역 에러 핸들러 설정 완료');
}

/**
 * 안전한 함수 실행 (에러 래퍼)
 * @param {Function} fn 
 * @param {Object} options 
 */
export async function safeExecute(fn, options = {}) {
  const {
    fallback = null,
    onError = null,
    showAlert = true,
    alertFn = null,
    retryCount = 0
  } = options;

  let lastError = null;

  for (let i = 0; i <= retryCount; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      logError(error, { attempt: i + 1, retryCount });

      if (i < retryCount) {
        // 재시도 전 대기
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
        continue;
      }

      // 마지막 시도 실패
      const errorType = detectErrorType(error);
      const errorInfo = getErrorInfo(errorType);

      if (showAlert && alertFn) {
        alertFn(
          `${errorInfo.title}\n\n${errorInfo.message}`,
          'error',
          5000
        );
      }

      if (onError) {
        onError(error, errorType);
      }

      return fallback;
    }
  }

  return fallback;
}

