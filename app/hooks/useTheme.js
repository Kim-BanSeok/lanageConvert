// 🌓 다크/라이트 모드 Hook

import { useState, useEffect } from "react";
import { safeLocalStorageGet, safeLocalStorageSet } from "../utils/storage";

const THEME_KEY = "app_theme_v1";

/**
 * 테마 Hook
 * @returns {[string, () => void]} [theme, toggleTheme]
 */
export function useTheme() {
  const [theme, setTheme] = useState("dark"); // dark | light

  useEffect(() => {
    // 초기 로드
    loadTheme();
  }, []);

  useEffect(() => {
    // 테마 변경 시 클래스 적용
    applyTheme(theme);
  }, [theme]);

  const loadTheme = () => {
    const saved = safeLocalStorageGet(THEME_KEY);
    if (saved) {
      setTheme(saved);
    } else {
      // 시스템 설정 확인
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
    }
  };

  const applyTheme = (newTheme) => {
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    safeLocalStorageSet(THEME_KEY, newTheme);
  };

  return [theme, toggleTheme];
}

