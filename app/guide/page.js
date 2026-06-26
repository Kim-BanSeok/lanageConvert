import Link from 'next/link';

export const metadata = {
  title: '가이드 - 나만의 언어 생성기',
  description: '규칙을 만들고, 테스트하고, 저장하는 실제 사용 절차를 정리한 가이드 페이지',
  openGraph: {
    title: '가이드 - 나만의 언어 생성기',
    description: '실제 사용 흐름 중심의 단계별 가이드',
    url: 'https://lanage-convert.vercel.app/guide',
  },
};

const steps = [
  {
    title: '1. 기준 문장을 준비한다',
    body: '먼저 변환 전 원문을 짧게 준비합니다. 처음에는 한 문장만 넣고 결과를 확인하는 편이 규칙 오류를 찾기 쉽습니다.',
  },
  {
    title: '2. 규칙을 작은 단위로 만든다',
    body: 'from/to를 한 쌍씩 추가한 뒤, 긴 규칙과 짧은 규칙의 순서를 확인합니다. 한 번에 너무 많은 규칙을 넣으면 충돌 원인을 찾기 어렵습니다.',
  },
  {
    title: '3. encode와 decode를 모두 시험한다',
    body: '같은 규칙이라도 인코딩과 디코딩 방향에서 결과가 달라질 수 있습니다. 양쪽을 모두 테스트해야 되돌릴 수 있는 규칙집이 됩니다.',
  },
  {
    title: '4. 저장하고 다시 불러온다',
    body: '잘 작동하는 규칙집은 프리셋으로 저장합니다. 이후 비슷한 프로젝트에서 다시 불러와 재사용하면 작업 시간이 줄어듭니다.',
  },
];

const bestPractices = [
  '긴 치환은 짧은 치환보다 먼저 배치합니다.',
  '비슷한 패턴이 겹치면 충돌 검사 기능을 확인합니다.',
  '문장 전체보다 대표 단어 몇 개로 먼저 테스트합니다.',
  '규칙 수가 많아지면 이름을 붙여 프리셋으로 정리합니다.',
  '변형 결과를 기록해 두면 나중에 되돌리기 쉽습니다.',
];

const scenarios = [
  {
    title: '비밀 메시지',
    body: '친구끼리만 읽을 수 있는 장난스러운 암호 메시지를 만들 때 적합합니다.',
  },
  {
    title: '세계관 언어',
    body: '소설, 게임, 설정집에 들어갈 가상 언어의 말투와 문자 규칙을 실험할 수 있습니다.',
  },
  {
    title: '학습용 예제',
    body: '치환 순서, 우선순위, 예외 처리처럼 문자열 처리의 기본 개념을 익히는 데 도움을 줍니다.',
  },
];

export default function GuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-10 max-w-5xl">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 md:p-10">
          <header className="text-center max-w-3xl mx-auto mb-14">
            <p className="text-sm font-semibold tracking-[0.25em] text-emerald-600 uppercase mb-3">
              Guide
            </p>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
              실제 사용 흐름으로 보는 규칙 제작 가이드
            </h1>
            <p className="text-lg text-slate-600 leading-8">
              이 페이지는 “무슨 버튼을 누르는지”보다 “어떤 순서로 규칙을 설계하면 좋은지”에 초점을 둡니다.
              처음 사용하는 사람도 결과를 이해할 수 있게 절차와 실전 팁을 분리했습니다.
            </p>
          </header>

          <section className="grid gap-4 md:grid-cols-2 mb-14">
            {steps.map((step) => (
              <article key={step.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <h2 className="text-lg font-bold text-slate-900 mb-3">{step.title}</h2>
                <p className="text-slate-700 leading-7">{step.body}</p>
              </article>
            ))}
          </section>

          <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] mb-14">
            <aside className="rounded-3xl bg-slate-900 text-white p-8 md:p-10">
              <h2 className="text-2xl font-bold mb-4">실전 체크리스트</h2>
              <ul className="space-y-4 text-slate-300 leading-7">
                {bestPractices.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </aside>

            <div className="rounded-3xl bg-white border border-slate-200 p-8 shadow-sm">
              <div className="flex items-end justify-between gap-4 mb-6">
                <div>
                  <p className="text-sm font-semibold text-emerald-600 uppercase tracking-[0.2em] mb-2">
                    Examples
                  </p>
                  <h2 className="text-2xl font-bold text-slate-900">어떤 상황에서 쓰는가</h2>
                </div>
                <Link href="/faq" className="text-sm font-semibold text-emerald-700 underline underline-offset-4">
                  FAQ 보기
                </Link>
              </div>

              <div className="space-y-4">
                {scenarios.map((scenario) => (
                  <div key={scenario.title} className="rounded-2xl bg-slate-50 border border-slate-200 p-5">
                    <h3 className="font-bold text-slate-900 mb-2">{scenario.title}</h3>
                    <p className="text-slate-700 leading-7">{scenario.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-emerald-200 bg-emerald-50 p-8 md:p-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">가장 많이 틀리는 부분</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl bg-white p-5 border border-emerald-100">
                <h3 className="font-bold text-slate-900 mb-2">규칙 순서</h3>
                <p className="text-slate-700 leading-7">
                  짧은 규칙이 긴 규칙을 먼저 먹어버리면 결과가 예상과 달라집니다.
                </p>
              </div>
              <div className="rounded-2xl bg-white p-5 border border-emerald-100">
                <h3 className="font-bold text-slate-900 mb-2">중복 패턴</h3>
                <p className="text-slate-700 leading-7">
                  비슷한 from 값이 겹치면 어떤 규칙이 적용됐는지 파악하기 어려워집니다.
                </p>
              </div>
              <div className="rounded-2xl bg-white p-5 border border-emerald-100">
                <h3 className="font-bold text-slate-900 mb-2">되돌리기</h3>
                <p className="text-slate-700 leading-7">
                  decode를 먼저 확인하지 않으면, 만든 규칙을 원문으로 되돌리지 못할 수 있습니다.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
