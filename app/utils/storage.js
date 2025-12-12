/**
 * 안전한 스토리지 접근 유틸리티
 * iframe, Service Worker 등 제한된 컨텍스트에서도 안전하게 작동
 */

/**
 * 스토리지 접근 가능 여부 확인
 */
function isStorageAvailable(type = 'localStorage') {
  try {
    const storage = window[type];
    if (!storage) return false;
    
    // iframe 컨텍스트 확인
    if (window.self !== window.top) {
      // iframe 내부에서는 스토리지 접근이 제한될 수 있음
      // 하지만 시도는 해볼 수 있음
    }
    
    // 테스트 접근
    const testKey = '__storage_test__';
    storage.setItem(testKey, 'test');
    storage.removeItem(testKey);
    return true;
  } catch (e) {
    // 쿠키가 비활성화되었거나, 스토리지가 차단된 경우
    return false;
  }
}

/**
 * 안전한 localStorage.getItem
 */
export function safeLocalStorageGet(key, defaultValue = null) {
  try {
    if (!isStorageAvailable('localStorage')) {
      return defaultValue;
    }
    const value = localStorage.getItem(key);
    return value !== null ? value : defaultValue;
  } catch (error) {
    console.warn(`localStorage.getItem 실패 (${key}):`, error);
    return defaultValue;
  }
}

/**
 * 안전한 localStorage.setItem
 */
export function safeLocalStorageSet(key, value) {
  try {
    if (!isStorageAvailable('localStorage')) {
      console.warn(`localStorage.setItem 실패 (${key}): 스토리지 접근 불가`);
      return false;
    }
    localStorage.setItem(key, value);
    return true;
  } catch (error) {
    console.warn(`localStorage.setItem 실패 (${key}):`, error);
    return false;
  }
}

/**
 * 안전한 localStorage.removeItem
 */
export function safeLocalStorageRemove(key) {
  try {
    if (!isStorageAvailable('localStorage')) {
      return false;
    }
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.warn(`localStorage.removeItem 실패 (${key}):`, error);
    return false;
  }
}

/**
 * 안전한 sessionStorage.getItem
 */
export function safeSessionStorageGet(key, defaultValue = null) {
  try {
    if (!isStorageAvailable('sessionStorage')) {
      return defaultValue;
    }
    const value = sessionStorage.getItem(key);
    return value !== null ? value : defaultValue;
  } catch (error) {
    console.warn(`sessionStorage.getItem 실패 (${key}):`, error);
    return defaultValue;
  }
}

/**
 * 안전한 sessionStorage.setItem
 */
export function safeSessionStorageSet(key, value) {
  try {
    if (!isStorageAvailable('sessionStorage')) {
      console.warn(`sessionStorage.setItem 실패 (${key}): 스토리지 접근 불가`);
      return false;
    }
    sessionStorage.setItem(key, value);
    return true;
  } catch (error) {
    console.warn(`sessionStorage.setItem 실패 (${key}):`, error);
    return false;
  }
}

/**
 * 안전한 sessionStorage.removeItem
 */
export function safeSessionStorageRemove(key) {
  try {
    if (!isStorageAvailable('sessionStorage')) {
      return false;
    }
    sessionStorage.removeItem(key);
    return true;
  } catch (error) {
    console.warn(`sessionStorage.removeItem 실패 (${key}):`, error);
    return false;
  }
}

