"use client";

import { useEscapeKey } from "../hooks/useEscapeKey";

export default function AIGeneratorModal({
  onClose,
  onGenerate,
  preview,
  setPreview,
}) {
  // 🎯 Quick Win 4: Esc 키로 모달 닫기
  useEscapeKey(onClose);

  const modes = [
    { id: 1, name: "문자 기반 암호 언어", desc: "알파벳을 새롭게 재매핑", icon: "🔤" },
    { id: 2, name: "음절 기반 판타지 언어", desc: "ka-ra-ma 등 음절 조합", icon: "✨" },
    { id: 3, name: "접두/접미 규칙 언어", desc: "va + 문자 + -en 형태", icon: "🎭" },
    { id: 4, name: "난수 암호언어", desc: "암호처럼 보이는 랜덤 문자열", icon: "🎲" },
  ];

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[9999] p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-xl rounded-2xl p-8 w-full max-w-[520px] space-y-6 shadow-2xl border-2 border-blue-500/30 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-4xl">🤖</div>
            <div>
              <h2 className="text-2xl font-extrabold text-white">AI 언어 자동 생성기</h2>
              <p className="text-sm text-slate-400 mt-1">
                언어 생성 방식을 선택하세요
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

        {/* 모드 선택 */}
        <div className="space-y-3">
          {modes.map((m) => (
            <div
              key={m.id}
              className={`group p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                preview.mode === m.id 
                  ? "bg-gradient-to-r from-blue-500/30 to-purple-500/30 border-2 border-blue-400 shadow-lg shadow-blue-500/20 scale-[1.02]" 
                  : "bg-slate-700/30 border-2 border-transparent hover:border-slate-600 hover:bg-slate-700/50"
              }`}
              onClick={() => setPreview({ ...preview, mode: m.id })}
            >
              <div className="flex items-start gap-3">
                <div className="text-3xl">{m.icon}</div>
                <div className="flex-1">
                  <h3 className="font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">
                    {m.name}
                  </h3>
                  <p className="text-sm text-slate-400">{m.desc}</p>
                </div>
                {preview.mode === m.id && (
                  <div className="text-blue-400 text-xl">✓</div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* 미리보기 */}
        {preview.data && preview.data.length > 0 && (
          <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 border-2 border-green-500/30 p-4 rounded-xl animate-fade-in">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">👁️</span>
              <strong className="text-white font-bold">미리보기 규칙</strong>
              <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded-full">
                {preview.data.length}개 생성됨
              </span>
            </div>
            <div className="bg-black/30 p-3 rounded-lg max-h-[180px] overflow-y-auto custom-scrollbar">
              <pre className="text-sm text-slate-300 font-mono">
{preview.data.slice(0, 10).map((rule, idx) => 
  `${String(idx + 1).padStart(2, '0')}. ${rule.from} → ${rule.to}`
).join('\n')}
{preview.data.length > 10 ? `\n... 외 ${preview.data.length - 10}개 규칙` : ''}
              </pre>
            </div>
          </div>
        )}

        {/* 버튼 그룹 */}
        <div className="flex gap-3 pt-2">
          <button 
            className="btn-3d flex-1 text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed" 
            onClick={onGenerate}
            disabled={!preview.data || preview.data.length === 0}
          >
            🚀 언어 생성 적용하기
          </button>
          <button className="btn-3d btn-red px-6" onClick={onClose}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

