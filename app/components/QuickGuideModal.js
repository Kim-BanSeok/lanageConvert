"use client";

export default function QuickGuideModal({ onClose }) {
  const guides = [
    {
      category: "기본 사용법",
      icon: "📚",
      items: [
        { icon: "📝", title: "규칙 추가", desc: "원본 → 변환 규칙을 입력하세요" },
        { icon: "🔐", title: "암호화", desc: "원본 텍스트를 나만의 언어로 변환" },
        { icon: "🔓", title: "복호화", desc: "나만의 언어를 원문으로 복원" },
        { icon: "💾", title: "프리셋 저장", desc: "만든 언어를 저장하고 나중에 불러오기" },
      ]
    },
    {
      category: "AI 생성 기능",
      icon: "🤖",
      items: [
        { icon: "🤖", title: "AI 언어 생성", desc: "4가지 패턴으로 자동 생성 (문자/음절/접두접미/난수)" },
        { icon: "🧠", title: "단어 규칙 학습", desc: "문장 쌍을 입력하면 AI가 규칙 자동 추출" },
        { icon: "🎲", title: "랜덤 생성", desc: "알파벳을 랜덤하게 섞어서 암호 언어 생성" },
        { icon: "✨", title: "한글 자동 변환", desc: "입력한 텍스트의 한글을 자동 변환" },
      ]
    },
    {
      category: "고급 기능",
      icon: "⚡",
      items: [
        { icon: "✨", title: "네이밍/세계관", desc: "AI가 언어에 이름과 스토리 부여" },
        { icon: "🧠", title: "언어 진화", desc: "학습 샘플로 언어를 자동으로 발전시키기" },
        { icon: "🧪", title: "테스트 번역기", desc: "규칙이 어떻게 적용되는지 단계별로 확인" },
        { icon: "🔊", title: "음성 듣기", desc: "변환된 텍스트를 음성으로 재생 (TTS)" },
      ]
    },
    {
      category: "번역 엔진 모드",
      icon: "⚙️",
      items: [
        { icon: "🔤", title: "Substring", desc: "부분 문자열 치환 (가장 공격적)" },
        { icon: "📝", title: "Word", desc: "단어 단위로만 치환 (공백 기준)" },
        { icon: "🎯", title: "Hybrid (추천)", desc: "단어 + 문자 규칙 조합" },
      ]
    }
  ];

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[9999] p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-gradient-to-br from-slate-800/98 to-slate-900/98 backdrop-blur-xl rounded-3xl p-8 w-full max-w-[900px] max-h-[90vh] overflow-y-auto custom-scrollbar shadow-2xl border-2 border-blue-500/30 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="text-5xl">📖</div>
            <div>
              <h2 className="text-3xl font-extrabold text-white">사용 가이드</h2>
              <p className="text-sm text-slate-400 mt-1">
                모든 기능을 한눈에 확인하세요
              </p>
            </div>
          </div>
          <button
            className="text-slate-400 hover:text-white transition-colors text-2xl leading-none hover:rotate-90 transition-transform duration-300"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* 가이드 섹션 */}
        <div className="space-y-6">
          {guides.map((section, idx) => (
            <div 
              key={idx}
              className="bg-slate-700/30 border-2 border-slate-600/50 rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{section.icon}</span>
                <h3 className="text-xl font-bold text-white">{section.category}</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                {section.items.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    className="bg-slate-800/50 hover:bg-slate-800/70 border border-slate-600/30 hover:border-blue-500/40 rounded-xl p-4 transition-all group cursor-default"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl group-hover:scale-110 transition-transform">
                        {item.icon}
                      </span>
                      <div className="flex-1">
                        <div className="font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">
                          {item.title}
                        </div>
                        <div className="text-sm text-slate-400">
                          {item.desc}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 빠른 팁 */}
        <div className="mt-8 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border-2 border-blue-500/30 rounded-2xl p-6">
          <div className="flex items-start gap-3">
            <span className="text-3xl">💡</span>
            <div className="flex-1">
              <h3 className="font-bold text-white mb-3 text-lg">빠른 시작 팁</h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 flex-shrink-0">▪</span>
                  <span>처음이라면 <strong className="text-white">🎲 랜덤 생성</strong>으로 시작해보세요</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 flex-shrink-0">▪</span>
                  <span>규칙을 직접 만들고 싶다면 <strong className="text-white">➕ 규칙 추가</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 flex-shrink-0">▪</span>
                  <span>문장으로 학습하려면 <strong className="text-white">🧠 단어 규칙 학습</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 flex-shrink-0">▪</span>
                  <span>만든 언어는 꼭 <strong className="text-white">💾 프리셋</strong>으로 저장하세요!</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 닫기 버튼 */}
        <button 
          className="btn-3d w-full mt-6 text-lg font-bold" 
          onClick={onClose}
        >
          시작하기 🚀
        </button>
      </div>
    </div>
  );
}

