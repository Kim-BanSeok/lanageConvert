"use client";

import { useState, useEffect } from "react";

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // PWA가 이미 설치되었는지 확인
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    // 설치 프롬프트 이벤트 리스너
    const handleBeforeInstallPrompt = (e) => {
      // 기본 브라우저 설치 프롬프트 방지
      e.preventDefault();
      setDeferredPrompt(e);
      
      // 사용자가 이전에 프롬프트를 닫았는지 확인
      let dismissed = null;
      let dismissedTime = 0;
      try {
        dismissed = localStorage.getItem('pwa-install-dismissed');
        dismissedTime = dismissed ? parseInt(dismissed) : 0;
      } catch (error) {
        // 스토리지 접근 불가 시 무시
        console.warn("PWA 설치 프롬프트 상태 확인 실패:", error);
      }
      const now = Date.now();
      
      // 24시간(86400000ms) 이내에 닫았으면 표시하지 않음
      if (now - dismissedTime < 86400000) {
        return;
      }
      
      // 3초 후에 프롬프트 표시
      setTimeout(() => {
        setShowPrompt(true);
      }, 3000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // 앱이 설치되면 이벤트 발생
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setShowPrompt(false);
      console.log('PWA가 설치되었습니다!');
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // 설치 프롬프트 표시
    deferredPrompt.prompt();

    // 사용자의 응답 기다리기
    const { outcome } = await deferredPrompt.userChoice;
    
    console.log(`사용자 응답: ${outcome}`);
    
    if (outcome === 'accepted') {
      console.log('사용자가 앱 설치를 수락했습니다.');
    } else {
      console.log('사용자가 앱 설치를 거절했습니다.');
    }

    // 프롬프트를 다시 사용할 수 없으므로 null로 설정
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // 닫은 시간 저장
    try {
      localStorage.setItem('pwa-install-dismissed', Date.now().toString());
    } catch (error) {
      // 스토리지 접근 불가 시 무시
      console.warn("PWA 설치 프롬프트 상태 저장 실패:", error);
    }
  };

  // 이미 설치되었거나 프롬프트가 없으면 아무것도 표시하지 않음
  if (isInstalled || !showPrompt || !deferredPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-6 left-6 right-6 z-50 animate-fade-up">
      <div className="card-3d max-w-md mx-auto p-4 border-2 border-blue-500/50">
        <div className="flex items-start gap-4">
          {/* 아이콘 */}
          <div className="text-4xl flex-shrink-0">
            📱
          </div>

          {/* 내용 */}
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-1">
              앱으로 설치하기
            </h3>
            <p className="text-sm opacity-80 mb-3">
              홈 화면에 추가하여 앱처럼 빠르게 접근하세요!
            </p>

            {/* 버튼 그룹 */}
            <div className="flex gap-2">
              <button
                className="btn-3d flex-1 text-sm"
                onClick={handleInstallClick}
              >
                ✅ 설치하기
              </button>
              <button
                className="btn-3d btn-red text-sm px-3"
                onClick={handleDismiss}
              >
                나중에
              </button>
            </div>
          </div>

          {/* 닫기 버튼 */}
          <button
            className="text-xl opacity-60 hover:opacity-100 transition flex-shrink-0"
            onClick={handleDismiss}
          >
            ✕
          </button>
        </div>

        {/* 혜택 표시 */}
        <div className="mt-3 pt-3 border-t border-white/10 text-xs opacity-70">
          <div className="flex gap-3 flex-wrap">
            <span>⚡ 빠른 실행</span>
            <span>📵 오프라인 지원</span>
            <span>🎨 전체화면</span>
          </div>
        </div>
      </div>
    </div>
  );
}

