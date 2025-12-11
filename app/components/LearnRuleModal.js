"use client";

import { useState } from "react";

export default function LearnRuleModal({ onClose, onLearn }) {
  const [original, setOriginal] = useState("");
  const [translated, setTranslated] = useState("");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="card-3d p-6 w-[420px] space-y-4">

        <h2 className="text-2xl font-bold text-center">🧠 단어 규칙 학습기</h2>

        <p className="text-sm opacity-80 text-center">
          원문과 변환된 문장을 입력하면 자동으로 단어 단위 규칙을 학습합니다.
        </p>

        <div>
          <p className="text-sm mb-1 font-medium">원문 문장</p>
          <textarea
            className="input-3d w-full h-[80px]"
            value={original}
            onChange={(e) => setOriginal(e.target.value)}
            placeholder="예: 나는 오늘 커피를 마신다"
          />
        </div>

        <div>
          <p className="text-sm mb-1 font-medium">변환된 문장</p>
          <textarea
            className="input-3d w-full h-[80px]"
            value={translated}
            onChange={(e) => setTranslated(e.target.value)}
            placeholder="예: do rafa kema lozi"
          />
        </div>

        <button
          className="btn-3d w-full"
          onClick={() => onLearn(original, translated)}
          disabled={!original.trim() || !translated.trim()}
        >
          규칙 학습하기
        </button>

        <button className="btn-3d btn-red w-full" onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
}

