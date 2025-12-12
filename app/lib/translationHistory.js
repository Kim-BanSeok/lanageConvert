// 📜 번역 히스토리 관리

import { safeLocalStorageGet, safeLocalStorageSet } from "../utils/storage";

const HISTORY_KEY = "translation_history_v1";
const MAX_HISTORY = 50; // 최대 50개 히스토리

/**
 * 히스토리 항목 구조
 * {
 *   id: string,
 *   timestamp: number,
 *   direction: 'encode' | 'decode',
 *   mode: 'substring' | 'word' | 'hybrid',
 *   input: string,
 *   output: string,
 *   rulesCount: number,
 *   engineVersion: 'v2' | 'v3'
 * }
 */

/**
 * 히스토리 불러오기
 */
export function getHistory() {
  try {
    const data = safeLocalStorageGet(HISTORY_KEY);
    if (!data) return [];
    return JSON.parse(data);
  } catch (error) {
    console.error("히스토리 불러오기 실패:", error);
    return [];
  }
}

/**
 * 히스토리 항목 추가
 */
export function addToHistory(item) {
  try {
    const history = getHistory();
    
    const newItem = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
      ...item
    };

    // 최신 항목을 맨 앞에 추가
    history.unshift(newItem);

    // 최대 개수 유지
    const trimmed = history.slice(0, MAX_HISTORY);

    safeLocalStorageSet(HISTORY_KEY, JSON.stringify(trimmed));
    return newItem;
  } catch (error) {
    console.error("히스토리 추가 실패:", error);
    return null;
  }
}

/**
 * 히스토리 항목 삭제
 */
export function removeFromHistory(id) {
  try {
    const history = getHistory();
    const filtered = history.filter(item => item.id !== id);
    safeLocalStorageSet(HISTORY_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error("히스토리 삭제 실패:", error);
    return false;
  }
}

/**
 * 히스토리 전체 삭제
 */
export function clearHistory() {
  try {
    safeLocalStorageSet(HISTORY_KEY, JSON.stringify([]));
    return true;
  } catch (error) {
    console.error("히스토리 전체 삭제 실패:", error);
    return false;
  }
}

/**
 * 히스토리 검색
 */
export function searchHistory(query) {
  try {
    const history = getHistory();
    const lowerQuery = query.toLowerCase();
    
    return history.filter(item => 
      item.input?.toLowerCase().includes(lowerQuery) ||
      item.output?.toLowerCase().includes(lowerQuery)
    );
  } catch (error) {
    console.error("히스토리 검색 실패:", error);
    return [];
  }
}

/**
 * 히스토리 통계
 */
export function getHistoryStats() {
  try {
    const history = getHistory();
    
    const encodeCount = history.filter(h => h.direction === 'encode').length;
    const decodeCount = history.filter(h => h.direction === 'decode').length;
    
    const modeStats = {
      substring: history.filter(h => h.mode === 'substring').length,
      word: history.filter(h => h.mode === 'word').length,
      hybrid: history.filter(h => h.mode === 'hybrid').length
    };

    const engineStats = {
      v2: history.filter(h => h.engineVersion === 'v2').length,
      v3: history.filter(h => h.engineVersion === 'v3').length
    };

    const avgInputLength = history.length > 0
      ? Math.round(history.reduce((sum, h) => sum + (h.input?.length || 0), 0) / history.length)
      : 0;

    const avgOutputLength = history.length > 0
      ? Math.round(history.reduce((sum, h) => sum + (h.output?.length || 0), 0) / history.length)
      : 0;

    return {
      total: history.length,
      encodeCount,
      decodeCount,
      modeStats,
      engineStats,
      avgInputLength,
      avgOutputLength,
      oldestTimestamp: history.length > 0 ? history[history.length - 1].timestamp : null,
      newestTimestamp: history.length > 0 ? history[0].timestamp : null
    };
  } catch (error) {
    console.error("히스토리 통계 실패:", error);
    return null;
  }
}

/**
 * 날짜별 히스토리 그룹화
 */
export function groupHistoryByDate() {
  try {
    const history = getHistory();
    const grouped = {};

    history.forEach(item => {
      const date = new Date(item.timestamp);
      const dateKey = date.toLocaleDateString('ko-KR');
      
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(item);
    });

    return grouped;
  } catch (error) {
    console.error("히스토리 그룹화 실패:", error);
    return {};
  }
}

