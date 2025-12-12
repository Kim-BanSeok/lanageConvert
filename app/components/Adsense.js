"use client";

import { useEffect, useRef } from "react";

/**
 * Google AdSense 컴포넌트
 * Next.js App Router 환경에서 광고를 표시합니다.
 */
export default function Adsense({ slot, style, format = "auto" }) {
  const adRef = useRef(false);

  useEffect(() => {
    // 이미 초기화했으면 스킵
    if (adRef.current) return;
    
    try {
      // AdSense 스크립트가 로드될 때까지 대기
      const initAd = () => {
        if (window.adsbygoogle && Array.isArray(window.adsbygoogle)) {
          try {
            window.adsbygoogle.push({});
            adRef.current = true;
          } catch (e) {
            console.error("AdSense push error:", e);
          }
        } else {
          // 스크립트가 아직 로드되지 않았으면 재시도
          setTimeout(initAd, 100);
        }
      };

      // DOM이 준비되면 초기화 시도
      if (document.readyState === "complete") {
        initAd();
      } else {
        window.addEventListener("load", initAd);
        return () => window.removeEventListener("load", initAd);
      }
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  // AdSense 클라이언트 ID는 환경 변수에서 가져오거나 기본값 사용
  const adClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "ca-pub-7373977880685678";

  if (!slot) {
    // slot이 없으면 광고를 표시하지 않음
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

