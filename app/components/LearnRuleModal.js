"use client";

import { useState } from "react";

export default function LearnRuleModal({ onClose, onLearn }) {
  const [original, setOriginal] = useState("");
  const [translated, setTranslated] = useState("");

  const wordCount = original.trim().split(/\s+/).filter(Boolean).length;
  const translatedCount = translated.trim().split(/\s+/).filter(Boolean).length;
  const isValid = original.trim() && translated.trim() && wordCount === translatedCount;

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[9999] p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-xl rounded-2xl p-8 w-full max-w-[520px] space-y-6 shadow-2xl border-2 border-purple-500/30 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-4xl">🧠</div>
            <div>
              <h2 className="text-2xl font-extrabold text-white">단어 규칙 학습기</h2>
              <p className="text-sm text-slate-400 mt-1">
                AI가 자동으로 규칙을 분석합니다
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

        {/* 안내 메시지 */}
        <div className="bg-blue-500/10 border-2 border-blue-500/30 rounded-xl p-4">
          <div className="flex items-start gap-2">
            <span className="text-xl">💡</span>
            <p className="text-sm text-slate-300">
              두 문장의 <strong className="text-white">단어 개수가 같아야</strong> 정확하게 학습됩니다. 
              공백으로 구분된 단어 단위로 1:1 매칭됩니다.
            </p>
          </div>
        </div>

        {/* 원문 입력 */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-slate-300 flex items-center gap-2">
              <span className="text-lg">📝</span>
              원문 문장
            </label>
            <span className="text-xs bg-slate-700/50 text-slate-400 px-2 py-1 rounded-full">
              단어 수: {wordCount}
            </span>
          </div>
          <textarea
            className="input-3d w-full h-[100px] text-base"
            value={original}
            onChange={(e) => setOriginal(e.target.value)}
            placeholder="예: 나는 오늘 커피를 마신다"
          />
        </div>

        {/* 화살표 */}
        <div className="flex justify-center">
          <div className="text-3xl text-blue-400">⬇️</div>
        </div>

        {/* 변환 문장 입력 */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-slate-300 flex items-center gap-2">
              <span className="text-lg">🔄</span>
              변환된 문장
            </label>
            <span className={`text-xs px-2 py-1 rounded-full ${
              translatedCount === wordCount && wordCount > 0
                ? "bg-green-500/20 text-green-300" 
                : "bg-slate-700/50 text-slate-400"
            }`}>
              단어 수: {translatedCount}
            </span>
          </div>
          <textarea
            className="input-3d w-full h-[100px] text-base"
            value={translated}
            onChange={(e) => setTranslated(e.target.value)}
            placeholder="예: do rafa kema lozi"
          />
        </div>

        {/* 검증 메시지 */}
        {original && translated && wordCount !== translatedCount && (
          <div className="bg-red-500/10 border-2 border-red-500/30 rounded-xl p-3 animate-fade-in">
            <div className="flex items-center gap-2 text-red-300 text-sm">
              <span className="text-lg">⚠️</span>
              <span>
                단어 개수가 일치하지 않습니다 (원문: {wordCount}, 변환: {translatedCount})
              </span>
            </div>
          </div>
        )}

        {/* 버튼 그룹 */}
        <div className="flex gap-3 pt-2">
          <button
            className="btn-3d flex-1 text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => onLearn(original, translated)}
            disabled={!isValid}
          >
            🎓 규칙 학습하기
          </button>
          <button className="btn-3d btn-red px-6" onClick={onClose}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

