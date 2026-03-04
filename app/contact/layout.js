import { Metadata } from 'next';

export const metadata = {
  title: '문의하기 - 나만의 언어 생성기',
  description: '궁금한 점이나 문의사항을 알려주세요',
  openGraph: {
    title: '문의하기 - 나만의 언어 생성기',
    description: '온라인 문의 및 지원',
    url: 'https://lanage-convert.vercel.app/contact',
  },
};

export default function ContactLayout({ children }) {
  return children;
}
