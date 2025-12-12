"use client";

import { useState } from "react";
import MobileConflictChecker from "./MobileConflictChecker";
import MobileTestTranslator from "./MobileTestTranslator";
import MobileAIGenerator from "./MobileAIGenerator";
import MobileLearnRule from "./MobileLearnRule";
import MobileRandomGenerator from "./MobileRandomGenerator";
import MobileStatistics from "./MobileStatistics";

/**
 * 📱 모바일 도구 화면
 */
export default function MobileTools({ 
  router, 
  rules, 
  setRules, 
  showAlert, 
  engineMode,
  generateAI_CharacterMap,
  generateAI_SyllableLanguage,
  generateAI_PrefixSuffix,
  generateAI_Crypto
}) {
  const [currentTool, setCurrentTool] = useState(null);
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
      icon: "🔍",
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
      icon: "🧪",
      title: "테스트 번역",
      desc: "샘플 문장으로 테스트",
      action: "testTranslator",
    },
  ];

  const handleToolClick = (action) => {
    setCurrentTool(action);
  };

  // 도구별 렌더링
  switch (currentTool) {
    case 'conflict':
      return (
        <MobileConflictChecker
          rules={rules}
          setRules={setRules}
          showAlert={showAlert}
          onBack={() => setCurrentTool(null)}
        />
      );

    case 'testTranslator':
      return (
        <MobileTestTranslator
          rules={rules}
          engineMode={engineMode}
          showAlert={showAlert}
          onBack={() => setCurrentTool(null)}
        />
      );

    case 'aiGenerate':
      return (
        <MobileAIGenerator
          setRules={setRules}
          showAlert={showAlert}
          onBack={() => setCurrentTool(null)}
          generateAI_CharacterMap={generateAI_CharacterMap}
          generateAI_SyllableLanguage={generateAI_SyllableLanguage}
          generateAI_PrefixSuffix={generateAI_PrefixSuffix}
          generateAI_Crypto={generateAI_Crypto}
        />
      );

    case 'learn':
      return (
        <MobileLearnRule
          setRules={setRules}
          showAlert={showAlert}
          onBack={() => setCurrentTool(null)}
        />
      );

    case 'random':
      return (
        <MobileRandomGenerator
          setRules={setRules}
          showAlert={showAlert}
          onBack={() => setCurrentTool(null)}
        />
      );

    case 'stats':
      return (
        <MobileStatistics
          rules={rules}
          onBack={() => setCurrentTool(null)}
        />
      );

    default:
      break;
  }

  // 도구 목록 표시
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

