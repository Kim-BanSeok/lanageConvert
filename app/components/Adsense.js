"use client";

import { useEffect } from "react";

/**
 * Google AdSense 컴포넌트
 * Next.js App Router 환경에서 광고를 표시합니다.
 */
export default function Adsense({ slot, style, format = "auto" }) {
  useEffect(() => {
    try {
      // AdSense 초기화
      if (window.adsbygoogle && Array.isArray(window.adsbygoogle)) {
        window.adsbygoogle.push({});
      }
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  // AdSense 클라이언트 ID는 환경 변수에서 가져오거나 직접 설정
  const adClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  if (!slot || !adClient) {
    // 환경 변수가 설정되지 않았으면 광고를 표시하지 않음
    return null;
  }

  return (
    <div className="w-full" style={style}>
      <ins
        className="adsbygoogle"
        style={{
          display: "block",
          textAlign: "center",
          ...style,
        }}
        data-ad-client={adClient}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}

