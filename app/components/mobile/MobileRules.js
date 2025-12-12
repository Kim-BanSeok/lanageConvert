"use client";

import { useState } from "react";

/**
 * 📱 모바일 규칙 관리 화면
 */
export default function MobileRules({ rules, setRules, showAlert }) {
  const [showAddRule, setShowAddRule] = useState(false);
  const [newFrom, setNewFrom] = useState("");
  const [newTo, setNewTo] = useState("");

  const handleAddRule = async () => {
    if (!newFrom.trim()) {
      await showAlert("FROM 값을 입력해주세요", "warning");
      return;
    }
    
    const newRule = { from: newFrom.trim(), to: newTo.trim() };
    setRules([...rules, newRule]);
    
    // 초기화
    setNewFrom("");
    setNewTo("");
    setShowAddRule(false);
    
    await showAlert("규칙이 추가되었습니다", "success");
  };

  const handleDeleteRule = async (index) => {
    if (window.confirm("이 규칙을 삭제하시겠습니까?")) {
      setRules(rules.filter((_, i) => i !== index));
      await showAlert("규칙이 삭제되었습니다", "success");
    }
  };

  return (
    <div className="mobile-rules-container">
      {/* 헤더 */}
      <div className="mobile-section-header">
        <h2 className="mobile-section-title">변환 규칙</h2>
        <div className="mobile-rules-count">{rules.length}개</div>
      </div>

      {/* 규칙 추가 버튼 */}
      {!showAddRule ? (
        <button
          className="mobile-btn mobile-btn-primary"
          onClick={() => setShowAddRule(true)}
        >
          <span className="mobile-btn-icon">➕</span>
          <span>새 규칙 추가</span>
        </button>
      ) : (
        /* 규칙 추가 폼 */
        <div className="mobile-add-rule-form">
          <div className="mobile-form-group">
            <label className="mobile-form-label">FROM (원본)</label>
            <input
              type="text"
              className="mobile-form-input"
              value={newFrom}
              onChange={(e) => setNewFrom(e.target.value)}
              placeholder="예: 사랑"
              autoFocus
            />
          </div>
          <div className="mobile-form-group">
            <label className="mobile-form-label">TO (변환)</label>
            <input
              type="text"
              className="mobile-form-input"
              value={newTo}
              onChange={(e) => setNewTo(e.target.value)}
              placeholder="예: LOVE"
            />
          </div>
          <div className="mobile-form-actions">
            <button
              className="mobile-btn mobile-btn-outline"
              onClick={() => {
                setShowAddRule(false);
                setNewFrom("");
                setNewTo("");
              }}
            >
              취소
            </button>
            <button
              className="mobile-btn mobile-btn-primary"
              onClick={handleAddRule}
            >
              추가
            </button>
          </div>
        </div>
      )}

      {/* 규칙 리스트 */}
      <div className="mobile-rules-list">
        {rules.length === 0 ? (
          <div className="mobile-empty-state">
            <div className="mobile-empty-icon">📋</div>
            <p className="mobile-empty-text">아직 규칙이 없습니다</p>
            <p className="mobile-empty-subtext">
              새 규칙을 추가해보세요
            </p>
          </div>
        ) : (
          rules.map((rule, index) => (
            <div key={index} className="mobile-rule-item">
              <div className="mobile-rule-content">
                <div className="mobile-rule-from">
                  <span className="mobile-rule-label">FROM</span>
                  <span className="mobile-rule-value">{rule.from || "(비어있음)"}</span>
                </div>
                <div className="mobile-rule-arrow">→</div>
                <div className="mobile-rule-to">
                  <span className="mobile-rule-label">TO</span>
                  <span className="mobile-rule-value">{rule.to || "(비어있음)"}</span>
                </div>
              </div>
              <button
                className="mobile-rule-delete"
                onClick={() => handleDeleteRule(index)}
              >
                🗑️
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

