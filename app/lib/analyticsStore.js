const store = { events: [] };

export function recordEvent(event) {
  store.events.push(event);
}

// YYYY-MM-DD
function toDateKey(ts) {
  const d = new Date(ts);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function getStats({ fromTs, toTs } = {}) {
  const from = typeof fromTs === "number" ? fromTs : 0;
  const to = typeof toTs === "number" ? toTs : Number.MAX_SAFE_INTEGER;

  const filtered = store.events.filter((e) => (e.ts || 0) >= from && (e.ts || 0) <= to);

  // 실험/버전 집계
  const experimentStats = {};
  // 일자별 집계: { "YYYY-MM-DD": { A:{page_view,ad_view}, B:{...}}}
  const daily = {};

  for (const ev of filtered) {
    const exp = ev.experiment || "unknown";
    const v = ev.variant || "NA";
    const key = `${exp}:${v}`;

    if (!experimentStats[key]) {
      experimentStats[key] = { experiment: exp, variant: v, experiment_view: 0, page_view: 0, ad_view: 0 };
    }

    if (ev.type === "experiment_view") experimentStats[key].experiment_view += 1;
    if (ev.type === "page_view") experimentStats[key].page_view += 1;
    if (ev.type === "ad_view") experimentStats[key].ad_view += 1;

    // 일자별(차트용)
    const dk = toDateKey(ev.ts || Date.now());
    if (!daily[dk]) daily[dk] = {};
    if (!daily[dk][v]) daily[dk][v] = { page_view: 0, ad_view: 0 };

    if (ev.type === "page_view") daily[dk][v].page_view += 1;
    if (ev.type === "ad_view") daily[dk][v].ad_view += 1;
  }

  // daily를 차트 배열로 변환
  const dailySeries = Object.keys(daily)
    .sort()
    .map((date) => {
      const A = daily[date]["A"] || { page_view: 0, ad_view: 0 };
      const B = daily[date]["B"] || { page_view: 0, ad_view: 0 };
      return {
        date,
        A_page: A.page_view,
        A_ad: A.ad_view,
        B_page: B.page_view,
        B_ad: B.ad_view,
      };
    });

  return {
    rawEventsCount: filtered.length,
    experiments: Object.values(experimentStats),
    dailySeries,
  };
}

