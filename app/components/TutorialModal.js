"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TutorialModal({ onClose }) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "환영합니다! 👋",
      icon: "🎉",
      content: (
        <div className="space-y-4">
          <p className="text-lg font-semibold">나만의 언어 생성기에 오신 것을 환영합니다!</p>
          <p className="text-slate-300">
            이 도구를 사용하면 독특한 암호 언어를 만들고, AI로 자동 생성하며, 
            진화시킬 수 있습니다.
          </p>
          <div className="bg-blue-500/10 border-2 border-blue-500/30 rounded-xl p-4">
            <p className="text-sm text-blue-300">
              💡 <strong>Tip:</strong> 비밀 일기, 연인 간의 암호, 게임 세계관 언어 등 
              다양한 용도로 활용할 수 있습니다!
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Step 1: 변환 규칙 만들기",
      icon: "📝",
      content: (
        <div className="space-y-4">
          <p className="text-slate-300">
            원본 문자를 변환할 문자로 매핑하는 규칙을 만듭니다.
          </p>
          <div className="bg-slate-700/50 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl">1️⃣</span>
              <div>
                <div className="font-semibold text-white">규칙 추가</div>
                <div className="text-sm text-slate-400">➕ 규칙 추가 버튼 클릭</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">2️⃣</span>
              <div>
                <div className="font-semibold text-white">규칙 입력</div>
                <div className="text-sm text-slate-400">예: "사랑" → "LOVE"</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">3️⃣</span>
              <div>
                <div className="font-semibold text-white">여러 규칙 추가</div>
                <div className="text-sm text-slate-400">원하는 만큼 규칙을 만들 수 있습니다</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Step 2: AI 자동 생성",
      icon: "🤖",
      content: (
        <div className="space-y-4">
          <p className="text-slate-300">
            직접 만들기 귀찮다면? AI가 자동으로 언어를 생성해드립니다!
          </p>
          <div className="space-y-3">
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl p-3">
              <div className="font-semibold text-white mb-1">🤖 AI 언어 생성</div>
              <div className="text-sm text-slate-400">4가지 패턴 중 선택하여 자동 생성</div>
            </div>
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-3">
              <div className="font-semibold text-white mb-1">🧠 단어 규칙 학습</div>
              <div className="text-sm text-slate-400">문장 쌍을 입력하면 AI가 규칙 추출</div>
            </div>
            <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-xl p-3">
              <div className="font-semibold text-white mb-1">🎲 랜덤 생성</div>
              <div className="text-sm text-slate-400">알파벳을 랜덤하게 섞어서 생성</div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Step 3: 텍스트 변환",
      icon: "🔐",
      content: (
        <div className="space-y-4">
          <p className="text-slate-300">
            원본 텍스트를 입력하고 암호화/복호화 버튼을 눌러보세요!
          </p>
          <div className="bg-slate-700/50 rounded-xl p-4 space-y-3">
            <div className="flex gap-3">
              <div className="flex-1 bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                <div className="text-blue-400 font-semibold mb-2">🔐 암호화</div>
                <div className="text-xs text-slate-400">
                  원문 → 나만의 언어
                </div>
              </div>
              <div className="flex-1 bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                <div className="text-green-400 font-semibold mb-2">🔓 복호화</div>
                <div className="text-xs text-slate-400">
                  나만의 언어 → 원문
                </div>
              </div>
            </div>
          </div>
          <div className="bg-yellow-500/10 border-2 border-yellow-500/30 rounded-xl p-3">
            <p className="text-sm text-yellow-300">
              💡 <strong>Tip:</strong> 번역 엔진 모드를 바꿔서 다양한 방식으로 변환할 수 있습니다!
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Step 4: 고급 기능",
      icon: "✨",
      content: (
        <div className="space-y-4">
          <p className="text-slate-300">
            더 많은 기능으로 언어를 발전시켜보세요!
          </p>
          <div className="space-y-2">
            <div className="bg-slate-700/50 rounded-lg p-3">
              <div className="font-semibold text-white mb-1">✨ 네이밍/세계관</div>
              <div className="text-sm text-slate-400">언어에 이름과 스토리를 부여</div>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-3">
              <div className="font-semibold text-white mb-1">🧠 언어 진화</div>
              <div className="text-sm text-slate-400">학습 샘플로 언어를 자동으로 발전</div>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-3">
              <div className="font-semibold text-white mb-1">💾 프리셋</div>
              <div className="text-sm text-slate-400">만든 언어를 저장하고 불러오기</div>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-3">
              <div className="font-semibold text-white mb-1">🔊 음성 듣기</div>
              <div className="text-sm text-slate-400">변환된 텍스트를 음성으로 재생</div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "준비 완료! 🚀",
      icon: "🎊",
      content: (
        <div className="space-y-4 text-center">
          <div className="text-6xl mb-4">🎉</div>
          <p className="text-xl font-bold text-white">
            이제 나만의 언어를 만들 준비가 되었습니다!
          </p>
          <p className="text-slate-300">
            궁금한 점이 있으면 언제든 상단의 <strong className="text-blue-400">❓ 사용법</strong> 버튼을 클릭하세요.
          </p>
          <div className="bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 border-2 border-blue-500/30 rounded-xl p-4 mt-6">
            <p className="text-sm text-slate-300">
              💡 <strong>Pro Tip:</strong> 프리셋을 저장하면 언제든 불러올 수 있고, 
              공유 링크로 다른 사람과 공유할 수도 있습니다!
            </p>
          </div>
        </div>
      )
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentStepData = steps[currentStep];

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[9999] p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className="bg-gradient-to-br from-slate-800/98 to-slate-900/98 backdrop-blur-xl rounded-3xl p-8 w-full max-w-[650px] shadow-2xl border-2 border-blue-500/30"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 상단 진행 바 */}
        <div className="flex gap-2 mb-8">
          {steps.map((_, idx) => (
            <div
              key={idx}
              className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                idx <= currentStep 
                  ? "bg-gradient-to-r from-blue-500 to-purple-500" 
                  : "bg-slate-700/50"
              }`}
            />
          ))}
        </div>

        {/* 헤더 */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <motion.div 
              className="text-5xl"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {currentStepData.icon}
            </motion.div>
            <div>
              <div className="text-sm text-slate-400">
                {currentStep + 1} / {steps.length}
              </div>
              <h2 className="text-2xl font-extrabold text-white">
                {currentStepData.title}
              </h2>
            </div>
          </div>
          <button
            className="text-slate-400 hover:text-white transition-colors text-2xl leading-none"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* 내용 */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="mb-8 min-h-[300px]"
          >
            {currentStepData.content}
          </motion.div>
        </AnimatePresence>

        {/* 하단 버튼 */}
        <div className="flex items-center justify-between gap-4">
          <button
            className={`btn-3d px-6 ${currentStep === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={prevStep}
            disabled={currentStep === 0}
          >
            ← 이전
          </button>

          <div className="text-sm text-slate-400">
            {currentStep < steps.length - 1 ? "다음 단계로 →" : "시작하기 →"}
          </div>

          <button
            className="btn-3d px-6"
            onClick={nextStep}
          >
            {currentStep < steps.length - 1 ? "다음" : "시작하기"} →
          </button>
        </div>

        {/* Skip 버튼 */}
        {currentStep < steps.length - 1 && (
          <button
            className="w-full mt-4 text-sm text-slate-500 hover:text-slate-300 transition-colors"
            onClick={onClose}
          >
            건너뛰기
          </button>
        )}
      </motion.div>
    </div>
  );
}

