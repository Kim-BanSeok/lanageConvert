// 📊 규칙 사용 통계

import { safeLocalStorageGet, safeLocalStorageSet } from "../utils/storage";

const STATS_KEY = "rule_statistics_v1";

/**
 * 규칙 사용 통계 구조
 * {
 *   [ruleKey]: {
 *     from: string,
 *     to: string,
 *     useCount: number,
 *     lastUsed: timestamp,
 *     encodeCount: number,
 *     decodeCount: number
 *   }
 * }
 */

/**
 * 규칙 키 생성
 */
function getRuleKey(rule) {
  return `${rule.from}→${rule.to}`;
}

/**
 * 통계 불러오기
 */
export function getStatistics() {
  try {
    const data = safeLocalStorageGet(STATS_KEY);
    if (!data) return {};
    return JSON.parse(data);
  } catch (error) {
    console.error("통계 불러오기 실패:", error);
    return {};
  }
}

/**
 * 규칙 사용 기록
 */
export function recordRuleUsage(rules, direction = 'encode') {
  try {
    const stats = getStatistics();
    const timestamp = Date.now();

    rules.forEach(rule => {
      if (!rule.from || !rule.to) return;
      
      const key = getRuleKey(rule);
      
      if (!stats[key]) {
        stats[key] = {
          from: rule.from,
          to: rule.to,
          useCount: 0,
          lastUsed: timestamp,
          encodeCount: 0,
          decodeCount: 0
        };
      }

      stats[key].useCount++;
      stats[key].lastUsed = timestamp;
      
      if (direction === 'encode') {
        stats[key].encodeCount++;
      } else {
        stats[key].decodeCount++;
      }
    });

    safeLocalStorageSet(STATS_KEY, JSON.stringify(stats));
    return stats;
  } catch (error) {
    console.error("규칙 사용 기록 실패:", error);
    return null;
  }
}

/**
 * 가장 많이 사용된 규칙 (Top N)
 */
export function getTopRules(limit = 10) {
  try {
    const stats = getStatistics();
    const rules = Object.values(stats);
    
    return rules
      .sort((a, b) => b.useCount - a.useCount)
      .slice(0, limit);
  } catch (error) {
    console.error("Top 규칙 조회 실패:", error);
    return [];
  }
}

/**
 * 최근 사용 규칙
 */
export function getRecentRules(limit = 10) {
  try {
    const stats = getStatistics();
    const rules = Object.values(stats);
    
    return rules
      .sort((a, b) => b.lastUsed - a.lastUsed)
      .slice(0, limit);
  } catch (error) {
    console.error("최근 규칙 조회 실패:", error);
    return [];
  }
}

/**
 * 사용하지 않은 규칙 찾기
 */
export function getUnusedRules(allRules) {
  try {
    const stats = getStatistics();
    
    return allRules.filter(rule => {
      if (!rule.from || !rule.to) return false;
      const key = getRuleKey(rule);
      return !stats[key] || stats[key].useCount === 0;
    });
  } catch (error) {
    console.error("미사용 규칙 조회 실패:", error);
    return [];
  }
}

/**
 * 전체 통계 요약
 */
export function getStatisticsSummary() {
  try {
    const stats = getStatistics();
    const rules = Object.values(stats);

    if (rules.length === 0) {
      return {
        totalRules: 0,
        totalUsage: 0,
        avgUsage: 0,
        mostUsed: null,
        leastUsed: null,
        encodeTotal: 0,
        decodeTotal: 0
      };
    }

    const totalUsage = rules.reduce((sum, r) => sum + r.useCount, 0);
    const avgUsage = totalUsage / rules.length;
    
    const sorted = [...rules].sort((a, b) => b.useCount - a.useCount);
    const mostUsed = sorted[0];
    const leastUsed = sorted[sorted.length - 1];

    const encodeTotal = rules.reduce((sum, r) => sum + r.encodeCount, 0);
    const decodeTotal = rules.reduce((sum, r) => sum + r.decodeCount, 0);

    return {
      totalRules: rules.length,
      totalUsage,
      avgUsage: Math.round(avgUsage * 10) / 10,
      mostUsed,
      leastUsed,
      encodeTotal,
      decodeTotal
    };
  } catch (error) {
    console.error("통계 요약 실패:", error);
    return null;
  }
}

/**
 * 특정 규칙 통계 조회
 */
export function getRuleStats(rule) {
  try {
    const stats = getStatistics();
    const key = getRuleKey(rule);
    return stats[key] || null;
  } catch (error) {
    console.error("규칙 통계 조회 실패:", error);
    return null;
  }
}

/**
 * 통계 초기화
 */
export function clearStatistics() {
  try {
    safeLocalStorageSet(STATS_KEY, JSON.stringify({}));
    return true;
  } catch (error) {
    console.error("통계 초기화 실패:", error);
    return false;
  }
}

/**
 * 특정 규칙 통계 삭제
 */
export function deleteRuleStats(rule) {
  try {
    const stats = getStatistics();
    const key = getRuleKey(rule);
    delete stats[key];
    safeLocalStorageSet(STATS_KEY, JSON.stringify(stats));
    return true;
  } catch (error) {
    console.error("규칙 통계 삭제 실패:", error);
    return false;
  }
}

