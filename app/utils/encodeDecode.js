/**
 * 암호화/복호화 유틸리티 함수
 */

/**
 * 텍스트를 암호화합니다.
 * @param {string} text - 암호화할 텍스트
 * @param {Array} rules - 변환 규칙 배열 [{from: string, to: string}, ...]
 * @returns {{result: string, appliedRules: Array}} 암호화된 텍스트와 적용된 규칙
 */
export function encodeText(text, rules) {
  if (!text || !text.trim()) {
    return { result: "", appliedRules: [] };
  }

  let result = text;
  const appliedRules = [];

  // 빈 규칙 필터링 및 긴 단어부터 적용하기 위해 정렬
  const validRules = rules
    .filter((rule) => rule && rule.from && rule.from.trim() !== "")
    .sort((a, b) => b.from.length - a.from.length); // 긴 단어부터 적용

  if (validRules.length === 0) {
    return { result: text, appliedRules: [] };
  }

  // 실제로 적용된 규칙만 추적
  validRules.forEach((rule) => {
    if (rule.from && rule.to && rule.from !== rule.to) {
      const before = result;
      const after = result.split(rule.from).join(rule.to);
      // 실제로 변경이 일어났을 때만 추적
      if (before !== after) {
        result = after;
        appliedRules.push(rule);
      }
    }
  });

  return { result, appliedRules };
}

/**
 * 텍스트를 복호화합니다.
 * @param {string} text - 복호화할 텍스트
 * @param {Array} appliedRules - 암호화 시 적용된 규칙 배열 (역순으로 적용됨)
 * @returns {string} 복호화된 텍스트
 */
export function decodeText(text, appliedRules) {
  if (!text || !text.trim()) {
    return "";
  }

  if (!appliedRules || appliedRules.length === 0) {
    return text;
  }

  let result = text;

  // 복호화 순서: 암호화 순서의 정확한 역순
  // to.length 재정렬은 하지 않음 (순서가 바뀌면 잘못된 복호화 발생)
  const decodeOrder = [...appliedRules].reverse();

  // 암호화 역순으로 적용 (마지막에 암호화한 것부터 복호화)
  // to → from 변환
  decodeOrder.forEach((rule) => {
    if (rule.to && rule.from && rule.to !== rule.from) {
      // 텍스트에 to 문자열이 있을 때만 적용
      if (result.includes(rule.to)) {
        result = result.split(rule.to).join(rule.from);
      }
    }
  });

  return result;
}

import { safeSessionStorageGet, safeSessionStorageSet } from "./storage";

/**
 * sessionStorage에서 마지막 암호화 규칙을 불러옵니다.
 * @returns {Array} 적용된 규칙 배열
 */
export function getLastEncodeRules() {
  try {
    const saved = safeSessionStorageGet("last-encode-rules");
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.warn("저장된 규칙 불러오기 실패:", error);
  }
  return [];
}

/**
 * sessionStorage에 마지막 암호화 규칙을 저장합니다.
 * @param {Array} appliedRules - 적용된 규칙 배열
 */
export function saveLastEncodeRules(appliedRules) {
  if (appliedRules && appliedRules.length > 0) {
    try {
      safeSessionStorageSet("last-encode-rules", JSON.stringify(appliedRules));
    } catch (error) {
      console.warn("규칙 저장 실패:", error);
    }
  }
}

/**
 * 전체 규칙에서 암호화 순서를 생성합니다 (하위 호환성용).
 * @param {Array} rules - 전체 규칙 배열
 * @returns {Array} 정렬된 규칙 배열
 */
export function getEncodeOrderFromRules(rules) {
  const validRules = rules
    .filter((rule) => rule && rule.to && rule.to.trim() !== "")
    .filter((rule) => rule && rule.from && rule.from.trim() !== "");

  return [...validRules].sort((a, b) => b.from.length - a.from.length);
}

