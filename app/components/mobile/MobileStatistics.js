"use client";

import { useState, useEffect } from "react";
import { getRuleUsageStats } from "../../lib/ruleStatistics";

/**
 * 📱 모바일 규칙 통계
 */
export default function MobileStatistics({ rules, onBack }) {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const ruleStats = getRuleUsageStats();
    
    // 현재 규칙에 대한 통계 생성
    const enrichedRules = rules.map((rule, index) => {
      const usage = ruleStats.find(s => 
        s.rule.from === rule.from && s.rule.to === rule.to
      );
      
      return {
        index,
        rule,
        encodeCount: usage?.encodeCount || 0,
        decodeCount: usage?.decodeCount || 0,
        totalCount: (usage?.encodeCount || 0) + (usage?.decodeCount || 0),
        lastUsed: usage?.lastUsed || null,
      };
    });

    // 사용 빈도순 정렬
    const sorted = enrichedRules.sort((a, b) => b.totalCount - a.totalCount);
    
    const totalUsage = sorted.reduce((sum, r) => sum + r.totalCount, 0);
    const avgUsage = rules.length > 0 ? (totalUsage / rules.length).toFixed(1) : 0;
    const mostUsed = sorted[0];
    const neverUsed = sorted.filter(r => r.totalCount === 0);

    setStats({
      rules: sorted,
      totalUsage,
      avgUsage,
      mostUsed,
      neverUsed: neverUsed.length,
    });
  }, [rules]);

  if (!stats) {
    return (
      <div className="mobile-stats-container">
        <div className="mobile-section-header">
          <button className="mobile-back-btn" onClick={onBack}>
            ← 돌아가기
          </button>
          <h2 className="mobile-section-title">규칙 통계</h2>
        </div>
        <div className="mobile-stats-loading">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="mobile-stats-container">
      <div className="mobile-section-header">
        <button className="mobile-back-btn" onClick={onBack}>
          ← 돌아가기
        </button>
        <h2 className="mobile-section-title">규칙 통계</h2>
      </div>

      {/* 요약 통계 */}
      <div className="mobile-stats-summary">
        <div className="mobile-stats-summary-card">
          <div className="mobile-stats-summary-value">{stats.totalUsage}</div>
          <div className="mobile-stats-summary-label">총 사용 횟수</div>
        </div>
        <div className="mobile-stats-summary-card">
          <div className="mobile-stats-summary-value">{stats.avgUsage}</div>
          <div className="mobile-stats-summary-label">평균 사용</div>
        </div>
        <div className="mobile-stats-summary-card">
          <div className="mobile-stats-summary-value">{stats.neverUsed}</div>
          <div className="mobile-stats-summary-label">미사용 규칙</div>
        </div>
      </div>

      {/* 가장 많이 사용된 규칙 */}
      {stats.mostUsed && stats.mostUsed.totalCount > 0 && (
        <div className="mobile-stats-highlight">
          <h3 className="mobile-stats-subtitle">🏆 가장 많이 사용된 규칙</h3>
          <div className="mobile-stats-highlight-card">
            <div className="mobile-stats-highlight-rule">
              <span className="mobile-stats-highlight-from">{stats.mostUsed.rule.from}</span>
              <span className="mobile-stats-highlight-arrow">→</span>
              <span className="mobile-stats-highlight-to">{stats.mostUsed.rule.to}</span>
            </div>
            <div className="mobile-stats-highlight-count">
              {stats.mostUsed.totalCount}회 사용
            </div>
          </div>
        </div>
      )}

      {/* 규칙 목록 */}
      <div className="mobile-stats-list">
        <h3 className="mobile-stats-subtitle">📊 전체 규칙 사용 현황</h3>
        
        {stats.rules.length === 0 ? (
          <div className="mobile-empty-state">
            <div className="mobile-empty-icon">📋</div>
            <p className="mobile-empty-text">규칙이 없습니다</p>
          </div>
        ) : (
          stats.rules.map((item, idx) => (
            <div key={idx} className="mobile-stats-item">
              <div className="mobile-stats-item-header">
                <div className="mobile-stats-item-rule">
                  <span className="mobile-stats-item-from">{item.rule.from}</span>
                  <span className="mobile-stats-item-arrow">→</span>
                  <span className="mobile-stats-item-to">{item.rule.to}</span>
                </div>
                <div className="mobile-stats-item-count">
                  {item.totalCount}회
                </div>
              </div>
              
              {item.totalCount > 0 && (
                <div className="mobile-stats-item-detail">
                  <span>🔐 암호화: {item.encodeCount}회</span>
                  <span>🔓 복호화: {item.decodeCount}회</span>
                </div>
              )}

              {item.totalCount === 0 && (
                <div className="mobile-stats-item-unused">
                  미사용
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

