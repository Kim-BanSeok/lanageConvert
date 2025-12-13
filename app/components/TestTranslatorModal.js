"use client";

import { useState, useEffect } from "react";
import { sanitizeText } from "../utils/inputValidation";
import {
  TEST_SAMPLES,
  CATEGORIES,
  getSamplesByCategory,
  getRandomSamples,
  getCustomSamples,
  addCustomSample,
} from "../lib/testSamples";
import {
  testMultipleSamples,
  analyzeTestResults,
  findProblematicRules,
  generateTestReport,
  exportToCSV,
} from "../lib/testTranslator";

/**
 * 🧪 테스트 번역기 모달 (데스크톱)
 */
export default function TestTranslatorModal({ rules, engineMode, onClose, showAlert }) {
  const [selectedLanguage, setSelectedLanguage] = useState("korean");
  const [selectedCategory, setSelectedCategory] = useState("basic");
  const [samples, setSamples] = useState([]);
  const [testResults, setTestResults] = useState(null);
  const [stats, setStats] = useState(null);
  const [isTesting, setIsTesting] = useState(false);
  const [customSample, setCustomSample] = useState("");

  // 샘플 로드
  useEffect(() => {
    loadSamples();
  }, [selectedLanguage, selectedCategory]);

  const loadSamples = () => {
    let loaded = [];
    
    if (selectedLanguage === 'custom') {
      loaded = getCustomSamples();
    } else if (selectedLanguage === 'random') {
      loaded = getRandomSamples(10);
    } else if (['mixed', 'numbers', 'special'].includes(selectedLanguage)) {
      loaded = TEST_SAMPLES[selectedLanguage] || [];
    } else {
      loaded = getSamplesByCategory(selectedLanguage, selectedCategory);
    }
    
    setSamples(loaded);
    setTestResults(null);
    setStats(null);
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
    
    // 약간의 딜레이로 UI 반응성 향상
    setTimeout(() => {
      const results = testMultipleSamples(samples, rules, engineMode);
      const statistics = analyzeTestResults(results);
      
      setTestResults(results);
      setStats(statistics);
      setIsTesting(false);
    }, 300);
  };

  // 사용자 정의 샘플 추가
  const handleAddCustom = () => {
    if (!customSample.trim()) {
      showAlert("샘플 문장을 입력해주세요", "warning");
      return;
    }
    
    addCustomSample(customSample.trim());
    setCustomSample("");
    showAlert("샘플이 추가되었습니다", "success");
    
    if (selectedLanguage === 'custom') {
      loadSamples();
    }
  };

  // 보고서 복사
  const copyReport = async () => {
    if (!testResults || !stats) return;
    
    const report = generateTestReport(testResults, rules, stats);
    await navigator.clipboard.writeText(report);
    await showAlert("보고서가 복사되었습니다", "success");
  };

  // CSV 다운로드
  const downloadCSV = () => {
    if (!testResults) return;
    
    const csv = exportToCSV(testResults);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `test-results-${Date.now()}.csv`;
    link.click();
    
    showAlert("CSV 파일이 다운로드되었습니다", "success");
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-3d test-translator-modal" onClick={(e) => e.stopPropagation()}>
        {/* 헤더 */}
        <div className="test-header">
          <h2 className="test-title">🧪 테스트 번역기</h2>
          <button className="modal-close-btn" onClick={onClose}>✕</button>
        </div>

        {/* 샘플 선택 */}
        <div className="test-controls">
          <div className="test-control-group">
            <label className="test-label">언어 선택</label>
            <select
              className="test-select"
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
              <option value="custom">사용자 정의</option>
            </select>
          </div>

          {['korean', 'english'].includes(selectedLanguage) && (
            <div className="test-control-group">
              <label className="test-label">카테고리</label>
              <select
                className="test-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {Object.entries(CATEGORIES[selectedLanguage].subcategories).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>
          )}

          <button
            className="btn-3d btn-primary"
            onClick={runTest}
            disabled={isTesting}
          >
            {isTesting ? '⏳ 테스트 중...' : '🧪 테스트 실행'}
          </button>
        </div>

        {/* 사용자 정의 샘플 추가 */}
        {selectedLanguage === 'custom' && (
          <div className="test-custom-input">
            <input
              type="text"
              className="test-input"
              value={customSample}
              onChange={(e) => setCustomSample(e.target.value)}
              placeholder="테스트할 문장을 입력하세요"
              onKeyPress={(e) => e.key === 'Enter' && handleAddCustom()}
            />
            <button className="btn-3d" onClick={handleAddCustom}>
              ➕ 추가
            </button>
          </div>
        )}

        {/* 샘플 목록 */}
        <div className="test-samples">
          <h3 className="test-section-title">
            📝 샘플 문장 ({samples.length}개)
          </h3>
          <div className="test-sample-list">
            {samples.map((sample, idx) => (
              <div key={idx} className="test-sample-item">
                {sample}
              </div>
            ))}
          </div>
        </div>

        {/* 테스트 결과 */}
        {stats && testResults && (
          <div className="test-results">
            <div className="test-results-header">
              <h3 className="test-section-title">📊 테스트 결과</h3>
              <div className="test-result-actions">
                <button className="btn-3d btn-small" onClick={copyReport}>
                  📋 보고서
                </button>
                <button className="btn-3d btn-small" onClick={downloadCSV}>
                  💾 CSV
                </button>
              </div>
            </div>

            {/* 통계 */}
            <div className="test-stats-grid">
              <div className="test-stat-card">
                <div className="test-stat-value">{stats.total}</div>
                <div className="test-stat-label">전체</div>
              </div>
              <div className="test-stat-card success">
                <div className="test-stat-value">✅ {stats.reversible}</div>
                <div className="test-stat-label">성공 ({stats.reversibleRate}%)</div>
              </div>
              <div className="test-stat-card error">
                <div className="test-stat-value">❌ {stats.irreversible}</div>
                <div className="test-stat-label">실패</div>
              </div>
              <div className="test-stat-card">
                <div className="test-stat-value">{stats.avgChangeRate}%</div>
                <div className="test-stat-label">평균 변환율</div>
              </div>
            </div>

            {/* 결과 리스트 */}
            <div className="test-result-list">
              {testResults.map((result, idx) => (
                <div
                  key={idx}
                  className={`test-result-item ${result.isReversible ? 'success' : 'error'}`}
                >
                  <div className="test-result-status">
                    {result.isReversible ? '✅' : '❌'}
                  </div>
                  <div className="test-result-content">
                    <div className="test-result-text">
                      <span className="test-result-label">원본:</span>
                      <span className="test-result-value">{sanitizeText(result.original)}</span>
                    </div>
                    <div className="test-result-text">
                      <span className="test-result-label">암호:</span>
                      <span className="test-result-value encoded">{sanitizeText(result.encoded)}</span>
                    </div>
                    {!result.isReversible && (
                      <div className="test-result-text error">
                        <span className="test-result-label">복호:</span>
                        <span className="test-result-value">{sanitizeText(result.decoded)}</span>
                      </div>
                    )}
                    <div className="test-result-meta">
                      변환율: {result.changeRate}% · 적용 규칙: {result.appliedRules.length}개
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

