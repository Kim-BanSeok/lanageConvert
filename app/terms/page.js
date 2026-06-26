import Link from 'next/link';

export const metadata = {
  title: '이용약관 - 나만의 언어 생성기',
  description: '서비스 이용 조건, 금지 행위, 책임 제한, 문의 방법을 설명하는 이용약관',
  openGraph: {
    title: '이용약관 - 나만의 언어 생성기',
    description: '서비스 이용 조건과 책임 범위 안내',
    url: 'https://lanage-convert.vercel.app/terms',
  },
};

const clauses = [
  {
    title: '서비스의 성격',
    body: '이 서비스는 규칙 기반 텍스트 변환을 돕는 도구입니다. 결과는 사용자가 입력한 규칙과 순서에 따라 달라질 수 있으며, 완전한 보안 도구나 법적 문서 생성기가 아닙니다.',
  },
  {
    title: '이용자의 책임',
    body: '사용자는 입력한 규칙과 텍스트의 적법성, 적절성, 공개 여부를 스스로 확인해야 합니다. 타인의 권리를 침해하는 용도로 사용하는 것은 금지됩니다.',
  },
  {
    title: '금지 행위',
    body: '불법 행위, 악성 코드 유포, 타인 계정 침해, 스팸성 사용, 서비스 안정성을 해치는 대량 요청은 허용되지 않습니다.',
  },
  {
    title: '서비스 변경',
    body: '기능은 사전 고지 없이 변경되거나 종료될 수 있습니다. 다만 중요한 변경은 가능한 범위에서 안내합니다.',
  },
];

const usageNotes = [
  '규칙은 사용자가 직접 만든 콘텐츠로 간주되며, 그 내용에 대한 책임은 사용자에게 있습니다.',
  '브라우저 저장 데이터는 사용 환경에 따라 유지 기간이 달라질 수 있습니다.',
  '오류가 반복될 경우 이용을 중단하고 문의 페이지를 통해 알려 주세요.',
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-10 max-w-5xl">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 md:p-10">
          <header className="text-center max-w-3xl mx-auto mb-14">
            <p className="text-sm font-semibold tracking-[0.25em] text-indigo-600 uppercase mb-3">
              Terms
            </p>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
              이용약관
            </h1>
            <p className="text-lg text-slate-600 leading-8">
              이 페이지는 서비스의 범위와 책임을 분명히 하기 위한 문서입니다. 기능 소개와 분리된 법적 안내 페이지로 유지됩니다.
            </p>
            <p className="text-sm text-slate-500 mt-3">
              최종 개정일: 2026-06-26
            </p>
          </header>

          <section className="grid gap-4 md:grid-cols-2 mb-14">
            {clauses.map((clause) => (
              <article key={clause.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-3">{clause.title}</h2>
                <p className="text-slate-700 leading-7">{clause.body}</p>
              </article>
            ))}
          </section>

          <section className="grid gap-6 lg:grid-cols-[1fr_0.9fr] mb-14">
            <div className="rounded-3xl bg-slate-900 text-white p-8 md:p-10">
              <h2 className="text-2xl font-bold mb-4">이용 시 주의</h2>
              <ul className="space-y-4 text-slate-300 leading-8">
                {usageNotes.map((note) => (
                  <li key={note} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>

            <aside className="rounded-3xl border border-slate-200 bg-purple-50 p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">책임 범위</h2>
              <div className="space-y-4 text-slate-700 leading-7">
                <p>서비스는 가능한 한 안정적으로 제공되지만, 모든 결과를 보장하지는 않습니다.</p>
                <p>규칙집, 저장 데이터, 입력 텍스트의 백업은 사용자가 직접 관리하는 것이 안전합니다.</p>
                <p>약관과 개인정보처리방침은 상호 연결되어 검토해야 합니다.</p>
              </div>
              <div className="mt-8">
                <Link href="/privacy" className="inline-flex rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors">
                  개인정보처리방침 보기
                </Link>
              </div>
            </aside>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-8 md:p-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">문의 및 해석 요청</h2>
            <p className="text-slate-700 leading-8 mb-4">
              약관 해석이나 서비스 정책에 대한 질문이 있으면 문의 페이지를 통해 전달할 수 있습니다.
            </p>
            <Link href="/contact" className="inline-flex rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors">
              문의 페이지로 이동
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}
