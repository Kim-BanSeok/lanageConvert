'use client';

import Link from 'next/link';
import { useState } from 'react';

// metadata는 별도로 처리하거나 layout.js에서 관리

const FAQItem = ({ question, answer, category }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors flex items-center justify-between"
      >
        <div className="flex items-center space-x-3">
          <span className="text-sm font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded">
            {category}
          </span>
          <span className="font-medium text-gray-800">{question}</span>
        </div>
        <span className="text-gray-400 text-xl">
          {isOpen ? '−' : '+'}
        </span>
      </button>
      {isOpen && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <p className="text-gray-700 whitespace-pre-line">{answer}</p>
        </div>
      )}
    </div>
  );
};

export default function FAQPage() {
  const faqData = [
    {
      category: "기본",
      question: "나만의 언어 생성기는 어떤 도구인가요?",
      answer: "나만의 언어 생성기는 사용자가 직접 언어 변환 규칙을 정의하여 일반 텍스트를 암호화하거나 복호화할 수 있는 웹 기반 도구입니다. 간단한 문자 치환부터 복잡한 패턴 매칭까지 다양한 규칙을 지원합니다."
    },
    {
      category: "기본",
      question: "이 도구는 무료인가요?",
      answer: "네, 나만의 언어 생성기는 완전히 무료로 사용할 수 있습니다. 별도의 회원가입이나 결제 과정 없이 바로 사용하실 수 있습니다."
    },
    {
      category: "기본",
      question: "인터넷 연결이 필요한가요?",
      answer: "처음 사이트에 접속할 때는 인터넷 연결이 필요하지만, 한번 로드되면 기본적인 암호화/복호화 기능은 오프라인에서도 작동합니다. PWA 기능을 지원하여 앱처럼 설치해서 사용할 수도 있습니다."
    },
    {
      category: "사용법",
      question: "규칙은 어떻게 추가하나요?",
      answer: "규칙 테이블에서 '➕ 규칙 추가' 버튼을 클릭하여 새 규칙을 추가할 수 있습니다. '원래 문자열'에는 변환 전 문자를, '변환 문자열'에는 변환 후 문자를 입력하세요."
    },
    {
      category: "사용법",
      question: "랜덤 언어 생성은 어떻게 작동하나요?",
      answer: "'🎲 알파벳 랜덤 언어 생성' 버튼을 클릭하면 26개 알파벳이 무작위로 섞인 규칙이 자동으로 생성됩니다. 이는 예측 불가능한 암호를 만들 때 유용합니다."
    },
    {
      category: "사용법",
      question: "복호화가 제대로 안 되는데요?",
      answer: "복호화를 위해서는 암호화할 때 사용했던 규칙과 정확히 동일한 규칙이 필요합니다. 규칙의 순서나 내용이 다르면 복호화가 제대로 되지 않을 수 있습니다."
    },
    {
      category: "사용법",
      question: "규칙은 몇 개까지 추가할 수 있나요?",
      answer: "기술적으로는 무제한으로 추가할 수 있지만, 너무 많은 규칙은 처리 속도를 느리게 할 수 있습니다. 일반적으로 50개 이하의 규칙을 권장합니다."
    },
    {
      category: "기능",
      question: "한글도 지원하나요?",
      answer: "네, 한글을 포함한 모든 유니코드 문자를 지원합니다. 한글, 영문, 특수문자, 이모지 등 어떤 문자든 규칙으로 설정할 수 있습니다."
    },
    {
      category: "기능",
      question: "결과를 저장할 수 있나요?",
      answer: "현재는 자동 저장 기능을 제공하지 않습니다. '📋 결과 복사' 버튼을 사용하여 클립보드에 복사한 후, 별도의 메모장이나 문서에 저장해주세요."
    },
    {
      category: "기능",
      question: "모바일에서도 사용할 수 있나요?",
      answer: "네, 반응형 디자인으로 모바일과 태블릿에서도 완벽하게 작동합니다. PWA 기능을 지원하여 홈 화면에 추가하면 앱처럼 사용할 수도 있습니다."
    },
    {
      category: "기능",
      question: "여러 사람이 같은 규칙을 공유할 수 있나요?",
      answer: "현재는 규칙 공유 기능을 제공하지 않지만, 규칙 목록을 수동으로 복사하여 공유할 수는 있습니다. 향후 규칙 공유 기능을 추가할 예정입니다."
    },
    {
      category: "기술",
      question: "어떤 기술로 만들어졌나요?",
      answer: "Next.js, React, Tailwind CSS를 사용하여 만들어졌습니다. 프로그레시브 웹 앱(PWA) 기능을 지원하며, Vercel에서 호스팅되고 있습니다."
    },
    {
      category: "기술",
      question: "데이터가 서버로 전송되나요?",
      answer: "아니요, 모든 암호화/복호화 작업은 사용자의 브라우저에서만 이루어집니다. 입력한 텍스트나 규칙이 외부 서버로 전송되지 않으므로 개인정보가 안전합니다."
    },
    {
      category: "보안",
      question: "이 도구로 암호화된 정보는 안전한가요?",
      answer: "이 도구는 교육용 및 엔터테인먼트용으로 만들어졌습니다. 실제 중요한 정보나 민감한 데이터의 암호화에는 전문적인 암호화 도구를 사용하시기 바랍니다."
    },
    {
      category: "보안",
      question: "만든 규칙이 다른 사람에게 노출될 수 있나요?",
      answer: "모든 작업이 로컬 브라우저에서 이루어지므로 규칙이 외부로 노출되지 않습니다. 하지만 공용 컴퓨터에서 사용할 때는 개인정보 보호를 위해 브라우저를 종료하는 것이 좋습니다."
    },
    {
      category: "문제해결",
      question: "암호화 결과가 이상하게 나와요",
      answer: "규칙의 순서가 결과에 영향을 줄 수 있습니다. 위에 있는 규칙이 먼저 적용되므로, 긴 단어 규칙을 위에 배치하고 짧은 문자 규칙을 아래에 배치해보세요."
    },
    {
      category: "문제해결",
      question: "사이트가 느리게 로드되는데요",
      answer: "인터넷 연결 상태를 확인하거나 브라우저 캐시를 삭제해보세요. 최신 브라우저를 사용하시면 더 나은 성능을 경험할 수 있습니다."
    },
    {
      category: "문제해결",
      question: "복사 기능이 작동하지 않아요",
      answer: "복사 기능은 브라우저의 클립보드 접근 권한이 필요합니다. 브라우저 설정에서 클립보드 접근을 허용해주세요. 일부 보안 설정이 엄격한 환경에서는 작동하지 않을 수 있습니다."
    },
    {
      category: "활용",
      question: "어떤 상황에서 사용하면 좋을까요?",
      answer: "친구와 비밀 메시지를 교환하거나, 언어 학습 교육용 도구로, 팀 내부 이벤트의 코드 게임, 창의적인 글쓰기 등 다양한 상황에서 활용할 수 있습니다."
    },
    {
      category: "활용",
      question: "교육용으로 사용할 수 있나요?",
      answer: "네, 암호화의 기본 원리를 배우거나 언어 구조를 이해하는 교육용 도구로 매우 적합합니다. 학생들이 직접 규칙을 만들어보며 개념을 쉽게 이해할 수 있습니다."
    },
    {
      category: "기타",
      question: "버그를 발견했는데 어디에 알려야 하나요?",
      answer: "GitHub 저장소에 이슈를 남겨주시거나 개발자에게 직접 연락주시면 빠르게 확인하고 수정하겠습니다. 소중한 피드백은 항상 환영합니다."
    },
    {
      category: "기타",
      question: "새로운 기능을 제안할 수 있나요?",
      answer: "물론입니다! 사용자들의 아이디어는 서비스 발전에 큰 도움이 됩니다. GitHub 이슈나 개발자에게 편하게 제안해주세요."
    }
  ];

  const categories = ["기본", "사용법", "기능", "기술", "보안", "문제해결", "활용", "기타"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* 헤더 */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              ❓ 자주 묻는 질문
            </h1>
            <p className="text-lg text-gray-600">
              나만의 언어 생성기에 대한 궁금한 점들을 답변해드려요
            </p>
          </div>

          {/* 카테고리 필터 */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <span
                  key={category}
                  className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-medium"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>

          {/* FAQ 목록 */}
          <div className="space-y-4 mb-12">
            {faqData.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                category={faq.category}
              />
            ))}
          </div>

          {/* 추가 질문 */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                🤔 더 궁금한 점이 있으신가요?
              </h2>
              <p className="text-gray-600 mb-6">
                위에 답변이 없는 질문이 있다면 언제든지 문의해주세요
              </p>
              <div className="space-x-4">
                <Link 
                  href="/guide" 
                  className="inline-block bg-white text-blue-500 border-2 border-blue-500 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
                  📖 사용법 보기
                </Link>
              </div>
            </div>
          </section>

          {/* 빠른 링크 */}
          <section className="text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">빠른 링크</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/" 
                className="text-blue-600 hover:text-blue-800 underline"
              >
                🏠 메인으로
              </Link>
              <Link 
                href="/about" 
                className="text-blue-600 hover:text-blue-800 underline"
              >
                📋 소개 보기
              </Link>
              <Link 
                href="/guide" 
                className="text-blue-600 hover:text-blue-800 underline"
              >
                📖 사용법
              </Link>
              <Link 
                href="/privacy" 
                className="text-blue-600 hover:text-blue-800 underline"
              >
                🔒 개인정보처리방침
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
