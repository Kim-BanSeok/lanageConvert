"use client";

/**
 * 📱 모바일 더보기 화면
 */
export default function MobileMore({ router, theme, toggleTheme }) {
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
      action: () => alert('백업/복원 기능'),
    },
    {
      icon: '⌨️',
      title: '키보드 단축키',
      desc: '단축키 목록 보기',
      action: () => alert('단축키 안내'),
    },
    {
      icon: '📖',
      title: '사용 가이드',
      desc: '앱 사용법 배우기',
      action: () => alert('사용 가이드'),
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
      action: () => alert('Language Creator v1.0'),
    },
  ];

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

