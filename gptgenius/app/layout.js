import { Inter } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import Providers from './providers';
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'GPTGenius',
  description:
    'GPTGenius: Your AI language companion. Powered by OpenAI, it enhances your conversations, content creation, and more!',
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={inter.className}>
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
