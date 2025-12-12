// 🎯 Quick Win 4: Esc 키로 모달 닫기
import { useEffect } from "react";

export function useEscapeKey(onClose) {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);
}

