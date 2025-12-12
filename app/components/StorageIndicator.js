"use client";

import { useState, useEffect } from "react";
import { getStorageUsage } from "../lib/backupRestore";

/**
 * 🔧 4. localStorage 용량 모니터링 UI
 * 화면 우측 하단에 작은 용량 표시기
 */
export default function StorageIndicator({ onClick }) {
  const [storageInfo, setStorageInfo] = useState(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // 초기 로드
    updateStorageInfo();

    // 10초마다 갱신
    const interval = setInterval(updateStorageInfo, 10000);

    return () => clearInterval(interval);
  }, []);

  const updateStorageInfo = () => {
    try {
      const info = getStorageUsage();
      setStorageInfo(info);

      // 90% 이상이면 항상 표시
      if (info.usagePercent > 90) {
        setIsVisible(true);
      }
    } catch (error) {
      console.error("Storage info 업데이트 실패:", error);
    }
  };

  if (!storageInfo || !isVisible) {
    return null;
  }

  // 경고 레벨에 따라 색상 결정
  const getColorClass = () => {
    if (storageInfo.isCritical) return "bg-red-500/90 border-red-400";
    if (storageInfo.isNearLimit) return "bg-yellow-500/90 border-yellow-400";
    return "bg-green-500/90 border-green-400";
  };

  const getIcon = () => {
    if (storageInfo.isCritical) return "⚠️";
    if (storageInfo.isNearLimit) return "⚡";
    return "💾";
  };

  // 경고 레벨이 높을 때만 표시
  if (storageInfo.usagePercent < 70) {
    return null;
  }

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 ${getColorClass()} border-2 rounded-xl px-4 py-2 shadow-2xl cursor-pointer hover:scale-105 transition-transform animate-fade-in`}
      onClick={() => {
        if (onClick) onClick();
      }}
      title="클릭하여 백업/복원 열기"
    >
      <div className="flex items-center gap-3">
        <div className="text-2xl">{getIcon()}</div>
        <div className="text-white">
          <div className="text-xs font-semibold opacity-80">저장소</div>
          <div className="text-lg font-bold">{storageInfo.usagePercent}%</div>
        </div>
        <button
          className="text-white/70 hover:text-white ml-2"
          onClick={(e) => {
            e.stopPropagation();
            setIsVisible(false);
          }}
          title="닫기"
        >
          ✕
        </button>
      </div>

      {/* 작은 프로그레스 바 */}
      <div className="w-full bg-black/30 rounded-full h-1 mt-2">
        <div
          className="bg-white h-full rounded-full transition-all duration-300"
          style={{ width: `${Math.min(storageInfo.usagePercent, 100)}%` }}
        />
      </div>

      {storageInfo.isCritical && (
        <div className="text-xs text-white mt-1 opacity-90 animate-pulse">
          용량이 부족합니다!
        </div>
      )}
    </div>
  );
}

