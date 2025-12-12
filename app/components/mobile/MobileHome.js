"use client";

/**
 * 📱 모바일 홈 화면
 */
export default function MobileHome() {
  return (
    <div className="mobile-home-container">
      <div className="mobile-welcome-section">
        <div className="mobile-welcome-icon">🔐</div>
        <h1 className="mobile-welcome-title">나만의 암호 언어</h1>
        <p className="mobile-welcome-subtitle">
          당신만의 비밀 언어를 만들어보세요
        </p>
      </div>

      <div className="mobile-feature-cards">
        <div className="mobile-feature-card">
          <div className="mobile-feature-icon">🔄</div>
          <h3 className="mobile-feature-title">빠른 번역</h3>
          <p className="mobile-feature-desc">
            실시간으로 텍스트를 암호화/복호화
          </p>
        </div>

        <div className="mobile-feature-card">
          <div className="mobile-feature-icon">📋</div>
          <h3 className="mobile-feature-title">규칙 관리</h3>
          <p className="mobile-feature-desc">
            나만의 변환 규칙을 만들고 관리
          </p>
        </div>

        <div className="mobile-feature-card">
          <div className="mobile-feature-icon">🛠️</div>
          <h3 className="mobile-feature-title">강력한 도구</h3>
          <p className="mobile-feature-desc">
            AI 생성, 학습기, 충돌 검사 등
          </p>
        </div>
      </div>

      <div className="mobile-quick-start">
        <h2 className="mobile-section-title">빠른 시작</h2>
        <div className="mobile-quick-steps">
          <div className="mobile-step">
            <div className="mobile-step-number">1</div>
            <div className="mobile-step-content">
              <h4>번역 탭으로 이동</h4>
              <p>하단의 번역 버튼을 탭하세요</p>
            </div>
          </div>
          <div className="mobile-step">
            <div className="mobile-step-number">2</div>
            <div className="mobile-step-content">
              <h4>텍스트 입력</h4>
              <p>암호화할 내용을 입력하세요</p>
            </div>
          </div>
          <div className="mobile-step">
            <div className="mobile-step-number">3</div>
            <div className="mobile-step-content">
              <h4>암호화 실행</h4>
              <p>버튼을 눌러 즉시 변환하세요</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

