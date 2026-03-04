import { Metadata } from 'next';
import Link from 'next/link';

export const metadata = {
  title: '사용법 - 나만의 언어 생성기',
  description: '나만의 언어 생성기 사용법, 예시, 팁 안내',
  openGraph: {
    title: '사용법 - 나만의 언어 생성기',
    description: '자세한 사용법과 예시, 활용 팁',
    url: 'https://lanage-convert.vercel.app/guide',
  },
};

export default function GuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* 헤더 */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              📖 사용법 가이드
            </h1>
            <p className="text-lg text-gray-600">
              나만의 언어 생성기를 쉽고 효과적으로 사용하는 방법
            </p>
          </div>

          {/* 빠른 시작 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="text-3xl mr-3">🚀</span> 빠른 시작
            </h2>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border-l-4 border-blue-500">
              <ol className="space-y-4">
                <li className="flex items-start">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-1">1</span>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">원본 텍스트 입력</h3>
                    <p className="text-gray-600 text-sm">왼쪽 텍스트 상자에 변환하고 싶은 문장을 입력하세요</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-1">2</span>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">변환 규칙 설정</h3>
                    <p className="text-gray-600 text-sm">아래 규칙 테이블에서 문자 치환 규칙을 추가하세요</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-1">3</span>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">암호화 실행</h3>
                    <p className="text-gray-600 text-sm">"🔐 암호화" 버튼을 클릭하여 변환 결과를 확인하세요</p>
                  </div>
                </li>
              </ol>
            </div>
          </section>

          {/* 상세 사용법 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="text-3xl mr-3">📋</span> 상세 사용법
            </h2>
            
            {/* 규칙 생성 */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">규칙 생성하기</h3>
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-3">수동 규칙 추가</h4>
                    <ol className="space-y-2 text-sm text-gray-600">
                      <li>1. "➕ 규칙 추가" 버튼 클릭</li>
                      <li>2. "원래 문자열"에 변환 전 문자 입력 (예: "가")</li>
                      <li>3. "변환 문자열"에 변환 후 문자 입력 (예: "BA")</li>
                      <li>4. 여러 규칙을 추가하여 복잡한 언어 생성</li>
                    </ol>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-3">자동 랜덤 생성</h4>
                    <ol className="space-y-2 text-sm text-gray-600">
                      <li>1. "🎲 알파벳 랜덤 언어 생성" 버튼 클릭</li>
                      <li>2. 자동으로 26개 알파벳 규칙 생성</li>
                      <li>3. 각 알파벳이 랜덤하게 다른 알파벳으로 매핑</li>
                      <li>4. 기존 규칙은 모두 삭제되고 새 규칙으로 교체</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            {/* 암호화/복호화 */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">암호화와 복호화</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-3 flex items-center">
                    <span className="mr-2">🔐</span> 암호화 (Encode)
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• 원본 텍스트를 설정된 규칙에 따라 변환</li>
                    <li>• 위에서 아래 순서로 규칙 적용</li>
                    <li>• 일반 문장 → 비밀 언어로 변환</li>
                    <li>• 결과는 오른쪽 텍스트 상자에 표시</li>
                  </ul>
                </div>
                <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                  <h4 className="font-semibold text-purple-800 mb-3 flex items-center">
                    <span className="mr-2">🔓</span> 복호화 (Decode)
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• 암호화된 텍스트를 원본으로 복원</li>
                    <li>• 아래에서 위 순서로 규칙 적용 (역순)</li>
                    <li>• 비밀 언어 → 일반 문장으로 복원</li>
                    <li>• 정확한 규칙이 필요함</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 추가 기능 */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">유용한 기능들</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4 bg-yellow-50 rounded-lg p-4">
                  <span className="text-2xl">📋</span>
                  <div>
                    <h4 className="font-semibold text-gray-800">결과 복사</h4>
                    <p className="text-sm text-gray-600">변환된 결과를 클립보드에 복사하여 다른 곳에 붙여넣기</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 bg-orange-50 rounded-lg p-4">
                  <span className="text-2xl">🔁</span>
                  <div>
                    <h4 className="font-semibold text-gray-800">입력 & 결과 바꾸기</h4>
                    <p className="text-sm text-gray-600">원본과 결과 텍스트의 위치를 서로 교환</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 bg-red-50 rounded-lg p-4">
                  <span className="text-2xl">🧹</span>
                  <div>
                    <h4 className="font-semibold text-gray-800">모든 규칙 삭제</h4>
                    <p className="text-sm text-gray-600">설정된 모든 규칙을 한 번에 삭제하고 새로 시작</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 사용 예시 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="text-3xl mr-3">💡</span> 사용 예시
            </h2>
            
            <div className="space-y-6">
              {/* 예시 1 */}
              <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl p-6 border border-pink-200">
                <h3 className="font-semibold text-pink-800 mb-3">예시 1: 간단한 비밀 코드</h3>
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-3">
                    <p className="text-sm font-semibold text-gray-700 mb-2">규칙 설정:</p>
                    <div className="text-xs space-y-1">
                      <div>사랑 → 💖</div>
                      <div>행복 → 😊</div>
                      <div>친구 → 🤝</div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <p className="text-sm font-semibold text-gray-700 mb-1">원본:</p>
                    <p className="text-sm text-gray-600">"나는 너를 사랑하고, 우리는 행복한 친구입니다."</p>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <p className="text-sm font-semibold text-gray-700 mb-1">결과:</p>
                    <p className="text-sm text-gray-600">"나는 너를 💖하고, 우리는 😊한 🤝입니다."</p>
                  </div>
                </div>
              </div>

              {/* 예시 2 */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                <h3 className="font-semibold text-blue-800 mb-3">예시 2: 알파벳 암호</h3>
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-3">
                    <p className="text-sm font-semibold text-gray-700 mb-2">규칙 설정 (일부):</p>
                    <div className="text-xs space-y-1">
                      <div>A → Z</div>
                      <div>B → Y</div>
                      <div>C → X</div>
                      <div>...</div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <p className="text-sm font-semibold text-gray-700 mb-1">원본:</p>
                    <p className="text-sm text-gray-600">"HELLO WORLD"</p>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <p className="text-sm font-semibold text-gray-700 mb-1">결과:</p>
                    <p className="text-sm text-gray-600">"SVOOL DLIOW"</p>
                  </div>
                </div>
              </div>

              {/* 예시 3 */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                <h3 className="font-semibold text-green-800 mb-3">예시 3: 한글 변환</h3>
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-3">
                    <p className="text-sm font-semibold text-gray-700 mb-2">규칙 설정:</p>
                    <div className="text-xs space-y-1">
                      <div>안녕 → ㅇㄴ</div>
                      <div>하세요 → ㅎㅅㅇ</div>
                      <div>! → !!!</div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <p className="text-sm font-semibold text-gray-700 mb-1">원본:</p>
                    <p className="text-sm text-gray-600">"안녕하세요!"</p>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <p className="text-sm font-semibold text-gray-700 mb-1">결과:</p>
                    <p className="text-sm text-gray-600">"ㅇㄴㅎㅅㅇ!!!"</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 팁과 노하우 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="text-3xl mr-3">⭐</span> 팁과 노하우
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
                <h3 className="font-semibold text-purple-800 mb-4">효율적인 규칙 설계</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <span>긴 단어 규칙을 위에 배치하여 예상치 못한 치환 방지</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <span>비슷한 문자 그룹으로 규칙을 묶어 관리하기 쉽게</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <span>복호화를 위해 규칙 목록을 저장해두기</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6">
                <h3 className="font-semibold text-blue-800 mb-4">활용 팁</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>이모지를 활용하여 시각적인 비밀 코드 만들기</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>팀원들과 규칙을 공유하여 그룹 암호 사용</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>랜덤 생성으로 예측 불가능한 암호 만들기</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* 주의사항 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="text-3xl mr-3">⚠️</span> 주의사항
            </h2>
            <div className="bg-red-50 rounded-xl p-6 border border-red-200">
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>복호화 시 정확한 규칙이 필요하므로 규칙을 잘 보관하세요</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>중요한 정보는 실제 암호화 도구를 사용하세요</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>규칙이 많을수록 처리 시간이 길어질 수 있습니다</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>특수문자는 규칙에 따라 정확히 입력해야 합니다</span>
                </li>
              </ul>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center">
            <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-4">이제 직접 만들어볼까요?</h2>
              <p className="mb-6">배운 내용을 바탕으로 나만의 특별한 언어를 만들어보세요</p>
              <div className="space-x-4">
                <Link 
                  href="/" 
                  className="inline-block bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  🏠 언어 생성기 시작
                </Link>
                <Link 
                  href="/faq" 
                  className="inline-block bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors"
                >
                  ❓ 더 궁금한 점
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
