"use client";

import { useState } from "react";

/**
 * 📱 모바일 번역 화면
 */
export default function MobileTranslate({
  inputText,
  setInputText,
  outputText,
  setOutputText,
  engineMode,
  setEngineMode,
  encode,
  decode,
  copyResult,
  swap,
  showAlert,
}) {
  const [isOutputMode, setIsOutputMode] = useState(false);

  const handleEncode = async () => {
    if (!inputText.trim()) {
      await showAlert("텍스트를 입력해주세요", "warning");
      return;
    }
    await encode();
    setIsOutputMode(true);
  };

  const handleDecode = async () => {
    if (!inputText.trim()) {
      await showAlert("텍스트를 입력해주세요", "warning");
      return;
    }
    await decode();
    setIsOutputMode(true);
  };

  return (
    <div className="mobile-translate-container">
      {/* 입력 영역 */}
      {!isOutputMode ? (
        <div className="mobile-translate-input-section">
          <div className="mobile-section-header">
            <h2 className="mobile-section-title">원본 텍스트</h2>
            <div className="mobile-char-count">
              {inputText.length} 자
            </div>
          </div>
          
          <textarea
            className="mobile-translate-textarea"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="번역할 텍스트를 입력하세요...&#10;&#10;예시:&#10;- 나는 너를 사랑해&#10;- Hello World&#10;- 이것은 비밀 메시지입니다"
            autoFocus
          />

          {/* 엔진 모드 선택 */}
          <div className="mobile-engine-selector">
            <div className="mobile-engine-label">번역 모드</div>
            <div className="mobile-engine-options">
              <button
                className={`mobile-engine-option ${engineMode === 'hybrid' ? 'active' : ''}`}
                onClick={() => setEngineMode('hybrid')}
              >
                <span className="mobile-engine-icon">⚡</span>
                <span>Hybrid</span>
              </button>
              <button
                className={`mobile-engine-option ${engineMode === 'word' ? 'active' : ''}`}
                onClick={() => setEngineMode('word')}
              >
                <span className="mobile-engine-icon">📝</span>
                <span>Word</span>
              </button>
              <button
                className={`mobile-engine-option ${engineMode === 'substring' ? 'active' : ''}`}
                onClick={() => setEngineMode('substring')}
              >
                <span className="mobile-engine-icon">🔤</span>
                <span>Char</span>
              </button>
            </div>
          </div>

          {/* 액션 버튼 */}
          <div className="mobile-action-buttons">
            <button className="mobile-btn mobile-btn-primary" onClick={handleEncode}>
              <span className="mobile-btn-icon">🔐</span>
              <span>암호화</span>
            </button>
            <button className="mobile-btn mobile-btn-secondary" onClick={handleDecode}>
              <span className="mobile-btn-icon">🔓</span>
              <span>복호화</span>
            </button>
          </div>
        </div>
      ) : (
        /* 결과 영역 */
        <div className="mobile-translate-output-section">
          <div className="mobile-section-header">
            <h2 className="mobile-section-title">결과</h2>
            <button
              className="mobile-back-btn"
              onClick={() => setIsOutputMode(false)}
            >
              ← 돌아가기
            </button>
          </div>

          <div className="mobile-result-box">
            <div className="mobile-result-text">
              {outputText || "결과가 여기에 표시됩니다"}
            </div>
          </div>

          {/* 결과 액션 */}
          <div className="mobile-action-buttons">
            <button className="mobile-btn mobile-btn-outline" onClick={copyResult}>
              <span className="mobile-btn-icon">📋</span>
              <span>복사</span>
            </button>
            <button className="mobile-btn mobile-btn-outline" onClick={swap}>
              <span className="mobile-btn-icon">🔄</span>
              <span>입력/출력 교환</span>
            </button>
          </div>

          <button
            className="mobile-btn mobile-btn-primary"
            onClick={() => {
              setInputText("");
              setOutputText("");
              setIsOutputMode(false);
            }}
          >
            <span className="mobile-btn-icon">✨</span>
            <span>새로 시작</span>
          </button>
        </div>
      )}
    </div>
  );
}

