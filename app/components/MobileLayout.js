"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

/**
 * 📱 모바일 전용 레이아웃
 * 앱처럼 보이는 완전히 다른 UI
 */
export default function MobileLayout({ children, onTabChange }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('home');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  return (
    <div className="mobile-app-container">
      {/* 모바일 헤더 */}
      <div className="mobile-header">
        <div className="mobile-header-content">
          <div className="mobile-logo">
            <span className="mobile-logo-icon">🔐</span>
            <span className="mobile-logo-text">나만의 언어</span>
          </div>
          <div className="mobile-header-actions">
            <button 
              className="mobile-icon-btn"
              onClick={() => router.push('/gallery')}
              title="갤러리"
            >
              🖼️
            </button>
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="mobile-content">
        {children}
      </div>

      {/* 하단 탭 네비게이션 */}
      <div className="mobile-bottom-nav">
        <button
          className={`mobile-nav-item ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => handleTabClick('home')}
        >
          <span className="mobile-nav-icon">🏠</span>
          <span className="mobile-nav-label">홈</span>
        </button>

        <button
          className={`mobile-nav-item ${activeTab === 'rules' ? 'active' : ''}`}
          onClick={() => handleTabClick('rules')}
        >
          <span className="mobile-nav-icon">📋</span>
          <span className="mobile-nav-label">규칙</span>
        </button>

        <button
          className={`mobile-nav-item ${activeTab === 'translate' ? 'active' : ''}`}
          onClick={() => handleTabClick('translate')}
        >
          <span className="mobile-nav-icon mobile-nav-icon-large">🔄</span>
          <span className="mobile-nav-label">번역</span>
        </button>

        <button
          className={`mobile-nav-item ${activeTab === 'tools' ? 'active' : ''}`}
          onClick={() => handleTabClick('tools')}
        >
          <span className="mobile-nav-icon">🛠️</span>
          <span className="mobile-nav-label">도구</span>
        </button>

        <button
          className={`mobile-nav-item ${activeTab === 'more' ? 'active' : ''}`}
          onClick={() => handleTabClick('more')}
        >
          <span className="mobile-nav-icon">⋯</span>
          <span className="mobile-nav-label">더보기</span>
        </button>
      </div>
    </div>
  );
}

