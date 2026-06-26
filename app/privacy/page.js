import Link from 'next/link';

export const metadata = {
  title: '개인정보처리방침 - 나만의 언어 생성기',
  description: '수집 정보, 이용 목적, 보관 기간, 사용자 권리, 문의 방법을 설명하는 개인정보처리방침',
  openGraph: {
    title: '개인정보처리방침 - 나만의 언어 생성기',
    description: '브라우저 내부 처리 중심의 개인정보 안내',
    url: 'https://lanage-convert.vercel.app/privacy',
  },
};

const dataSections = [
  {
    title: '수집하는 정보',
    items: [
      '서비스 이용 과정에서 발생하는 기본 접속 정보',
      '기기 및 브라우저 환경 정보',
      '사용자가 직접 저장한 규칙과 프리셋 정보',
    ],
  },
  {
    title: '수집하지 않는 정보',
    items: [
      '민감한 원문 내용을 서버로 전송하는 처리',
      '별도 계정 인증을 위한 개인정보 입력',
      '서비스 이용과 무관한 추적용 정보',
    ],
  },
  {
    title: '이용 목적',
    items: [
      '오류 분석과 서비스 안정성 향상',
      '사용자 요청에 따른 기능 제공',
      '브라우저 내 저장 기능 제공',
    ],
  },
  {
    title: '보관 기간',
    items: [
      '브라우저 저장 데이터는 사용자가 직접 삭제할 때까지 유지될 수 있음',
      '운영 로그는 필요한 최소 기간만 보관',
      '법령상 보관 의무가 있는 경우 그 기간을 따름',
    ],
  },
];

const userRights = [
  '저장된 브라우저 데이터 삭제 요청',
  '이용 기록 열람 및 정정 요청',
  '문의 및 불만 제기',
  '동의 철회와 관련된 안내 요청',
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-10 max-w-5xl">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 md:p-10">
          <header className="text-center max-w-3xl mx-auto mb-14">
            <p className="text-sm font-semibold tracking-[0.25em] text-slate-600 uppercase mb-3">
              Privacy
            </p>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
              개인정보처리방침
            </h1>
            <p className="text-lg text-slate-600 leading-8">
              이 서비스는 대부분의 처리를 브라우저에서 수행하지만, 운영과 안정성 확보를 위해 최소한의 정보를 다룰 수 있습니다.
              아래 내용은 어떤 데이터를 왜 다루는지 명확히 설명하기 위한 문서입니다.
            </p>
            <p className="text-sm text-slate-500 mt-3">
              최종 개정일: 2026-06-26
            </p>
          </header>

          <section className="grid gap-4 md:grid-cols-2 mb-14">
            {dataSections.map((section) => (
              <article key={section.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-4">{section.title}</h2>
                <ul className="space-y-3 text-slate-700 leading-7">
                  {section.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </section>

          <section className="grid gap-6 lg:grid-cols-[1fr_0.9fr] mb-14">
            <div className="rounded-3xl bg-slate-900 text-white p-8 md:p-10">
              <h2 className="text-2xl font-bold mb-4">이용자 권리</h2>
              <p className="text-slate-300 leading-8 mb-6">
                사용자는 자신과 관련된 데이터에 대해 확인, 정정, 삭제, 제한 요청을 할 수 있습니다. 브라우저에 저장된 데이터는
                서비스 서버가 아니라 로컬 환경에 남을 수 있으므로, 삭제는 사용자의 브라우저 설정을 함께 확인해야 합니다.
              </p>
              <ul className="space-y-4 text-slate-300 leading-8">
                {userRights.map((right) => (
                  <li key={right} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>{right}</span>
                  </li>
                ))}
              </ul>
            </div>

            <aside className="rounded-3xl border border-slate-200 bg-blue-50 p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">안내 사항</h2>
              <div className="space-y-4 text-slate-700 leading-7">
                <p>민감한 텍스트는 가능하면 입력하지 않는 것을 권장합니다.</p>
                <p>규칙집과 프리셋은 브라우저 저장소를 통해 보관될 수 있습니다.</p>
                <p>광고 및 분석 도구가 적용되는 경우, 해당 정책이 별도로 안내됩니다.</p>
              </div>
              <div className="mt-8">
                <Link href="/contact" className="inline-flex rounded-full bg-sky-600 px-5 py-3 text-sm font-semibold text-white hover:bg-sky-700 transition-colors">
                  문의 페이지로 이동
                </Link>
              </div>
            </aside>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-8 md:p-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">정책의 범위</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl bg-slate-50 p-5 border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-2">브라우저 저장</h3>
                <p className="text-slate-700 leading-7">프리셋, 히스토리, 사용자 설정은 로컬 저장소에 남을 수 있습니다.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5 border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-2">운영 로그</h3>
                <p className="text-slate-700 leading-7">오류 분석용 로그는 서비스 품질 개선 목적에 한해 최소한으로 다룹니다.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5 border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-2">제3자 도구</h3>
                <p className="text-slate-700 leading-7">광고나 분석 도구가 사용될 경우, 해당 서비스의 정책과 함께 검토해야 합니다.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
