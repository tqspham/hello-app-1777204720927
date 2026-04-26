import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI Generated Web',
  description: 'A Next.js application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <html lang="en">
      <body className="bg-white text-black">
        {children}
      </body>
    </html>
  );
}
