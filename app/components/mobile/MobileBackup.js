"use client";

import { useState } from "react";

/**
 * 📱 모바일 백업/복원
 */
export default function MobileBackup({ showAlert, onBack }) {
  const [backupData, setBackupData] = useState(null);

  // 백업 생성
  const handleBackup = () => {
    try {
      const data = {
        rules: localStorage.getItem("language-rules") || "[]",
        presets: localStorage.getItem("language-presets") || "[]",
        identity: localStorage.getItem("language_identity_v1") || null,
        history: localStorage.getItem("translation_history") || "[]",
        stats: localStorage.getItem("rule_usage_stats") || "[]",
        version: "1.0.0",
        timestamp: new Date().toISOString(),
      };

      const jsonString = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonString], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `language-backup-${Date.now()}.json`;
      link.click();
      URL.revokeObjectURL(url);

      showAlert("백업 파일이 다운로드되었습니다!", "success");
    } catch (error) {
      showAlert("백업 생성에 실패했습니다", "error");
    }
  };

  // 백업 복원
  const handleRestore = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result);

        // 데이터 유효성 검사
        if (!data.version || !data.timestamp) {
          showAlert("올바르지 않은 백업 파일입니다", "error");
          return;
        }

        // 복원
        if (data.rules) localStorage.setItem("language-rules", data.rules);
        if (data.presets) localStorage.setItem("language-presets", data.presets);
        if (data.identity) localStorage.setItem("language_identity_v1", data.identity);
        if (data.history) localStorage.setItem("translation_history", data.history);
        if (data.stats) localStorage.setItem("rule_usage_stats", data.stats);

        showAlert("백업이 복원되었습니다! 페이지를 새로고침합니다.", "success");
        
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } catch (error) {
        showAlert("백업 복원에 실패했습니다", "error");
      }
    };
    reader.readAsText(file);
  };

  // 저장 공간 확인
  const getStorageInfo = () => {
    try {
      let total = 0;
      for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          total += localStorage[key].length + key.length;
        }
      }
      const mb = (total / 1024 / 1024).toFixed(2);
      return mb;
    } catch {
      return "알 수 없음";
    }
  };

  // 모든 데이터 삭제
  const handleClearAll = async () => {
    if (!confirm("정말로 모든 데이터를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.")) {
      return;
    }

    try {
      localStorage.removeItem("language-rules");
      localStorage.removeItem("language-presets");
      localStorage.removeItem("language_identity_v1");
      localStorage.removeItem("translation_history");
      localStorage.removeItem("rule_usage_stats");
      
      await showAlert("모든 데이터가 삭제되었습니다", "success");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      await showAlert("데이터 삭제에 실패했습니다", "error");
    }
  };

  return (
    <div className="mobile-backup-container">
      <div className="mobile-section-header">
        <button className="mobile-back-btn" onClick={onBack}>
          ← 돌아가기
        </button>
        <h2 className="mobile-section-title">백업/복원</h2>
      </div>

      {/* 저장 공간 정보 */}
      <div className="mobile-backup-storage">
        <div className="mobile-backup-storage-icon">💾</div>
        <h3 className="mobile-backup-storage-title">저장 공간 사용량</h3>
        <div className="mobile-backup-storage-value">{getStorageInfo()} MB</div>
        <p className="mobile-backup-storage-desc">
          브라우저 LocalStorage에 저장된 데이터 크기입니다
        </p>
      </div>

      {/* 백업 생성 */}
      <div className="mobile-backup-section">
        <h3 className="mobile-backup-subtitle">📥 백업 생성</h3>
        <p className="mobile-backup-text">
          현재 저장된 모든 데이터를 JSON 파일로 백업합니다
        </p>
        <button className="mobile-btn mobile-btn-primary" onClick={handleBackup}>
          💾 백업 파일 다운로드
        </button>
      </div>

      {/* 백업 복원 */}
      <div className="mobile-backup-section">
        <h3 className="mobile-backup-subtitle">📤 백업 복원</h3>
        <p className="mobile-backup-text">
          백업 파일을 선택하여 데이터를 복원합니다
        </p>
        <label className="mobile-btn mobile-btn-secondary" style={{ display: 'block', textAlign: 'center', cursor: 'pointer' }}>
          📂 백업 파일 선택
          <input
            type="file"
            accept=".json"
            onChange={handleRestore}
            style={{ display: "none" }}
          />
        </label>
      </div>

      {/* 경고 섹션 */}
      <div className="mobile-backup-warning">
        <h3 className="mobile-backup-subtitle">⚠️ 위험 지역</h3>
        <p className="mobile-backup-text">
          아래 작업은 되돌릴 수 없습니다. 신중하게 선택하세요.
        </p>
        <button
          className="mobile-btn mobile-btn-danger"
          onClick={handleClearAll}
        >
          🗑️ 모든 데이터 삭제
        </button>
      </div>

      {/* 백업 팁 */}
      <div className="mobile-backup-tips">
        <h3 className="mobile-backup-subtitle">💡 백업 팁</h3>
        <ul className="mobile-backup-tips-list">
          <li>정기적으로 백업을 생성하는 것이 좋습니다</li>
          <li>백업 파일은 안전한 곳에 보관하세요</li>
          <li>다른 기기로 데이터를 옮길 때 유용합니다</li>
          <li>브라우저를 변경해도 백업으로 복원할 수 있습니다</li>
        </ul>
      </div>
    </div>
  );
}

