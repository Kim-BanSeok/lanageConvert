"use client";

export default function AIGeneratorModal({
  onClose,
  onGenerate,
  preview,
  setPreview,
}) {
  const modes = [
    { id: 1, name: "문자 기반 암호 언어", desc: "알파벳을 새롭게 재매핑" },
    { id: 2, name: "음절 기반 판타지 언어", desc: "ka-ra-ma 등 음절 조합" },
    { id: 3, name: "접두/접미 규칙 언어", desc: "va + 문자 + -en 형태" },
    { id: 4, name: "난수 암호언어", desc: "암호처럼 보이는 랜덤 문자열" },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="card-3d p-6 w-[420px] space-y-4">

        <h2 className="text-2xl font-bold text-center">🤖 AI 언어 자동 생성기</h2>

        <p className="text-sm opacity-80 text-center">
          언어 생성 방식을 선택하세요. 선택 즉시 미리보기가 표시됩니다.
        </p>

        <div className="space-y-3">
          {modes.map((m) => (
            <div
              key={m.id}
              className={`p-3 rounded-lg cursor-pointer bg-white/10 hover:bg-white/20 transition ${
                preview.mode === m.id ? "ring-2 ring-blue-400" : ""
              }`}
              onClick={() => setPreview({ ...preview, mode: m.id })}
            >
              <h3 className="font-semibold">{m.name}</h3>
              <p className="text-sm opacity-70">{m.desc}</p>
            </div>
          ))}
        </div>

        {/* 미리보기 */}
        {preview.data && preview.data.length > 0 && (
          <div className="bg-white/10 p-3 rounded-lg max-h-[150px] overflow-y-auto text-sm">
            <strong>미리보기 규칙 (처음 8개)</strong>
            <pre className="mt-1 opacity-90 text-xs">
              {preview.data.slice(0, 8).map((rule, idx) => 
                `${rule.from} → ${rule.to}`
              ).join('\n')}
              {preview.data.length > 8 ? `\n... 외 ${preview.data.length - 8}개` : ''}
            </pre>
          </div>
        )}

        <button 
          className="btn-3d w-full" 
          onClick={onGenerate}
          disabled={!preview.data || preview.data.length === 0}
        >
          언어 생성 적용하기
        </button>

        <button className="btn-3d btn-red w-full" onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
}

