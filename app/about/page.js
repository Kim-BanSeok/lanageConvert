import Link from 'next/link';

export const metadata = {
  title: '소개 - 나만의 언어 생성기',
  description: '나만의 언어 생성기가 무엇을 해결하는지, 어떤 방식으로 동작하는지 설명하는 소개 페이지',
  openGraph: {
    title: '소개 - 나만의 언어 생성기',
    description: '서비스 목적, 핵심 기능, 활용 방식 소개',
    url: 'https://lanage-convert.vercel.app/about',
  },
};

const pillars = [
  {
    title: '규칙 기반 변환',
    body: '사용자가 직접 정의한 from/to 규칙을 우선순위에 따라 적용합니다. 단순 치환처럼 보이지만, 실제로는 충돌과 순서를 관리하는 것이 핵심입니다.',
  },
  {
    title: '기록과 재사용',
    body: '히스토리, 프리셋, 검색, 통계 기능을 통해 한 번 만든 규칙을 다시 쓰기 쉽게 정리합니다. 같은 작업을 반복하는 시간을 줄이는 데 초점을 둡니다.',
  },
  {
    title: '학습용 도구',
    body: '언어 규칙을 처음 설계하는 사용자도 실험할 수 있도록, 예시와 자동 추천, 충돌 검사 같은 보조 기능을 함께 제공합니다.',
  },
  {
    title: '개인정보 우선',
    body: '대부분의 작업은 브라우저 안에서 처리되며, 외부 서버 전송을 최소화하도록 설계했습니다. 민감한 텍스트를 다루는 상황에서도 부담을 줄이려는 방향입니다.',
  },
];

const timeline = [
  {
    step: '1단계',
    title: '문자 규칙 실험',
    body: '짧은 단위의 치환 규칙을 만들고, 결과를 즉시 확인합니다. 가장 기본적인 언어 놀이를 시작하는 단계입니다.',
  },
  {
    step: '2단계',
    title: '프리셋과 히스토리',
    body: '반복해서 사용하는 규칙집을 저장하고, 과거 작업으로 빠르게 돌아갑니다. 실사용성이 확실히 높아집니다.',
  },
  {
    step: '3단계',
    title: '고급 기능 적용',
    body: '충돌 검사, 자동 생성, 변형 추천을 사용해 규칙집 품질을 끌어올립니다. 이 단계에서 도구의 차별점이 생깁니다.',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-10 max-w-5xl">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 md:p-10">
          <header className="max-w-3xl mx-auto text-center mb-14">
            <p className="text-sm font-semibold tracking-[0.25em] text-blue-600 uppercase mb-3">
              About
            </p>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
              나만의 언어를 설계하는 작업 공간
            </h1>
            <p className="text-lg text-slate-600 leading-8">
              이 서비스는 단순 번역기가 아니라, 사용자가 문자 규칙을 만들고 검증하고 재사용하는 과정을 지원하는 도구입니다.
              심사용 소개 문구가 아니라 실제 사용 목적과 구조를 설명하기 위해 만든 페이지입니다.
            </p>
          </header>

          <section className="grid gap-6 md:grid-cols-2 mb-14">
            {pillars.map((pillar) => (
              <article key={pillar.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-3">{pillar.title}</h2>
                <p className="text-slate-700 leading-7">{pillar.body}</p>
              </article>
            ))}
          </section>

          <section className="mb-14">
            <div className="flex items-end justify-between gap-4 mb-6">
              <div>
                <p className="text-sm font-semibold text-blue-600 uppercase tracking-[0.2em] mb-2">
                  How it grows
                </p>
                <h2 className="text-3xl font-bold text-slate-900">기능이 늘어나는 방식</h2>
              </div>
              <Link
                href="/guide"
                className="text-sm font-semibold text-blue-700 underline underline-offset-4"
              >
                사용법 보기
              </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {timeline.map((item) => (
                <div key={item.step} className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">
                  <div className="text-sm font-semibold text-blue-600 mb-2">{item.step}</div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-700 leading-7">{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-[1fr_0.9fr] items-start">
            <div className="rounded-3xl bg-slate-900 text-white p-8 md:p-10">
              <h2 className="text-2xl font-bold mb-4">이 페이지의 역할</h2>
              <p className="text-slate-300 leading-8 mb-6">
                애드센스는 단순 기능 페이지보다, 사이트의 목적과 사용자를 명확히 설명하는 정보형 페이지를 선호합니다.
                이 소개 페이지는 서비스의 목적, 주요 기능, 활용 맥락을 분리해 설명함으로써 사이트 전체의 신뢰도를 높이는 역할을 합니다.
              </p>
              <ul className="space-y-3 text-slate-300">
                <li className="flex gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-cyan-400 flex-shrink-0" />
                  <span>기능 목록이 아니라, 어떤 문제를 푸는 서비스인지 설명합니다.</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-cyan-400 flex-shrink-0" />
                  <span>사용 흐름과 설계 의도를 분리해 보여줍니다.</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-cyan-400 flex-shrink-0" />
                  <span>가이드와 FAQ로 이어지는 내부 링크 구조를 제공합니다.</span>
                </li>
              </ul>
            </div>

            <aside className="rounded-3xl border border-slate-200 bg-blue-50 p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">추천 사용 대상</h2>
              <div className="space-y-4 text-slate-700 leading-7">
                <p>자기만의 암호 문장을 만들고 싶은 사용자</p>
                <p>가상 언어, 세계관 설정, 캐릭터 말투를 실험하는 창작자</p>
                <p>반복적인 문자 치환 규칙을 저장해두고 싶은 사용자</p>
                <p>문자 규칙의 충돌이나 우선순위를 학습하려는 초보자</p>
              </div>
              <div className="mt-8">
                <Link
                  href="/"
                  className="inline-flex items-center rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
                >
                  메인 도구로 이동
                </Link>
              </div>
            </aside>
          </section>
        </div>
      </div>
    </div>
  );
}
