// 🔐 데이터 백업 및 복원 시스템

import { safeLocalStorageGet } from "../utils/storage";

/**
 * 전체 앱 데이터를 백업
 * @returns {Object} 백업 데이터 객체
 */
export function backupAllData() {
  const backup = {
    version: "1.0",
    timestamp: new Date().toISOString(),
    data: {}
  };

  // 백업할 localStorage 키 목록
  const keysToBackup = [
    "language-presets",           // 프리셋
    "language_identity_v1",       // 언어 아이덴티티
    "evolution_samples_v1",       // 진화 샘플
    "language_versions_v1",       // 언어 버전
    "evolution_recommend_state",  // 진화 추천 상태
    "has_visited",                // 방문 기록
    "pwa-install-dismissed"       // PWA 설치 프롬프트
  ];

  // 각 키의 데이터 백업
  keysToBackup.forEach(key => {
    try {
      const value = safeLocalStorageGet(key);
      if (value !== null) {
        backup.data[key] = value;
      }
    } catch (error) {
      console.warn(`백업 실패: ${key}`, error);
    }
  });

  return backup;
}

/**
 * 백업 데이터를 JSON 파일로 다운로드
 */
export function downloadBackup() {
  try {
    const backup = backupAllData();
    const json = JSON.stringify(backup, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.href = url;
    link.download = `language-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    return true;
  } catch (error) {
    console.error("백업 다운로드 실패:", error);
    return false;
  }
}

/**
 * JSON 파일에서 백업 데이터 복원
 * @param {File} file - JSON 백업 파일
 * @returns {Promise<Object>} 복원 결과
 */
export async function restoreFromFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const backup = JSON.parse(e.target.result);
        
        // 백업 파일 유효성 검사
        if (!backup.version || !backup.data) {
          throw new Error("올바른 백업 파일이 아닙니다.");
        }

        // 데이터 복원
        const results = {
          success: [],
          failed: []
        };

        Object.entries(backup.data).forEach(([key, value]) => {
          try {
            localStorage.setItem(key, value);
            results.success.push(key);
          } catch (error) {
            console.error(`복원 실패: ${key}`, error);
            results.failed.push({ key, error: error.message });
          }
        });

        resolve({
          success: true,
          restored: results.success.length,
          failed: results.failed.length,
          details: results,
          timestamp: backup.timestamp
        });
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => {
      reject(new Error("파일 읽기 실패"));
    };

    reader.readAsText(file);
  });
}

/**
 * localStorage 사용량 계산
 * @returns {Object} 사용량 정보
 */
export function getStorageUsage() {
  let totalSize = 0;
  const itemSizes = {};

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    const size = (key.length + value.length) * 2; // UTF-16 = 2 bytes per char
    
    itemSizes[key] = size;
    totalSize += size;
  }

  const maxSize = 5 * 1024 * 1024; // 5MB (대부분의 브라우저 기본값)
  const usagePercent = (totalSize / maxSize) * 100;

  return {
    totalSize,
    totalSizeKB: (totalSize / 1024).toFixed(2),
    totalSizeMB: (totalSize / (1024 * 1024)).toFixed(2),
    maxSize,
    maxSizeMB: (maxSize / (1024 * 1024)).toFixed(2),
    usagePercent: usagePercent.toFixed(2),
    itemSizes,
    itemCount: localStorage.length,
    isNearLimit: usagePercent > 80,
    isCritical: usagePercent > 90
  };
}

/**
 * 자동 백업 (선택적)
 * @param {number} intervalDays - 백업 주기 (일)
 */
export function setupAutoBackup(intervalDays = 7) {
  const lastBackupKey = "last_auto_backup";
  const lastBackup = safeLocalStorageGet(lastBackupKey);
  
  if (lastBackup) {
    const daysSinceBackup = (Date.now() - parseInt(lastBackup)) / (1000 * 60 * 60 * 24);
    
    if (daysSinceBackup >= intervalDays) {
      // 자동 백업 실행
      downloadBackup();
      localStorage.setItem(lastBackupKey, Date.now().toString());
    }
  } else {
    localStorage.setItem(lastBackupKey, Date.now().toString());
  }
}

/**
 * 전체 데이터 초기화 (백업 후)
 * @returns {boolean} 성공 여부
 */
export function resetAllData() {
  try {
    // 백업 먼저 생성
    downloadBackup();
    
    // 모든 데이터 삭제
    localStorage.clear();
    
    return true;
  } catch (error) {
    console.error("데이터 초기화 실패:", error);
    return false;
  }
}

