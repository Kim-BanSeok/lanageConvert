import { Metadata } from 'next';

export const metadata = {
  title: 'FAQ - 나만의 언어 생성기',
  description: '자주 묻는 질문과 답변',
  openGraph: {
    title: 'FAQ - 나만의 언어 생성기',
    description: '궁금한 점에 대한 답변',
    url: 'https://lanage-convert.vercel.app/faq',
  },
};

export default function FAQLayout({ children }) {
  return children;
}
