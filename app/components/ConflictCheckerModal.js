"use client";

import { useState, useEffect } from "react";
import {
  checkAllConflicts,
  applyAutoFix,
  applyAllAutoFixes,
  CONFLICT_TYPES,
  SEVERITY,
  formatConflictReport
} from "../lib/conflictChecker";

/**
 * 🔍 규칙 충돌 검사기 모달 (데스크톱)
 */
export default function ConflictCheckerModal({ rules, setRules, onClose, showAlert }) {
  const [conflictResult, setConflictResult] = useState(null);
  const [isChecking, setIsChecking] = useState(true);
  const [selectedConflict, setSelectedConflict] = useState(null);

  // 검사 실행
  useEffect(() => {
    const timer = setTimeout(() => {
      const result = checkAllConflicts(rules);
      setConflictResult(result);
      setIsChecking(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [rules]);

  // 개별 수정 적용
  const handleFixSingle = async (conflict) => {
    const fixedRules = applyAutoFix(rules, conflict);
    setRules(fixedRules, "충돌 수정");
    await showAlert("수정이 적용되었습니다", "success");
    onClose();
  };

  // 모두 수정
  const handleFixAll = async () => {
    if (!conflictResult) return;
    
    const fixableConflicts = conflictResult.conflicts.filter(c => c.autoFix);
    if (fixableConflicts.length === 0) {
      await showAlert("자동 수정 가능한 문제가 없습니다", "info");
      return;
    }

    const fixedRules = applyAllAutoFixes(rules, fixableConflicts);
    setRules(fixedRules, "모든 충돌 수정");
    await showAlert(`${fixableConflicts.length}개 문제가 수정되었습니다`, "success");
    onClose();
  };

  // 보고서 복사
  const handleCopyReport = async () => {
    if (!conflictResult) return;
    
    const report = formatConflictReport(conflictResult);
    await navigator.clipboard.writeText(report);
    await showAlert("보고서가 클립보드에 복사되었습니다", "success");
  };

  // 심각도 아이콘
  const getSeverityIcon = (severity) => {
    switch (severity) {
      case SEVERITY.CRITICAL: return '🔴';
      case SEVERITY.WARNING: return '🟡';
      case SEVERITY.INFO: return '🔵';
      default: return '⚪';
    }
  };

  // 심각도 텍스트
  const getSeverityText = (severity) => {
    switch (severity) {
      case SEVERITY.CRITICAL: return '심각';
      case SEVERITY.WARNING: return '경고';
      case SEVERITY.INFO: return '정보';
      default: return '';
    }
  };

  if (isChecking) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-3d conflict-modal" onClick={(e) => e.stopPropagation()}>
          <div className="conflict-checking">
            <div className="conflict-checking-spinner">🔍</div>
            <h2>규칙 충돌 검사 중...</h2>
            <p>{rules.length}개의 규칙을 분석하고 있습니다</p>
          </div>
        </div>
      </div>
    );
  }

  if (!conflictResult) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-3d conflict-modal" onClick={(e) => e.stopPropagation()}>
        {/* 헤더 */}
        <div className="conflict-header">
          <h2 className="conflict-title">
            🔍 규칙 충돌 검사 결과
          </h2>
          <button className="modal-close-btn" onClick={onClose}>✕</button>
        </div>

        {/* 통계 */}
        <div className="conflict-stats">
          <div className="conflict-stat-item">
            <div className="conflict-stat-value">{conflictResult.stats.total}</div>
            <div className="conflict-stat-label">전체</div>
          </div>
          {conflictResult.criticalCount > 0 && (
            <div className="conflict-stat-item critical">
              <div className="conflict-stat-value">🔴 {conflictResult.criticalCount}</div>
              <div className="conflict-stat-label">심각</div>
            </div>
          )}
          {conflictResult.warningCount > 0 && (
            <div className="conflict-stat-item warning">
              <div className="conflict-stat-value">🟡 {conflictResult.warningCount}</div>
              <div className="conflict-stat-label">경고</div>
            </div>
          )}
          {conflictResult.infoCount > 0 && (
            <div className="conflict-stat-item info">
              <div className="conflict-stat-value">🔵 {conflictResult.infoCount}</div>
              <div className="conflict-stat-label">정보</div>
            </div>
          )}
        </div>

        {/* 결과 */}
        <div className="conflict-content">
          {conflictResult.conflicts.length === 0 ? (
            <div className="conflict-empty">
              <div className="conflict-empty-icon">✅</div>
              <h3>충돌 없음!</h3>
              <p>모든 규칙이 정상입니다</p>
            </div>
          ) : (
            <div className="conflict-list">
              {conflictResult.conflicts.map((conflict, idx) => (
                <div 
                  key={idx} 
                  className={`conflict-item severity-${conflict.severity}`}
                  onClick={() => setSelectedConflict(selectedConflict === idx ? null : idx)}
                >
                  <div className="conflict-item-header">
                    <span className="conflict-severity-icon">
                      {getSeverityIcon(conflict.severity)}
                    </span>
                    <div className="conflict-item-content">
                      <div className="conflict-message">{conflict.message}</div>
                      <div className="conflict-suggestion">💡 {conflict.suggestion}</div>
                    </div>
                    <span className="conflict-expand-icon">
                      {selectedConflict === idx ? '▲' : '▼'}
                    </span>
                  </div>

                  {selectedConflict === idx && (
                    <div className="conflict-item-detail">
                      {conflict.detail && (
                        <div className="conflict-detail-text">{conflict.detail}</div>
                      )}
                      
                      <div className="conflict-rules-preview">
                        <strong>관련 규칙:</strong>
                        {conflict.rules.map((rule, rIdx) => (
                          <div key={rIdx} className="conflict-rule-item">
                            규칙 {conflict.indices[rIdx] + 1}: 
                            <span className="conflict-rule-from">{rule.from || '(비어있음)'}</span>
                            →
                            <span className="conflict-rule-to">{rule.to || '(비어있음)'}</span>
                          </div>
                        ))}
                      </div>

                      {conflict.autoFix && (
                        <button
                          className="btn-3d btn-small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleFixSingle(conflict);
                          }}
                        >
                          🔧 자동 수정
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 액션 버튼 */}
        <div className="conflict-actions">
          <button className="btn-3d btn-secondary" onClick={handleCopyReport}>
            📋 보고서 복사
          </button>
          {conflictResult.conflicts.some(c => c.autoFix) && (
            <button className="btn-3d btn-primary" onClick={handleFixAll}>
              🔧 모두 자동 수정
            </button>
          )}
          <button className="btn-3d" onClick={onClose}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}

