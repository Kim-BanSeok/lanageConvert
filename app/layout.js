import "./globals.css";

export const metadata = {
  title: "나만의 언어 생성기 - My Language Generator",
  description: "나만의 언어 규칙을 만들고 AI로 자동 생성하는 3D 스타일 암호화 도구. PWA 지원으로 앱처럼 설치 가능!",
  keywords: ["언어 생성기", "암호화", "PWA", "Next.js", "AI 언어", "텍스트 변환", "나만의 언어"],
  authors: [{ name: "Kim-BanSeok" }],
  creator: "Kim-BanSeok",
  publisher: "Kim-BanSeok",
  manifest: "/manifest.json",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "나만의 언어 생성기 - My Language Generator",
    description: "3D 스타일의 암호화 언어 생성 도구 | PWA 지원 | AI 자동 생성",
    url: "https://lanage-convert.vercel.app",
    siteName: "나만의 언어 생성기",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "나만의 언어 생성기",
    description: "3D 스타일의 암호화 언어 생성 도구",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "언어 생성기",
  },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/icon-152.png", sizes: "152x152", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#60a5fa",
};

export default function RootLayout({ children }) {
  // AdSense 클라이언트 ID (환경 변수에서 가져오거나 직접 설정)
  // 검증을 위해 환경 변수가 없어도 기본값 사용
  const adSenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "ca-pub-7373977880685678";

  return (
    <html lang="ko">
      <head>
        {/* ============================================
            검색 엔진 사이트 소유권 확인
        ============================================ */}
        
        {/* Google Search Console 사이트 소유권 확인 */}
        <meta name="google-site-verification" content="lSJTeWuV8EZQIBkHAfSRPQlK59uyaYjsnYH_DhIv2r4" />
        
        {/* 네이버 서치어드바이저 사이트 소유권 확인 */}
        <meta name="naver-site-verification" content="b2e75e0ba705379e3053a92aa2ebafa224976792" />
        
        {/* ============================================
            SEO 메타 태그
        ============================================ */}
        
        {/* Canonical URL - 중복 콘텐츠 방지 */}
        <link rel="canonical" href="https://lanage-convert.vercel.app" />
        
        {/* 언어 및 지역 설정 */}
        <meta httpEquiv="content-language" content="ko-KR" />
        <meta name="language" content="Korean" />
        <meta name="geo.region" content="KR" />
        
        {/* 검색 엔진 최적화 */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="bingbot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        
        {/* 네이버 검색 엔진 최적화 */}
        <meta name="naver" content="index, follow" />
        
        {/* 사이트 정보 */}
        <meta name="author" content="Kim-BanSeok" />
        <meta name="copyright" content="Kim-BanSeok" />
        <meta name="reply-to" content="contact@example.com" />
        <meta name="owner" content="Kim-BanSeok" />
        <meta name="url" content="https://lanage-convert.vercel.app" />
        <meta name="identifier-URL" content="https://lanage-convert.vercel.app" />
        <meta name="category" content="웹 도구, 언어 생성기, 암호화 도구" />
        <meta name="coverage" content="Worldwide" />
        <meta name="distribution" content="Global" />
        <meta name="rating" content="General" />
        
        {/* 모바일 최적화 */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="format-detection" content="address=no" />
        <meta name="format-detection" content="email=no" />
        <meta name="HandheldFriendly" content="true" />
        <meta name="MobileOptimized" content="320" />
        
        {/* PWA 및 앱 설정 */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#60a5fa" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="언어 생성기" />
        
        {/* iOS Splash Screen 설정 */}
        <link rel="apple-touch-startup-image" href="/icons/icon-512.png" />
        <meta name="apple-touch-fullscreen" content="yes" />
        
        {/* Open Graph 이미지 추가 (소셜 미디어 공유용) */}
        <meta property="og:image" content="https://lanage-convert.vercel.app/icons/icon-512.png" />
        <meta property="og:image:width" content="512" />
        <meta property="og:image:height" content="512" />
        <meta property="og:image:alt" content="나만의 언어 생성기 로고" />
        
        {/* Twitter Card 이미지 */}
        <meta name="twitter:image" content="https://lanage-convert.vercel.app/icons/icon-512.png" />
        <meta name="twitter:image:alt" content="나만의 언어 생성기 로고" />
        
        {/* 추가 SEO 메타 태그 */}
        <meta name="application-name" content="나만의 언어 생성기" />
        <meta name="msapplication-TileColor" content="#60a5fa" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* 구조화된 데이터 준비 (JSON-LD는 별도로 추가 가능) */}
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "나만의 언어 생성기",
              "alternateName": "My Language Generator",
              "description": "나만의 언어 규칙을 만들고 AI로 자동 생성하는 3D 스타일 암호화 도구. PWA 지원으로 앱처럼 설치 가능!",
              "url": "https://lanage-convert.vercel.app",
              "applicationCategory": "UtilityApplication",
              "operatingSystem": "Web",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "KRW"
              },
              "author": {
                "@type": "Person",
                "name": "Kim-BanSeok"
              },
              "publisher": {
                "@type": "Person",
                "name": "Kim-BanSeok"
              },
              "inLanguage": "ko-KR",
              "isAccessibleForFree": true
            })
          }}
        />
        
        {/* Google AdSense - 검증을 위해 항상 렌더링 */}
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adSenseClientId}`}
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

