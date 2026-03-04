import { Metadata } from 'next';
import Link from 'next/link';

export const metadata = {
  title: '이용약관 - 나만의 언어 생성기',
  description: '서비스 이용약관 및 규정',
  openGraph: {
    title: '이용약관 - 나만의 언어 생성기',
    description: '서비스 이용 약관',
    url: 'https://lanage-convert.vercel.app/terms',
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* 헤더 */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              📋 이용약관
            </h1>
            <p className="text-lg text-gray-600">
              나만의 언어 생성기 서비스 이용에 대한 규정
            </p>
            <p className="text-sm text-gray-500 mt-2">
              최종 업데이트: 2024년 3월 5일
            </p>
          </div>

          {/* 약관 개요 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="text-3xl mr-3">📝</span> 약관 개요
            </h2>
            <div className="bg-indigo-50 rounded-xl p-6 border-l-4 border-indigo-500">
              <p className="text-gray-700 leading-relaxed mb-4">
                본 이용약관은 <strong>나만의 언어 생성기</strong> 서비스(이하 "서비스")의 
                이용 조건과 사용자의 권리, 의무를 규정합니다. 서비스를 이용함으로써 
                사용자는 본 약관에 동의하는 것으로 간주됩니다.
              </p>
              <p className="text-gray-700 leading-relaxed">
                본 서비스는 무료로 제공되며, 개인정보 보호와 안전한 사용을 위해 
                아래의 약관을 준수해야 합니다.
              </p>
            </div>
          </section>

          {/* 제1조: 용어 정의 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="text-3xl mr-3">📖</span> 제1조: 용어 정의
            </h2>
            <div className="bg-gray-50 rounded-xl p-6">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="font-semibold mr-2">1.</span>
                  <div>
                    <strong>서비스:</strong> 나만의 언어 생성기 웹 애플리케이션 및 관련 기능 전체
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold mr-2">2.</span>
                  <div>
                    <strong>사용자:</strong> 본 서비스에 접속하여 이용하는 모든 개인 및 단체
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold mr-2">3.</span>
                  <div>
                    <strong>콘텐츠:</strong> 사용자가 입력하는 텍스트, 생성하는 규칙, 변환 결과 등
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold mr-2">4.</span>
                  <div>
                    <strong>규칙:</strong> 사용자가 정의하는 문자 변환 및 치환 규칙
                  </div>
                </li>
              </ul>
            </div>
          </section>

          {/* 제2조: 서비스 제공 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="text-3xl mr-3">🚀</span> 제2조: 서비스 제공
            </h2>
            <div className="space-y-6">
              <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                <h3 className="font-semibold text-green-800 mb-3">제공되는 서비스</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span>텍스트 암호화 및 복호화 기능</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span>커스텀 언어 규칙 생성 및 관리</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span>랜덤 언어 자동 생성 기능</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span>결과 복사 및 관리 기능</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span>PWA를 통한 앱 설치 기능</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
                <h3 className="font-semibold text-yellow-800 mb-3">서비스 특징</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="text-yellow-600 mr-2">•</span>
                    <span>완전 무료 서비스</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-600 mr-2">•</span>
                    <span>회원가입 불필요</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-600 mr-2">•</span>
                    <span>클라이언트 측 처리 (데이터 보안)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-600 mr-2">•</span>
                    <span>광고 포함 (서비스 유지 목적)</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* 제3조: 사용자 의무 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="text-3xl mr-3">👤</span> 제3조: 사용자 의무
            </h2>
            <div className="bg-red-50 rounded-xl p-6 border-l-4 border-red-500">
              <h3 className="font-semibold text-red-800 mb-3">금지되는 행위</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✗</span>
                  <span>불법적이거나 유해한 콘텐츠 생성 및 유포</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✗</span>
                  <span>타인의 권리 침해하는 내용 입력</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✗</span>
                  <span>서비스의 정상적인 운영 방해 행위</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✗</span>
                  <span>악성 코드, 바이러스 등 유포</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✗</span>
                  <span>상업적 목적의 대규모 자동화 사용</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✗</span>
                  <span>서비스 보안 시스템 무단 접근 또는 해킹</span>
                </li>
              </ul>
            </div>
          </section>

          {/* 제4조: 지적재산권 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="text-3xl mr-3">©️</span> 제4조: 지적재산권
            </h2>
            <div className="bg-purple-50 rounded-xl p-6">
              <h3 className="font-semibold text-purple-800 mb-3">권리 귀속</h3>
              <ul className="space-y-2 text-sm text-gray-700 mb-4">
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>서비스의 모든 소프트웨어, 디자인, 기술은 개발자에게 귀속</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>사용자가 생성한 콘텐츠의 저작권은 사용자에게 귀속</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>서비스 개선을 위해 사용 데이터를 통계적으로 활용할 수 있음</span>
                </li>
              </ul>
              
              <h3 className="font-semibold text-purple-800 mb-3">허용되는 사용</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">✓</span>
                  <span>개인적, 비상업적 목적의 서비스 이용</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">✓</span>
                  <span>교육 및 학습 목적의 활용</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">✓</span>
                  <span>서비스 기능에 대한 피드백 제공</span>
                </li>
              </ul>
            </div>
          </section>

          {/* 제5조: 서비스 이용 제한 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="text-3xl mr-3">⚠️</span> 제5조: 서비스 이용 제한
            </h2>
            <div className="bg-orange-50 rounded-xl p-6 border-l-4 border-orange-500">
              <h3 className="font-semibold text-orange-800 mb-3">이용 제한 사유</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span>본 약관 위반 시</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span>서비스 운영에 방해가 되는 행위 시</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span>법적 문제 발생 시</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span>기술적 문제나 서비스 개선 필요 시</span>
                </li>
              </ul>
              
              <h3 className="font-semibold text-orange-800 mb-3 mt-4">제한 조치</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span>서비스 이용 일시적 중단</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span>특정 기능 사용 제한</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span>영구적인 서비스 이용 거부 (심각한 위반 시)</span>
                </li>
              </ul>
            </div>
          </section>

          {/* 제6조: 면책 조항 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="text-3xl mr-3">🛡️</span> 제6조: 면책 조항
            </h2>
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-800 mb-3">서비스 제공자의 책임 한계</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-gray-600 mr-2">•</span>
                  <span>서비스는 "있는 그대로" 제공되며, 완벽함을 보장하지 않음</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-600 mr-2">•</span>
                  <span>사용자가 생성한 콘텐츠에 대한 책임은 사용자에게 있음</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-600 mr-2">•</span>
                  <span>서비스 이용으로 발생한 간접적 손해는 책임지지 않음</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-600 mr-2">•</span>
                  <span>기술적 문제로 서비스 중단 시 최선의 복구 노력을 다하나, 손해배상 책임은 제한됨</span>
                </li>
              </ul>
              
              <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-sm text-yellow-800">
                  <strong>중요:</strong> 본 서비스는 교육 및 엔터테인먼트 목적으로 제공됩니다. 
                  실제 중요한 정보의 암호화에는 전문적인 보안 도구를 사용하시기 바랍니다.
                </p>
              </div>
            </div>
          </section>

          {/* 제7조: 약관 변경 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="text-3xl mr-3">🔄</span> 제7조: 약관 변경
            </h2>
            <div className="bg-blue-50 rounded-xl p-6">
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>약관 변경 필요 시 사이트에 공지합니다</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>중요한 변경은 7일 전에 미리 알립니다</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>변경된 약관은 공지 즉시 효력 발휘</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>계속 서비스 이용 시 변경 약관에 동의한 것으로 간주</span>
                </li>
              </ul>
            </div>
          </section>

          {/* 제8조: 분쟁 해결 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="text-3xl mr-3">⚖️</span> 제8조: 분쟁 해결
            </h2>
            <div className="bg-indigo-50 rounded-xl p-6">
              <h3 className="font-semibold text-indigo-800 mb-3">분쟁 해결 절차</h3>
              <ol className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="font-semibold mr-2">1.</span>
                  <span>당사자 간의 원만한 협의 시도</span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold mr-2">2.</span>
                  <span>협의가 불가능할 경우 대한민국 법률에 따름</span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold mr-2">3.</span>
                  <span>관할 법원: 서울중앙지방법원</span>
                </li>
              </ol>
              
              <h3 className="font-semibold text-indigo-800 mb-3 mt-4">준거법</h3>
              <p className="text-sm text-gray-700">
                본 약관은 대한민국 법률에 따라 해석 및 적용됩니다.
              </p>
            </div>
          </section>

          {/* 연락처 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="text-3xl mr-3">📞</span> 문의 및 연락처
            </h2>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
              <p className="text-gray-700 mb-4">
                이용약관에 대한 문의사항이 있으시면 아래로 연락해주세요:
              </p>
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>이메일:</strong> terms@example.com</p>
                <p><strong>문의 폼:</strong> 사이트 내 문의하기 기능</p>
                <p><strong>GitHub:</strong> 프로젝트 저장소 이슈 등록</p>
              </div>
            </div>
          </section>

          {/* 약관 동의 */}
          <section className="text-center">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-4">약관에 동의해주세요</h2>
              <p className="mb-6">
                서비스를 이용하시면 본 약관을 읽고 동의하는 것으로 간주됩니다
              </p>
              <div className="space-x-4">
                <Link 
                  href="/" 
                  className="inline-block bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  🏠 메인으로
                </Link>
                <Link 
                  href="/privacy" 
                  className="inline-block bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors"
                >
                  🔒 개인정보처리방침
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
