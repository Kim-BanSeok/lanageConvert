"use client";

/**
 * 📱 모바일 도구 화면
 */
export default function MobileTools({ router }) {
  const tools = [
    {
      icon: "🤖",
      title: "AI 언어 생성",
      desc: "AI가 자동으로 언어 생성",
      action: "aiGenerate",
    },
    {
      icon: "🧠",
      title: "단어 학습기",
      desc: "문장에서 규칙 자동 학습",
      action: "learn",
    },
    {
      icon: "🎲",
      title: "랜덤 생성",
      desc: "알파벳 랜덤 재배치",
      action: "random",
    },
    {
      icon: "⚠️",
      title: "충돌 검사",
      desc: "규칙 충돌 자동 확인",
      action: "conflict",
    },
    {
      icon: "📊",
      title: "규칙 통계",
      desc: "사용 빈도 분석",
      action: "stats",
    },
    {
      icon: "📜",
      title: "번역 히스토리",
      desc: "과거 번역 기록 보기",
      action: "history",
    },
  ];

  const handleToolClick = (action) => {
    // TODO: 각 도구에 맞는 모달이나 페이지로 이동
    alert(`${action} 기능은 곧 추가됩니다!`);
  };

  return (
    <div className="mobile-tools-container">
      <div className="mobile-section-header">
        <h2 className="mobile-section-title">도구</h2>
      </div>

      <div className="mobile-tools-grid">
        {tools.map((tool, index) => (
          <button
            key={index}
            className="mobile-tool-card"
            onClick={() => handleToolClick(tool.action)}
          >
            <div className="mobile-tool-icon">{tool.icon}</div>
            <h3 className="mobile-tool-title">{tool.title}</h3>
            <p className="mobile-tool-desc">{tool.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

