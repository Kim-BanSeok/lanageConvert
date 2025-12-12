"use client";

import { useState } from "react";
import { encodeText } from "../utils/encodeDecode";
import TTSPlayer from "./TTSPlayer";
import { useCustomAlert } from "./CustomAlert";

export default function TestTranslator({ rules }) {
  const { showAlert, AlertComponent } = useCustomAlert();
  const [testText, setTestText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [translationSteps, setTranslationSteps] = useState([]);
  const [showSteps, setShowSteps] = useState(false);

  const handleTranslate = async () => {
    if (!testText.trim()) {
      await showAlert("테스트할 문장을 입력해주세요.", "warning");
      return;
    }

    if (!rules || rules.length === 0) {
      await showAlert("적용할 규칙이 없습니다.", "warning");
      return;
    }

    // 변환 과정 추적
    const steps = [];
    let currentText = testText;
    steps.push({ step: 0, text: currentText, rule: null, description: "원본 텍스트" });

    // 규칙 적용 (길이 순으로 정렬)
    const sortedRules = rules
      .filter((r) => r && r.from && r.from.trim() && r.to)
      .sort((a, b) => b.from.length - a.from.length);

    sortedRules.forEach((rule, index) => {
      if (currentText.includes(rule.from)) {
        const before = currentText;
        currentText = currentText.split(rule.from).join(rule.to);
        steps.push({
          step: index + 1,
          text: currentText,
          rule,
          description: `"${rule.from}" → "${rule.to}" 적용`,
          changed: before !== currentText,
        });
      }
    });

    setTranslatedText(currentText);
    setTranslationSteps(steps);
    setShowSteps(true);
  };

  const handleClear = () => {
    setTestText("");
    setTranslatedText("");
    setTranslationSteps([]);
    setShowSteps(false);
  };

  const handleCopyTranslated = async () => {
    if (!translatedText) return;
    try {
      await navigator.clipboard.writeText(translatedText);
      await showAlert("변환된 텍스트가 복사되었습니다!", "success", 2000);
    } catch (error) {
      console.error("복사 실패:", error);
      await showAlert("복사에 실패했습니다.", "error");
    }
  };

  return (
    <>
      {AlertComponent}
      <div className="card-3d space-y-4" style={{ position: 'relative', zIndex: 1 }}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">🧪 테스트 번역기</h2>
          <p className="text-sm opacity-80">
            현재 규칙으로 문장을 변환하고 과정을 확인하세요
          </p>
        </div>
      </div>

      {/* 테스트 입력 */}
      <div>
        <label className="text-sm font-medium block mb-1">테스트 문장</label>
        <textarea
          className="input-3d w-full h-[100px]"
          value={testText}
          onChange={(e) => setTestText(e.target.value)}
          placeholder="예: 나는 오늘 커피를 마신다"
        />
      </div>

      {/* 버튼 그룹 */}
      <div className="flex gap-2 flex-wrap">
        <button className="btn-3d" onClick={handleTranslate}>
          🔄 변환하기
        </button>
        <button className="btn-3d" onClick={handleClear}>
          🗑️ 초기화
        </button>
        {translatedText && (
          <>
            <button className="btn-3d" onClick={handleCopyTranslated}>
              📋 결과 복사
            </button>
            <TTSPlayer text={translatedText} buttonText="🔊 음성 듣기" />
          </>
        )}
      </div>

      {/* 변환 결과 */}
      {translatedText && (
        <div className="bg-white/10 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">변환 결과</h3>
          <div className="bg-white/5 p-3 rounded font-mono">
            {translatedText}
          </div>
        </div>
      )}

      {/* 변환 과정 */}
      {translationSteps.length > 0 && (
        <div>
          <button
            className="text-sm underline opacity-80 hover:opacity-100"
            onClick={() => setShowSteps(!showSteps)}
          >
            {showSteps ? "▼ 변환 과정 숨기기" : "▶ 변환 과정 보기"}
          </button>

          {showSteps && (
            <div className="mt-3 space-y-2 max-h-[300px] overflow-y-auto">
              {translationSteps.map((step, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg ${
                    step.changed
                      ? "bg-blue-500/20 border border-blue-500/50"
                      : "bg-white/5"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="text-xs opacity-70 mb-1">
                        Step {step.step}: {step.description}
                      </div>
                      <div className="font-mono text-sm">{step.text}</div>
                    </div>
                    {step.changed && (
                      <span className="text-xs bg-blue-500 px-2 py-1 rounded">
                        변경됨
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 규칙 요약 */}
      <div className="text-xs opacity-70">
        현재 규칙: {rules.filter(r => r && r.from && r.from.trim()).length}개
      </div>
      </div>
    </>
  );
}

