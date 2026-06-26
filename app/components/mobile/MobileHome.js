"use client";

/**
 * 모바일 홈 화면
 */
export default function MobileHome() {
  return (
    <div className="mobile-home-container">
      <div className="mobile-welcome-section">
        <div className="mobile-welcome-icon">예</div>
        <h1 className="mobile-welcome-title">나만의 언어 생성기</h1>
        <p className="mobile-welcome-subtitle">
          짧은 예시로 규칙이 어떻게 바뀌는지 바로 확인해 보세요.
        </p>
      </div>

      <div className="mobile-feature-cards">
        <div className="mobile-feature-card">
          <div className="mobile-feature-icon">입</div>
          <h3 className="mobile-feature-title">입력 예시</h3>
          <p className="mobile-feature-desc">
            "안녕하세요" 같은 짧은 문장부터 시작하면 규칙의 영향을 보기 쉽습니다.
          </p>
        </div>

        <div className="mobile-feature-card">
          <div className="mobile-feature-icon">출</div>
          <h3 className="mobile-feature-title">출력 예시</h3>
          <p className="mobile-feature-desc">
            같은 입력도 규칙 순서에 따라 다른 결과가 나올 수 있습니다.
          </p>
        </div>

        <div className="mobile-feature-card">
          <div className="mobile-feature-icon">팁</div>
          <h3 className="mobile-feature-title">실전 팁</h3>
          <p className="mobile-feature-desc">
            encode와 decode를 둘 다 시험해 보면 되돌릴 수 있는 규칙인지 확인할 수 있습니다.
          </p>
        </div>
      </div>

      <div className="mobile-feature-cards">
        <div className="mobile-feature-card">
          <div className="mobile-feature-icon">봽</div>
          <h3 className="mobile-feature-title">규칙 관리</h3>
          <p className="mobile-feature-desc">
            저장된 프리셋을 다시 불러와 규칙집을 빠르게 재사용할 수 있습니다.
          </p>
        </div>

        <div className="mobile-feature-card">
          <div className="mobile-feature-icon">가</div>
          <h3 className="mobile-feature-title">가이드 연결</h3>
          <p className="mobile-feature-desc">
            소개와 FAQ를 함께 보면 기능과 사용 이유를 같이 이해할 수 있습니다.
          </p>
        </div>

        <div className="mobile-feature-card">
          <div className="mobile-feature-icon">툴</div>
          <h3 className="mobile-feature-title">도구 모음</h3>
          <p className="mobile-feature-desc">
            AI 생성, 충돌 검사, 히스토리 같은 보조 기능을 한 화면에서 다룹니다.
          </p>
        </div>
      </div>

      <div className="mobile-quick-start">
        <h2 className="mobile-section-title">빠른 시작</h2>
        <div className="mobile-quick-steps">
          <div className="mobile-step">
            <div className="mobile-step-number">1</div>
            <div className="mobile-step-content">
              <h4>규칙 화면으로 이동</h4>
              <p>하단 탭에서 규칙 관리 화면을 열어 보세요.</p>
            </div>
          </div>
          <div className="mobile-step">
            <div className="mobile-step-number">2</div>
            <div className="mobile-step-content">
              <h4>짧은 문장 입력</h4>
              <p>짧은 테스트 문장으로 먼저 결과를 확인합니다.</p>
            </div>
          </div>
          <div className="mobile-step">
            <div className="mobile-step-number">3</div>
            <div className="mobile-step-content">
              <h4>규칙 적용</h4>
              <p>규칙을 하나씩 추가하면서 변환 결과를 살펴보세요.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
