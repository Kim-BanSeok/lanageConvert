"use client";

import { useState, useRef } from "react";
import { useEscapeKey } from "../hooks/useEscapeKey";
import { 
  downloadBackup, 
  restoreFromFile, 
  getStorageUsage,
  resetAllData 
} from "../lib/backupRestore";

export default function BackupRestoreModal({ onClose, onRestore }) {
  useEscapeKey(onClose);

  const [storageInfo, setStorageInfo] = useState(() => getStorageUsage());
  const [restoring, setRestoring] = useState(false);
  const [restoreResult, setRestoreResult] = useState(null);
  const fileInputRef = useRef(null);

  const handleBackup = () => {
    const success = downloadBackup();
    if (success) {
      alert("✅ 백업 파일이 다운로드되었습니다!");
    } else {
      alert("❌ 백업 생성에 실패했습니다.");
    }
  };

  const handleRestore = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!confirm("⚠️ 복원하면 현재 데이터가 덮어씌워집니다. 계속하시겠습니까?")) {
      event.target.value = "";
      return;
    }

    setRestoring(true);
    setRestoreResult(null);

    try {
      const result = await restoreFromFile(file);
      setRestoreResult(result);
      
      if (result.success) {
        setTimeout(() => {
          alert(`✅ 복원 완료!\n${result.restored}개 항목 복원됨`);
          if (onRestore) onRestore();
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      alert(`❌ 복원 실패: ${error.message}`);
    } finally {
      setRestoring(false);
      event.target.value = "";
    }
  };

  const handleReset = () => {
    if (!confirm("⚠️ 모든 데이터를 초기화하시겠습니까?\n백업 파일이 자동으로 다운로드됩니다.")) {
      return;
    }

    if (!confirm("⚠️⚠️ 정말로 초기화하시겠습니까? 되돌릴 수 없습니다!")) {
      return;
    }

    const success = resetAllData();
    if (success) {
      alert("✅ 데이터가 초기화되었습니다. 페이지를 새로고침합니다.");
      window.location.reload();
    } else {
      alert("❌ 초기화에 실패했습니다.");
    }
  };

  const refreshStorageInfo = () => {
    setStorageInfo(getStorageUsage());
  };

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[9999] p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-gradient-to-br from-slate-800/98 to-slate-900/98 backdrop-blur-xl rounded-3xl p-8 w-full max-w-[650px] shadow-2xl border-2 border-cyan-500/30 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="text-5xl">💾</div>
            <div>
              <h2 className="text-3xl font-extrabold text-white">백업 & 복원</h2>
              <p className="text-sm text-slate-400 mt-1">
                데이터를 안전하게 보관하세요
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

        {/* 저장소 사용량 */}
        <div className={`p-5 rounded-2xl mb-6 border-2 ${
          storageInfo.isCritical 
            ? "bg-red-500/10 border-red-500/30" 
            : storageInfo.isNearLimit 
              ? "bg-yellow-500/10 border-yellow-500/30" 
              : "bg-green-500/10 border-green-500/30"
        }`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">📊</span>
              <h3 className="font-bold text-white">저장소 사용량</h3>
            </div>
            <button 
              className="text-xs text-blue-400 hover:text-blue-300"
              onClick={refreshStorageInfo}
            >
              🔄 새로고침
            </button>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-300">사용 중:</span>
              <span className="font-bold text-white">
                {storageInfo.totalSizeKB} KB / {storageInfo.maxSizeMB} MB
              </span>
            </div>
            <div className="w-full bg-slate-700/50 rounded-full h-3 overflow-hidden">
              <div 
                className={`h-full transition-all duration-300 ${
                  storageInfo.isCritical 
                    ? "bg-red-500" 
                    : storageInfo.isNearLimit 
                      ? "bg-yellow-500" 
                      : "bg-green-500"
                }`}
                style={{ width: `${Math.min(storageInfo.usagePercent, 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-slate-400">
              <span>{storageInfo.itemCount}개 항목</span>
              <span>{storageInfo.usagePercent}%</span>
            </div>
          </div>

          {storageInfo.isNearLimit && (
            <div className="mt-3 text-xs text-yellow-300 flex items-center gap-2">
              <span>⚠️</span>
              <span>저장 공간이 부족합니다. 백업을 권장합니다.</span>
            </div>
          )}
        </div>

        {/* 백업 섹션 */}
        <div className="bg-slate-700/30 border-2 border-slate-600/50 rounded-2xl p-5 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">💾</span>
            <h3 className="font-bold text-white">데이터 백업</h3>
          </div>
          <p className="text-sm text-slate-300 mb-4">
            모든 프리셋, 규칙, 언어 설정을 JSON 파일로 저장합니다.
          </p>
          <button 
            className="btn-3d w-full text-lg font-bold"
            onClick={handleBackup}
          >
            📥 지금 백업하기
          </button>
        </div>

        {/* 복원 섹션 */}
        <div className="bg-slate-700/30 border-2 border-slate-600/50 rounded-2xl p-5 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">📤</span>
            <h3 className="font-bold text-white">데이터 복원</h3>
          </div>
          <p className="text-sm text-slate-300 mb-4">
            백업 파일에서 데이터를 복원합니다. (현재 데이터를 덮어씁니다)
          </p>
          
          <input 
            ref={fileInputRef}
            type="file" 
            accept=".json"
            onChange={handleRestore}
            className="hidden"
          />
          
          <button 
            className="btn-3d w-full text-lg font-bold"
            onClick={() => fileInputRef.current?.click()}
            disabled={restoring}
          >
            {restoring ? "📤 복원 중..." : "📤 백업 파일 선택"}
          </button>

          {restoreResult && restoreResult.success && (
            <div className="mt-3 text-sm text-green-300 bg-green-500/10 p-3 rounded-lg">
              ✅ {restoreResult.restored}개 항목 복원 완료
            </div>
          )}
        </div>

        {/* 초기화 섹션 */}
        <div className="bg-red-500/10 border-2 border-red-500/30 rounded-2xl p-5 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">⚠️</span>
            <h3 className="font-bold text-white">데이터 초기화</h3>
          </div>
          <p className="text-sm text-slate-300 mb-4">
            모든 데이터를 삭제하고 처음 상태로 돌아갑니다. (백업 파일이 자동 생성됩니다)
          </p>
          <button 
            className="btn-3d btn-red w-full text-lg font-bold"
            onClick={handleReset}
          >
            🗑️ 전체 초기화
          </button>
        </div>

        {/* 닫기 버튼 */}
        <button 
          className="btn-3d w-full text-lg" 
          onClick={onClose}
        >
          닫기
        </button>
      </div>
    </div>
  );
}

