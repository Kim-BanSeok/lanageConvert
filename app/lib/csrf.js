/**
 * 🛡️ CSRF (Cross-Site Request Forgery) 보호
 * 토큰 기반 CSRF 방어 시스템
 */

import { cookies } from 'next/headers';

const CSRF_COOKIE_NAME = 'csrf_token';
const CSRF_HEADER_NAME = 'x-csrf-token';

/**
 * 랜덤 CSRF 토큰 생성
 * @returns {string}
 */
function generateToken() {
  const array = new Uint8Array(32);
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    crypto.getRandomValues(array);
  } else {
    // Fallback for older environments
    for (let i = 0; i < array.length; i++) {
      array[i] = Math.floor(Math.random() * 256);
    }
  }
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * CSRF 토큰 생성 및 쿠키에 설정
 * @returns {string} token
 */
export async function generateCsrfToken() {
  const token = generateToken();
  const cookieStore = await cookies();
  
  cookieStore.set(CSRF_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24, // 24시간
    path: '/',
  });

  return token;
}

/**
 * CSRF 토큰 검증
 * @param {Request} request
 * @returns {boolean}
 */
export async function verifyCsrfToken(request) {
  try {
    const cookieStore = await cookies();
    const cookieToken = cookieStore.get(CSRF_COOKIE_NAME)?.value;
    
    // 헤더 또는 body에서 토큰 추출
    let requestToken = request.headers.get(CSRF_HEADER_NAME);
    
    // POST 요청인 경우 body에서도 확인
    if (!requestToken && request.method === 'POST') {
      try {
        const body = await request.clone().json();
        requestToken = body.csrfToken || body.csrf_token;
      } catch (e) {
        // JSON 파싱 실패 시 무시
      }
    }

    // 토큰이 없으면 실패
    if (!cookieToken || !requestToken) {
      return false;
    }

    // 토큰 비교 (타이밍 공격 방지를 위한 상수 시간 비교)
    return timingSafeEqual(cookieToken, requestToken);
  } catch (error) {
    console.error('CSRF verification error:', error);
    return false;
  }
}

/**
 * 타이밍 공격 방지 문자열 비교
 * @param {string} a
 * @param {string} b
 * @returns {boolean}
 */
function timingSafeEqual(a, b) {
  if (a.length !== b.length) {
    return false;
  }

  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }

  return result === 0;
}

/**
 * CSRF 토큰 가져오기 (클라이언트용)
 * @returns {Promise<string>}
 */
export async function getCsrfToken() {
  try {
    const response = await fetch('/api/csrf-token');
    const data = await response.json();
    return data.token;
  } catch (error) {
    console.error('Failed to get CSRF token:', error);
    return '';
  }
}

/**
 * CSRF 미들웨어 헬퍼
 * @param {Request} request
 * @returns {Promise<Response|null>} 검증 실패 시 에러 응답, 성공 시 null
 */
export async function csrfMiddleware(request) {
  // GET, HEAD, OPTIONS는 CSRF 검증 생략
  if (['GET', 'HEAD', 'OPTIONS'].includes(request.method)) {
    return null;
  }

  const isValid = await verifyCsrfToken(request);

  if (!isValid) {
    return new Response(
      JSON.stringify({ 
        error: 'Invalid CSRF token',
        message: 'CSRF 토큰이 유효하지 않습니다.'
      }),
      {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  return null;
}

