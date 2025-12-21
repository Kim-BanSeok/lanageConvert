"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Google AdSense 컴포넌트
 * Next.js App Router 환경에서 광고를 표시합니다.
 */
export default function Adsense({ slot, style, format = "auto" }) {
  const adRef = useRef(false);
  const [adError, setAdError] = useState(false);
  const retryCountRef = useRef(0);
  const maxRetries = 3;

  useEffect(() => {
    // 이미 초기화했으면 스킵
    if (adRef.current || adError) return;
    
    try {
      // AdSense 스크립트가 로드될 때까지 대기
      const initAd = () => {
        if (retryCountRef.current >= maxRetries) {
          // 재시도 횟수 초과 시 조용히 실패 처리
          setAdError(true);
          return;
        }

        if (window.adsbygoogle && Array.isArray(window.adsbygoogle)) {
          try {
            window.adsbygoogle.push({});
            adRef.current = true;
          } catch (e) {
            // 403 오류 등은 조용히 처리 (승인 대기 중일 수 있음)
            if (e.message && e.message.includes("403")) {
              setAdError(true);
              return;
            }
            console.warn("AdSense push error:", e);
            retryCountRef.current++;
            if (retryCountRef.current < maxRetries) {
              setTimeout(initAd, 1000);
            } else {
              setAdError(true);
            }
          }
        } else {
          // 스크립트가 아직 로드되지 않았으면 재시도
          retryCountRef.current++;
          if (retryCountRef.current < maxRetries * 10) {
            setTimeout(initAd, 100);
          } else {
            setAdError(true);
          }
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
      // 403 오류는 정상적인 경우도 있음 (승인 대기 중)
      if (e.message && e.message.includes("403")) {
        setAdError(true);
        return;
      }
      console.warn("AdSense error:", e);
      setAdError(true);
    }
  }, [adError]);

  // AdSense 클라이언트 ID는 환경 변수에서만 가져오기 (보안: 기본값 제거)
  const adClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  
  // 클라이언트 ID가 없으면 광고를 표시하지 않음
  if (!adClient) {
    return null;
  }

  if (!slot) {
    // slot이 없으면 광고를 표시하지 않음
    return null;
  }

  // 오류 발생 시 조용히 숨김 (403은 승인 대기 중일 수 있음)
  if (adError) {
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

