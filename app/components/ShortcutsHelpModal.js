"use client";

import { useEscapeKey } from "../hooks/useEscapeKey";
import { SHORTCUTS_HELP } from "../hooks/useKeyboardShortcuts";

/**
 * 키보드 단축키 도움말 모달
 */
export default function ShortcutsHelpModal({ onClose }) {
  useEscapeKey(onClose);

  // Mac인지 확인
  const isMac = typeof navigator !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0;

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[9999] p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-gradient-to-br from-slate-800/98 to-slate-900/98 backdrop-blur-xl rounded-3xl p-8 w-full max-w-[550px] shadow-2xl border-2 border-purple-500/30 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="text-5xl">⌨️</div>
            <div>
              <h2 className="text-3xl font-extrabold text-white">키보드 단축키</h2>
              <p className="text-sm text-slate-400 mt-1">
                빠른 작업을 위한 단축키
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

        {/* 단축키 목록 */}
        <div className="space-y-2">
          {SHORTCUTS_HELP.map((shortcut, idx) => {
            const keys = isMac ? shortcut.mac : shortcut.keys;
            
            return (
              <div
                key={idx}
                className="flex items-center justify-between p-3 bg-slate-700/30 hover:bg-slate-700/50 border border-slate-600/30 rounded-lg transition-all group"
              >
                <div className="text-sm text-slate-300 group-hover:text-white transition-colors">
                  {shortcut.description}
                </div>
                <div className="flex gap-1">
                  {keys.map((key, keyIdx) => (
                    <kbd
                      key={keyIdx}
                      className="px-3 py-1.5 text-xs font-bold text-white bg-slate-600/50 border-2 border-slate-500 rounded-lg shadow-lg min-w-[40px] text-center"
                    >
                      {key}
                    </kbd>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Tip */}
        <div className="mt-6 bg-purple-500/10 border-2 border-purple-500/30 rounded-xl p-4">
          <div className="flex items-start gap-2">
            <span className="text-xl">💡</span>
            <div className="text-sm text-slate-300">
              <strong className="text-white">Tip:</strong> 단축키를 익히면 훨씬 빠르게 작업할 수 있습니다!
              {isMac ? " Mac에서는 Ctrl 대신 ⌘(Command)를 사용하세요." : ""}
            </div>
          </div>
        </div>

        {/* 닫기 버튼 */}
        <button 
          className="btn-3d w-full mt-6 text-lg" 
          onClick={onClose}
        >
          닫기
        </button>
      </div>
    </div>
  );
}

