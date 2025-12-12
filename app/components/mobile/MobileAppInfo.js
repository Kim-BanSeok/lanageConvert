"use client";

/**
 * 📱 모바일 앱 정보
 */
export default function MobileAppInfo({ onBack }) {
  const features = [
    { icon: "🔐", text: "규칙 기반 암호화/복호화" },
    { icon: "🤖", text: "AI 언어 자동 생성" },
    { icon: "🧠", text: "단어 학습 기능" },
    { icon: "💾", text: "프리셋 저장/불러오기" },
    { icon: "🔍", text: "규칙 충돌 검사" },
    { icon: "🧪", text: "테스트 번역기" },
    { icon: "📊", text: "사용 통계 분석" },
    { icon: "🖼️", text: "언어 갤러리" },
    { icon: "🌓", text: "다크/라이트 테마" },
    { icon: "📱", text: "PWA 설치 지원" },
  ];

  return (
    <div className="mobile-info-container">
      <div className="mobile-section-header">
        <button className="mobile-back-btn" onClick={onBack}>
          ← 돌아가기
        </button>
        <h2 className="mobile-section-title">앱 정보</h2>
      </div>

      {/* 앱 로고 */}
      <div className="mobile-info-logo">
        <div className="mobile-info-logo-icon">🔤</div>
        <h1 className="mobile-info-logo-title">나만의 언어</h1>
        <p className="mobile-info-logo-subtitle">Language Creator</p>
        <div className="mobile-info-version">v1.0.0</div>
      </div>

      {/* 설명 */}
      <div className="mobile-info-description">
        <p>
          나만의 언어는 규칙 기반 번역 엔진을 제공하는 언어 창작 플랫폼입니다.
          직접 변환 규칙을 만들거나 AI로 자동 생성하여 독특한 언어를 만들어보세요.
        </p>
      </div>

      {/* 주요 기능 */}
      <div className="mobile-info-features">
        <h3 className="mobile-info-subtitle">✨ 주요 기능</h3>
        <div className="mobile-info-feature-grid">
          {features.map((feature, idx) => (
            <div key={idx} className="mobile-info-feature-item">
              <span className="mobile-info-feature-icon">{feature.icon}</span>
              <span className="mobile-info-feature-text">{feature.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 기술 스택 */}
      <div className="mobile-info-tech">
        <h3 className="mobile-info-subtitle">🛠️ 기술 스택</h3>
        <div className="mobile-info-tech-list">
          <div className="mobile-info-tech-item">
            <strong>Frontend:</strong> Next.js 15, React
          </div>
          <div className="mobile-info-tech-item">
            <strong>Styling:</strong> CSS3, Glassmorphism
          </div>
          <div className="mobile-info-tech-item">
            <strong>Storage:</strong> LocalStorage, IndexedDB
          </div>
          <div className="mobile-info-tech-item">
            <strong>PWA:</strong> Service Worker, Offline Support
          </div>
        </div>
      </div>

      {/* 라이선스 */}
      <div className="mobile-info-license">
        <h3 className="mobile-info-subtitle">📜 라이선스</h3>
        <p className="mobile-info-license-text">
          이 프로젝트는 MIT 라이선스 하에 배포됩니다.
        </p>
      </div>

      {/* 링크 */}
      <div className="mobile-info-links">
        <button
          className="mobile-info-link-btn"
          onClick={() => window.open("https://github.com/Kim-BanSeok/lanageConvert", "_blank")}
        >
          <span>🐙</span>
          <span>GitHub 저장소</span>
        </button>
      </div>

      {/* 푸터 */}
      <div className="mobile-info-footer">
        <p>Made with ❤️ by Language Creator Team</p>
        <p>© 2024 All rights reserved</p>
      </div>
    </div>
  );
}

