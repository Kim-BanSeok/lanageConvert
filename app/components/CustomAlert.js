"use client";

import { useState, useEffect } from "react";

/**
 * CustomAlert 컴포넌트
 * 기본 alert 대신 3D 스타일의 커스텀 알림을 표시합니다.
 */
export default function CustomAlert({ message, type = "info", onClose, duration = 3000 }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      if (onClose) onClose();
    }, 300); // 애니메이션 시간
  };

  if (!isVisible) return null;

  const typeStyles = {
    info: "bg-blue-500/20 border-blue-500/50 text-blue-200",
    success: "bg-green-500/20 border-green-500/50 text-green-200",
    warning: "bg-yellow-500/20 border-yellow-500/50 text-yellow-200",
    error: "bg-red-500/20 border-red-500/50 text-red-200",
  };

  const icons = {
    info: "ℹ️",
    success: "✅",
    warning: "⚠️",
    error: "❌",
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-[100] p-4">
      <div
        className={`card-3d p-6 max-w-md w-full border-2 ${typeStyles[type]} animate-fade-up`}
      >
        <div className="flex items-start gap-4">
          <div className="text-3xl flex-shrink-0">{icons[type]}</div>
          
          <div className="flex-1">
            <p className="text-lg font-semibold mb-2">{message}</p>
          </div>

          <button
            className="text-xl opacity-60 hover:opacity-100 transition flex-shrink-0"
            onClick={handleClose}
            aria-label="닫기"
          >
            ✕
          </button>
        </div>

        {duration > 0 && (
          <div className="mt-4">
            <button
              className="btn-3d w-full"
              onClick={handleClose}
            >
              확인
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * CustomAlert를 사용하는 Hook
 */
export function useCustomAlert() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type = "info", duration = 3000) => {
    return new Promise((resolve) => {
      setAlert({
        message,
        type,
        duration,
        onClose: () => {
          setAlert(null);
          resolve();
        },
      });
    });
  };

  const AlertComponent = alert ? (
    <CustomAlert
      message={alert.message}
      type={alert.type}
      duration={alert.duration}
      onClose={alert.onClose}
    />
  ) : null;

  return { showAlert, AlertComponent };
}

