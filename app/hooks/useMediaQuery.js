"use client";

import { useState, useEffect } from 'react';

/**
 * 미디어 쿼리 감지 Hook
 * @param {string} query - 미디어 쿼리 (예: '(max-width: 768px)')
 * @returns {boolean}
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const media = window.matchMedia(query);
    
    // 초기값 설정
    setMatches(media.matches);

    // 리스너 설정
    const listener = (e) => setMatches(e.matches);
    
    // 최신 브라우저
    if (media.addEventListener) {
      media.addEventListener('change', listener);
      return () => media.removeEventListener('change', listener);
    } 
    // 레거시 브라우저
    else {
      media.addListener(listener);
      return () => media.removeListener(listener);
    }
  }, [query]);

  // SSR 시 false 반환
  return mounted ? matches : false;
}

/**
 * 모바일 여부 감지
 */
export function useIsMobile() {
  return useMediaQuery('(max-width: 768px)');
}

/**
 * 태블릿 여부 감지
 */
export function useIsTablet() {
  return useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
}

/**
 * 데스크톱 여부 감지
 */
export function useIsDesktop() {
  return useMediaQuery('(min-width: 1025px)');
}

