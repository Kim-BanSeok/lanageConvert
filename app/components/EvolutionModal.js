"use client";

import { useEffect, useMemo, useState } from "react";
import {
  addSample, loadSamples, clearSamples,
  learnWordRulesFromSamples, mergeRules, normalizeRules,
  saveVersion, loadVersions, deleteVersion,
} from "../lib/evolutionEngine";

export default function EvolutionModal({ baseRules, onClose, onApplyRules }) {
  const [samples, setSamples] = useState([]);
  const [versions, setVersions] = useState([]);

  const [original, setOriginal] = useState("");
  const [translated, setTranslated] = useState("");
  const [minCount, setMinCount] = useState(1);

  useEffect(() => {
    try {
      const samples = loadSamples();
      const versions = loadVersions();
      setSamples(Array.isArray(samples) ? samples : []);
      setVersions(Array.isArray(versions) ? versions : []);
    } catch (error) {
      console.warn("데이터 로드 실패:", error);
      setSamples([]);
      setVersions([]);
    }
  }, []);

  const learnedRules = useMemo(() => {
    return learnWordRulesFromSamples(samples, { minCount: Number(minCount) || 1 });
  }, [samples, minCount]);

  const merged = useMemo(() => {
    const m = mergeRules(baseRules, learnedRules);
    return normalizeRules(m);
  }, [baseRules, learnedRules]);

  const add = () => {
    const o = original.trim();
    const t = translated.trim();
    if (!o || !t) return alert("원문/번역문 둘 다 입력하세요.");
    const next = addSample({ original: o, translated: t, mode: "word" });
    setSamples(next);
    setOriginal("");
    setTranslated("");
  };

  const apply = () => {
    onApplyRules(merged);
    const nextVersions = saveVersion({
      name: `evolved_${new Date().toISOString().slice(0, 10)}`,
      rules: merged,
      meta: { samples: samples.length, minCount: Number(minCount) || 1 },
    });
    setVersions(nextVersions);
    alert("✅ 언어가 진화(업데이트)되었습니다! (버전 저장 완료)");
    onClose();
  };

  const rollback = (v) => {
    if (!confirm(`이 버전으로 되돌릴까요?\n${v.name}`)) return;
    onApplyRules(v.rules || []);
    alert("↩️ 버전 롤백 완료");
    onClose();
  };

  const removeVersion = (id) => {
    if (!confirm("버전을 삭제할까요?")) return;
    const next = deleteVersion(id);
    setVersions(next);
  };

  const clearAllSamples = () => {
    if (!confirm("학습 샘플을 전부 삭제할까요?")) return;
    clearSamples();
    setSamples([]);
  };

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[9999] p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-xl rounded-2xl p-8 w-full max-w-[880px] max-h-[90vh] overflow-y-auto custom-scrollbar space-y-6 shadow-2xl border-2 border-green-500/30 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-4xl">🧠</div>
            <div>
              <h2 className="text-2xl font-extrabold text-white">언어 진화 시스템</h2>
              <p className="text-sm text-slate-400 mt-1">
                학습 데이터로 언어를 자동으로 발전시킵니다
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

        <div className="grid md:grid-cols-2 gap-6">
          {/* 샘플 추가 */}
          <div className="bg-slate-700/30 border-2 border-slate-600/50 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">📝</span>
              <h3 className="text-lg font-bold text-white">학습 샘플 추가</h3>
            </div>

            <div>
              <label className="text-xs text-slate-400 mb-1 block">원문 문장</label>
              <textarea 
                className="input-3d w-full h-[80px]" 
                value={original} 
                onChange={(e) => setOriginal(e.target.value)} 
                placeholder="예: 나는 오늘 커피를 마신다" 
              />
            </div>

            <div>
              <label className="text-xs text-slate-400 mb-1 block">번역된 문장</label>
              <textarea 
                className="input-3d w-full h-[80px]" 
                value={translated} 
                onChange={(e) => setTranslated(e.target.value)} 
                placeholder="예: do rafa kema lozi" 
              />
            </div>

            <button className="btn-3d w-full" onClick={add}>
              ➕ 샘플 저장
            </button>

            <div className="bg-black/30 rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">최소 관측 횟수</span>
                <input 
                  className="input-3d w-20 text-center" 
                  type="number" 
                  min={1} 
                  value={minCount} 
                  onChange={(e) => setMinCount(e.target.value)} 
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">저장된 샘플</span>
                <span className="text-sm font-bold text-white bg-blue-500/20 px-2 py-1 rounded-full">
                  {samples.length}개
                </span>
              </div>
            </div>

            <button className="btn-3d btn-red w-full" onClick={clearAllSamples}>
              🧹 샘플 전체 삭제
            </button>
          </div>

          {/* 미리보기 */}
          <div className="bg-slate-700/30 border-2 border-slate-600/50 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">👁️</span>
              <h3 className="text-lg font-bold text-white">진화 결과 미리보기</h3>
            </div>

            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-lg p-3">
              <div className="text-xs font-bold text-slate-300 mb-2">학습으로 얻은 규칙</div>
              <pre className="text-xs text-slate-300 font-mono overflow-auto max-h-[120px] custom-scrollbar">
{learnedRules.length > 0 
  ? JSON.stringify(learnedRules.slice(0, 10), null, 2) 
  : "학습된 규칙 없음"}
              </pre>
            </div>

            <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-lg p-3">
              <div className="text-xs font-bold text-slate-300 mb-2">병합 후 최종 규칙</div>
              <pre className="text-xs text-slate-300 font-mono overflow-auto max-h-[120px] custom-scrollbar">
{merged.length > 0 
  ? JSON.stringify(merged.slice(0, 10), null, 2) 
  : "규칙 없음"}
              </pre>
            </div>

            <button className="btn-3d btn-green w-full font-bold" onClick={apply}>
              🚀 언어 진화 적용 (버전 저장)
            </button>
          </div>
        </div>

        {/* 버전 관리 */}
        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-2 border-purple-500/30 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">📚</span>
              <h3 className="text-lg font-bold text-white">버전 관리 (롤백)</h3>
            </div>
            <div className="text-xs text-slate-400">최근 버전이 위에 표시</div>
          </div>

          {!versions || versions.length === 0 ? (
            <div className="text-center py-8 opacity-70">
              <div className="text-4xl mb-2">📦</div>
              <div className="text-sm text-slate-400">저장된 버전이 없습니다</div>
            </div>
          ) : (
            <div className="space-y-2 max-h-[200px] overflow-auto custom-scrollbar">
              {versions.map((v, idx) => (
                <div key={v.id} className="bg-slate-700/50 border border-slate-600/50 rounded-lg p-3 hover:bg-slate-700/70 transition-colors">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full">
                          v{versions.length - idx}
                        </span>
                        <div className="font-bold text-white truncate">{v.name}</div>
                      </div>
                      <div className="text-xs text-slate-400">
                        {new Date(v.ts).toLocaleString()} · 규칙 {(v.rules || []).length}개
                      </div>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button 
                        className="btn-3d text-sm px-3 py-1" 
                        onClick={() => rollback(v)}
                      >
                        ↩️ 롤백
                      </button>
                      <button 
                        className="btn-3d btn-red text-sm px-3 py-1" 
                        onClick={() => removeVersion(v.id)}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 닫기 버튼 */}
        <button className="btn-3d btn-red w-full text-lg" onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
}

