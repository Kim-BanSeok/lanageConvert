"use client";

import { useState, useEffect } from "react";

/**
 * 📱 모바일 AI 언어 생성기
 */
export default function MobileAIGenerator({ 
  setRules, 
  showAlert, 
  onBack,
  generateAI_CharacterMap,
  generateAI_SyllableLanguage,
  generateAI_PrefixSuffix,
  generateAI_Crypto
}) {
  const [selectedMode, setSelectedMode] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const modes = [
    {
      id: 1,
      icon: "🔤",
      name: "문자 기반 암호",
      desc: "알파벳을 새롭게 재매핑",
      color: "rgba(99, 102, 241, 0.3)",
    },
    {
      id: 2,
      icon: "🎵",
      name: "음절 판타지 언어",
      desc: "ka-ra-ma 음절 조합",
      color: "rgba(139, 92, 246, 0.3)",
    },
    {
      id: 3,
      icon: "✨",
      name: "접두/접미 규칙",
      desc: "va + 문자 + -en 형태",
      color: "rgba(236, 72, 153, 0.3)",
    },
    {
      id: 4,
      icon: "🔐",
      name: "난수 암호언어",
      desc: "암호처럼 보이는 랜덤",
      color: "rgba(59, 130, 246, 0.3)",
    },
  ];

  // 미리보기 생성
  useEffect(() => {
    if (!selectedMode) return;

    setIsGenerating(true);
    setTimeout(() => {
      let generated;
      switch (selectedMode) {
        case 1:
          generated = generateAI_CharacterMap();
          break;
        case 2:
          generated = generateAI_SyllableLanguage();
          break;
        case 3:
          generated = generateAI_PrefixSuffix();
          break;
        case 4:
          generated = generateAI_Crypto();
          break;
        default:
          generated = [];
      }
      setPreview(generated);
      setIsGenerating(false);
    }, 300);
  }, [selectedMode]);

  // 생성 적용
  const handleApply = async () => {
    if (!preview) {
      await showAlert("먼저 언어 타입을 선택하세요", "warning");
      return;
    }

    setRules(preview, "🤖 AI 언어 생성");
    await showAlert(`${preview.length}개 규칙이 생성되었습니다!`, "success");
    onBack();
  };

  return (
    <div className="mobile-ai-generator">
      <div className="mobile-section-header">
        <button className="mobile-back-btn" onClick={onBack}>
          ← 돌아가기
        </button>
        <h2 className="mobile-section-title">AI 언어 생성</h2>
      </div>

      {/* 모드 선택 */}
      <div className="mobile-ai-modes">
        {modes.map((mode) => (
          <button
            key={mode.id}
            className={`mobile-ai-mode-card ${selectedMode === mode.id ? 'active' : ''}`}
            onClick={() => setSelectedMode(mode.id)}
            style={{
              borderColor: selectedMode === mode.id ? mode.color : 'var(--border-color)',
            }}
          >
            <div className="mobile-ai-mode-icon">{mode.icon}</div>
            <h3 className="mobile-ai-mode-name">{mode.name}</h3>
            <p className="mobile-ai-mode-desc">{mode.desc}</p>
            {selectedMode === mode.id && (
              <div className="mobile-ai-mode-check">✓</div>
            )}
          </button>
        ))}
      </div>

      {/* 미리보기 */}
      {preview && (
        <div className="mobile-ai-preview">
          <h3 className="mobile-preview-title">
            📝 미리보기 ({preview.length}개 규칙)
          </h3>
          {isGenerating ? (
            <div className="mobile-ai-loading">생성 중...</div>
          ) : (
            <div className="mobile-ai-preview-list">
              {preview.slice(0, 10).map((rule, idx) => (
                <div key={idx} className="mobile-ai-preview-item">
                  <span className="mobile-ai-preview-from">{rule.from}</span>
                  <span className="mobile-ai-preview-arrow">→</span>
                  <span className="mobile-ai-preview-to">{rule.to}</span>
                </div>
              ))}
              {preview.length > 10 && (
                <div className="mobile-ai-preview-more">
                  ... 외 {preview.length - 10}개 규칙
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* 적용 버튼 */}
      {preview && !isGenerating && (
        <button
          className="mobile-btn mobile-btn-primary"
          onClick={handleApply}
        >
          ✨ 이 언어 적용하기
        </button>
      )}
    </div>
  );
}

