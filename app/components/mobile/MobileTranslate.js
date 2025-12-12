"use client";

import { useState } from "react";

/**
 * 📱 모바일 번역 화면
 */
export default function MobileTranslate({
  rules,
  setRules,
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
    
    const validRules = rules.filter((r) => r && r.from && r.from.trim() !== "");
    if (validRules.length === 0) {
      await showAlert("규칙이 없습니다. 규칙 탭에서 규칙을 추가해주세요!", "warning");
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
    
    const validRules = rules.filter((r) => r && r.from && r.from.trim() !== "");
    if (validRules.length === 0) {
      await showAlert("규칙이 없습니다. 규칙 탭에서 규칙을 추가해주세요!", "warning");
      return;
    }
    
    await decode();
    setIsOutputMode(true);
  };

  // 한글 자동 변환 규칙 생성
  const handleGenerateKoreanRules = async () => {
    if (!inputText.trim()) {
      await showAlert("먼저 텍스트를 입력해주세요", "warning");
      return;
    }

    // 한글 문자 추출 (가-힣 범위)
    const koreanChars = new Set();
    const text = inputText;
    
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      // 한글 유니코드 범위: 가(0xAC00) ~ 힣(0xD7A3)
      if (char >= "\uAC00" && char <= "\uD7A3") {
        koreanChars.add(char);
      }
    }

    if (koreanChars.size === 0) {
      await showAlert("입력된 텍스트에 한글이 없습니다", "warning");
      return;
    }

    // 기존 규칙에서 이미 사용된 변환 문자열 확인
    const usedToValues = new Set(rules.map((r) => r.to).filter((t) => t));
    
    // 각 한글 문자에 대해 랜덤 변환 문자열 생성
    const newRules = [];
    const charsArray = Array.from(koreanChars);
    
    charsArray.forEach((char) => {
      // 이미 규칙이 있는지 확인
      const existingRule = rules.find((r) => r.from === char);
      if (existingRule) {
        return; // 이미 규칙이 있으면 스킵
      }

      // 랜덤 문자열 생성 (대문자 알파벳 2-4자)
      let randomStr;
      let attempts = 0;
      const maxAttempts = 100;
      
      do {
        const length = Math.floor(Math.random() * 3) + 2; // 2-4자
        randomStr = Array.from({ length }, () => {
          return String.fromCharCode(65 + Math.floor(Math.random() * 26)); // A-Z
        }).join("");
        attempts++;
        
        if (attempts > 50 && !usedToValues.has(randomStr + "1")) {
          randomStr = randomStr + "1";
        }
      } while (usedToValues.has(randomStr) && attempts < maxAttempts);
      
      if (attempts >= maxAttempts) {
        randomStr = randomStr + Date.now().toString().slice(-3);
      }
      
      usedToValues.add(randomStr);
      newRules.push({ from: char, to: randomStr });
    });

    if (newRules.length === 0) {
      await showAlert("모든 한글 문자에 대한 규칙이 이미 존재합니다", "info");
      return;
    }

    // 기존 규칙에 추가
    setRules([...rules, ...newRules], "✨ 한글 자동 변환");
    await showAlert(`${newRules.length}개의 한글 변환 규칙이 추가되었습니다!`, "success");
  };

  return (
    <div className="mobile-translate-container">
      {/* 입력 영역 */}
      {!isOutputMode ? (
        <div className="mobile-translate-input-section">
          <div className="mobile-section-header">
            <h2 className="mobile-section-title">원본 텍스트</h2>
            <div className="mobile-char-count">
              {inputText.length} 자 | {rules.filter(r => r && r.from && r.from.trim()).length} 규칙
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

          {/* 한글 자동 변환 버튼 */}
          <div className="mobile-korean-convert-wrapper">
            <button 
              className="mobile-btn mobile-btn-special"
              onClick={handleGenerateKoreanRules}
            >
              <span className="mobile-btn-icon">✨</span>
              <span>한글 자동 변환</span>
            </button>
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
          <div className="mobile-section-header mobile-section-header-result">
            <h2 className="mobile-section-title">결과</h2>
            <button
              className="mobile-back-btn"
              onClick={() => setIsOutputMode(false)}
            >
              ← 편집
            </button>
          </div>

          <div className="mobile-result-box">
            <div className="mobile-result-text">
              {outputText || "결과가 여기에 표시됩니다"}
            </div>
          </div>

          {/* 결과 액션 */}
          <div className="mobile-result-actions">
            <div className="mobile-action-buttons">
              <button className="mobile-btn mobile-btn-outline" onClick={copyResult}>
                <span className="mobile-btn-icon">📋</span>
                <span>복사</span>
              </button>
              <button className="mobile-btn mobile-btn-outline" onClick={swap}>
                <span className="mobile-btn-icon">🔄</span>
                <span>교환</span>
              </button>
            </div>

            <button
              className="mobile-btn mobile-btn-primary mobile-btn-new"
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
        </div>
      )}
    </div>
  );
}

