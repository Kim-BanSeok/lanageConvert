'use client';

import Link from 'next/link';
import { useState } from 'react';

const FAQItem = ({ question, answer, category }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <article className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-start gap-3">
          <span className="shrink-0 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
            {category}
          </span>
          <span className="font-semibold text-slate-900">{question}</span>
        </div>
        <span className="text-slate-400 text-xl leading-none">{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen && (
        <div className="px-6 pb-6 pt-0">
          <p className="text-slate-700 leading-8 whitespace-pre-line">{answer}</p>
        </div>
      )}
    </article>
  );
};

const faqData = [
  {
    category: '기능',
    question: '이 서비스는 정확히 무엇을 하는 도구인가요?',
    answer:
      '사용자가 직접 만든 문자 치환 규칙을 이용해 텍스트를 변형하는 도구입니다. 단순 번역이 아니라 규칙 설계와 재사용, 충돌 관리에 초점이 있습니다.',
  },
  {
    category: '기능',
    question: 'encode와 decode는 어떻게 다른가요?',
    answer:
      'encode는 원문을 규칙에 맞게 변형하는 과정이고, decode는 그 결과를 다시 원래 형태에 가깝게 되돌리는 과정입니다. 둘 다 테스트해야 규칙집의 완성도를 확인할 수 있습니다.',
  },
  {
    category: '사용법',
    question: '규칙은 어떤 순서로 추가하는 게 좋나요?',
    answer:
      '보통 긴 패턴이나 더 구체적인 패턴을 먼저 두는 편이 안전합니다. 짧은 규칙이 먼저 적용되면 긴 규칙이 기회를 잃어버릴 수 있습니다.',
  },
  {
    category: '사용법',
    question: '규칙이 많아지면 왜 결과가 달라지나요?',
    answer:
      '이 도구는 규칙을 순서대로 적용합니다. 따라서 앞 규칙이 뒤 규칙의 입력을 바꾸어버릴 수 있고, 이 때문에 충돌이나 선치환이 생깁니다.',
  },
  {
    category: '사용법',
    question: '프리셋 저장은 왜 필요한가요?',
    answer:
      '비슷한 규칙집을 여러 번 만들 때 매번 다시 입력하는 비용을 줄여줍니다. 프로젝트별, 캐릭터별, 문체별로 나누어 저장해 두면 관리가 쉬워집니다.',
  },
  {
    category: '문제 해결',
    question: '결과가 이상하면 무엇부터 확인해야 하나요?',
    answer:
      '첫째, from/to 값이 정확한지 확인합니다. 둘째, 규칙 순서를 봅니다. 셋째, decode가 가능한지 시험해 봅니다. 이 세 가지가 대부분의 문제를 설명합니다.',
  },
  {
    category: '문제 해결',
    question: '같은 입력인데 결과가 다르게 나올 수 있나요?',
    answer:
      '가능합니다. 규칙 순서, 추가된 규칙 수, 저장된 프리셋, 입력된 문자의 길이에 따라 결과가 달라질 수 있습니다.',
  },
  {
    category: '개인정보',
    question: '입력한 텍스트가 서버로 전송되나요?',
    answer:
      '기본 동작은 브라우저 내부 처리 중심입니다. 다만 사용하는 기능이나 향후 확장에 따라 동작이 달라질 수 있으므로, 민감한 문장은 별도 정책을 확인하는 편이 좋습니다.',
  },
  {
    category: '개인정보',
    question: '광고가 있으면 콘텐츠가 부족해 보이지 않나요?',
    answer:
      '그래서 광고 노출보다 먼저, 소개와 가이드, FAQ처럼 독립적인 설명형 페이지를 구성하는 것이 중요합니다. 이 페이지도 그 목적을 반영해 작성했습니다.',
  },
];

const categories = ['기능', '사용법', '문제 해결', '개인정보'];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-sky-50">
      <div className="container mx-auto px-4 py-10 max-w-5xl">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 md:p-10">
          <header className="text-center max-w-3xl mx-auto mb-14">
            <p className="text-sm font-semibold tracking-[0.25em] text-indigo-600 uppercase mb-3">
              FAQ
            </p>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
              자주 묻는 질문
            </h1>
            <p className="text-lg text-slate-600 leading-8">
              사용법만 나열하지 않고, 결과가 이상할 때 무엇을 확인해야 하는지까지 정리했습니다.
              정보성 페이지로서 독립적으로 읽히도록 구성했습니다.
            </p>
          </header>

          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {categories.map((category) => (
              <span
                key={category}
                className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700"
              >
                {category}
              </span>
            ))}
          </div>

          <div className="space-y-4 mb-14">
            {faqData.map((faq) => (
              <FAQItem key={faq.question} {...faq} />
            ))}
          </div>

          <section className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
            <div className="rounded-3xl bg-slate-900 text-white p-8 md:p-10">
              <h2 className="text-2xl font-bold mb-4">문제가 생겼을 때의 순서</h2>
              <ol className="space-y-4 text-slate-300 leading-8 list-decimal list-inside">
                <li>입력값과 규칙값에 오타가 없는지 확인합니다.</li>
                <li>규칙의 순서를 바꿔서 결과가 달라지는지 살펴봅니다.</li>
                <li>encode와 decode를 둘 다 테스트해 봅니다.</li>
                <li>프리셋으로 저장했다면 저장된 규칙이 최신인지 다시 봅니다.</li>
              </ol>
            </div>

            <aside className="rounded-3xl border border-slate-200 bg-sky-50 p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">더 읽을 문서</h2>
              <div className="space-y-4 text-slate-700 leading-7">
                <p>
                  <Link href="/guide" className="font-semibold text-sky-700 underline">
                    가이드
                  </Link>
                  에서는 실제 입력 순서와 테스트 방법을 단계별로 설명합니다.
                </p>
                <p>
                  <Link href="/about" className="font-semibold text-sky-700 underline">
                    소개
                  </Link>
                  에서는 이 서비스의 목적과 설계 의도를 더 자세히 볼 수 있습니다.
                </p>
                <p>
                  질문이 더 있다면 문의 페이지를 통해 추가 확인할 수 있습니다.
                </p>
              </div>
            </aside>
          </section>
        </div>
      </div>
    </div>
  );
}
