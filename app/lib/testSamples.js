/**
 * 📝 테스트 문장 샘플 데이터베이스
 * 언어 규칙 테스트용 다양한 샘플 문장들
 */

export const TEST_SAMPLES = {
  korean: {
    basic: [
      "안녕하세요",
      "감사합니다",
      "사랑해요",
      "좋은 하루 되세요",
      "행복하세요",
    ],
    sentences: [
      "나는 학교에 갑니다",
      "오늘 날씨가 정말 좋아요",
      "친구와 함께 영화를 봤어요",
      "맛있는 음식을 먹고 싶어요",
      "내일은 더 좋은 날이 될 거예요",
    ],
    conversation: [
      "안녕! 잘 지냈어?",
      "응, 잘 지냈어. 너는?",
      "나도 잘 지냈어. 오늘 뭐 해?",
      "영화 보러 갈 건데 같이 갈래?",
      "좋아! 몇 시에 만날까?",
    ],
    proverbs: [
      "백문이 불여일견",
      "천리 길도 한 걸음부터",
      "티끌 모아 태산",
      "소 잃고 외양간 고친다",
      "원숭이도 나무에서 떨어진다",
    ],
  },
  english: {
    basic: [
      "Hello",
      "Thank you",
      "I love you",
      "Have a nice day",
      "Good luck",
    ],
    sentences: [
      "I go to school",
      "The weather is really nice today",
      "I watched a movie with my friend",
      "I want to eat delicious food",
      "Tomorrow will be a better day",
    ],
    conversation: [
      "Hi! How have you been?",
      "I've been good. How about you?",
      "I've been great. What are you doing today?",
      "I'm going to watch a movie. Want to come?",
      "Sure! What time should we meet?",
    ],
    proverbs: [
      "Actions speak louder than words",
      "A journey of a thousand miles begins with a single step",
      "Rome wasn't built in a day",
      "Better late than never",
      "Practice makes perfect",
    ],
  },
  mixed: [
    "Hello 안녕하세요",
    "I love 한국",
    "Thank you 감사합니다",
    "Good morning 좋은 아침",
    "See you tomorrow 내일 봐요",
  ],
  numbers: [
    "1234567890",
    "010-1234-5678",
    "2024년 12월 13일",
    "가격: 10,000원",
    "Score: 100/100",
  ],
  special: [
    "!@#$%^&*()",
    "이메일: test@example.com",
    "웹사이트: https://example.com",
    "해시태그: #테스트 #번역",
    "이모지: 😀 🎉 ❤️",
  ],
};

/**
 * 카테고리별 샘플 가져오기
 */
export function getSamplesByCategory(language, category) {
  if (language === 'mixed' || language === 'numbers' || language === 'special') {
    return TEST_SAMPLES[language] || [];
  }
  return TEST_SAMPLES[language]?.[category] || [];
}

/**
 * 모든 샘플 가져오기
 */
export function getAllSamples() {
  const all = [];
  
  // 한국어
  Object.values(TEST_SAMPLES.korean).forEach(samples => {
    all.push(...samples);
  });
  
  // 영어
  Object.values(TEST_SAMPLES.english).forEach(samples => {
    all.push(...samples);
  });
  
  // 혼합/숫자/특수문자
  all.push(...TEST_SAMPLES.mixed);
  all.push(...TEST_SAMPLES.numbers);
  all.push(...TEST_SAMPLES.special);
  
  return all;
}

/**
 * 랜덤 샘플 가져오기
 */
export function getRandomSamples(count = 5) {
  const all = getAllSamples();
  const shuffled = [...all].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/**
 * 카테고리 정보
 */
export const CATEGORIES = {
  korean: {
    label: "한국어",
    subcategories: {
      basic: "기본 인사",
      sentences: "일상 문장",
      conversation: "대화",
      proverbs: "속담",
    },
  },
  english: {
    label: "English",
    subcategories: {
      basic: "Basic Greetings",
      sentences: "Daily Sentences",
      conversation: "Conversation",
      proverbs: "Proverbs",
    },
  },
  mixed: {
    label: "한영 혼합",
  },
  numbers: {
    label: "숫자/날짜",
  },
  special: {
    label: "특수문자",
  },
};

/**
 * 사용자 정의 샘플 추가
 */
export function addCustomSample(sample) {
  // localStorage에 사용자 정의 샘플 저장
  const key = 'custom-test-samples';
  const existing = JSON.parse(localStorage.getItem(key) || '[]');
  existing.push({
    text: sample,
    timestamp: Date.now(),
  });
  localStorage.setItem(key, JSON.stringify(existing));
}

/**
 * 사용자 정의 샘플 가져오기
 */
export function getCustomSamples() {
  const key = 'custom-test-samples';
  const samples = JSON.parse(localStorage.getItem(key) || '[]');
  return samples.map(s => s.text);
}

/**
 * 샘플 검색
 */
export function searchSamples(query) {
  if (!query.trim()) return [];
  
  const all = getAllSamples();
  const custom = getCustomSamples();
  const combined = [...all, ...custom];
  
  return combined.filter(sample => 
    sample.toLowerCase().includes(query.toLowerCase())
  );
}

