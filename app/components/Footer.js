import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: '서비스',
      links: [
        { name: '메인', href: '/', icon: '🏠' },
        { name: '소개', href: '/about', icon: '📋' },
        { name: '사용법', href: '/guide', icon: '📖' },
        { name: 'FAQ', href: '/faq', icon: '❓' },
      ]
    },
    {
      title: '법적 정보',
      links: [
        { name: '개인정보처리방침', href: '/privacy', icon: '🔒' },
        { name: '이용약관', href: '/terms', icon: '📋' },
      ]
    },
    {
      title: '기술 정보',
      links: [
        { name: 'GitHub', href: 'https://github.com/your-username/my-language-generator', icon: '💻' },
        { name: 'API 문서', href: '/api', icon: '📚' },
        { name: '기술 스택', href: '/about#tech-stack', icon: '🛠️' },
      ]
    },
    {
      title: '연락처',
      links: [
        { name: '문의하기', href: '/contact', icon: '📧' },
        { name: '버그 리포트', href: 'https://github.com/your-username/my-language-generator/issues', icon: '🐛' },
        { name: '기능 제안', href: 'https://github.com/your-username/my-language-generator/discussions', icon: '💡' },
      ]
    }
  ];

  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/your-username', icon: '🐙' },
    { name: 'Twitter', href: 'https://twitter.com/your-username', icon: '🐦' },
    { name: 'Email', href: 'mailto:contact@example.com', icon: '📧' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* 메인 푸터 콘텐츠 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* 로고 및 설명 */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                🌟 나만의 언어 생성기
              </span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              사용자가 직접 만드는 개인 맞춤형 언어 변환 및 암호화 도구입니다. 
              창의적인 언어 놀이부터 교육용 도구까지 다양하게 활용해보세요.
            </p>
            
            {/* 소셜 링크 */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  title={social.name}
                >
                  <span className="text-xl">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* 푸터 링크 그룹 */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold mb-4 text-white">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white text-sm transition-colors flex items-center"
                    >
                      <span className="mr-2">{link.icon}</span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 기능 특징 */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl mb-2">🔐</div>
              <div className="text-sm text-gray-400">안전한 암호화</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">📱</div>
              <div className="text-sm text-gray-400">모바일 지원</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">⚡</div>
              <div className="text-sm text-gray-400">실시간 변환</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">🎲</div>
              <div className="text-sm text-gray-400">랜덤 생성</div>
            </div>
          </div>
        </div>
      </div>

      {/* 저작권 및 최하단 정보 */}
      <div className="border-t border-gray-800 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400 mb-4 md:mb-0">
              © {currentYear} 나만의 언어 생성기. All rights reserved.
            </div>
            
            <div className="flex flex-wrap items-center space-x-4 text-sm text-gray-400">
              <span>Made with</span>
              <span className="text-red-500">❤️</span>
              <span>by Kim-BanSeok</span>
              <span className="hidden md:inline">•</span>
              <span className="text-xs">Powered by Next.js</span>
            </div>
          </div>

          {/* 추가 정보 */}
          <div className="mt-4 pt-4 border-t border-gray-800 text-center">
            <p className="text-xs text-gray-500">
              본 서비스는 교육 및 엔터테인먼트 목적으로 제공됩니다. 
              실제 중요한 정보의 암호화에는 전문적인 보안 도구를 사용하세요.
            </p>
          </div>
        </div>
      </div>

      {/* 배지 및 인증 */}
      <div className="bg-gray-950 border-t border-gray-800 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center space-x-6 text-xs text-gray-500">
            <div className="flex items-center">
              <span className="mr-2">🔒</span>
              <span>HTTPS 보안 연결</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2">📱</span>
              <span>PWA 지원</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2">🌍</span>
              <span>다국어 지원</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2">⚡</span>
              <span>최적화된 성능</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
