'use client';

import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* 헤더 */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              📧 연락 정보
            </h1>
            <p className="text-lg text-gray-600">
              궁금한 점이나 문의사항을 아래 방법으로 연락해주세요
            </p>
          </div>

          {/* 연락 방법 */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <div className="text-4xl mb-3">📧</div>
              <h3 className="font-semibold text-gray-800 mb-2">이메일</h3>
              <p className="text-sm text-gray-600">
                contact@example.com
              </p>
            </div>
            
            <div className="text-center p-6 bg-green-50 rounded-xl">
              <div className="text-4xl mb-3">🐙</div>
              <h3 className="font-semibold text-gray-800 mb-2">GitHub</h3>
              <p className="text-sm text-gray-600">
                버그 리포트 및 기능 요청
              </p>
            </div>
            
            <div className="text-center p-6 bg-purple-50 rounded-xl">
              <div className="text-4xl mb-3">💬</div>
              <h3 className="font-semibold text-gray-800 mb-2">Discussions</h3>
              <p className="text-sm text-gray-600">
                커뮤니티와 소통
              </p>
            </div>
          </div>

          {/* 안내 메시지 */}
          <div className="bg-blue-50 rounded-xl p-6 mb-12">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                💡 먼저 FAQ를 확인해보세요!
              </h3>
              <p className="text-gray-600 mb-4">
                궁금한 점이 이미 FAQ에 답변이 되어 있을 수 있습니다.
                먼저 FAQ를 확인하시면 더 빠른 해결을 얻을 수 있습니다.
              </p>
              <Link 
                href="/faq"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                FAQ 보기
              </Link>
            </div>
          </div>

          {/* 빠른 링크 */}
          <div className="text-center">
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link href="/" className="text-blue-600 hover:text-blue-800 underline">
                🏠 메인으로
              </Link>
              <Link href="/about" className="text-blue-600 hover:text-blue-800 underline">
                📋 소개 보기
              </Link>
              <Link href="/guide" className="text-blue-600 hover:text-blue-800 underline">
                📖 사용법 보기
              </Link>
              <Link href="/faq" className="text-blue-600 hover:text-blue-800 underline">
                ❓ FAQ 보기
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
