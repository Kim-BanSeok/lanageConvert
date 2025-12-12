"use client";

import { useMemo, useState } from "react";
import { generateLanguageIdentity } from "../lib/nameWorldEngine";

export default function LanguageIdentityModal({ rules, onClose, onApply }) {
  const [purpose, setPurpose] = useState("diary");
  const [mood, setMood] = useState("mystery");
  const [baseName, setBaseName] = useState("");

  const identity = useMemo(() => {
    return generateLanguageIdentity({ rules, purpose, mood, baseName });
  }, [rules, purpose, mood, baseName]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="card-3d p-6 w-[520px] max-h-[90vh] overflow-y-auto space-y-4">
        <h2 className="text-2xl font-bold text-center">✨ 언어 네이밍 & 세계관 생성</h2>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-sm opacity-80 mb-1">용도</div>
            <select className="input-3d w-full" value={purpose} onChange={(e) => setPurpose(e.target.value)}>
              <option value="diary">비밀 일기</option>
              <option value="lovers">연인 암호</option>
              <option value="game">게임/세계관</option>
              <option value="work">업무/메모</option>
              <option value="crypto">보안/암호</option>
            </select>
          </div>
          <div>
            <div className="text-sm opacity-80 mb-1">톤</div>
            <select className="input-3d w-full" value={mood} onChange={(e) => setMood(e.target.value)}>
              <option value="mystery">미스테리</option>
              <option value="warm">따뜻함</option>
              <option value="hard">하드SF</option>
              <option value="ancient">고대문명</option>
            </select>
          </div>
        </div>

        <div>
          <div className="text-sm opacity-80 mb-1">이름(선택, 비우면 자동)</div>
          <input
            className="input-3d w-full"
            value={baseName}
            onChange={(e) => setBaseName(e.target.value)}
            placeholder="예: B-D, BANANA, ZARION 등"
          />
        </div>

        <div className="bg-white/10 rounded-lg p-4 space-y-2">
          <div className="text-xl font-extrabold">{identity.name}</div>
          <div className="opacity-90">"{identity.tagline}"</div>
          <div className="text-sm opacity-80 whitespace-pre-line">{identity.description}</div>
          <ul className="text-sm opacity-85 list-disc pl-5">
            {identity.usage.map((x, i) => <li key={i}>{x}</li>)}
          </ul>
        </div>

        <div className="flex gap-3">
          <button className="btn-3d w-full" onClick={() => onApply(identity)}>
            적용(저장)
          </button>
          <button className="btn-3d btn-red w-full" onClick={onClose}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}

