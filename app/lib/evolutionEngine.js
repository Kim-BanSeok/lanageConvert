// app/lib/evolutionEngine.js

const STORE_KEY = "evolution_samples_v1";
const VERSION_KEY = "language_versions_v1";

/**
 * 샘플 저장 구조:
 * [{ id, ts, original, translated, mode }]
 */

function safeJsonParse(s, fallback) {
  try { return JSON.parse(s); } catch { return fallback; }
}

export function loadSamples() {
  if (typeof window === "undefined") return [];
  const result = safeJsonParse(localStorage.getItem(STORE_KEY), []);
  // null이나 undefined가 반환되지 않도록 보장
  return Array.isArray(result) ? result : [];
}

export function saveSamples(samples) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORE_KEY, JSON.stringify(samples));
}

export function addSample({ original, translated, mode }) {
  const samples = loadSamples();
  samples.push({
    id: cryptoRandomId(),
    ts: Date.now(),
    original: (original || "").trim(),
    translated: (translated || "").trim(),
    mode: mode || "word", // default
  });
  saveSamples(samples);
  return samples;
}

export function clearSamples() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORE_KEY);
}

function cryptoRandomId() {
  // 브라우저 환경 가정
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    const a = new Uint32Array(4);
    crypto.getRandomValues(a);
    return Array.from(a).map(x => x.toString(16)).join("");
  }
  return String(Date.now()) + "_" + Math.random().toString(16).slice(2);
}

/**
 * 가장 단순/강력한 학습: 공백 기준 단어 정렬
 * - 단어 개수가 같을 때만 학습
 * - 관측횟수 기반으로 from->to 결정
 */
export function learnWordRulesFromSamples(samples, { minCount = 1 } = {}) {
  // counts[from][to] = n
  const counts = new Map();

  for (const s of samples) {
    const o = (s.original || "").trim();
    const t = (s.translated || "").trim();
    if (!o || !t) continue;

    const oWords = o.split(/\s+/);
    const tWords = t.split(/\s+/);

    if (oWords.length !== tWords.length) continue;

    for (let i = 0; i < oWords.length; i++) {
      const from = oWords[i];
      const to = tWords[i];

      if (!from) continue;

      if (!counts.has(from)) counts.set(from, new Map());
      const inner = counts.get(from);
      inner.set(to, (inner.get(to) || 0) + 1);
    }
  }

  // from마다 가장 높은 to를 선택
  const learned = [];
  for (const [from, inner] of counts.entries()) {
    let bestTo = null;
    let bestN = 0;
    for (const [to, n] of inner.entries()) {
      if (n > bestN) {
        bestN = n;
        bestTo = to;
      }
    }
    if (bestTo != null && bestN >= minCount) {
      learned.push({ from, to: bestTo, weight: bestN });
    }
  }

  // 안정성을 위해 긴 from 먼저(치환 충돌 감소)
  learned.sort((a, b) => b.from.length - a.from.length);

  // weight 제거하고 rules 형태로 반환
  return learned.map(r => ({ from: r.from, to: r.to }));
}

/**
 * 충돌 해결 + 규칙 병합
 * - baseRules(기존) + learnedRules(학습) 를 합치되,
 *   동일 from이면 learned 우선
 * - 결과 중복 제거
 */
export function mergeRules(baseRules, learnedRules) {
  const map = new Map();

  // base 먼저
  (baseRules || []).forEach(r => {
    const from = (r.from || "").trim();
    const to = (r.to || "").trim();
    if (!from) return;
    map.set(from, to);
  });

  // learned로 덮어쓰기
  (learnedRules || []).forEach(r => {
    const from = (r.from || "").trim();
    const to = (r.to || "").trim();
    if (!from) return;
    map.set(from, to);
  });

  // map -> array
  return Array.from(map.entries()).map(([from, to]) => ({ from, to }));
}

/**
 * 규칙 정리(정규화)
 * - 빈 값 제거
 * - 완전 동일 중복 제거
 */
export function normalizeRules(rules) {
  const seen = new Set();
  const out = [];

  for (const r of rules || []) {
    const from = (r.from || "").trim();
    const to = (r.to || "").trim();

    if (!from) continue;
    const key = `${from}=>${to}`;

    if (seen.has(key)) continue;
    seen.add(key);

    out.push({ from, to });
  }

  // 긴 from 우선(치환 안정화)
  out.sort((a, b) => b.from.length - a.from.length);
  return out;
}

/**
 * 버전 저장/불러오기 (rollback용)
 */
export function loadVersions() {
  if (typeof window === "undefined") return [];
  const result = safeJsonParse(localStorage.getItem(VERSION_KEY), []);
  // null이나 undefined가 반환되지 않도록 보장
  return Array.isArray(result) ? result : [];
}

export function saveVersion({ name, rules, meta }) {
  const versions = loadVersions();
  versions.unshift({
    id: cryptoRandomId(),
    ts: Date.now(),
    name: name || `v${versions.length + 1}`,
    rules: rules || [],
    meta: meta || {},
  });
  localStorage.setItem(VERSION_KEY, JSON.stringify(versions));
  return versions;
}

export function deleteVersion(id) {
  const versions = loadVersions().filter(v => v.id !== id);
  localStorage.setItem(VERSION_KEY, JSON.stringify(versions));
  return versions;
}

