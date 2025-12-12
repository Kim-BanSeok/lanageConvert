"use client";

import { useEffect } from "react";

/**
 * Service Worker 수동 등록 컴포넌트
 * next-pwa가 자동으로 등록하지만, 추가 커스텀 로직이 필요할 때 사용
 */
export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      // next-pwa가 자동으로 등록하므로 여기서는 추가 로직만 처리
      navigator.serviceWorker.ready.then((registration) => {
        console.log("[SW] Service Worker ready:", registration.scope);
        
        // 업데이트 확인
        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener("statechange", () => {
              if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
                // 새 버전이 설치되었을 때 알림 (선택사항)
                console.log("[SW] New version available");
              }
            });
          }
        });
      });

      // 오프라인/온라인 상태 변경 감지
      const handleOnline = () => {
        console.log("[SW] Online");
      };

      const handleOffline = () => {
        console.log("[SW] Offline");
      };

      window.addEventListener("online", handleOnline);
      window.addEventListener("offline", handleOffline);

      return () => {
        window.removeEventListener("online", handleOnline);
        window.removeEventListener("offline", handleOffline);
      };
    }
  }, []);

  return null;
}

