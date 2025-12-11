"use client";

import { useState, useEffect } from "react";
import {
  generateLanguageNames,
  analyzeLanguageCharacteristics,
  generateNameDescription,
} from "../utils/nameGenerator";
import { useCustomAlert } from "./CustomAlert";

export default function NameGenerator({ rules, onSelectName }) {
  const { showAlert, AlertComponent } = useCustomAlert();
  const [names, setNames] = useState([]);
  const [characteristics, setCharacteristics] = useState(null);
  const [showGenerator, setShowGenerator] = useState(false);
  const [selectedName, setSelectedName] = useState("");

  const handleGenerate = () => {
    const chars = analyzeLanguageCharacteristics(rules);
    setCharacteristics(chars);

    const generatedNames = generateLanguageNames(rules, 8);
    setNames(generatedNames);
    setShowGenerator(true);
  };

  const handleSelectName = (name) => {
    setSelectedName(name);
    if (onSelectName) {
      onSelectName(name);
    }
  };

  const handleCopyName = async (name) => {
    try {
      await navigator.clipboard.writeText(name);
      await showAlert(`"${name}"이(가) 복사되었습니다!`, "success", 2000);
    } catch (error) {
      console.error("복사 실패:", error);
      await showAlert("복사에 실패했습니다.", "error");
    }
  };

  return (
    <>
      {AlertComponent}
      <button
        className="btn-3d"
        onClick={handleGenerate}
        disabled={!rules || rules.length === 0}
        title="현재 언어 규칙 기반으로 멋진 이름 자동 생성"
      >
        ✨ AI 이름 생성
      </button>

      {showGenerator && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="card-3d p-6 w-[90%] max-w-[600px] space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">✨ AI 언어 이름 생성기</h2>
              <button
                className="btn-3d btn-red px-3 py-1"
                onClick={() => setShowGenerator(false)}
              >
                ✕
              </button>
            </div>

            <p className="text-sm opacity-80">
              현재 언어 규칙의 특성을 분석하여 자동으로 멋진 이름을 제안합니다.
            </p>

            {/* 언어 특성 */}
            {characteristics && (
              <div className="bg-white/10 p-3 rounded-lg">
                <h3 className="font-semibold mb-2">🔍 언어 특성 분석</h3>
                <div className="text-sm space-y-1">
                  <div>• 규칙 개수: {characteristics.ruleCount}개</div>
                  <div>
                    • 평균 변환 길이: {characteristics.avgLength.toFixed(1)}자
                  </div>
                  <div>
                    • 복잡도: {characteristics.complexity.toFixed(0)} (
                    {characteristics.complexity > 100
                      ? "고급"
                      : characteristics.complexity > 50
                      ? "중급"
                      : "초급"}
                    )
                  </div>
                  <div>
                    • 언어 유형:{" "}
                    {characteristics.hasKorean && "한글 "}
                    {characteristics.hasEnglish && "영문 "}
                    {characteristics.hasNumbers && "숫자 "}
                    {characteristics.hasSymbols && "특수문자"}
                  </div>
                </div>
              </div>
            )}

            {/* 생성된 이름 목록 */}
            <div>
              <h3 className="font-semibold mb-3">🎯 추천 이름</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {names.map((name, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg cursor-pointer transition ${
                      selectedName === name
                        ? "bg-blue-500/30 border-2 border-blue-500"
                        : "bg-white/10 hover:bg-white/15"
                    }`}
                    onClick={() => handleSelectName(name)}
                  >
                    <div className="font-bold text-lg mb-1">{name}</div>
                    <div className="text-xs opacity-70">
                      {generateNameDescription(name, characteristics)}
                    </div>

                    <button
                      className="btn-3d text-xs px-2 py-1 mt-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyName(name);
                      }}
                    >
                      📋 복사
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* 다시 생성 버튼 */}
            <div className="flex gap-2">
              <button
                className="btn-3d flex-1"
                onClick={handleGenerate}
              >
                🔄 다시 생성
              </button>
              
              {selectedName && (
                <button
                  className="btn-3d flex-1 bg-blue-500"
                  onClick={async () => {
                    await showAlert(`"${selectedName}"이(가) 선택되었습니다!`, "success");
                    setShowGenerator(false);
                  }}
                >
                  ✅ 이 이름 사용
                </button>
              )}
            </div>

            <div className="text-xs opacity-70 text-center">
              💡 Tip: 마음에 드는 이름을 클릭하고 "이 이름 사용" 버튼을 누르세요.
            </div>
          </div>
        </div>
      )}
    </>
  );
}

