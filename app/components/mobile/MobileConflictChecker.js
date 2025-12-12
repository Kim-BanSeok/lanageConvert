"use client";

import { useState, useEffect } from "react";
import {
  checkAllConflicts,
  applyAutoFix,
  applyAllAutoFixes,
  SEVERITY
} from "../../lib/conflictChecker";

/**
 * 📱 모바일 충돌 검사기
 */
export default function MobileConflictChecker({ rules, setRules, showAlert, onBack }) {
  const [conflictResult, setConflictResult] = useState(null);
  const [isChecking, setIsChecking] = useState(true);
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const result = checkAllConflicts(rules);
      setConflictResult(result);
      setIsChecking(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [rules]);

  const handleFixSingle = async (conflict) => {
    const fixedRules = applyAutoFix(rules, conflict);
    setRules(fixedRules, "충돌 수정");
    await showAlert("수정 완료", "success");
    
    // 재검사
    const result = checkAllConflicts(fixedRules);
    setConflictResult(result);
  };

  const handleFixAll = async () => {
    if (!conflictResult) return;
    
    const fixableConflicts = conflictResult.conflicts.filter(c => c.autoFix);
    if (fixableConflicts.length === 0) {
      await showAlert("자동 수정 가능한 문제가 없습니다", "info");
      return;
    }

    const fixedRules = applyAllAutoFixes(rules, fixableConflicts);
    setRules(fixedRules, "모든 충돌 수정");
    await showAlert(`${fixableConflicts.length}개 수정 완료`, "success");
    onBack();
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case SEVERITY.CRITICAL: return '🔴';
      case SEVERITY.WARNING: return '🟡';
      case SEVERITY.INFO: return '🔵';
      default: return '⚪';
    }
  };

  if (isChecking) {
    return (
      <div className="mobile-conflict-container">
        <div className="mobile-conflict-checking">
          <div className="mobile-conflict-spinner">🔍</div>
          <h2>검사 중...</h2>
          <p>{rules.length}개 규칙 분석</p>
        </div>
      </div>
    );
  }

  if (!conflictResult) return null;

  return (
    <div className="mobile-conflict-container">
      {/* 헤더 */}
      <div className="mobile-section-header">
        <button className="mobile-back-btn" onClick={onBack}>
          ← 돌아가기
        </button>
        <h2 className="mobile-section-title">충돌 검사</h2>
      </div>

      {/* 통계 카드 */}
      <div className="mobile-conflict-stats">
        <div className="mobile-conflict-stat-card">
          <div className="mobile-conflict-stat-value">{conflictResult.stats.total}</div>
          <div className="mobile-conflict-stat-label">전체 문제</div>
        </div>
        {conflictResult.criticalCount > 0 && (
          <div className="mobile-conflict-stat-card critical">
            <div className="mobile-conflict-stat-value">🔴 {conflictResult.criticalCount}</div>
            <div className="mobile-conflict-stat-label">심각</div>
          </div>
        )}
        {conflictResult.warningCount > 0 && (
          <div className="mobile-conflict-stat-card warning">
            <div className="mobile-conflict-stat-value">🟡 {conflictResult.warningCount}</div>
            <div className="mobile-conflict-stat-label">경고</div>
          </div>
        )}
        {conflictResult.infoCount > 0 && (
          <div className="mobile-conflict-stat-card info">
            <div className="mobile-conflict-stat-value">🔵 {conflictResult.infoCount}</div>
            <div className="mobile-conflict-stat-label">정보</div>
          </div>
        )}
      </div>

      {/* 결과 리스트 */}
      {conflictResult.conflicts.length === 0 ? (
        <div className="mobile-empty-state">
          <div className="mobile-empty-icon">✅</div>
          <p className="mobile-empty-text">충돌 없음!</p>
          <p className="mobile-empty-subtext">모든 규칙이 정상입니다</p>
        </div>
      ) : (
        <>
          <div className="mobile-conflict-list">
            {conflictResult.conflicts.map((conflict, idx) => (
              <div key={idx} className={`mobile-conflict-card severity-${conflict.severity}`}>
                <div 
                  className="mobile-conflict-header"
                  onClick={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
                >
                  <span className="mobile-conflict-icon">{getSeverityIcon(conflict.severity)}</span>
                  <div className="mobile-conflict-text">
                    <div className="mobile-conflict-message">{conflict.message}</div>
                    <div className="mobile-conflict-hint">💡 {conflict.suggestion}</div>
                  </div>
                  <span className="mobile-conflict-toggle">
                    {expandedIndex === idx ? '▲' : '▼'}
                  </span>
                </div>

                {expandedIndex === idx && (
                  <div className="mobile-conflict-detail">
                    {conflict.detail && (
                      <p className="mobile-conflict-detail-text">{conflict.detail}</p>
                    )}
                    
                    <div className="mobile-conflict-rules">
                      <strong>관련 규칙:</strong>
                      {conflict.rules.map((rule, rIdx) => (
                        <div key={rIdx} className="mobile-conflict-rule">
                          <span className="mobile-conflict-rule-num">#{conflict.indices[rIdx] + 1}</span>
                          <span className="mobile-conflict-rule-from">{rule.from || '(비어있음)'}</span>
                          <span className="mobile-conflict-rule-arrow">→</span>
                          <span className="mobile-conflict-rule-to">{rule.to || '(비어있음)'}</span>
                        </div>
                      ))}
                    </div>

                    {conflict.autoFix && (
                      <button
                        className="mobile-btn mobile-btn-primary"
                        onClick={() => handleFixSingle(conflict)}
                      >
                        🔧 이 문제 수정
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* 일괄 수정 버튼 */}
          {conflictResult.conflicts.some(c => c.autoFix) && (
            <div className="mobile-conflict-actions">
              <button className="mobile-btn mobile-btn-primary" onClick={handleFixAll}>
                🔧 모두 자동 수정
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

