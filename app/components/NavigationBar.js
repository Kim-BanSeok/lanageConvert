"use client";

import { useState, useEffect, useRef } from "react";
import ThemeToggle from "./ThemeToggle";

/**
 * 깔끔하게 정리된 네비게이션 바
 */
export default function NavigationBar({
  theme,
  onToggleTheme,
  onBackup,
  onHistory,
  onStatistics,
  onShortcuts,
  onGuide,
  onGallery,
  canUndo,
  canRedo,
  onUndo,
  onRedo
}) {
  const [showToolsMenu, setShowToolsMenu] = useState(false);
  const [showHelpMenu, setShowHelpMenu] = useState(false);
  
  const toolsRef = useRef(null);
  const helpRef = useRef(null);

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (toolsRef.current && !toolsRef.current.contains(event.target)) {
        setShowToolsMenu(false);
      }
      if (helpRef.current && !helpRef.current.contains(event.target)) {
        setShowHelpMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="nav-bar">
      <div className="nav-container">
        {/* 왼쪽: 로고 */}
        <div className="nav-section nav-left">
          <div className="nav-logo">
            <span className="nav-logo-icon">🔐</span>
            <span className="nav-logo-text">Language Creator</span>
          </div>
        </div>

        {/* 중앙: Undo/Redo */}
        <div className="nav-section nav-center">
          <div className="nav-group">
            <button
              className={`nav-btn nav-btn-icon ${!canUndo ? 'nav-btn-disabled' : ''}`}
              onClick={onUndo}
              disabled={!canUndo}
              title="실행 취소 (Ctrl+Z)"
            >
              <span className="nav-icon">↶</span>
            </button>
            <button
              className={`nav-btn nav-btn-icon ${!canRedo ? 'nav-btn-disabled' : ''}`}
              onClick={onRedo}
              disabled={!canRedo}
              title="다시 실행 (Ctrl+Shift+Z)"
            >
              <span className="nav-icon">↷</span>
            </button>
          </div>
        </div>

        {/* 오른쪽: 메뉴들 */}
        <div className="nav-section nav-right">
          {/* 테마 토글 */}
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />

          {/* 도구 메뉴 */}
          <div className="nav-dropdown" ref={toolsRef}>
            <button
              className="nav-btn nav-btn-primary"
              onClick={(e) => {
                e.stopPropagation();
                setShowToolsMenu(!showToolsMenu);
                setShowHelpMenu(false);
              }}
              title="도구"
            >
              <span className="nav-icon">🛠️</span>
              <span className="nav-label">도구</span>
              <span className="nav-arrow">{showToolsMenu ? '▲' : '▼'}</span>
            </button>
            
            {showToolsMenu && (
              <div className="nav-dropdown-menu">
                <button className="nav-dropdown-item" onClick={() => { onBackup(); setShowToolsMenu(false); }}>
                  <span className="nav-item-icon">💾</span>
                  <span className="nav-item-text">백업/복원</span>
                  <span className="nav-item-shortcut">Ctrl+B</span>
                </button>
                <button className="nav-dropdown-item" onClick={() => { onHistory(); setShowToolsMenu(false); }}>
                  <span className="nav-item-icon">📜</span>
                  <span className="nav-item-text">번역 히스토리</span>
                </button>
                <button className="nav-dropdown-item" onClick={() => { onStatistics(); setShowToolsMenu(false); }}>
                  <span className="nav-item-icon">📊</span>
                  <span className="nav-item-text">규칙 통계</span>
                </button>
                <button className="nav-dropdown-item" onClick={() => { onGallery(); setShowToolsMenu(false); }}>
                  <span className="nav-item-icon">🖼️</span>
                  <span className="nav-item-text">언어 갤러리</span>
                </button>
              </div>
            )}
          </div>

          {/* 도움말 메뉴 */}
          <div className="nav-dropdown" ref={helpRef}>
            <button
              className="nav-btn nav-btn-secondary"
              onClick={(e) => {
                e.stopPropagation();
                setShowHelpMenu(!showHelpMenu);
                setShowToolsMenu(false);
              }}
              title="도움말"
            >
              <span className="nav-icon">❓</span>
              <span className="nav-label">도움말</span>
              <span className="nav-arrow">{showHelpMenu ? '▲' : '▼'}</span>
            </button>
            
            {showHelpMenu && (
              <div className="nav-dropdown-menu">
                <button className="nav-dropdown-item" onClick={() => { onShortcuts(); setShowHelpMenu(false); }}>
                  <span className="nav-item-icon">⌨️</span>
                  <span className="nav-item-text">키보드 단축키</span>
                </button>
                <button className="nav-dropdown-item" onClick={() => { onGuide(); setShowHelpMenu(false); }}>
                  <span className="nav-item-icon">📖</span>
                  <span className="nav-item-text">사용 가이드</span>
                  <span className="nav-item-shortcut">Ctrl+/</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

