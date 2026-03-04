import { Metadata } from 'next';
import Link from 'next/link';

export const metadata = {
  title: '소개 - 나만의 언어 생성기',
  description: '나만의 언어 생성기 프로젝트 소개, 기능 설명, 기술 스택 정보',
  openGraph: {
    title: '소개 - 나만의 언어 생성기',
    description: '프로젝트 개요와 기능 상세 설명',
    url: 'https://lanage-convert.vercel.app/about',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* 헤더 */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              🌟 나만의 언어 생성기 소개
            </h1>
            <p className="text-lg text-gray-600">
              개인 맞춤형 언어 변환 및 암호화 웹 애플리케이션
            </p>
          </div>

          {/* 프로젝트 개요 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="text-3xl mr-3">🎯</span> 프로젝트 개요
            </h2>
            <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-500">
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>나만의 언어 생성기</strong>는 사용자가 직접 언어 변환 규칙을 정의하여 일반 텍스트를 암호화하거나 복호화할 수 있는 웹 기반 도구입니다.
                간단한 문자 치환부터 알파벳 랜덤 암호화까지 다양한 규칙을 지원하여, 개인적인 메시지 교환이나 창의적인 언어 놀이를 즐길 수 있습니다.
              </p>
              <p className="text-gray-700 leading-relaxed">
                이 프로젝트는 단순한 암호화 도구를 넘어, 사용자가 자신만의 비밀 언어를 창조하고 커뮤니티와 공유할 수 있는 플랫폼을 목표로 합니다.
                직관적인 인터페이스와 강력한 기능으로 누구나 쉽게 사용할 수 있도록 설계되었습니다.
              </p>
            </div>
          </section>

          {/* 주요 기능 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="text-3xl mr-3">✨</span> 주요 기능
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                <h3 className="font-semibold text-purple-800 mb-3">🔧 커스텀 규칙 생성</h3>
                <p className="text-gray-700 text-sm">
                  사용자가 직접 문자 치환 규칙을 설정하고 관리할 수 있습니다. 간단한 규칙부터 복잡한 패턴까지 자유롭게 정의 가능합니다.
                </p>
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
                <h3 className="font-semibold text-blue-800 mb-3">⚡ 실시간 변환</h3>
                <p className="text-gray-700 text-sm">
                  입력된 텍스트에 설정된 규칙을 즉시 적용하여 암호화/복호화 결과를 실시간으로 확인할 수 있습니다.
                </p>
              </div>
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                <h3 className="font-semibold text-green-800 mb-3">🎲 랜덤 언어 생성</h3>
                <p className="text-gray-700 text-sm">
                  알파벳 기반의 랜덤 암호화 규칙을 자동으로 생성하여 새로운 언어를 쉽게 만들 수 있습니다.
                </p>
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-6 border border-orange-200">
                <h3 className="font-semibold text-orange-800 mb-3">📱 반응형 디자인</h3>
                <p className="text-gray-700 text-sm">
                  모바일과 데스크톱 환경에서 모두 최적화된 사용자 경험을 제공합니다. PWA 지원으로 앱처럼 설치도 가능합니다.
                </p>
              </div>
            </div>
          </section>

          {/* 기술 스택 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="text-3xl mr-3">🛠️</span> 기술 스택
            </h2>
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Frontend</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      Next.js 15 (React 18)
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-cyan-500 rounded-full mr-2"></span>
                      Tailwind CSS
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                      Framer Motion
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Features</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      PWA (Progressive Web App)
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                      반응형 디자인
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-pink-500 rounded-full mr-2"></span>
                      SEO 최적화
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Deployment</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                      Vercel
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                      Google AdSense
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                      Search Console
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* 활용 사례 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="text-3xl mr-3">🚀</span> 활용 사례
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">💌</span>
                <div>
                  <h3 className="font-semibold text-gray-800">개인 비밀 메시지</h3>
                  <p className="text-sm text-gray-600">친구와만 아는 비밀 언어로 메시지를 교환하세요</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-2xl">📚</span>
                <div>
                  <h3 className="font-semibold text-gray-800">언어 학습 도구</h3>
                  <p className="text-sm text-gray-600">새로운 언어의 구조를 이해하는 교육용 도구로 활용</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-2xl">🎮</span>
                <div>
                  <h3 className="font-semibold text-gray-800">창의적 놀이</h3>
                  <p className="text-sm text-gray-600">팀 내부 이벤트나 게임에 활용할 수 있는 코드 생성</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-2xl">🔐</span>
                <div>
                  <h3 className="font-semibold text-gray-800">보안 교육</h3>
                  <p className="text-sm text-gray-600">암호화 원리를 배우는 교육용 플랫폼</p>
                </div>
              </div>
            </div>
          </section>

          {/* 개발 과정 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="text-3xl mr-3">💡</span> 개발 과정
            </h2>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="font-semibold text-gray-800 mb-2">1단계: 기획 및 설계</h3>
                <p className="text-gray-600 text-sm">
                  사용자 중심의 직관적인 인터페이스 설계와 핵심 기능 정의
                </p>
              </div>
              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="font-semibold text-gray-800 mb-2">2단계: 핵심 기능 개발</h3>
                <p className="text-gray-600 text-sm">
                  언어 변환 엔진 구현과 실시간 처리 시스템 개발
                </p>
              </div>
              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="font-semibold text-gray-800 mb-2">3단계: UI/UX 개선</h3>
                <p className="text-gray-600 text-sm">
                  반응형 디자인 적용과 사용자 피드백 기반 개선
                </p>
              </div>
              <div className="border-l-4 border-orange-500 pl-6">
                <h3 className="font-semibold text-gray-800 mb-2">4단계: 최적화 및 배포</h3>
                <p className="text-gray-600 text-sm">
                  성능 최적화와 SEO 적용, PWA 기능 추가
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-4">지금 바로 시작해보세요!</h2>
              <p className="mb-6">나만의 특별한 언어를 만들고 친구들과 공유해보세요</p>
              <div className="space-x-4">
                <Link 
                  href="/" 
                  className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  🏠 메인으로 돌아가기
                </Link>
                <Link 
                  href="/guide" 
                  className="inline-block bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                >
                  📖 사용법 보기
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
