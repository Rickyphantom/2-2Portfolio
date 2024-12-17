import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '유선빈 포트폴리오',
  description: '보안 컨설턴트를 꿈꾸는 정보보호학과 학생의 포트폴리오',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <div className="flex min-h-screen">
          <Navbar />
          <main className="flex-1 ml-64">{children}</main>
        </div>
      </body>
    </html>
  );
}
