"use client";

import { useState, useEffect } from "react";
import MobileLayout from "../MobileLayout";
import MobileHome from "./MobileHome";
import MobileTranslate from "./MobileTranslate";
import MobileRules from "./MobileRules";
import MobileTools from "./MobileTools";
import MobileMore from "./MobileMore";

/**
 * 📱 모바일 전용 메인 페이지
 * 완전히 다른 UI/UX
 */
export default function MobilePage({
  rules,
  setRules,
  inputText,
  setInputText,
  outputText,
  setOutputText,
  engineMode,
  setEngineMode,
  encode,
  decode,
  copyResult,
  swap,
  showAlert,
  router,
  theme,
  toggleTheme,
}) {
  const [activeTab, setActiveTab] = useState('translate');

  // 탭 변경 핸들러
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // 탭별 컴포넌트 렌더링
  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return <MobileHome />;
      
      case 'translate':
        return (
          <MobileTranslate
            inputText={inputText}
            setInputText={setInputText}
            outputText={outputText}
            setOutputText={setOutputText}
            engineMode={engineMode}
            setEngineMode={setEngineMode}
            encode={encode}
            decode={decode}
            copyResult={copyResult}
            swap={swap}
            showAlert={showAlert}
          />
        );
      
      case 'rules':
        return (
          <MobileRules
            rules={rules}
            setRules={setRules}
            showAlert={showAlert}
          />
        );
      
      case 'tools':
        return (
          <MobileTools
            router={router}
            rules={rules}
            setRules={setRules}
            showAlert={showAlert}
          />
        );
      
      case 'more':
        return (
          <MobileMore
            router={router}
            theme={theme}
            toggleTheme={toggleTheme}
          />
        );
      
      default:
        return <MobileTranslate />;
    }
  };

  return (
    <MobileLayout 
      activeTab={activeTab}
      onTabChange={handleTabChange}
    >
      {renderTabContent()}
    </MobileLayout>
  );
}

