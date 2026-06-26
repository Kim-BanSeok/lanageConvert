import Link from 'next/link';

const sections = [
  {
    title: '이 서비스가 해결하는 문제',
    body:
      '이 프로젝트는 텍스트를 규칙 기반으로 변형하는 도구입니다. 단순 치환이 아니라 순서, 예외, 문맥을 고려해 같은 입력도 다른 결과를 만들 수 있게 설계했습니다.',
  },
  {
    title: '어떻게 동작하나',
    body:
      '사용자는 from/to 규칙을 추가하고, 입력 문장에 대해 encode 또는 decode를 실행합니다. 규칙이 많아질수록 자동 추천, 충돌 검사, 기록 저장 같은 보조 기능이 작동해 결과의 일관성을 유지합니다.',
  },
  {
    title: '언제 쓰면 좋은가',
    body:
      '가벼운 은어 변환, 암호풍 텍스트 실험, 세계관용 가상 언어 제작, 반복되는 메시지 패턴 관리처럼 “표현 규칙을 내가 정하고 싶을 때” 특히 유용합니다.',
  },
];

const examples = [
  {
    label: '예시 1',
    input: '안녕하세요',
    output: 'BODO... 형태의 사용자 정의 치환 결과',
    note: '짧은 인사말을 고유 표현으로 바꾸는 가장 기본적인 활용',
  },
  {
    label: '예시 2',
    input: 'HELLO WORLD',
    output: '규칙 순서에 따라 변형된 출력',
    note: '영문 대문자, 접두/접미 패턴, 부분 문자열 치환을 함께 테스트',
  },
  {
    label: '예시 3',
    input: '같은 문장',
    output: '규칙집에 따라 매번 다른 스타일',
    note: '규칙 모드와 순서가 결과에 직접 영향을 준다는 점을 확인',
  },
];

const tips = [
  '긴 규칙을 짧은 규칙보다 앞에 두면 의도치 않은 선치환을 줄일 수 있습니다.',
  'encode와 decode를 모두 시험해 보고, 결과가 되돌릴 수 있는지 확인하세요.',
  '규칙이 많아질수록 이름을 붙여 저장하면 나중에 재사용하기 쉽습니다.',
  '충돌 검사와 히스토리를 함께 쓰면 규칙 관리 품질이 올라갑니다.',
];

export default function ContentSection() {
  return (
    <section className="space-y-12">
      <div className="rounded-3xl bg-gradient-to-br from-slate-50 via-white to-blue-50 border border-slate-200 p-8 md:p-10 shadow-sm">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.2em] text-blue-600 uppercase mb-3">
            What this is
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            단순 변환기가 아니라, 규칙을 설계하는 작업 공간
          </h2>
          <p className="text-slate-700 leading-8 text-base md:text-lg">
            이 도구는 문자를 치환하는 기능만 제공하지 않습니다. 규칙의 우선순위, 저장, 검색, 되돌리기, 통계 확인까지
            포함해 사용자가 언어 규칙 자체를 다듬을 수 있게 돕습니다. 애드센스 심사 관점에서도, 도구 설명과 사용 가이드가
            분리되어 있는 정보형 페이지가 중요합니다.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {sections.map((item) => (
          <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
            <p className="text-slate-700 leading-7">{item.body}</p>
          </article>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <article className="rounded-3xl bg-slate-900 text-white p-8 md:p-10 shadow-lg">
          <h3 className="text-2xl font-bold mb-4">실사용 예시</h3>
          <div className="space-y-4">
            {examples.map((example) => (
              <div key={example.label} className="rounded-2xl bg-white/6 border border-white/10 p-4">
                <div className="flex items-center justify-between gap-4 mb-2">
                  <span className="text-sm font-semibold text-cyan-300">{example.label}</span>
                  <span className="text-xs text-slate-400">{example.note}</span>
                </div>
                <p className="text-sm text-slate-300 mb-2">
                  <span className="font-semibold text-white">입력:</span> {example.input}
                </p>
                <p className="text-sm text-slate-300">
                  <span className="font-semibold text-white">출력:</span> {example.output}
                </p>
              </div>
            ))}
          </div>
        </article>

        <aside className="rounded-3xl bg-white border border-slate-200 p-8 shadow-sm">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">사용 팁</h3>
          <ul className="space-y-4">
            {tips.map((tip) => (
              <li key={tip} className="flex gap-3 text-slate-700 leading-7">
                <span className="mt-2 h-2 w-2 rounded-full bg-blue-600 flex-shrink-0" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 rounded-2xl bg-blue-50 p-5">
            <p className="text-sm text-slate-700 leading-7">
              더 자세한 사용 흐름은 <Link href="/guide" className="font-semibold text-blue-700 underline">가이드</Link>에서,
              자주 묻는 질문은 <Link href="/faq" className="font-semibold text-blue-700 underline">FAQ</Link>에서 확인할 수 있습니다.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
