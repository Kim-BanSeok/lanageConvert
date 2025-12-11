"use client";

export default function Logo3D() {
  return (
    <div className="logo-3d-wrapper">
      {/* 회전하는 작은 구(점) */}
      <div className="logo-3d-orbit">
        <div className="logo-3d-dot" />
      </div>

      {/* 메인 타이틀 */}
      <div className="logo-3d-text">
        <span className="logo-3d-main">
          My Secret Language
        </span>
        <span className="logo-3d-sub">
          나만의 언어 생성기 · 3D Crypto Text Lab
        </span>
      </div>
    </div>
  );
}

