import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const viewport: Viewport = {
  themeColor: '#080d0b',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: 'GemTrail • AI Field Companion for Outdoor Observation',
  description:
    'An AI-powered outdoor field companion powered by local Gemma 3 1B. Put your screen away, observe rocks, minerals, and natural objects, and discover the geology in your backyard.',
  keywords: [
    'GemTrail',
    'Gemma 3',
    'Ollama',
    'Field Companion',
    'Geology',
    'Nature Journal',
    'Outdoor Exploration',
    'Rocks and Minerals',
    'Observation Coach',
  ],
  authors: [{ name: 'GemTrail Team' }],
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full dark`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="min-h-full flex flex-col antialiased selection:bg-emerald-500/30 selection:text-emerald-200">
        {children}
      </body>
    </html>
  );
}
