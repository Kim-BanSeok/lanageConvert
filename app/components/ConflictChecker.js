"use client";

import { useEffect, useState } from "react";
import {
  detectConflicts,
  hasConflicts,
  getConflictSummary,
  autoFixConflicts,
} from "../utils/conflictChecker";

export default function ConflictChecker({ rules, onFixConflicts }) {
  const [conflicts, setConflicts] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const detected = detectConflicts(rules);
    setConflicts(detected);
  }, [rules]);

  if (!conflicts || !hasConflicts(conflicts)) {
    return null; // 충돌 없으면 아무것도 표시 안 함
  }

  const handleAutoFix = () => {
    if (confirm("충돌을 자동으로 수정하시겠습니까?\n(중복된 규칙이 제거됩니다)")) {
      const fixed = autoFixConflicts(rules, conflicts);
      onFixConflicts(fixed);
    }
  };

  return (
    <div className="card-3d p-4 border-2 border-yellow-500/50 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">⚠️</span>
          <div>
            <h3 className="font-bold text-yellow-300">규칙 충돌 감지</h3>
            <p className="text-sm opacity-80">
              {getConflictSummary(conflicts)}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            className="btn-3d text-sm px-3 py-1"
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? "숨기기" : "상세보기"}
          </button>
          <button
            className="btn-3d text-sm px-3 py-1 bg-yellow-500"
            onClick={handleAutoFix}
          >
            자동 수정
          </button>
        </div>
      </div>

      {/* 상세 정보 */}
      {showDetails && (
        <div className="space-y-3 mt-3 text-sm">
          {/* From 중복 */}
          {conflicts.fromDuplicates.length > 0 && (
            <div className="bg-red-500/20 p-3 rounded-lg">
              <h4 className="font-semibold text-red-300 mb-2">
                🔴 From 중복 ({conflicts.fromDuplicates.length}개)
              </h4>
              {conflicts.fromDuplicates.map((dup, idx) => (
                <div key={idx} className="mb-2">
                  <div className="font-medium">"{dup.from}"가 중복됨:</div>
                  <ul className="ml-4 mt-1 space-y-1">
                    {dup.rules.map((rule, i) => (
                      <li key={i} className="opacity-80">
                        • {rule.from} → {rule.to}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* 순환 참조 */}
          {conflicts.circularReferences.length > 0 && (
            <div className="bg-orange-500/20 p-3 rounded-lg">
              <h4 className="font-semibold text-orange-300 mb-2">
                🔄 순환 참조 ({conflicts.circularReferences.length}개)
              </h4>
              {conflicts.circularReferences.map((circ, idx) => (
                <div key={idx} className="mb-2 opacity-80">
                  • {circ.rule1.rule.from} → {circ.rule1.rule.to} ⇄{" "}
                  {circ.rule2.rule.from} → {circ.rule2.rule.to}
                </div>
              ))}
            </div>
          )}

          {/* 자기 참조 */}
          {conflicts.selfReferences.length > 0 && (
            <div className="bg-orange-500/20 p-3 rounded-lg">
              <h4 className="font-semibold text-orange-300 mb-2">
                🔁 자기 참조 ({conflicts.selfReferences.length}개)
              </h4>
              {conflicts.selfReferences.map((self, idx) => (
                <div key={idx} className="mb-1 opacity-80">
                  • {self.rule.from} → {self.rule.to} (변환되지 않음)
                </div>
              ))}
            </div>
          )}

          {/* To 중복 (경고만) */}
          {conflicts.toDuplicates.length > 0 && (
            <div className="bg-yellow-500/20 p-3 rounded-lg">
              <h4 className="font-semibold text-yellow-300 mb-2">
                ⚠️ To 중복 - 경고 ({conflicts.toDuplicates.length}개)
              </h4>
              <p className="text-xs opacity-70 mb-2">
                여러 단어가 같은 결과로 변환됩니다. 복호화 시 원본을 구분할 수 없습니다.
              </p>
              {conflicts.toDuplicates.map((dup, idx) => (
                <div key={idx} className="mb-2">
                  <div className="font-medium">"{dup.to}"로 변환됨:</div>
                  <ul className="ml-4 mt-1 space-y-1">
                    {dup.rules.map((rule, i) => (
                      <li key={i} className="opacity-80">
                        • {rule.from} → {rule.to}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

