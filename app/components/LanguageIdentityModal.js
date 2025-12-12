"use client";

import { useMemo, useState } from "react";
import { generateLanguageIdentity } from "../lib/nameWorldEngine";
import { useEscapeKey } from "../hooks/useEscapeKey";

export default function LanguageIdentityModal({ rules, onClose, onApply }) {
  // 🎯 Quick Win 4: Esc 키로 모달 닫기
  useEscapeKey(onClose);

  const [purpose, setPurpose] = useState("diary");
  const [mood, setMood] = useState("mystery");
  const [baseName, setBaseName] = useState("");

  const identity = useMemo(() => {
    return generateLanguageIdentity({ rules, purpose, mood, baseName });
  }, [rules, purpose, mood, baseName]);

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[9999] p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-xl rounded-2xl p-8 w-full max-w-[600px] max-h-[90vh] overflow-y-auto custom-scrollbar space-y-6 shadow-2xl border-2 border-yellow-500/30 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-4xl">✨</div>
            <div>
              <h2 className="text-2xl font-extrabold text-white">언어 네이밍 & 세계관 생성</h2>
              <p className="text-sm text-slate-400 mt-1">
                AI가 독특한 언어 아이덴티티를 만듭니다
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

        {/* 설정 카드 */}
        <div className="bg-slate-700/30 border-2 border-slate-600/50 rounded-xl p-5 space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">⚙️</span>
            <h3 className="font-bold text-white">생성 옵션</h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-bold text-slate-300 mb-2 block flex items-center gap-2">
                <span>🎯</span>
                용도
              </label>
              <select 
                className="input-3d w-full" 
                value={purpose} 
                onChange={(e) => setPurpose(e.target.value)}
              >
                <option value="diary">🔒 비밀 일기</option>
                <option value="lovers">💕 연인 암호</option>
                <option value="game">🎮 게임/세계관</option>
                <option value="work">💼 업무/메모</option>
                <option value="crypto">🔐 보안/암호</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-bold text-slate-300 mb-2 block flex items-center gap-2">
                <span>🎨</span>
                톤
              </label>
              <select 
                className="input-3d w-full" 
                value={mood} 
                onChange={(e) => setMood(e.target.value)}
              >
                <option value="mystery">🌙 미스테리</option>
                <option value="warm">☀️ 따뜻함</option>
                <option value="hard">🚀 하드SF</option>
                <option value="ancient">🏛️ 고대문명</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm font-bold text-slate-300 mb-2 block flex items-center gap-2">
              <span>✏️</span>
              커스텀 이름 (선택)
            </label>
            <input
              className="input-3d w-full"
              value={baseName}
              onChange={(e) => setBaseName(e.target.value)}
              placeholder="비우면 자동 생성 (예: B-D, BANANA, ZARION)"
            />
          </div>
        </div>

        {/* 결과 미리보기 */}
        <div className="bg-gradient-to-br from-yellow-500/10 via-purple-500/10 to-pink-500/10 border-2 border-yellow-500/30 rounded-xl p-6 space-y-4 animate-fade-in">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🎭</span>
            <h3 className="font-bold text-white text-lg">생성된 아이덴티티</h3>
          </div>

          {/* 언어 이름 */}
          <div className="bg-black/30 rounded-lg p-4">
            <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
              {identity.name}
            </div>
            <div className="text-lg text-slate-300 italic">
              "{identity.tagline}"
            </div>
          </div>

          {/* 설명 */}
          <div className="bg-black/20 rounded-lg p-4">
            <div className="text-sm font-bold text-slate-300 mb-2 flex items-center gap-2">
              <span>📖</span>
              세계관
            </div>
            <div className="text-sm text-slate-300 whitespace-pre-line leading-relaxed">
              {identity.description}
            </div>
          </div>

          {/* 사용 예시 */}
          <div className="bg-black/20 rounded-lg p-4">
            <div className="text-sm font-bold text-slate-300 mb-3 flex items-center gap-2">
              <span>💡</span>
              활용 방법
            </div>
            <ul className="space-y-2">
              {identity.usage.map((x, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                  <span className="text-blue-400 flex-shrink-0">▪</span>
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 버튼 그룹 */}
        <div className="flex gap-3 pt-2">
          <button 
            className="btn-3d flex-1 text-lg font-bold" 
            onClick={() => onApply(identity)}
          >
            💾 적용 및 저장
          </button>
          <button className="btn-3d btn-red px-6" onClick={onClose}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

