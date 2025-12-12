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
    setSamples(loadSamples());
    setVersions(loadVersions());
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
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="card-3d p-6 w-[760px] max-h-[90vh] overflow-y-auto space-y-4">
        <h2 className="text-2xl font-bold text-center">🧠 언어 진화 시스템</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* 샘플 추가 */}
          <div className="space-y-2">
            <div className="text-lg font-semibold">학습 샘플 추가</div>
            <textarea className="input-3d w-full h-[90px]" value={original} onChange={(e) => setOriginal(e.target.value)} placeholder="원문 문장 (공백 기준 단어 수가 맞아야 학습 정확)" />
            <textarea className="input-3d w-full h-[90px]" value={translated} onChange={(e) => setTranslated(e.target.value)} placeholder="번역문 문장" />
            <button className="btn-3d w-full" onClick={add}>➕ 샘플 저장</button>

            <div className="flex items-center gap-2">
              <div className="text-sm opacity-80">최소 관측 횟수(minCount)</div>
              <input className="input-3d" type="number" min={1} value={minCount} onChange={(e) => setMinCount(e.target.value)} style={{ width: 90 }} />
            </div>

            <div className="text-sm opacity-80">
              저장된 샘플: <b>{samples.length}</b>개
            </div>

            <button className="btn-3d btn-red w-full" onClick={clearAllSamples}>🧹 샘플 전체 삭제</button>
          </div>

          {/* 미리보기 */}
          <div className="space-y-2">
            <div className="text-lg font-semibold">진화 결과 미리보기</div>

            <div className="bg-white/10 rounded-lg p-3">
              <div className="text-sm opacity-80 mb-1">학습으로 얻은 규칙(상위 일부)</div>
              <pre className="text-xs overflow-auto max-h-[140px]">
{JSON.stringify(learnedRules.slice(0, 12), null, 2)}
              </pre>
            </div>

            <div className="bg-white/10 rounded-lg p-3">
              <div className="text-sm opacity-80 mb-1">기존+학습 병합 후 규칙(상위 일부)</div>
              <pre className="text-xs overflow-auto max-h-[140px]">
{JSON.stringify(merged.slice(0, 12), null, 2)}
              </pre>
            </div>

            <button className="btn-3d w-full" onClick={apply}>🚀 언어 진화 적용(버전 저장)</button>
          </div>
        </div>

        {/* 버전 관리 */}
        <div className="bg-white/10 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-lg font-semibold">버전(롤백) 관리</div>
            <div className="text-sm opacity-70">최근 저장된 버전이 위에 표시</div>
          </div>

          {versions.length === 0 ? (
            <div className="text-sm opacity-70">저장된 버전이 없습니다.</div>
          ) : (
            <div className="space-y-2 max-h-[180px] overflow-auto">
              {versions.map((v) => (
                <div key={v.id} className="flex items-center justify-between bg-white/10 rounded-lg p-2">
                  <div>
                    <div className="font-semibold">{v.name}</div>
                    <div className="text-xs opacity-70">
                      {new Date(v.ts).toLocaleString()} · rules: {(v.rules || []).length}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="btn-3d px-3 py-1" onClick={() => rollback(v)}>롤백</button>
                    <button className="btn-3d btn-red px-3 py-1" onClick={() => removeVersion(v.id)}>삭제</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <button className="btn-3d btn-red w-full" onClick={onClose}>닫기</button>
      </div>
    </div>
  );
}

