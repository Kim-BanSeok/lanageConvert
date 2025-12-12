"use client";

import { useState } from "react";

/**
 * 📱 모바일 랜덤 언어 생성기
 */
export default function MobileRandomGenerator({ setRules, showAlert, onBack }) {
  const [includeKorean, setIncludeKorean] = useState(true);
  const [includeEnglish, setIncludeEnglish] = useState(true);
  const [preview, setPreview] = useState(null);

  // 랜덤 생성
  const handleGenerate = () => {
    const chars = [];
    
    if (includeEnglish) {
      chars.push(...("abcdefghijklmnopqrstuvwxyz".split("")));
    }
    
    if (includeKorean) {
      const koreanChars = [
        "가", "나", "다", "라", "마", "바", "사", "아", "자", "차", "카", "타", "파", "하",
        "거", "너", "더", "러", "머", "버", "서", "어", "저", "처", "커", "터", "퍼", "허",
        "고", "노", "도", "로", "모", "보", "소", "오", "조", "초", "코", "토", "포", "호",
        "구", "누", "두", "루", "무", "부", "수", "우", "주", "추", "쿠", "투", "푸", "후",
      ];
      chars.push(...koreanChars);
    }

    if (chars.length === 0) {
      showAlert("최소 하나의 언어를 선택해주세요", "warning");
      return;
    }

    // 피셔-예이츠 셔플
    const shuffled = [...chars];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    const rules = chars.map((c, i) => ({
      from: c,
      to: shuffled[i],
    }));

    setPreview(rules);
  };

  // 적용
  const handleApply = async () => {
    if (!preview) {
      await showAlert("먼저 언어를 생성하세요", "warning");
      return;
    }

    setRules(preview, "🎲 랜덤 언어 생성");
    await showAlert(`${preview.length}개 규칙이 생성되었습니다!`, "success");
    onBack();
  };

  return (
    <div className="mobile-random-container">
      <div className="mobile-section-header">
        <button className="mobile-back-btn" onClick={onBack}>
          ← 돌아가기
        </button>
        <h2 className="mobile-section-title">랜덤 생성</h2>
      </div>

      <div className="mobile-random-guide">
        <div className="mobile-random-guide-icon">🎲</div>
        <h3>랜덤 언어 생성기</h3>
        <p>문자를 무작위로 재배치하여 독특한 암호 언어를 만듭니다</p>
      </div>

      {/* 옵션 선택 */}
      <div className="mobile-random-options">
        <h3 className="mobile-options-title">포함할 문자</h3>
        
        <label className="mobile-checkbox-label">
          <input
            type="checkbox"
            checked={includeEnglish}
            onChange={(e) => setIncludeEnglish(e.target.checked)}
            className="mobile-checkbox"
          />
          <span className="mobile-checkbox-text">
            🔤 영어 알파벳 (a-z, 26개)
          </span>
        </label>

        <label className="mobile-checkbox-label">
          <input
            type="checkbox"
            checked={includeKorean}
            onChange={(e) => setIncludeKorean(e.target.checked)}
            className="mobile-checkbox"
          />
          <span className="mobile-checkbox-text">
            🇰🇷 한글 기본 음절 (가나다..., 56개)
          </span>
        </label>
      </div>

      {/* 생성 버튼 */}
      <button
        className="mobile-btn mobile-btn-primary"
        onClick={handleGenerate}
      >
        🎲 랜덤 생성
      </button>

      {/* 미리보기 */}
      {preview && (
        <div className="mobile-random-preview">
          <h3 className="mobile-preview-title">
            📝 미리보기 ({preview.length}개 규칙)
          </h3>
          <div className="mobile-random-preview-grid">
            {preview.slice(0, 12).map((rule, idx) => (
              <div key={idx} className="mobile-random-preview-item">
                {rule.from} → {rule.to}
              </div>
            ))}
          </div>
          {preview.length > 12 && (
            <div className="mobile-random-preview-more">
              ... 외 {preview.length - 12}개
            </div>
          )}

          <button
            className="mobile-btn mobile-btn-primary"
            onClick={handleApply}
          >
            ✨ 적용하기
          </button>
        </div>
      )}
    </div>
  );
}

