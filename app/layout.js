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
  return (
    <html lang="ko">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#60a5fa" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="언어 생성기" />
      </head>
      <body>{children}</body>
    </html>
  );
}

