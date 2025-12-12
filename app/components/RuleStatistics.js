"use client";

import { useState, useEffect } from "react";
import { useEscapeKey } from "../hooks/useEscapeKey";
import {
  getTopRules,
  getRecentRules,
  getStatisticsSummary,
  clearStatistics,
  getUnusedRules
} from "../lib/ruleStatistics";

/**
 * 규칙 통계 모달
 */
export default function RuleStatistics({ rules, onClose }) {
  useEscapeKey(onClose);
  
  const [topRules, setTopRules] = useState([]);
  const [recentRules, setRecentRules] = useState([]);
  const [summary, setSummary] = useState(null);
  const [unusedRules, setUnusedRules] = useState([]);
  const [activeTab, setActiveTab] = useState('top'); // top | recent | unused | summary

  useEffect(() => {
    loadStatistics();
  }, [rules]);

  const loadStatistics = () => {
    setTopRules(getTopRules(10));
    setRecentRules(getRecentRules(10));
    setSummary(getStatisticsSummary());
    setUnusedRules(getUnusedRules(rules));
  };

  const handleClearStats = () => {
    if (confirm("모든 통계 데이터를 초기화하시겠습니까?")) {
      clearStatistics();
      loadStatistics();
    }
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString('ko-KR');
  };

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[9999] p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-gradient-to-br from-slate-800/98 to-slate-900/98 backdrop-blur-xl rounded-3xl p-8 w-full max-w-[900px] max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border-2 border-green-500/30 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="text-5xl">📊</div>
            <div>
              <h2 className="text-3xl font-extrabold text-white">규칙 사용 통계</h2>
              <p className="text-sm text-slate-400 mt-1">
                {summary?.totalRules || 0}개 규칙, 총 {summary?.totalUsage || 0}회 사용
              </p>
            </div>
          </div>
          <button
            className="text-slate-400 hover:text-white transition-colors text-2xl leading-none hover:rotate-90 transition-transform duration-300"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* 탭 */}
        <div className="flex gap-2 mb-4">
          <button
            className={`btn-3d btn-compact flex-1 ${activeTab === 'top' ? 'ring-2 ring-green-400' : ''}`}
            onClick={() => setActiveTab('top')}
          >
            🏆 인기 규칙
          </button>
          <button
            className={`btn-3d btn-compact flex-1 ${activeTab === 'recent' ? 'ring-2 ring-green-400' : ''}`}
            onClick={() => setActiveTab('recent')}
          >
            ⏰ 최근 사용
          </button>
          <button
            className={`btn-3d btn-compact flex-1 ${activeTab === 'unused' ? 'ring-2 ring-green-400' : ''}`}
            onClick={() => setActiveTab('unused')}
          >
            💤 미사용
          </button>
          <button
            className={`btn-3d btn-compact flex-1 ${activeTab === 'summary' ? 'ring-2 ring-green-400' : ''}`}
            onClick={() => setActiveTab('summary')}
          >
            📈 요약
          </button>
        </div>

        {/* 콘텐츠 */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {activeTab === 'top' && (
            <div className="space-y-2">
              {topRules.length === 0 ? (
                <div className="text-center py-20 opacity-70">
                  <div className="text-6xl mb-4">📭</div>
                  <p className="text-slate-400">통계 데이터가 없습니다</p>
                  <p className="text-xs text-slate-500 mt-2">
                    번역을 실행하면 자동으로 기록됩니다
                  </p>
                </div>
              ) : (
                topRules.map((rule, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-700/50 border border-slate-600/50 rounded-xl p-4 hover:bg-slate-700/70 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl font-bold text-yellow-400">
                          #{idx + 1}
                        </div>
                        <div>
                          <div className="text-sm text-slate-300">
                            <strong className="text-white">{rule.from}</strong>
                            <span className="mx-2 text-slate-500">→</span>
                            <strong className="text-cyan-300">{rule.to}</strong>
                          </div>
                          <div className="text-xs text-slate-500 mt-1">
                            암호화 {rule.encodeCount}회 · 복호화 {rule.decodeCount}회
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-green-400">
                          {rule.useCount}회
                        </div>
                        <div className="text-xs text-slate-500">
                          {formatDate(rule.lastUsed).split(' ')[0]}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'recent' && (
            <div className="space-y-2">
              {recentRules.length === 0 ? (
                <div className="text-center py-20 opacity-70">
                  <div className="text-6xl mb-4">📭</div>
                  <p className="text-slate-400">통계 데이터가 없습니다</p>
                </div>
              ) : (
                recentRules.map((rule, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-700/50 border border-slate-600/50 rounded-xl p-4 hover:bg-slate-700/70 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-slate-300">
                          <strong className="text-white">{rule.from}</strong>
                          <span className="mx-2 text-slate-500">→</span>
                          <strong className="text-cyan-300">{rule.to}</strong>
                        </div>
                        <div className="text-xs text-slate-500 mt-1">
                          총 {rule.useCount}회 사용
                        </div>
                      </div>
                      <div className="text-right text-xs text-slate-400">
                        {formatDate(rule.lastUsed)}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'unused' && (
            <div className="space-y-2">
              {unusedRules.length === 0 ? (
                <div className="text-center py-20 opacity-70">
                  <div className="text-6xl mb-4">✅</div>
                  <p className="text-slate-400">모든 규칙이 사용되었습니다!</p>
                </div>
              ) : (
                <>
                  <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">💤</span>
                      <div>
                        <p className="text-sm text-orange-200 font-bold">
                          {unusedRules.length}개의 미사용 규칙
                        </p>
                        <p className="text-xs text-orange-300/70 mt-1">
                          이 규칙들은 아직 번역에 사용되지 않았습니다
                        </p>
                      </div>
                    </div>
                  </div>
                  {unusedRules.map((rule, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-700/50 border border-slate-600/50 rounded-xl p-3"
                    >
                      <div className="text-sm text-slate-300">
                        <strong className="text-white">{rule.from}</strong>
                        <span className="mx-2 text-slate-500">→</span>
                        <strong className="text-cyan-300">{rule.to}</strong>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}

          {activeTab === 'summary' && summary && (
            <div className="space-y-4">
              {/* 전체 통계 카드 */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-500/10 border-2 border-blue-500/30 rounded-xl p-4">
                  <div className="text-xs text-blue-300 mb-1">총 규칙 수</div>
                  <div className="text-3xl font-bold text-white">{summary.totalRules}</div>
                </div>
                <div className="bg-green-500/10 border-2 border-green-500/30 rounded-xl p-4">
                  <div className="text-xs text-green-300 mb-1">총 사용 횟수</div>
                  <div className="text-3xl font-bold text-white">{summary.totalUsage}</div>
                </div>
                <div className="bg-purple-500/10 border-2 border-purple-500/30 rounded-xl p-4">
                  <div className="text-xs text-purple-300 mb-1">암호화</div>
                  <div className="text-3xl font-bold text-white">{summary.encodeTotal}</div>
                </div>
                <div className="bg-cyan-500/10 border-2 border-cyan-500/30 rounded-xl p-4">
                  <div className="text-xs text-cyan-300 mb-1">복호화</div>
                  <div className="text-3xl font-bold text-white">{summary.decodeTotal}</div>
                </div>
              </div>

              {/* 평균 & 최고/최저 */}
              <div className="bg-slate-700/30 border-2 border-slate-600/50 rounded-xl p-5 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">평균 사용 횟수</span>
                  <span className="text-lg font-bold text-white">{summary.avgUsage}회</span>
                </div>
                {summary.mostUsed && (
                  <div className="border-t border-slate-600 pt-3">
                    <div className="text-xs text-green-300 mb-1">🏆 가장 많이 사용</div>
                    <div className="text-sm">
                      <strong className="text-white">{summary.mostUsed.from}</strong>
                      <span className="mx-2 text-slate-500">→</span>
                      <strong className="text-cyan-300">{summary.mostUsed.to}</strong>
                      <span className="ml-2 text-green-400 font-bold">
                        ({summary.mostUsed.useCount}회)
                      </span>
                    </div>
                  </div>
                )}
                {summary.leastUsed && summary.leastUsed.useCount > 0 && (
                  <div className="border-t border-slate-600 pt-3">
                    <div className="text-xs text-slate-400 mb-1">💤 가장 적게 사용</div>
                    <div className="text-sm">
                      <strong className="text-white">{summary.leastUsed.from}</strong>
                      <span className="mx-2 text-slate-500">→</span>
                      <strong className="text-cyan-300">{summary.leastUsed.to}</strong>
                      <span className="ml-2 text-slate-400">
                        ({summary.leastUsed.useCount}회)
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* 하단 버튼 */}
        <div className="flex gap-2 mt-6">
          <button 
            className="btn-3d btn-red flex-1" 
            onClick={handleClearStats}
          >
            통계 초기화
          </button>
          <button 
            className="btn-3d flex-1" 
            onClick={onClose}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}

