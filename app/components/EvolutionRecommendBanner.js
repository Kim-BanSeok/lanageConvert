"use client";

export default function EvolutionRecommendBanner({
  sampleCount,
  onEvolveClick,
  onDismiss,
}) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
      <div className="card-3d flex items-center gap-4 px-5 py-3 shadow-xl animate-pulse">
        <div className="text-2xl">🧠</div>

        <div className="flex-1">
          <div className="font-bold">
            언어 진화를 추천합니다
          </div>
          <div className="text-sm opacity-80">
            학습 샘플 {sampleCount}개가 쌓였습니다.
            <br />
            지금 진화하면 규칙 정확도가 크게 향상됩니다.
          </div>
        </div>

        <div className="flex gap-2">
          <button className="btn-3d" onClick={onEvolveClick}>
            🚀 진화하기
          </button>
          <button className="btn-3d btn-red" onClick={onDismiss}>
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}

