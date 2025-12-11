"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getPresetFromURL } from "../utils/shareUtils";
import Logo3D from "../components/Logo3D";
import { useCustomAlert } from "../components/CustomAlert";

export default function GalleryPage() {
  const router = useRouter();
  const { showAlert, AlertComponent } = useCustomAlert();
  const [sharedPreset, setSharedPreset] = useState(null);
  const [localPresets, setLocalPresets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // URL에서 공유된 프리셋 로드
    const preset = getPresetFromURL();
    if (preset) {
      setSharedPreset(preset);
    }

    // localStorage에서 저장된 프리셋 로드
    try {
      const saved = localStorage.getItem("language-presets");
      if (saved) {
        setLocalPresets(JSON.parse(saved));
      }
    } catch (error) {
      console.error("프리셋 로드 실패:", error);
    }

    setLoading(false);
  }, []);

  const handleImportPreset = async (preset) => {
    const confirmed = window.confirm(`"${preset.name}" 프리셋을 불러오시겠습니까?`);
    if (!confirmed) return;

    // 프리셋을 localStorage에 저장
    try {
      const saved = localStorage.getItem("language-presets");
      const existing = saved ? JSON.parse(saved) : [];
      
      // 중복 확인
      const isDuplicate = existing.some(p => p.name === preset.name);
      if (isDuplicate) {
        const overwrite = window.confirm("같은 이름의 프리셋이 있습니다. 덮어쓰시겠습니까?");
        if (!overwrite) return;
        
        // 기존 프리셋 제거
        const filtered = existing.filter(p => p.name !== preset.name);
        filtered.push({ ...preset, createdAt: new Date().toISOString() });
        localStorage.setItem("language-presets", JSON.stringify(filtered));
      } else {
        existing.push({ ...preset, createdAt: new Date().toISOString() });
        localStorage.setItem("language-presets", JSON.stringify(existing));
      }

      await showAlert("프리셋을 가져왔습니다! 메인 페이지에서 확인하세요.", "success");
      router.push("/");
    } catch (error) {
      console.error("프리셋 저장 실패:", error);
      await showAlert("프리셋을 저장하는데 실패했습니다.", "error");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <div>로딩 중...</div>
        </div>
      </div>
    );
  }

  return (
    <>
      {AlertComponent}
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        <Logo3D />

      <div className="card-3d">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">🖼️ 언어 갤러리</h1>
          <button
            className="btn-3d"
            onClick={() => router.push("/")}
          >
            ← 메인으로
          </button>
        </div>

        <p className="text-sm opacity-80 mb-6">
          저장된 언어 프리셋을 확인하고 공유할 수 있습니다.
        </p>

        {/* 공유된 프리셋 */}
        {sharedPreset && (
          <div className="bg-blue-500/20 border-2 border-blue-500/50 rounded-lg p-4 mb-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">🎁</span>
                  <h2 className="text-xl font-bold">{sharedPreset.name}</h2>
                </div>
                <p className="text-sm opacity-80 mb-3">
                  규칙 {sharedPreset.rules?.length || 0}개
                </p>

                {/* 규칙 미리보기 */}
                <div className="bg-white/10 p-3 rounded-lg max-h-[200px] overflow-y-auto">
                  <div className="text-xs font-semibold mb-2">규칙 미리보기:</div>
                  <div className="space-y-1 text-sm font-mono">
                    {sharedPreset.rules.slice(0, 10).map((rule, idx) => (
                      <div key={idx}>
                        {rule.from} → {rule.to}
                      </div>
                    ))}
                    {sharedPreset.rules.length > 10 && (
                      <div className="opacity-70">
                        ... 외 {sharedPreset.rules.length - 10}개
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <button
                className="btn-3d"
                onClick={() => handleImportPreset(sharedPreset)}
              >
                📥 가져오기
              </button>
            </div>
          </div>
        )}

        {/* 저장된 프리셋 목록 */}
        <div>
          <h2 className="text-xl font-semibold mb-4">
            내 프리셋 ({localPresets.length})
          </h2>

          {localPresets.length === 0 ? (
            <div className="text-center py-12 opacity-70">
              <div className="text-5xl mb-4">📦</div>
              <p>저장된 프리셋이 없습니다.</p>
              <p className="text-sm mt-2">
                메인 페이지에서 규칙을 만들고 프리셋으로 저장하세요.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {localPresets.map((preset, idx) => (
                <PresetCard
                  key={idx}
                  preset={preset}
                  onImport={() => handleImportPreset(preset)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      </div>
    </>
  );
}

// PresetCard 컴포넌트
function PresetCard({ preset, onImport }) {
  const { showAlert, AlertComponent } = useCustomAlert();
  const [showShare, setShowShare] = useState(false);
  const [shareURL, setShareURL] = useState("");

  const handleShare = async () => {
    const { generateShareURL } = await import("../utils/shareUtils");
    const baseURL = window.location.origin;
    const url = generateShareURL(preset, baseURL);

    if (url) {
      setShareURL(url);
      setShowShare(true);
    } else {
      await showAlert("공유 링크 생성에 실패했습니다.", "error");
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareURL);
      await showAlert("공유 링크가 복사되었습니다!", "success", 2000);
    } catch (error) {
      console.error("복사 실패:", error);
      await showAlert("복사에 실패했습니다.", "error");
    }
  };

  return (
    <>
      {AlertComponent}
      <div className="card-3d p-4 hover:scale-[1.02] transition-transform">
      <h3 className="font-bold text-lg mb-2">{preset.name}</h3>
      <p className="text-sm opacity-80 mb-3">
        규칙 {preset.rules?.length || 0}개
      </p>

      {preset.createdAt && (
        <p className="text-xs opacity-60 mb-3">
          생성일: {new Date(preset.createdAt).toLocaleDateString()}
        </p>
      )}

      <div className="flex gap-2 flex-wrap">
        <button className="btn-3d text-sm px-3 py-1" onClick={onImport}>
          📥 불러오기
        </button>
        <button className="btn-3d text-sm px-3 py-1" onClick={handleShare}>
          🔗 공유
        </button>
      </div>

      {/* 공유 링크 모달 */}
      {showShare && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="card-3d p-6 w-[90%] max-w-[500px] space-y-4">
            <h3 className="text-xl font-bold">🔗 프리셋 공유</h3>

            <p className="text-sm opacity-80">
              아래 링크를 복사해서 다른 사람과 공유하세요!
            </p>

            <div className="bg-white/10 p-3 rounded-lg">
              <div className="text-xs font-mono break-all">{shareURL}</div>
            </div>

            <div className="flex gap-2">
              <button className="btn-3d flex-1" onClick={handleCopyLink}>
                📋 링크 복사
              </button>
              <button
                className="btn-3d btn-red flex-1"
                onClick={() => setShowShare(false)}
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </>
  );
}

