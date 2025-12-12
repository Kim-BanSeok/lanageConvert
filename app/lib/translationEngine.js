/**
 * v2 번역 엔진
 * 규칙(rules)을 이용해 문장을 인코딩/디코딩한다.
 * rules: [{ from: string, to: string }, ...]
 */

/**
 * 규칙을 길이 순으로 정렬 (긴 문자열 먼저 처리 → 부분치환 충돌 줄이기)
 */
function sortRulesForSubstring(rules, direction = "encode") {
  const copy = [...rules];
  if (direction === "encode") {
    // from 길이 기준
    copy.sort((a, b) => (b.from || "").length - (a.from || "").length);
  } else {
    // decode: to 길이 기준
    copy.sort((a, b) => (b.to || "").length - (a.to || "").length);
  }
  return copy;
}

/**
 * substring 모드: 텍스트 전체에서 부분 문자열 치환
 * 기존 v1 방식 개선 버전
 */
function applySubstringMode(text, rules, direction = "encode") {
  let result = text;
  const sorted = sortRulesForSubstring(rules, direction);

  if (direction === "encode") {
    sorted.forEach((rule) => {
      if (!rule.from) return;
      const from = rule.from;
      const to = rule.to ?? "";
      result = result.split(from).join(to);
    });
  } else {
    sorted.forEach((rule) => {
      if (!rule.to) return;
      const from = rule.from ?? "";
      const to = rule.to;
      result = result.split(to).join(from);
    });
  }

  return result;
}

/**
 * word / hybrid 모드에서 사용할 토큰화
 * 공백을 기준으로 split하되, 공백 자체도 토큰으로 유지
 */
function tokenizeBySpace(text) {
  // "나는 오늘 커피를" → ["나는", " ", "오늘", " ", "커피를"]
  return text.split(/(\s+)/);
}

/**
 * rules를 단어 규칙 / 문자 규칙으로 분리
 * - wordRules: from 길이가 2 이상이거나 공백 포함
 * - charRules: from 길이가 정확히 1
 */
function splitWordAndCharRules(rules) {
  const wordRules = [];
  const charRules = [];

  rules.forEach((r) => {
    const from = r.from || "";
    if (from.length === 1) {
      charRules.push(r);
    } else {
      wordRules.push(r);
    }
  });

  return { wordRules, charRules };
}

/**
 * word 모드: 공백 기준 단어 단위로만 치환
 */
function applyWordMode(text, rules, direction = "encode") {
  const { wordRules } = splitWordAndCharRules(rules);

  // 빠른 검색을 위해 Map 사용
  const map = new Map();
  if (direction === "encode") {
    wordRules.forEach((r) => {
      if (r.from) map.set(r.from, r.to ?? "");
    });
  } else {
    wordRules.forEach((r) => {
      if (r.to) map.set(r.to, r.from ?? "");
    });
  }

  const tokens = tokenizeBySpace(text);
  const translatedTokens = tokens.map((tk) => {
    // 공백은 그대로 유지
    if (tk.trim() === "") return tk;
    // 단어가 규칙에 있으면 치환, 아니면 그대로
    if (map.has(tk)) return map.get(tk);
    return tk;
  });

  return translatedTokens.join("");
}

/**
 * hybrid 모드:
 * 1) 단어 규칙(길이 2 이상)을 단어 단위로 먼저 치환
 * 2) 1글자짜리 문자 규칙을 문자 단위로 한 번 더 적용
 */
function applyHybridMode(text, rules, direction = "encode") {
  const { wordRules, charRules } = splitWordAndCharRules(rules);

  // 1단계: word 모드 적용
  const afterWord = applyWordMode(text, wordRules, direction);

  // 2단계: charRules를 substring 모드로 적용
  const afterChar = applySubstringMode(afterWord, charRules, direction);

  return afterChar;
}

/**
 * 외부에서 사용하는 main 함수
 * @param {string} text
 * @param {Array<{from:string, to:string}>} rules
 * @param {{direction?: 'encode' | 'decode', mode?: 'substring' | 'word' | 'hybrid'}} options
 * @returns {string}
 */
export function translateText(text, rules, options = {}) {
  const { direction = "encode", mode = "hybrid" } = options;

  if (!text || !Array.isArray(rules) || rules.length === 0) {
    return text || "";
  }

  // 유효한 규칙만 필터링
  const validRules = rules.filter(
    (r) => r && ((direction === "encode" && r.from) || (direction === "decode" && r.to))
  );

  if (validRules.length === 0) {
    return text;
  }

  switch (mode) {
    case "substring":
      return applySubstringMode(text, validRules, direction);
    case "word":
      return applyWordMode(text, validRules, direction);
    case "hybrid":
    default:
      return applyHybridMode(text, validRules, direction);
  }
}

