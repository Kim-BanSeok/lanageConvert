"use client";

import { useState } from "react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        const errorMessage = errorData.message || "로그인 실패: 비밀번호를 확인하세요.";
        alert(errorMessage);
        setLoading(false);
        return;
      }

      const params = new URLSearchParams(window.location.search);
      const next = params.get("next") || "/admin/dashboard";
      window.location.href = next;
    } catch {
      alert("네트워크 오류");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 text-white space-y-4">
      <h1 className="text-2xl font-bold">🔒 관리자 로그인</h1>

      <div className="card-3d space-y-3">
        <input
          className="input-3d w-full"
          type="password"
          placeholder="관리자 비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onLogin()}
        />

        <button className="btn-3d w-full" onClick={onLogin} disabled={loading}>
          {loading ? "로그인 중..." : "로그인"}
        </button>
      </div>

      <p className="text-xs opacity-70">
        이 페이지는 관리자 전용입니다.
      </p>
      
      <div className="text-xs opacity-60 mt-2 p-2 bg-white/5 rounded">
        💡 힌트: 기본 비밀번호는 <code className="bg-white/10 px-1 rounded">admin123</code> 입니다.
        <br />
        (환경 변수 이름이 아닌 실제 비밀번호를 입력하세요)
      </div>
    </div>
  );
}

