"use client";

/**
 * 테마 토글 버튼
 */
export default function ThemeToggle({ theme, onToggle }) {
  return (
    <button
      className="btn-3d btn-compact px-3 py-2 text-2xl"
      onClick={onToggle}
      title={theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환'}
    >
      {theme === 'dark' ? '🌙' : '☀️'}
    </button>
  );
}

