/**
 * 커스텀 Service Worker
 * PWA 오프라인 캐싱 최적화
 */

const CACHE_NAME = "language-app-cache-v1";
const STATIC_CACHE = [
  "/",
  "/manifest.json",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/gallery",
  "/offline",
];

// 설치 이벤트
self.addEventListener("install", (event) => {
  console.log("[SW] Installing...");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[SW] Caching static assets");
      return cache.addAll(STATIC_CACHE);
    })
  );
  self.skipWaiting();
});

// 활성화 이벤트
self.addEventListener("activate", (event) => {
  console.log("[SW] Activating...");
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("[SW] Deleting old cache:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// Fetch 이벤트 - Network First 전략
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // 같은 origin 요청만 처리
  if (url.origin !== location.origin) {
    return;
  }

  // GET 요청만 캐싱
  if (request.method !== "GET") {
    return;
  }

  event.respondWith(
    fetch(request)
      .then((response) => {
        // 응답이 성공적이면 캐시에 저장
        if (response.status === 200) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });
        }
        return response;
      })
      .catch(() => {
        // 네트워크 실패 시 캐시에서 찾기
        return caches.match(request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // 캐시에도 없으면 오프라인 페이지
          if (request.mode === "navigate") {
            return caches.match("/offline");
          }
        });
      })
  );
});

// 백그라운드 동기화 (선택사항)
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-rules") {
    event.waitUntil(syncRules());
  }
});

async function syncRules() {
  // localStorage 데이터를 서버와 동기화하는 로직
  // 현재는 클라이언트 사이드만 사용하므로 비워둠
  console.log("[SW] Syncing rules...");
}

