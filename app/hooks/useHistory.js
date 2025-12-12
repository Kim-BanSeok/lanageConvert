// 🔄 Undo/Redo React Hook

import { useState, useEffect, useCallback, useRef } from "react";
import { HistoryManager } from "../lib/undoRedo";

/**
 * Undo/Redo 기능을 제공하는 커스텀 훅
 * @param {any} initialState - 초기 상태
 * @param {number} maxHistorySize - 최대 히스토리 크기
 * @returns {Object} { state, setState, undo, redo, canUndo, canRedo, history }
 */
export function useHistory(initialState, maxHistorySize = 50) {
  const [state, _setState] = useState(initialState);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  
  const historyRef = useRef(null);

  // HistoryManager 초기화
  useEffect(() => {
    if (!historyRef.current) {
      historyRef.current = new HistoryManager(maxHistorySize);
      // 초기 상태 저장
      historyRef.current.push(initialState, "초기 상태");
    }
  }, []);

  // 상태 업데이트 함수
  const setState = useCallback((newState, action = "변경") => {
    _setState(newState);
    
    if (historyRef.current) {
      historyRef.current.push(newState, action);
      updateUndoRedoState();
    }
  }, []);

  // Undo/Redo 상태 업데이트
  const updateUndoRedoState = useCallback(() => {
    if (historyRef.current) {
      setCanUndo(historyRef.current.canUndo());
      setCanRedo(historyRef.current.canRedo());
    }
  }, []);

  // Undo
  const undo = useCallback(() => {
    if (!historyRef.current) return;
    
    const prevEntry = historyRef.current.undo();
    if (prevEntry) {
      _setState(prevEntry.state);
      updateUndoRedoState();
      return prevEntry;
    }
    return null;
  }, [updateUndoRedoState]);

  // Redo
  const redo = useCallback(() => {
    if (!historyRef.current) return;
    
    const nextEntry = historyRef.current.redo();
    if (nextEntry) {
      _setState(nextEntry.state);
      updateUndoRedoState();
      return nextEntry;
    }
    return null;
  }, [updateUndoRedoState]);

  // 키보드 단축키 설정
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl+Z or Cmd+Z: Undo
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      }
      
      // Ctrl+Shift+Z or Cmd+Shift+Z: Redo
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && e.shiftKey) {
        e.preventDefault();
        redo();
      }

      // Ctrl+Y or Cmd+Y: Redo (대안)
      if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
        e.preventDefault();
        redo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo]);

  // 히스토리 정보 가져오기
  const getHistoryInfo = useCallback(() => {
    return historyRef.current ? historyRef.current.getInfo() : null;
  }, []);

  // 히스토리 전체 가져오기
  const getFullHistory = useCallback(() => {
    return historyRef.current ? historyRef.current.getHistory() : [];
  }, []);

  return {
    state,
    setState,
    undo,
    redo,
    canUndo,
    canRedo,
    historyInfo: getHistoryInfo,
    history: getFullHistory
  };
}

