import type { Metadata } from 'next';
import './globals.css';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import Header from './common/components/Header/Header';
config.autoAddCss = false;

export const metadata: Metadata = {
  title: 'RPG Dice Roll',
  description: 'A RPG dice roll',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
