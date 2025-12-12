// app/lib/evolutionRecommend.js

import { safeLocalStorageGet, safeLocalStorageSet, safeLocalStorageRemove } from "../utils/storage";

const RECOMMEND_KEY = "evolution_recommend_state_v1";

function loadState() {
  if (typeof window === "undefined") return null;
  try {
    const value = safeLocalStorageGet(RECOMMEND_KEY);
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}

function saveState(state) {
  if (typeof window === "undefined") return;
  safeLocalStorageSet(RECOMMEND_KEY, JSON.stringify(state));
}

/**
 * 추천 가능 여부 판단
 */
export function shouldRecommendEvolution(sampleCount, threshold = 20) {
  const state = loadState();

  // 처음이거나 이전보다 샘플이 늘었을 때만
  if (!state) return sampleCount >= threshold;

  if (sampleCount >= threshold && sampleCount > state.lastSampleCount) {
    return true;
  }

  return false;
}

/**
 * 추천을 표시했음을 기록
 */
export function markRecommended(sampleCount) {
  saveState({
    lastRecommendedAt: Date.now(),
    lastSampleCount: sampleCount,
  });
}

/**
 * 진화 적용 완료 시 리셋
 */
export function resetRecommendState() {
  if (typeof window === "undefined") return;
  safeLocalStorageRemove(RECOMMEND_KEY);
}

