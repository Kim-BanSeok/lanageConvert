// 🚀 v3 번역 엔진 - 성능 최적화 버전
// 100개+ 규칙에서도 빠른 성능 보장

/**
 * 규칙 인덱싱: Map 기반 빠른 검색
 */
class RuleIndex {
  constructor(rules) {
    this.rules = rules;
    this.exactMatchMap = new Map();
    this.prefixMap = new Map();
    this.sortedRules = [];
    
    this.buildIndex();
  }

  buildIndex() {
    // 정확히 일치하는 규칙 인덱싱
    this.rules.forEach((rule, idx) => {
      if (rule.from && rule.to !== undefined) {
        this.exactMatchMap.set(rule.from, { ...rule, index: idx });
      }
    });

    // 길이 순으로 정렬 (긴 문자열 우선)
    this.sortedRules = [...this.rules]
      .filter(r => r.from && r.to !== undefined)
      .sort((a, b) => b.from.length - a.from.length);
  }

  // O(1) 정확 매칭
  getExactMatch(text) {
    return this.exactMatchMap.get(text);
  }

  // 정렬된 규칙 반환
  getSortedRules() {
    return this.sortedRules;
  }
}

/**
 * 번역 결과 캐싱
 */
class TranslationCache {
  constructor(maxSize = 1000) {
    this.cache = new Map();
    this.maxSize = maxSize;
  }

  // 캐시 키 생성
  _getCacheKey(text, rules, direction, mode) {
    return `${direction}:${mode}:${text}:${rules.length}`;
  }

  get(text, rules, direction, mode) {
    const key = this._getCacheKey(text, rules, direction, mode);
    return this.cache.get(key);
  }

  set(text, rules, direction, mode, result) {
    const key = this._getCacheKey(text, rules, direction, mode);
    
    // 크기 제한
    if (this.cache.size >= this.maxSize) {
      // 가장 오래된 항목 제거 (FIFO)
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    
    this.cache.set(key, result);
  }

  clear() {
    this.cache.clear();
  }

  getSize() {
    return this.cache.size;
  }
}

// 전역 캐시 인스턴스
const translationCache = new TranslationCache();

/**
 * substring 모드 최적화 버전
 */
function applySubstringOptimized(text, ruleIndex, direction = "encode") {
  let result = text;
  const sortedRules = ruleIndex.getSortedRules();

  if (direction === "encode") {
    sortedRules.forEach((rule) => {
      if (!rule.from) return;
      // split + join이 replaceAll보다 빠름
      result = result.split(rule.from).join(rule.to ?? "");
    });
  } else {
    sortedRules.forEach((rule) => {
      if (!rule.to) return;
      result = result.split(rule.to).join(rule.from ?? "");
    });
  }

  return result;
}

/**
 * word 모드 최적화 버전
 */
function applyWordOptimized(text, ruleIndex, direction = "encode") {
  // 공백으로 토큰화 (정규식 사용)
  const tokens = text.split(/(\s+)/);
  
  // Map 기반 빠른 검색
  const translatedTokens = tokens.map((token) => {
    // 공백은 그대로
    if (/^\s+$/.test(token)) return token;
    
    // 정확 매칭
    const match = ruleIndex.getExactMatch(token);
    if (match) {
      return direction === "encode" ? match.to : token;
    }
    
    // 역방향 검색 (decode 시)
    if (direction === "decode") {
      for (const rule of ruleIndex.getSortedRules()) {
        if (rule.to === token) {
          return rule.from;
        }
      }
    }
    
    return token;
  });

  return translatedTokens.join("");
}

/**
 * hybrid 모드 최적화 버전
 */
function applyHybridOptimized(text, rules, direction = "encode") {
  // 단어 규칙과 문자 규칙 분리
  const wordRules = [];
  const charRules = [];

  rules.forEach((r) => {
    if (!r.from) return;
    if (r.from.length === 1) {
      charRules.push(r);
    } else {
      wordRules.push(r);
    }
  });

  // 1단계: 단어 규칙 적용
  const wordIndex = new RuleIndex(wordRules);
  let afterWord = applyWordOptimized(text, wordIndex, direction);

  // 2단계: 문자 규칙 적용
  const charIndex = new RuleIndex(charRules);
  let afterChar = applySubstringOptimized(afterWord, charIndex, direction);

  return afterChar;
}

/**
 * 메인 번역 함수 (v3 - 캐싱 지원)
 * @param {string} text 
 * @param {Array} rules 
 * @param {Object} options 
 * @param {boolean} useCache - 캐싱 사용 여부 (기본: true)
 */
export function translateTextV3(text, rules, options = {}, useCache = true) {
  const { direction = "encode", mode = "hybrid" } = options;

  // 빈 입력 처리
  if (!text || !Array.isArray(rules) || rules.length === 0) {
    return text || "";
  }

  // 캐시 확인
  if (useCache) {
    const cached = translationCache.get(text, rules, direction, mode);
    if (cached !== undefined) {
      return cached;
    }
  }

  // 규칙 인덱싱
  const ruleIndex = new RuleIndex(rules);

  let result;

  // 모드별 처리
  switch (mode) {
    case "substring":
      result = applySubstringOptimized(text, ruleIndex, direction);
      break;
    case "word":
      result = applyWordOptimized(text, ruleIndex, direction);
      break;
    case "hybrid":
    default:
      result = applyHybridOptimized(text, rules, direction);
      break;
  }

  // 캐시 저장
  if (useCache) {
    translationCache.set(text, rules, direction, mode, result);
  }

  return result;
}

/**
 * 대용량 텍스트 처리 (청크 기반)
 * @param {string} text 
 * @param {Array} rules 
 * @param {Object} options 
 * @param {number} chunkSize - 청크 크기 (기본: 10000자)
 */
export function translateLargeText(text, rules, options = {}, chunkSize = 10000) {
  if (text.length <= chunkSize) {
    return translateTextV3(text, rules, options);
  }

  // 텍스트를 청크로 분할
  const chunks = [];
  for (let i = 0; i < text.length; i += chunkSize) {
    chunks.push(text.substring(i, i + chunkSize));
  }

  // 각 청크를 번역
  const translatedChunks = chunks.map(chunk => 
    translateTextV3(chunk, rules, options)
  );

  return translatedChunks.join("");
}

/**
 * 배치 번역 (여러 텍스트를 한 번에)
 * @param {Array<string>} texts 
 * @param {Array} rules 
 * @param {Object} options 
 */
export function translateBatch(texts, rules, options = {}) {
  return texts.map(text => translateTextV3(text, rules, options));
}

/**
 * 캐시 관리
 */
export function clearTranslationCache() {
  translationCache.clear();
}

export function getTranslationCacheSize() {
  return translationCache.getSize();
}

/**
 * 성능 측정
 */
export function benchmarkTranslation(text, rules, options = {}, iterations = 100) {
  const startTime = performance.now();
  
  for (let i = 0; i < iterations; i++) {
    translateTextV3(text, rules, options, false); // 캐시 미사용
  }
  
  const endTime = performance.now();
  const totalTime = endTime - startTime;
  const avgTime = totalTime / iterations;

  return {
    totalTime: totalTime.toFixed(2),
    avgTime: avgTime.toFixed(2),
    iterations,
    textLength: text.length,
    rulesCount: rules.length
  };
}

/**
 * 성능 통계
 */
export function getPerformanceStats(text, rules, options = {}) {
  const ruleIndex = new RuleIndex(rules);
  
  return {
    textLength: text.length,
    rulesCount: rules.length,
    exactMatchRules: ruleIndex.exactMatchMap.size,
    sortedRulesCount: ruleIndex.sortedRules.length,
    cacheSize: translationCache.getSize(),
    cacheMaxSize: translationCache.maxSize
  };
}

