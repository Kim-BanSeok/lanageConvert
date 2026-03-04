import { Metadata } from 'next';
import Link from 'next/link';

export const metadata = {
  title: '개인정보처리방침 - 나만의 언어 생성기',
  description: '개인정보처리방침 및 수집 정보 안내',
  openGraph: {
    title: '개인정보처리방침 - 나만의 언어 생성기',
    description: '개인정보 보호 정책',
    url: 'https://lanage-convert.vercel.app/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* 헤더 */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              🔒 개인정보처리방침
            </h1>
            <p className="text-lg text-gray-600">
              사용자의 개인정보를 소중히 다루는 정책
            </p>
            <p className="text-sm text-gray-500 mt-2">
              최종 업데이트: 2024년 3월 5일
            </p>
          </div>

          {/* 기본 원칙 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="text-3xl mr-3">🎯</span> 기본 원칙
            </h2>
            <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-500">
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>나만의 언어 생성기</strong>는 사용자의 개인정보를 최우선으로 보호합니다. 
                모든 데이터 처리는 사용자의 동의를 기반으로 하며, 관련 법규를 준수합니다.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>모든 암호화/복호화 작업은 사용자의 브라우저에서만 처리됩니다</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>입력한 텍스트나 규칙이 외부 서버로 전송되지 않습니다</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>최소한의 정보만 수집하며, 명확한 목적만을 위해 사용합니다</span>
                </li>
              </ul>
            </div>
          </section>

          {/* 수집하는 정보 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="text-3xl mr-3">📊</span> 수집하는 정보
            </h2>
            
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-800 mb-3">자동 수집 정보</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="text-gray-500 mr-2">•</span>
                    <div>
                      <strong>서비스 이용 기록:</strong> 사이트 접속 시간, 페이지 조회 수, 브라우저 정보
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-500 mr-2">•</span>
                    <div>
                      <strong>기술 정보:</strong> IP 주소, 브라우저 종류, 운영체제, 디바이스 정보
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-500 mr-2">•</span>
                    <div>
                      <strong>쿠키 정보:</strong> 사이트 기능 개선을 위한 최소한의 쿠키 사용
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-yellow-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-800 mb-3">수집하지 않는 정보</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="text-yellow-600 mr-2">✓</span>
                    <span>입력한 텍스트 내용 (암호화/복호화 대상)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-600 mr-2">✓</span>
                    <span>생성한 언어 변환 규칙</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-600 mr-2">✓</span>
                    <span>개인 식별 정보 (이름, 이메일, 전화번호 등)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-600 mr-2">✓</span>
                    <span>위치 정보</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* 정보 사용 목적 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="text-3xl mr-3">🎯</span> 정보 사용 목적
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                <h3 className="font-semibold text-green-800 mb-3">허용된 목적</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>서비스 개선 및 최적화</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>기술적 문제 해결</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>통계 분석 (익명화된 데이터)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>법적 의무 준수</span>
                  </li>
                </ul>
              </div>
              <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                <h3 className="font-semibold text-red-800 mb-3">금지된 목적</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">✗</span>
                    <span>개인 식별 및 추적</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">✗</span>
                    <span>마케팅 및 광고 타겟팅</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">✗</span>
                    <span>제3자에게의 정보 판매</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">✗</span>
                    <span>사용자 동의 없는 목적 변경</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* 정보 보관 및 파기 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="text-3xl mr-3">⏰</span> 정보 보관 및 파기
            </h2>
            <div className="bg-purple-50 rounded-xl p-6">
              <h3 className="font-semibold text-purple-800 mb-3">보관 기간</h3>
              <ul className="space-y-2 text-sm text-gray-700 mb-4">
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span><strong>서비스 이용 기록:</strong> 최대 12개월 (통계 목적)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span><strong>기술 정보:</strong> 최대 6개월 (기술 지원 목적)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span><strong>쿠키 정보:</strong> 최대 30일 (사이트 기능 개선)</span>
                </li>
              </ul>
              
              <h3 className="font-semibold text-purple-800 mb-3">파기 절차</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>보관 기간 종료 시 자동 파기</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>서비스 종료 시 모든 데이터 즉시 파기</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>사용자 요청 시 즉시 파기 (해당 정보에 한함)</span>
                </li>
              </ul>
            </div>
          </section>

          {/* 제3자 제공 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="text-3xl mr-3">🔗</span> 제3자 제공
            </h2>
            <div className="bg-orange-50 rounded-xl p-6 border-l-4 border-orange-500">
              <p className="text-gray-700 leading-relaxed mb-4">
                원칙적으로 사용자의 개인정보를 제3자에게 제공하지 않습니다. 
                다만, 아래의 경우에는 예외적으로 제공될 수 있습니다:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <span><strong>법적 요구:</strong> 법원, 수사기관 등 법적 절차에 따른 요구</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <span><strong>서비스 제공:</strong> 호스팅, CDN 등 필수적인 서비스 제공업체</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <span><strong>사용자 동의:</strong> 명시적인 동의를 얻은 경우</span>
                </li>
              </ul>
            </div>
          </section>

          {/* 사용자 권리 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="text-3xl mr-3">👤</span> 사용자 권리
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="font-semibold text-blue-800 mb-3">보장되는 권리</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>자신의 정보에 대한 접근권</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>정보 정정 및 삭제 요청권</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>처리 중지 요청권</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>동의 철회권</span>
                  </li>
                </ul>
              </div>
              <div className="bg-indigo-50 rounded-xl p-6">
                <h3 className="font-semibold text-indigo-800 mb-3">권리 행사 방법</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="text-indigo-600 mr-2">1</span>
                    <span>이메일 또는 문의 폼으로 요청</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-600 mr-2">2</span>
                    <span>신원 확인 절차 진행</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-600 mr-2">3</span>
                    <span>10일 이내 처리 및 통보</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-600 mr-2">4</span>
                    <span>이의가 있을 경우 재검토</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* 보안 조치 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="text-3xl mr-3">🛡️</span> 보안 조치
            </h2>
            <div className="bg-red-50 rounded-xl p-6">
              <h3 className="font-semibold text-red-800 mb-3">기술적 조치</h3>
              <ul className="space-y-2 text-sm text-gray-700 mb-4">
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span>SSL/TLS 암호화 통신</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span>정기적인 보안 패치 및 업데이트</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span>접근 제어 및 인증 시스템</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span>클라이언트 측 처리 (데이터 서버 전송 방지)</span>
                </li>
              </ul>
              
              <h3 className="font-semibold text-red-800 mb-3">관리적 조치</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span>개인정보 보호 교육</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span>정기적인 보안 감사</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span>정보 유출 시 즉시 대응 절차</span>
                </li>
              </ul>
            </div>
          </section>

          {/* 정책 변경 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="text-3xl mr-3">🔄</span> 정책 변경
            </h2>
            <div className="bg-gray-50 rounded-xl p-6">
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-gray-600 mr-2">•</span>
                  <span>정책 변경 시 사이트에 공지합니다</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-600 mr-2">•</span>
                  <span>중요한 변경은 30일 전에 미리 알립니다</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-600 mr-2">•</span>
                  <span>변경된 정책은 즉시 효력을 발휘합니다</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-600 mr-2">•</span>
                  <span>계속 사용 시 변경된 정책에 동의하는 것으로 간주합니다</span>
                </li>
              </ul>
            </div>
          </section>

          {/* 연락처 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="text-3xl mr-3">📞</span> 문의 및 연락처
            </h2>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
              <p className="text-gray-700 mb-4">
                개인정보처리방침에 대한 궁금한 점이나 문의사항이 있으시면 아래로 연락해주세요:
              </p>
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>이메일:</strong> privacy@example.com</p>
                <p><strong>문의 폼:</strong> 사이트 내 문의하기 기능</p>
                <p><strong>GitHub:</strong> 프로젝트 저장소 이슈 등록</p>
                <p><strong>처리 기간:</strong> 접수 후 10일 이내</p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center">
            <div className="bg-gradient-to-r from-gray-600 to-gray-800 rounded-xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-4">개인정보 보호를 약속드립니다</h2>
              <p className="mb-6">사용자의 신뢰를 가장 소중하게 생각합니다</p>
              <div className="space-x-4">
                <Link 
                  href="/" 
                  className="inline-block bg-white text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  🏠 메인으로
                </Link>
                <Link 
                  href="/terms" 
                  className="inline-block bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-800 transition-colors"
                >
                  📋 이용약관
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
