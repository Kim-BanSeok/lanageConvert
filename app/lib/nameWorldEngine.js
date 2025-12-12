// app/lib/nameWorldEngine.js

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function hashSeed(str) {
  // 간단 시드 해시
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function seededRandom(seed) {
  // LCG
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(1664525, s) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function analyzeRulesTone(rules) {
  const toText = (rules || []).map(r => (r.to || "")).join("");
  const seed = hashSeed(toText || "default");
  const rnd = seededRandom(seed);

  const vowels = "aeiou";
  let vCount = 0, cCount = 0;
  for (const ch of toText.toLowerCase()) {
    if (/[a-z]/.test(ch)) {
      if (vowels.includes(ch)) vCount++;
      else cCount++;
    }
  }

  const ratio = (vCount + cCount) ? vCount / (vCount + cCount) : 0.45;

  // ratio가 높으면 부드러운 느낌, 낮으면 하드/암호 느낌
  const phonetic = ratio >= 0.48 ? "soft" : ratio <= 0.38 ? "cryptic" : "balanced";

  // 길이가 길면 의식/주문 느낌, 짧으면 코드/암호 느낌
  const avgToLen = (rules?.length ? (rules.reduce((a, r) => a + (r.to || "").length, 0) / rules.length) : 2);
  const style = avgToLen >= 4 ? "ritual" : avgToLen <= 2 ? "code" : "normal";

  // 색감(세계관 톤)
  const worldTone = rnd() < 0.33 ? "ancient" : rnd() < 0.66 ? "noir" : "sci-fi";

  return { phonetic, style, worldTone, seed };
}

export function generateLanguageIdentity({ rules, purpose, mood, baseName }) {
  const analysis = analyzeRulesTone(rules || []);
  const seed = analysis.seed ^ hashSeed((purpose || "") + "|" + (mood || "") + "|" + (baseName || ""));
  const rnd = seededRandom(seed);

  const nameSets = {
    soft: ["LUNAR", "AURIA", "VELIA", "SEREN", "ELUNA", "ORINA", "MIRAE"],
    balanced: ["NOVA", "VORTA", "ZARION", "KALEN", "ARCAD", "NEBULA", "RIVEN"],
    cryptic: ["XQ-9", "ZKRY", "V0XEN", "QNR", "KX-17", "Z3RO", "VXCRYPT"],
  };

  const suffixes = {
    ancient: ["-um", "-ara", "-ith", "-or", "-en"],
    "sci-fi": ["-X", "-Core", "-Net", "-Lab", "-Sync"],
    noir: ["-Noir", "-Shade", "-Cipher", "-Vault", "-Ink"],
  };

  const purposeHooks = {
    diary: ["비밀 일기", "개인 기록", "감정 암호화", "혼잣말 보관"],
    lovers: ["연인 암호", "둘만의 코드", "기념일 메시지", "장난스러운 비밀"],
    game: ["게임 세계관", "NPC 대사", "고대 주문", "길드 암호"],
    work: ["업무용 약어", "메모 난독화", "팀 코드", "지식 보호"],
    crypto: ["강한 난독화", "암호 텍스트", "키 기반 언어", "보안 메시지"],
  };

  const moodHooks = {
    mystery: ["미스테리", "금지된 기록", "비밀 조직", "봉인된 문서"],
    warm: ["따뜻함", "추억", "감성", "부드러운 톤"],
    hard: ["하드SF", "냉정함", "기계적", "실험실"],
    ancient: ["고대", "유물", "문명", "의식"],
  };

  const set = nameSets[analysis.phonetic] || nameSets.balanced;
  const rawName = baseName?.trim()
    ? baseName.trim().toUpperCase()
    : (pick(set));

  const suffixPool = suffixes[analysis.worldTone] || suffixes["sci-fi"];
  const suffix = rnd() < 0.7 ? pick(suffixPool) : "";

  const languageName = `${rawName}${suffix}`.replace(/\s+/g, "");

  const p = purpose || pick(["diary", "lovers", "game", "work", "crypto"]);
  const m = mood || pick(["mystery", "warm", "hard", "ancient"]);

  const hook1 = pick(purposeHooks[p] || purposeHooks.work);
  const hook2 = pick(moodHooks[m] || moodHooks.mystery);

  const origin = (() => {
    if (analysis.worldTone === "ancient") return "고대 문명에서 내려온 '기억 봉인' 문자 체계가 현대식 규칙으로 재해석되며 탄생했다.";
    if (analysis.worldTone === "noir") return "도시의 뒷골목 기록자들이 정보를 숨기기 위해 만든 '잉크 암호'가 온라인으로 확산되며 표준이 되었다.";
    return "실험실에서 규칙 기반 변환을 반복 최적화하며 만들어진 '규칙 합성 언어'로, 문장 단위 번역이 가능하도록 설계됐다.";
  })();

  const usage = [
    `주 용도: ${hook1}`,
    `감성/톤: ${hook2}`,
    `스타일: ${analysis.style === "ritual" ? "주문/의식형" : analysis.style === "code" ? "코드/암호형" : "일반형"}`,
    `음색: ${analysis.phonetic === "soft" ? "부드러움" : analysis.phonetic === "cryptic" ? "암호스러움" : "균형"}`,
  ];

  const tagline = (() => {
    if (analysis.phonetic === "cryptic") return "보이는 건 문자, 남는 건 비밀.";
    if (analysis.style === "ritual") return "문장은 주문이 되고, 규칙은 세계가 된다.";
    return "한 문장으로, 다른 세계로.";
  })();

  const worldDesc =
    `**${languageName}**은(는) ${origin}\n` +
    `이 언어는 사용자가 입력한 문장을 규칙에 따라 변환하며, 학습 샘플이 누적될수록 표현이 더 자연스럽게 '진화'한다.`;

  return {
    name: languageName,
    tagline,
    purpose: p,
    mood: m,
    origin,
    usage,
    description: worldDesc,
    analysis,
  };
}

