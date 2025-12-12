"use client";

import { useState } from "react";
import MobileUserGuide from "./MobileUserGuide";
import MobileAppInfo from "./MobileAppInfo";
import MobileBackup from "./MobileBackup";

/**
 * 📱 모바일 더보기 화면
 */
export default function MobileMore({ router, theme, toggleTheme, showAlert }) {
  const [currentView, setCurrentView] = useState(null);
  const menuItems = [
    {
      icon: theme === 'dark' ? '🌙' : '☀️',
      title: '테마 변경',
      desc: `현재: ${theme === 'dark' ? '다크' : '라이트'} 모드`,
      action: toggleTheme,
    },
    {
      icon: '💾',
      title: '백업/복원',
      desc: '데이터 저장 및 불러오기',
      action: () => setCurrentView('backup'),
    },
    {
      icon: '⌨️',
      title: '키보드 단축키',
      desc: '단축키 목록 보기',
      action: () => showAlert('모바일에서는 키보드 단축키를 사용할 수 없습니다', 'info'),
    },
    {
      icon: '📖',
      title: '사용 가이드',
      desc: '앱 사용법 배우기',
      action: () => setCurrentView('guide'),
    },
    {
      icon: '🖼️',
      title: '언어 갤러리',
      desc: '다른 사용자의 언어 보기',
      action: () => router.push('/gallery'),
    },
    {
      icon: 'ℹ️',
      title: '앱 정보',
      desc: '버전 및 정보',
      action: () => setCurrentView('info'),
    },
  ];

  // 서브 뷰 렌더링
  if (currentView === 'guide') {
    return <MobileUserGuide onBack={() => setCurrentView(null)} />;
  }

  if (currentView === 'info') {
    return <MobileAppInfo onBack={() => setCurrentView(null)} />;
  }

  if (currentView === 'backup') {
    return <MobileBackup showAlert={showAlert} onBack={() => setCurrentView(null)} />;
  }

  // 메인 더보기 화면
  return (
    <div className="mobile-more-container">
      <div className="mobile-section-header">
        <h2 className="mobile-section-title">더보기</h2>
      </div>

      <div className="mobile-menu-list">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className="mobile-menu-item"
            onClick={item.action}
          >
            <div className="mobile-menu-icon">{item.icon}</div>
            <div className="mobile-menu-content">
              <h3 className="mobile-menu-title">{item.title}</h3>
              <p className="mobile-menu-desc">{item.desc}</p>
            </div>
            <div className="mobile-menu-arrow">›</div>
          </button>
        ))}
      </div>

      <div className="mobile-footer">
        <p className="mobile-footer-text">
          Made with ❤️ by Language Creator
        </p>
        <p className="mobile-footer-version">v1.0.0</p>
      </div>
    </div>
  );
}

