import Link from 'next/link';

export default function ContentSection() {
  const features = [
    {
      icon: '🔐',
      title: '안전한 암호화',
      description: '모든 데이터는 브라우저에서만 처리되어 개인정보가 안전하게 보호됩니다.'
    },
    {
      icon: '⚡',
      title: '실시간 변환',
      description: '입력 즉시 결과를 확인할 수 있는 빠르고 직관적인 인터페이스를 제공합니다.'
    },
    {
      icon: '🎲',
      title: '랜덤 생성',
      description: '알파벳 기반의 랜덤 암호화 규칙을 자동으로 생성하여 예측 불가능한 코드를 만들 수 있습니다.'
    },
    {
      icon: '📱',
      title: '모바일 지원',
      description: 'PWA 기능으로 앱처럼 설치하여 언제 어디서나 편리하게 사용할 수 있습니다.'
    }
  ];

  const useCases = [
    {
      icon: '💌',
      title: '비밀 메시지',
      description: '친구와만 아는 비밀 언어로 특별한 메시지를 교환해보세요.'
    },
    {
      icon: '📚',
      title: '언어 학습',
      description: '새로운 언어의 구조를 이해하는 교육용 도구로 활용할 수 있습니다.'
    },
    {
      icon: '🎮',
      title: '창의적 놀이',
      description: '팀 내부 이벤트나 게임에 활용할 수 있는 재미있는 코드를 만들어보세요.'
    },
    {
      icon: '🔐',
      title: '보안 교육',
      description: '암호화의 원리를 배우고 이해하는 교육용 플랫폼으로 사용할 수 있습니다.'
    }
  ];

  return (
    <div className="space-y-12">
      {/* 소개 섹션 */}
      <section className="text-center py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          🌟 나만의 언어를 만들어보세요
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          직접 규칙을 정의하여 개인 맞춤형 언어를 생성하고, 친구들과만 아는 비밀 코드를 만들어보세요.
          간단한 문자 치환부터 복잡한 암호화까지 자유롭게 설정할 수 있습니다.
        </p>
      </section>

      {/* 주요 기능 */}
      <section>
        <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          ✨ 주요 기능
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
            >
              <div className="text-3xl mb-4 text-center">{feature.icon}</div>
              <h4 className="font-semibold text-gray-800 mb-2 text-center">
                {feature.title}
              </h4>
              <p className="text-sm text-gray-600 text-center leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 활용 사례 */}
      <section>
        <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          🚀 활용 사례
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className="flex items-start space-x-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200"
            >
              <span className="text-2xl flex-shrink-0">{useCase.icon}</span>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">
                  {useCase.title}
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {useCase.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 기술 스택 */}
      <section className="bg-gray-50 rounded-xl p-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          🛠️ 기술 스택
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-semibold text-gray-700 mb-3 text-center">Frontend</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-2">
                <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                <span className="text-sm text-gray-600">Next.js 15</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <span className="w-3 h-3 bg-cyan-500 rounded-full"></span>
                <span className="text-sm text-gray-600">React 18</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
                <span className="text-sm text-gray-600">Tailwind CSS</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-3 text-center">Features</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-2">
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                <span className="text-sm text-gray-600">PWA 지원</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
                <span className="text-sm text-gray-600">반응형 디자인</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <span className="w-3 h-3 bg-pink-500 rounded-full"></span>
                <span className="text-sm text-gray-600">SEO 최적화</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-3 text-center">Deployment</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-2">
                <span className="w-3 h-3 bg-indigo-500 rounded-full"></span>
                <span className="text-sm text-gray-600">Vercel</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                <span className="text-sm text-gray-600">Google AdSense</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                <span className="text-sm text-gray-600">Search Console</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="text-center py-12">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">
            지금 바로 시작해보세요!
          </h3>
          <p className="mb-6 text-lg">
            나만의 특별한 언어를 만들고 친구들과 공유해보세요
          </p>
          <div className="space-x-4">
            <Link
              href="/guide"
              className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              📖 사용법 보기
            </Link>
            <Link
              href="/about"
              className="inline-block bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              📋 더 알아보기
            </Link>
          </div>
        </div>
      </section>

      {/* 통계 정보 */}
      <section className="grid md:grid-cols-3 gap-6 text-center">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
          <div className="text-sm text-gray-600">클라이언트 측 처리</div>
          <div className="text-xs text-gray-500 mt-1">개인정보 보호</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="text-3xl font-bold text-green-600 mb-2">무제한</div>
          <div className="text-sm text-gray-600">규칙 생성</div>
          <div className="text-xs text-gray-500 mt-1">자유로운 창작</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
          <div className="text-sm text-gray-600">서비스 이용</div>
          <div className="text-xs text-gray-500 mt-1">언제든지 접근</div>
        </div>
      </section>
    </div>
  );
}
