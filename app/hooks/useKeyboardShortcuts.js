// ⌨️ 키보드 단축키 시스템

import { useEffect } from "react";

/**
 * 키보드 단축키 Hook
 * @param {Object} shortcuts - 단축키 맵
 * @param {boolean} enabled - 활성화 여부
 */
export function useKeyboardShortcuts(shortcuts, enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e) => {
      // input, textarea에서는 일부 단축키 무시
      const isInputElement = ['INPUT', 'TEXTAREA'].includes(e.target.tagName);

      // Ctrl/Cmd + Enter: 암호화
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && !e.shiftKey) {
        if (shortcuts.onEncode && !isInputElement) {
          e.preventDefault();
          shortcuts.onEncode();
        }
      }

      // Ctrl/Cmd + Shift + Enter: 복호화
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && e.shiftKey) {
        if (shortcuts.onDecode && !isInputElement) {
          e.preventDefault();
          shortcuts.onDecode();
        }
      }

      // Ctrl/Cmd + S: 프리셋 저장
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        if (shortcuts.onSavePreset) {
          e.preventDefault();
          shortcuts.onSavePreset();
        }
      }

      // Ctrl/Cmd + K: 규칙 추가
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        if (shortcuts.onAddRule) {
          e.preventDefault();
          shortcuts.onAddRule();
        }
      }

      // Ctrl/Cmd + F: 검색 열기
      if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        if (shortcuts.onSearch) {
          e.preventDefault();
          shortcuts.onSearch();
        }
      }

      // Ctrl/Cmd + /: 도움말
      if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        if (shortcuts.onHelp) {
          e.preventDefault();
          shortcuts.onHelp();
        }
      }

      // Ctrl/Cmd + B: 백업
      if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        if (shortcuts.onBackup) {
          e.preventDefault();
          shortcuts.onBackup();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [shortcuts, enabled]);
}

/**
 * 단축키 도움말 정보
 */
export const SHORTCUTS_HELP = [
  { keys: ['Ctrl', 'Z'], mac: ['⌘', 'Z'], description: '실행 취소 (Undo)' },
  { keys: ['Ctrl', 'Shift', 'Z'], mac: ['⌘', '⇧', 'Z'], description: '다시 실행 (Redo)' },
  { keys: ['Ctrl', 'Enter'], mac: ['⌘', '⏎'], description: '암호화' },
  { keys: ['Ctrl', 'Shift', 'Enter'], mac: ['⌘', '⇧', '⏎'], description: '복호화' },
  { keys: ['Ctrl', 'S'], mac: ['⌘', 'S'], description: '프리셋 저장' },
  { keys: ['Ctrl', 'K'], mac: ['⌘', 'K'], description: '규칙 추가' },
  { keys: ['Ctrl', 'F'], mac: ['⌘', 'F'], description: '규칙 검색' },
  { keys: ['Ctrl', '/'], mac: ['⌘', '/'], description: '사용 가이드' },
  { keys: ['Ctrl', 'B'], mac: ['⌘', 'B'], description: '백업/복원' },
  { keys: ['Esc'], mac: ['Esc'], description: '모달 닫기' },
];

