/**
 * AI 언어 이름 자동 생성기
 */

/**
 * 언어 규칙의 특성을 분석
 */
export function analyzeLanguageCharacteristics(rules) {
  const validRules = rules.filter(r => r && r.from && r.to);
  
  if (validRules.length === 0) {
    return {
      avgLength: 0,
      hasKorean: false,
      hasEnglish: false,
      hasNumbers: false,
      hasSymbols: false,
      complexity: 0,
      pattern: "empty",
    };
  }

  let totalLength = 0;
  let hasKorean = false;
  let hasEnglish = false;
  let hasNumbers = false;
  let hasSymbols = false;

  validRules.forEach(rule => {
    const to = rule.to || "";
    totalLength += to.length;

    // 한글 체크
    if (/[가-힣]/.test(to)) hasKorean = true;
    
    // 영어 체크
    if (/[a-zA-Z]/.test(to)) hasEnglish = true;
    
    // 숫자 체크
    if (/[0-9]/.test(to)) hasNumbers = true;
    
    // 특수문자 체크
    if (/[^가-힣a-zA-Z0-9\s]/.test(to)) hasSymbols = true;
  });

  const avgLength = totalLength / validRules.length;
  const complexity = validRules.length * avgLength;

  // 패턴 분석
  let pattern = "mixed";
  if (hasKorean && !hasEnglish) pattern = "korean";
  else if (hasEnglish && !hasKorean) pattern = "english";
  else if (avgLength < 2) pattern = "simple";
  else if (avgLength > 5) pattern = "complex";

  return {
    avgLength,
    hasKorean,
    hasEnglish,
    hasNumbers,
    hasSymbols,
    complexity,
    pattern,
    ruleCount: validRules.length,
  };
}

/**
 * 언어 이름 생성 알고리즘
 */
export function generateLanguageNames(rules, count = 5) {
  const characteristics = analyzeLanguageCharacteristics(rules);
  const names = [];

  // 이름 생성 템플릿
  const prefixes = [
    "Neo", "Cyber", "Crypto", "Mystic", "Ancient", "Future",
    "Stellar", "Quantum", "Digital", "Arcane", "Sacred", "Dark",
    "Light", "Royal", "Wild", "Hidden", "Secret", "Lost"
  ];

  const suffixes = [
    "ian", "ese", "ish", "ic", "an", "en", "ar", "ix",
    "os", "is", "us", "or", "il", "el", "on", "yn"
  ];

  const baseWords = [
    "Lingua", "Tongua", "Verba", "Lexis", "Glossa", "Logis",
    "Scripta", "Voxis", "Phonea", "Gramma", "Signa", "Runa"
  ];

  // 특성 기반 이름 생성
  if (characteristics.pattern === "korean") {
    names.push(
      "한글암호어",
      "비밀한글",
      "고대한글",
      "신세계어",
      "은어韓"
    );
  } else if (characteristics.pattern === "english") {
    names.push(
      `${prefixes[Math.floor(Math.random() * prefixes.length)]}${suffixes[Math.floor(Math.random() * suffixes.length)]}`,
      `${baseWords[Math.floor(Math.random() * baseWords.length)]}`,
      `Crypto${suffixes[Math.floor(Math.random() * suffixes.length)]}`,
      `Neo${baseWords[Math.floor(Math.random() * baseWords.length)]}`,
      `${prefixes[Math.floor(Math.random() * prefixes.length)]}Speak`
    );
  } else {
    // 혼합 패턴
    names.push(
      `${prefixes[Math.floor(Math.random() * prefixes.length)]}${baseWords[Math.floor(Math.random() * baseWords.length)]}`,
      `${baseWords[Math.floor(Math.random() * baseWords.length)]}${suffixes[Math.floor(Math.random() * suffixes.length)]}`,
      `비밀${prefixes[Math.floor(Math.random() * prefixes.length)]}어`,
      `암호${baseWords[Math.floor(Math.random() * baseWords.length)]}`,
      `Neo한글${suffixes[Math.floor(Math.random() * suffixes.length)]}`
    );
  }

  // 복잡도 기반 추가 이름
  if (characteristics.complexity > 100) {
    names.push("ComplexCipher", "DeepCode", "AdvancedScript");
  } else if (characteristics.complexity < 50) {
    names.push("SimpleTongue", "BasicCode", "EasySpeak");
  }

  // 규칙 수 기반 추가 이름
  if (characteristics.ruleCount > 50) {
    names.push("MegaLexicon", "UltraScript", "OmniCode");
  } else if (characteristics.ruleCount < 10) {
    names.push("MiniLang", "TinyCode", "MicroSpeak");
  }

  // 중복 제거 및 랜덤 선택
  const uniqueNames = [...new Set(names)];
  
  // 추가 랜덤 이름 생성
  while (uniqueNames.length < count) {
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const base = baseWords[Math.floor(Math.random() * baseWords.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    
    const variants = [
      `${prefix}${base}`,
      `${base}${suffix}`,
      `${prefix}${suffix}`,
      `${base}${prefix}`,
    ];
    
    const newName = variants[Math.floor(Math.random() * variants.length)];
    if (!uniqueNames.includes(newName)) {
      uniqueNames.push(newName);
    }
  }

  return uniqueNames.slice(0, count);
}

/**
 * 이름 설명 생성
 */
export function generateNameDescription(name, characteristics) {
  const descriptions = [];

  if (characteristics.hasKorean && characteristics.hasEnglish) {
    descriptions.push("한영 혼합 언어");
  } else if (characteristics.hasKorean) {
    descriptions.push("한글 기반 언어");
  } else if (characteristics.hasEnglish) {
    descriptions.push("영문 기반 언어");
  }

  if (characteristics.complexity > 100) {
    descriptions.push("고급 복잡도");
  } else if (characteristics.complexity < 50) {
    descriptions.push("단순 구조");
  } else {
    descriptions.push("중급 복잡도");
  }

  descriptions.push(`${characteristics.ruleCount}개 규칙`);

  if (characteristics.avgLength > 5) {
    descriptions.push("긴 단어 변환");
  } else if (characteristics.avgLength < 2) {
    descriptions.push("짧은 단어 변환");
  }

  return descriptions.join(" · ");
}

