/**
 * 🛡️ Rate Limiter
 * 메모리 기반 간단한 rate limiting
 * API 요청 제한으로 DDoS 및 브루트포스 공격 방어
 */

// 요청 저장소 (IP별)
const requests = new Map();

// 설정
const RATE_LIMIT_CONFIG = {
  // API별 제한 설정 (windowMs 내에 maxRequests까지 허용)
  default: {
    windowMs: 60 * 1000, // 1분
    maxRequests: 60, // 60회
  },
  login: {
    windowMs: 15 * 60 * 1000, // 15분
    maxRequests: 5, // 5회 (브루트포스 방지)
  },
  stats: {
    windowMs: 60 * 1000, // 1분
    maxRequests: 30, // 30회
  },
};

/**
 * Rate limiter 미들웨어
 * @param {string} identifier - 사용자 식별자 (보통 IP)
 * @param {string} type - API 타입 ('default', 'login', 'stats')
 * @returns {Object} { allowed: boolean, resetTime: number, remaining: number }
 */
export function checkRateLimit(identifier, type = 'default') {
  const config = RATE_LIMIT_CONFIG[type] || RATE_LIMIT_CONFIG.default;
  const now = Date.now();
  const key = `${identifier}:${type}`;

  // 기존 요청 기록 가져오기
  let record = requests.get(key);

  // 기록이 없거나 시간 윈도우가 지났으면 초기화
  if (!record || now - record.windowStart > config.windowMs) {
    record = {
      windowStart: now,
      count: 0,
    };
    requests.set(key, record);
  }

  // 요청 카운트 증가
  record.count++;

  // 제한 확인
  const allowed = record.count <= config.maxRequests;
  const resetTime = record.windowStart + config.windowMs;
  const remaining = Math.max(0, config.maxRequests - record.count);

  // 오래된 기록 정리 (메모리 누수 방지)
  cleanupOldRecords();

  return {
    allowed,
    resetTime,
    remaining,
    limit: config.maxRequests,
  };
}

/**
 * 오래된 요청 기록 정리 (5분 이상 지난 것)
 */
function cleanupOldRecords() {
  const now = Date.now();
  const maxAge = 5 * 60 * 1000; // 5분

  for (const [key, record] of requests.entries()) {
    if (now - record.windowStart > maxAge) {
      requests.delete(key);
    }
  }
}

/**
 * 특정 식별자의 rate limit 리셋
 * @param {string} identifier
 * @param {string} type
 */
export function resetRateLimit(identifier, type = 'default') {
  const key = `${identifier}:${type}`;
  requests.delete(key);
}

/**
 * Next.js API 라우트용 헬퍼
 * @param {Request} request
 * @param {string} type
 * @returns {Object}
 */
export function rateLimitCheck(request, type = 'default') {
  // IP 주소 추출
  const ip = 
    request.headers.get('x-forwarded-for')?.split(',')[0] ||
    request.headers.get('x-real-ip') ||
    'unknown';

  return checkRateLimit(ip, type);
}

