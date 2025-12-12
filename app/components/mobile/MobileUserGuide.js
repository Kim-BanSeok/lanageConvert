"use client";

import { useState } from "react";

/**
 * 📱 모바일 사용 가이드
 */
export default function MobileUserGuide({ onBack }) {
  const [currentStep, setCurrentStep] = useState(0);

  const guides = [
    {
      icon: "🏠",
      title: "홈 화면",
      description: "기본 번역 기능을 사용할 수 있습니다",
      steps: [
        "원본 텍스트 입력창에 문장을 입력하세요",
        "🔐 암호화 또는 🔓 복호화 버튼을 눌러 변환하세요",
        "결과를 확인하고 📋 복사 또는 🔁 교환할 수 있습니다",
        "번역 엔진 모드를 선택하여 다양한 방식으로 변환 가능합니다",
      ],
    },
    {
      icon: "📋",
      title: "규칙 관리",
      description: "변환 규칙을 생성하고 관리합니다",
      steps: [
        "➕ 규칙 추가 버튼으로 새로운 규칙을 만드세요",
        "FROM 입력창에 원본 문자를, TO 입력창에 변환될 문자를 입력하세요",
        "🔍 검색 기능으로 특정 규칙을 빠르게 찾을 수 있습니다",
        "필터를 사용해 규칙을 정렬하고 관리하세요",
      ],
    },
    {
      icon: "🔄",
      title: "변역 화면",
      description: "번역 전용 인터페이스입니다",
      steps: [
        "입력창과 결과창이 세로로 배치되어 있습니다",
        "빠른 번역을 위한 최적화된 UI입니다",
        "암호화/복호화 버튼을 눌러 즉시 변환하세요",
      ],
    },
    {
      icon: "🛠️",
      title: "도구 사용",
      description: "6가지 고급 도구를 활용하세요",
      steps: [
        "🤖 AI 언어 생성: 4가지 모드로 자동 언어 생성",
        "🧠 단어 학습기: 문장에서 자동으로 규칙 학습",
        "🎲 랜덤 생성: 알파벳을 무작위로 재배치",
        "🔍 충돌 검사: 규칙 충돌을 자동으로 확인",
        "📊 규칙 통계: 사용 빈도를 분석",
        "🧪 테스트 번역: 샘플 문장으로 테스트",
      ],
    },
    {
      icon: "💾",
      title: "프리셋 저장",
      description: "만든 언어를 저장하고 불러오세요",
      steps: [
        "규칙 탭에서 💾 프리셋 버튼을 누르세요",
        "프리셋 이름을 입력하고 저장하세요",
        "저장된 프리셋 목록에서 불러오기를 누르면 즉시 적용됩니다",
        "불필요한 프리셋은 삭제할 수 있습니다",
      ],
    },
    {
      icon: "🖼️",
      title: "언어 갤러리",
      description: "다른 사용자의 언어를 탐색하세요",
      steps: [
        "더보기 탭에서 언어 갤러리로 이동하세요",
        "다양한 카테고리의 언어 프리셋을 둘러보세요",
        "마음에 드는 언어를 선택하고 상세 페이지로 이동하세요",
        "💾 불러오기 버튼을 눌러 즉시 사용할 수 있습니다",
      ],
    },
  ];

  const currentGuide = guides[currentStep];

  return (
    <div className="mobile-guide-container">
      <div className="mobile-section-header">
        <button className="mobile-back-btn" onClick={onBack}>
          ← 돌아가기
        </button>
        <h2 className="mobile-section-title">사용 가이드</h2>
      </div>

      {/* 진행 표시 */}
      <div className="mobile-guide-progress">
        <div className="mobile-guide-progress-bar">
          <div
            className="mobile-guide-progress-fill"
            style={{ width: `${((currentStep + 1) / guides.length) * 100}%` }}
          />
        </div>
        <div className="mobile-guide-progress-text">
          {currentStep + 1} / {guides.length}
        </div>
      </div>

      {/* 가이드 내용 */}
      <div className="mobile-guide-content">
        <div className="mobile-guide-icon">{currentGuide.icon}</div>
        <h3 className="mobile-guide-title">{currentGuide.title}</h3>
        <p className="mobile-guide-desc">{currentGuide.description}</p>

        <div className="mobile-guide-steps">
          {currentGuide.steps.map((step, idx) => (
            <div key={idx} className="mobile-guide-step">
              <div className="mobile-guide-step-number">{idx + 1}</div>
              <div className="mobile-guide-step-text">{step}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 네비게이션 버튼 */}
      <div className="mobile-guide-nav">
        <button
          className="mobile-btn mobile-btn-secondary"
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
        >
          ← 이전
        </button>
        {currentStep < guides.length - 1 ? (
          <button
            className="mobile-btn mobile-btn-primary"
            onClick={() => setCurrentStep(currentStep + 1)}
          >
            다음 →
          </button>
        ) : (
          <button className="mobile-btn mobile-btn-primary" onClick={onBack}>
            완료 ✓
          </button>
        )}
      </div>

      {/* 단계 인디케이터 */}
      <div className="mobile-guide-dots">
        {guides.map((_, idx) => (
          <button
            key={idx}
            className={`mobile-guide-dot ${idx === currentStep ? "active" : ""}`}
            onClick={() => setCurrentStep(idx)}
          />
        ))}
      </div>
    </div>
  );
}

