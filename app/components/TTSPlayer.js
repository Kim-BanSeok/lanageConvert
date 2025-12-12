"use client";

import { useState, useEffect } from "react";
import { useCustomAlert } from "./CustomAlert";

export default function TTSPlayer({ text, buttonText = "🔊 음성 듣기", className = "" }) {
  const { showAlert, AlertComponent } = useCustomAlert();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [showVoiceSelector, setShowVoiceSelector] = useState(false);

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
              className="btn-3d px-3 py-2 flex-shrink-0"
              onClick={() => setShowVoiceSelector(!showVoiceSelector)}
              title="음성 선택"
            >
              ⚙️
            </button>
          )}
        </div>

      {/* 음성 선택 드롭다운 */}
      {showVoiceSelector && voices.length > 0 && (
        <div className="absolute top-full mt-2 left-0 z-50 bg-gray-900 border border-gray-700 rounded-lg p-3 shadow-lg min-w-[250px]">
          <h4 className="text-sm font-semibold mb-2">음성 선택</h4>
          <div className="max-h-[200px] overflow-y-auto space-y-1">
            {voices.map((voice, idx) => (
              <button
                key={idx}
                className={`w-full text-left px-2 py-1 rounded text-sm hover:bg-white/10 ${
                  selectedVoice?.name === voice.name ? "bg-blue-500/30" : ""
                }`}
                onClick={() => {
                  setSelectedVoice(voice);
                  setShowVoiceSelector(false);
                }}
              >
                <div className="font-medium">{voice.name}</div>
                <div className="text-xs opacity-70">{voice.lang}</div>
              </button>
            ))}
          </div>
        </div>
      )}
      </div>
    </>
  );
}

