"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useCustomAlert } from "./CustomAlert";

export default function TTSPlayer({ text, buttonText = "🔊 음성 듣기", className = "" }) {
  // 모든 Hooks는 항상 같은 순서로 호출되어야 함
  const { showAlert, AlertComponent } = useCustomAlert();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [showVoiceSelector, setShowVoiceSelector] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  // Portal을 위한 mounted 상태
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Web Speech API 지원 확인
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      setIsSupported(true);

      // 음성 목록 로드
      const loadVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices();
        setVoices(availableVoices);

        // 한국어 음성 우선 선택
        const koreanVoice = availableVoices.find(v => v.lang.startsWith('ko'));
        if (koreanVoice) {
          setSelectedVoice(koreanVoice);
        } else if (availableVoices.length > 0) {
          setSelectedVoice(availableVoices[0]);
        }
      };

      // 음성 목록은 비동기로 로드될 수 있음
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;

      return () => {
        window.speechSynthesis.cancel();
      };
    }
  }, []);

  const handlePlay = async () => {
    if (!text || !text.trim()) {
      await showAlert("재생할 텍스트가 없습니다.", "warning");
      return;
    }

    if (!isSupported) {
      await showAlert("이 브라우저는 음성 재생을 지원하지 않습니다.", "warning");
      return;
    }

    // 이전 재생 중지
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // 음성 설정
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    utterance.rate = 1.0; // 속도
    utterance.pitch = 1.0; // 음높이
    utterance.volume = 1.0; // 볼륨

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = async (e) => {
      console.error("TTS 오류:", e);
      setIsPlaying(false);
      await showAlert("음성 재생 중 오류가 발생했습니다.", "error");
    };

    window.speechSynthesis.speak(utterance);
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
  };

  // 드롭다운 위치 계산 (fixed positioning)
  useEffect(() => {
    if (!showVoiceSelector || !buttonRef.current) {
      return;
    }
    
    const updatePosition = () => {
      if (!buttonRef.current) return;
      
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      // 드롭다운 예상 크기
      const dropdownWidth = 300;
      const dropdownHeight = 250;
      
      let top = buttonRect.bottom + 8; // 버튼 아래 8px
      let left = buttonRect.left;
      
      // 화면 오른쪽을 넘어가면 왼쪽 정렬
      if (left + dropdownWidth > viewportWidth - 16) {
        left = buttonRect.right - dropdownWidth;
      }
      
      // 화면 왼쪽을 넘어가면 조정
      if (left < 16) {
        left = 16;
      }
      
      // 화면 아래로 넘어가면 버튼 위로 표시
      if (top + dropdownHeight > viewportHeight - 16) {
        top = buttonRect.top - dropdownHeight - 8;
      }
      
      // 위로도 공간이 없으면 화면 중앙에
      if (top < 16) {
        top = Math.max(16, (viewportHeight - dropdownHeight) / 2);
      }
      
      setDropdownPosition({
        top,
        left,
        width: buttonRect.width
      });
    };
    
    updatePosition();
    
    // 스크롤 시 위치 업데이트
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);
    
    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [showVoiceSelector]);

  // early return은 모든 Hooks 호출 후에
  if (!isSupported) {
    return (
      <button
        className={`btn-3d opacity-50 cursor-not-allowed ${className}`}
        disabled
        title="이 브라우저는 음성 재생을 지원하지 않습니다"
      >
        🔇 음성 미지원
      </button>
    );
  }

  return (
    <>
      {AlertComponent}
      <div className="relative w-full">
        <div className="flex gap-2 items-center">
          {!isPlaying ? (
            <button
              className={`btn-3d flex-1 ${className}`}
              onClick={handlePlay}
              disabled={!text || !text.trim()}
            >
              {buttonText}
            </button>
          ) : (
            <button
              className={`btn-3d btn-red flex-1 ${className}`}
              onClick={handleStop}
            >
              ⏹️ 정지
            </button>
          )}

          {/* 음성 선택 버튼 */}
          {voices.length > 0 && (
            <button
              ref={buttonRef}
              className="btn-3d px-3 py-2 flex-shrink-0"
              onClick={() => setShowVoiceSelector(!showVoiceSelector)}
              title="음성 선택"
            >
              ⚙️
            </button>
          )}
        </div>
      </div>

      {/* Portal을 사용한 드롭다운 - body에 직접 렌더링 */}
      {mounted && showVoiceSelector && createPortal(
        <>
          {/* 배경 오버레이 */}
          <div 
            className="fixed inset-0 z-[9998] bg-black/30"
            onClick={() => setShowVoiceSelector(false)}
            style={{ backdropFilter: 'blur(2px)' }}
          />
          
          {/* 드롭다운 메뉴 */}
          <div 
            ref={dropdownRef}
            className="fixed z-[9999] bg-slate-800/95 border-2 border-blue-500/50 rounded-xl p-4 shadow-2xl backdrop-blur-md"
            style={{
              top: `${dropdownPosition.top}px`,
              left: `${dropdownPosition.left}px`,
              width: '300px',
              maxHeight: '400px'
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-bold text-white">🎙️ 음성 선택</h4>
              <button
                className="text-slate-400 hover:text-white transition-colors text-lg leading-none"
                onClick={() => setShowVoiceSelector(false)}
              >
                ✕
              </button>
            </div>
            
            <div className="text-xs text-slate-400 mb-3">
              {selectedVoice && (
                <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg px-2 py-1">
                  선택됨: <span className="text-white font-medium">{selectedVoice.name}</span>
                </div>
              )}
            </div>
            
            <div className="max-h-[280px] overflow-y-auto space-y-1.5 custom-scrollbar pr-1">
              {voices.map((voice, idx) => (
                <button
                  key={idx}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all ${
                    selectedVoice?.name === voice.name 
                      ? "bg-blue-500/50 text-white border-2 border-blue-400 shadow-lg shadow-blue-500/20" 
                      : "text-slate-300 bg-slate-700/30 hover:bg-slate-700/60 hover:text-white border border-transparent hover:border-slate-600"
                  }`}
                  onClick={() => {
                    setSelectedVoice(voice);
                    setShowVoiceSelector(false);
                  }}
                >
                  <div className="font-semibold">{voice.name}</div>
                  <div className="text-xs opacity-70 mt-0.5">{voice.lang}</div>
                </button>
              ))}
            </div>
          </div>
        </>,
        document.body
      )}
    </>
  );
}

