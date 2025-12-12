"use client";

import { useEffect, useMemo, useState } from "react";
import {
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar,
} from "recharts";

function todayKey() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function daysAgoKey(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export default function DashboardPage() {
  const [from, setFrom] = useState(daysAgoKey(14));
  const [to, setTo] = useState(todayKey());
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/stats?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`);
      if (!res.ok) {
        if (res.status === 401) {
          window.location.href = "/admin/login";
          return;
        }
        alert("통계 불러오기 실패");
        return;
      }
      const data = await res.json();
      setStats(data);
    } catch {
      alert("네트워크 오류");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const summary = useMemo(() => {
    if (!stats) return null;

    // home_ad_layout_experiment 기준 A/B만 뽑아서 요약
    const rows = (stats.experiments || []).filter((x) => x.experiment === "home_ad_layout_experiment" && (x.variant === "A" || x.variant === "B"));
    const byV = Object.fromEntries(rows.map((r) => [r.variant, r]));

    const A = byV["A"] || { page_view: 0, ad_view: 0 };
    const B = byV["B"] || { page_view: 0, ad_view: 0 };

    const A_rate = A.page_view ? (A.ad_view / A.page_view) : 0;
    const B_rate = B.page_view ? (B.ad_view / B.page_view) : 0;

    return { A, B, A_rate, B_rate };
  }, [stats]);

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  };

  return (
    <div className="max-w-5xl mx-auto p-6 text-white space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">📊 광고/트래픽 대시보드</h1>
        <button className="btn-3d btn-red" onClick={logout}>로그아웃</button>
      </div>

      {/* 날짜 필터 */}
      <div className="card-3d space-y-3">
        <div className="flex flex-wrap gap-3 items-end">
          <div>
            <div className="text-sm opacity-80 mb-1">시작일</div>
            <input className="input-3d" type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
          </div>
          <div>
            <div className="text-sm opacity-80 mb-1">종료일</div>
            <input className="input-3d" type="date" value={to} onChange={(e) => setTo(e.target.value)} />
          </div>

          <button className="btn-3d" onClick={fetchStats} disabled={loading}>
            {loading ? "불러오는 중..." : "적용"}
          </button>

          <button className="btn-3d" onClick={() => { setFrom(daysAgoKey(7)); setTo(todayKey()); }}>
            최근 7일
          </button>
          <button className="btn-3d" onClick={() => { setFrom(daysAgoKey(30)); setTo(todayKey()); }}>
            최근 30일
          </button>
        </div>

        <p className="text-xs opacity-70">
          ⚠️ 현재 저장소가 "서버 메모리(in-memory)"면 서버 재시작/배포 시 통계가 초기화됩니다. 운영용은 DB/Redis 추천.
        </p>
      </div>

      {/* 요약 카드 */}
      {summary && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card-3d">
            <h2 className="text-xl font-semibold mb-2">A 버전 요약</h2>
            <div className="opacity-90">페이지뷰: {summary.A.page_view}</div>
            <div className="opacity-90">광고노출(ad_view): {summary.A.ad_view}</div>
            <div className="opacity-90">노출/페이지 비율: {(summary.A_rate * 100).toFixed(2)}%</div>
          </div>
          <div className="card-3d">
            <h2 className="text-xl font-semibold mb-2">B 버전 요약</h2>
            <div className="opacity-90">페이지뷰: {summary.B.page_view}</div>
            <div className="opacity-90">광고노출(ad_view): {summary.B.ad_view}</div>
            <div className="opacity-90">노출/페이지 비율: {(summary.B_rate * 100).toFixed(2)}%</div>
          </div>
        </div>
      )}

      {/* 라인차트: 일자별 페이지뷰 */}
      <div className="card-3d">
        <h2 className="text-xl font-semibold mb-3">일자별 페이지뷰 (A/B)</h2>
        <div style={{ width: "100%", height: 320 }}>
          <ResponsiveContainer>
            <LineChart data={stats?.dailySeries || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="A_page" name="A 페이지뷰" stroke="#60a5fa" dot={false} />
              <Line type="monotone" dataKey="B_page" name="B 페이지뷰" stroke="#f472b6" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 바차트: 일자별 광고노출 */}
      <div className="card-3d">
        <h2 className="text-xl font-semibold mb-3">일자별 광고노출(ad_view) (A/B)</h2>
        <div style={{ width: "100%", height: 320 }}>
          <ResponsiveContainer>
            <BarChart data={stats?.dailySeries || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="A_ad" name="A 광고노출" fill="#60a5fa" />
              <Bar dataKey="B_ad" name="B 광고노출" fill="#f472b6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card-3d">
        <h2 className="text-xl font-semibold mb-3">원시 집계 테이블</h2>
        <p className="text-sm opacity-80 mb-3">
          실험별·버전별 전체 이벤트 집계입니다.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/20">
                <th className="text-left py-2">실험명</th>
                <th className="text-left py-2">버전</th>
                <th className="text-right py-2">실험 노출</th>
                <th className="text-right py-2">페이지뷰</th>
                <th className="text-right py-2">광고노출</th>
              </tr>
            </thead>
            <tbody>
              {(stats?.experiments || []).map((exp, idx) => (
                <tr key={idx} className="border-b border-white/10">
                  <td className="py-2">{exp.experiment}</td>
                  <td className="py-2">{exp.variant}</td>
                  <td className="py-2 text-right">{exp.experiment_view}</td>
                  <td className="py-2 text-right">{exp.page_view}</td>
                  <td className="py-2 text-right">{exp.ad_view}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-xs opacity-70 mt-3">
          ✅ AdSense 정책 안전: 클릭 추적 금지. 우리는 노출/레이아웃/페이지뷰만 추적합니다.
        </p>
      </div>
    </div>
  );
}

