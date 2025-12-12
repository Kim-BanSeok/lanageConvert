"use client";

import { useState, useEffect } from "react";
import {
  TEST_SAMPLES,
  CATEGORIES,
  getSamplesByCategory,
  getRandomSamples,
} from "../../lib/testSamples";
import {
  testMultipleSamples,
  analyzeTestResults,
} from "../../lib/testTranslator";

/**
 * 📱 모바일 테스트 번역기
 */
export default function MobileTestTranslator({ rules, engineMode, showAlert, onBack }) {
  const [step, setStep] = useState(1); // 1: 선택, 2: 결과
  const [selectedLanguage, setSelectedLanguage] = useState("korean");
  const [selectedCategory, setSelectedCategory] = useState("basic");
  const [samples, setSamples] = useState([]);
  const [testResults, setTestResults] = useState(null);
  const [stats, setStats] = useState(null);
  const [isTesting, setIsTesting] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);

  // 샘플 로드
  useEffect(() => {
    loadSamples();
  }, [selectedLanguage, selectedCategory]);

  const loadSamples = () => {
    let loaded = [];
    
    if (selectedLanguage === 'random') {
      loaded = getRandomSamples(10);
    } else if (['mixed', 'numbers', 'special'].includes(selectedLanguage)) {
      loaded = TEST_SAMPLES[selectedLanguage] || [];
    } else {
      loaded = getSamplesByCategory(selectedLanguage, selectedCategory);
    }
    
    setSamples(loaded);
  };

  // 테스트 실행
  const runTest = async () => {
    if (samples.length === 0) {
      await showAlert("테스트할 샘플이 없습니다", "warning");
      return;
    }

    if (rules.length === 0) {
      await showAlert("테스트할 규칙이 없습니다", "warning");
      return;
    }

    setIsTesting(true);
    
    setTimeout(() => {
      const results = testMultipleSamples(samples, rules, engineMode);
      const statistics = analyzeTestResults(results);
      
      setTestResults(results);
      setStats(statistics);
      setIsTesting(false);
      setStep(2);
    }, 300);
  };

  // Step 1: 샘플 선택
  if (step === 1) {
    return (
      <div className="mobile-test-container">
        <div className="mobile-section-header">
          <button className="mobile-back-btn" onClick={onBack}>
            ← 돌아가기
          </button>
          <h2 className="mobile-section-title">테스트 번역</h2>
        </div>

        {/* 언어 선택 */}
        <div className="mobile-form-group">
          <label className="mobile-form-label">언어 선택</label>
          <select
            className="mobile-form-select"
            value={selectedLanguage}
            onChange={(e) => {
              setSelectedLanguage(e.target.value);
              if (!['korean', 'english'].includes(e.target.value)) {
                setSelectedCategory('');
              }
            }}
          >
            <option value="korean">한국어</option>
            <option value="english">English</option>
            <option value="mixed">한영 혼합</option>
            <option value="numbers">숫자/날짜</option>
            <option value="special">특수문자</option>
            <option value="random">랜덤 샘플</option>
          </select>
        </div>

        {/* 카테고리 선택 */}
        {['korean', 'english'].includes(selectedLanguage) && (
          <div className="mobile-form-group">
            <label className="mobile-form-label">카테고리</label>
            <select
              className="mobile-form-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {Object.entries(CATEGORIES[selectedLanguage].subcategories).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
        )}

        {/* 샘플 미리보기 */}
        <div className="mobile-test-preview">
          <h3 className="mobile-preview-title">
            📝 샘플 문장 ({samples.length}개)
          </h3>
          <div className="mobile-sample-list">
            {samples.slice(0, 5).map((sample, idx) => (
              <div key={idx} className="mobile-sample-item">
                {sample}
              </div>
            ))}
            {samples.length > 5 && (
              <div className="mobile-sample-more">
                ... 외 {samples.length - 5}개
              </div>
            )}
          </div>
        </div>

        {/* 테스트 실행 버튼 */}
        <button
          className="mobile-btn mobile-btn-primary"
          onClick={runTest}
          disabled={isTesting}
        >
          {isTesting ? '⏳ 테스트 중...' : '🧪 테스트 실행'}
        </button>
      </div>
    );
  }

  // Step 2: 결과 표시
  return (
    <div className="mobile-test-container">
      <div className="mobile-section-header">
        <button className="mobile-back-btn" onClick={() => setStep(1)}>
          ← 다시 선택
        </button>
        <h2 className="mobile-section-title">테스트 결과</h2>
      </div>

      {/* 통계 */}
      {stats && (
        <div className="mobile-test-stats">
          <div className="mobile-test-stat-card">
            <div className="mobile-test-stat-value">{stats.total}</div>
            <div className="mobile-test-stat-label">전체</div>
          </div>
          <div className="mobile-test-stat-card success">
            <div className="mobile-test-stat-value">✅ {stats.reversible}</div>
            <div className="mobile-test-stat-label">성공</div>
          </div>
          <div className="mobile-test-stat-card error">
            <div className="mobile-test-stat-value">❌ {stats.irreversible}</div>
            <div className="mobile-test-stat-label">실패</div>
          </div>
          <div className="mobile-test-stat-card">
            <div className="mobile-test-stat-value">{stats.avgChangeRate}%</div>
            <div className="mobile-test-stat-label">변환율</div>
          </div>
        </div>
      )}

      {/* 결과 리스트 */}
      {testResults && (
        <div className="mobile-test-results">
          {testResults.map((result, idx) => (
            <div
              key={idx}
              className={`mobile-test-result-card ${result.isReversible ? 'success' : 'error'}`}
            >
              <div
                className="mobile-test-result-header"
                onClick={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
              >
                <span className="mobile-test-result-icon">
                  {result.isReversible ? '✅' : '❌'}
                </span>
                <div className="mobile-test-result-text">
                  <div className="mobile-test-result-original">{result.original}</div>
                  <div className="mobile-test-result-meta">
                    {result.changeRate}% 변환 · {result.appliedRules.length}개 규칙
                  </div>
                </div>
                <span className="mobile-test-result-toggle">
                  {expandedIndex === idx ? '▲' : '▼'}
                </span>
              </div>

              {expandedIndex === idx && (
                <div className="mobile-test-result-detail">
                  <div className="mobile-test-result-row">
                    <span className="mobile-test-label">원본:</span>
                    <span className="mobile-test-value">{result.original}</span>
                  </div>
                  <div className="mobile-test-result-row">
                    <span className="mobile-test-label">암호:</span>
                    <span className="mobile-test-value encoded">{result.encoded}</span>
                  </div>
                  <div className="mobile-test-result-row">
                    <span className="mobile-test-label">복호:</span>
                    <span className={`mobile-test-value ${result.isReversible ? '' : 'error'}`}>
                      {result.decoded}
                    </span>
                  </div>
                  {result.appliedRules.length > 0 && (
                    <div className="mobile-test-applied-rules">
                      <strong>적용된 규칙:</strong>
                      {result.appliedRules.slice(0, 3).map((ar, i) => (
                        <div key={i} className="mobile-test-applied-rule">
                          #{ar.index + 1} {ar.rule.from} → {ar.rule.to} ({ar.count}회)
                        </div>
                      ))}
                      {result.appliedRules.length > 3 && (
                        <div className="mobile-test-applied-more">
                          ... 외 {result.appliedRules.length - 3}개
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

