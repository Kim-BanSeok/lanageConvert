import Link from 'next/link';

export const metadata = {
  title: '문의 - 나만의 언어 생성기',
  description: '서비스 문의, 버그 제보, 제휴 및 피드백을 위한 연락 안내 페이지',
  openGraph: {
    title: '문의 - 나만의 언어 생성기',
    description: '문의 채널과 응답 기준 안내',
    url: 'https://lanage-convert.vercel.app/contact',
  },
};

const channels = [
  {
    title: '이메일',
    value: 'contact@example.com',
    note: '버그 제보, 기능 제안, 계정 관련 문의에 사용합니다.',
  },
  {
    title: 'GitHub Issues',
    value: '프로젝트 저장소 이슈',
    note: '재현 가능한 오류, UI 개선, 공개 피드백을 남기기에 적합합니다.',
  },
  {
    title: 'GitHub Discussions',
    value: '커뮤니티 토론',
    note: '사용 팁, 규칙 설계 아이디어, 활용 사례를 공유할 때 사용합니다.',
  },
];

const responseRules = [
  '일반 문의는 영업일 기준 2~3일 내 확인합니다.',
  '버그 제보는 재현 절차가 있으면 더 빠르게 검토할 수 있습니다.',
  '개인정보나 민감한 원문은 가능한 한 넣지 않는 편이 안전합니다.',
  '대량 요청, 광고성 제휴, 정책 문의는 제목에 명확히 표시해 주세요.',
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-10 max-w-5xl">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 md:p-10">
          <header className="text-center max-w-3xl mx-auto mb-14">
            <p className="text-sm font-semibold tracking-[0.25em] text-sky-600 uppercase mb-3">
              Contact
            </p>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
              문의 및 피드백 안내
            </h1>
            <p className="text-lg text-slate-600 leading-8">
              이 페이지는 단순한 장식용 연락처가 아니라, 실제로 어떤 채널을 통해 무엇을 보내면 되는지 설명하는 안내 페이지입니다.
            </p>
          </header>

          <section className="grid gap-4 md:grid-cols-3 mb-14">
            {channels.map((channel) => (
              <article key={channel.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <h2 className="text-lg font-bold text-slate-900 mb-2">{channel.title}</h2>
                <p className="text-sm font-semibold text-sky-700 mb-3">{channel.value}</p>
                <p className="text-slate-700 leading-7">{channel.note}</p>
              </article>
            ))}
          </section>

          <section className="grid gap-6 lg:grid-cols-[1fr_0.9fr] mb-14">
            <div className="rounded-3xl bg-slate-900 text-white p-8 md:p-10">
              <h2 className="text-2xl font-bold mb-4">문의 전에 확인할 것</h2>
              <ul className="space-y-4 text-slate-300 leading-8">
                {responseRules.map((rule) => (
                  <li key={rule} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-sky-400 flex-shrink-0" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            <aside className="rounded-3xl border border-slate-200 bg-sky-50 p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">문의 유형 예시</h2>
              <div className="space-y-4 text-slate-700 leading-7">
                <p>“규칙 저장 후 다시 불러올 때 순서가 바뀝니다.” 같은 재현 가능한 버그</p>
                <p>“가이드에 예시가 더 있으면 좋겠습니다.” 같은 콘텐츠 제안</p>
                <p>“가상 언어 사례를 공유하고 싶습니다.” 같은 커뮤니티 피드백</p>
              </div>
              <div className="mt-8">
                <Link href="/faq" className="inline-flex rounded-full bg-sky-600 px-5 py-3 text-sm font-semibold text-white hover:bg-sky-700 transition-colors">
                  FAQ 먼저 보기
                </Link>
              </div>
            </aside>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-8 md:p-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">응답 기준</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-5 border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-2">우선 확인</h3>
                <p className="text-slate-700 leading-7">
                  사이트 오류, 개인정보 관련 이슈, 광고 노출 문제처럼 서비스 운영에 직접 영향을 주는 내용부터 확인합니다.
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5 border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-2">나중 확인</h3>
                <p className="text-slate-700 leading-7">
                  일반적인 제안, 디자인 선호, 향후 기능 아이디어는 정리해 두었다가 다음 개편 때 검토합니다.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
