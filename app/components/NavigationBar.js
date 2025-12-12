"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
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
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [mounted, setMounted] = useState(false);
  
  const toolsButtonRef = useRef(null);
  const helpButtonRef = useRef(null);
  const toolsMenuRef = useRef(null);
  const helpMenuRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 드롭다운 위치 계산
  const calculatePosition = (buttonRef) => {
    if (!buttonRef.current) return { top: 0, left: 0 };
    
    const rect = buttonRef.current.getBoundingClientRect();
    const top = rect.bottom + 8;
    const left = rect.right - 240; // 메뉴 너비만큼 왼쪽으로
    
    return { top, left };
  };

  // 도구 메뉴 열기
  const toggleToolsMenu = (e) => {
    e.stopPropagation();
    if (!showToolsMenu) {
      setMenuPosition(calculatePosition(toolsButtonRef));
    }
    setShowToolsMenu(!showToolsMenu);
    setShowHelpMenu(false);
  };

  // 도움말 메뉴 열기
  const toggleHelpMenu = (e) => {
    e.stopPropagation();
    if (!showHelpMenu) {
      setMenuPosition(calculatePosition(helpButtonRef));
    }
    setShowHelpMenu(!showHelpMenu);
    setShowToolsMenu(false);
  };

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        toolsMenuRef.current && 
        !toolsMenuRef.current.contains(event.target) &&
        toolsButtonRef.current &&
        !toolsButtonRef.current.contains(event.target)
      ) {
        setShowToolsMenu(false);
      }
      if (
        helpMenuRef.current && 
        !helpMenuRef.current.contains(event.target) &&
        helpButtonRef.current &&
        !helpButtonRef.current.contains(event.target)
      ) {
        setShowHelpMenu(false);
      }
    };

    if (showToolsMenu || showHelpMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showToolsMenu, showHelpMenu]);

  // 스크롤 시 메뉴 닫기
  useEffect(() => {
    const handleScroll = () => {
      setShowToolsMenu(false);
      setShowHelpMenu(false);
    };

    if (showToolsMenu || showHelpMenu) {
      window.addEventListener('scroll', handleScroll, true);
      return () => window.removeEventListener('scroll', handleScroll, true);
    }
  }, [showToolsMenu, showHelpMenu]);

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
          <div className="nav-dropdown">
            <button
              ref={toolsButtonRef}
              className="nav-btn nav-btn-primary"
              onClick={toggleToolsMenu}
              title="도구"
            >
              <span className="nav-icon">🛠️</span>
              <span className="nav-label">도구</span>
              <span className="nav-arrow">{showToolsMenu ? '▲' : '▼'}</span>
            </button>
          </div>

          {/* 도움말 메뉴 */}
          <div className="nav-dropdown">
            <button
              ref={helpButtonRef}
              className="nav-btn nav-btn-secondary"
              onClick={toggleHelpMenu}
              title="도움말"
            >
              <span className="nav-icon">❓</span>
              <span className="nav-label">도움말</span>
              <span className="nav-arrow">{showHelpMenu ? '▲' : '▼'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 🎨 Portal로 드롭다운 렌더링 (절대 가려지지 않음) */}
      {mounted && showToolsMenu && createPortal(
        <>
          <div 
            className="nav-dropdown-overlay"
            onClick={() => setShowToolsMenu(false)}
          />
          <div 
            ref={toolsMenuRef}
            className="nav-dropdown-menu"
            style={{
              position: 'fixed',
              top: `${menuPosition.top}px`,
              left: `${menuPosition.left}px`,
            }}
          >
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
        </>,
        document.body
      )}

      {mounted && showHelpMenu && createPortal(
        <>
          <div 
            className="nav-dropdown-overlay"
            onClick={() => setShowHelpMenu(false)}
          />
          <div 
            ref={helpMenuRef}
            className="nav-dropdown-menu"
            style={{
              position: 'fixed',
              top: `${menuPosition.top}px`,
              left: `${menuPosition.left}px`,
            }}
          >
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
        </>,
        document.body
      )}
    </nav>
  );
}

