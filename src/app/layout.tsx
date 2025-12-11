import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { siteMetadata } from '@/lib/siteMetadata';
import { Toaster } from '@/components/ui/sonner';
import { SmoothCursor } from '@/components/ui/smooth-cursor';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const metadataBase = new URL(siteMetadata.siteUrl);

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: `${siteMetadata.tagline} | ${siteMetadata.name}`,
    template: `%s | ${siteMetadata.name}`,
  },
  
  description: siteMetadata.description,
  keywords: siteMetadata.keywords,
  applicationName: siteMetadata.name,
  generator: 'Next.js 16',
  referrer: 'origin-when-cross-origin',
  authors: [{ name: siteMetadata.author }],
  creator: siteMetadata.author,
  publisher: siteMetadata.publisher,
  category: 'technology',
  alternates: {
    canonical: '/',
    languages: {
      'id-ID': '/',
    },
  },
  openGraph: {
    type: 'website',
    url: '/',
    title: `${siteMetadata.tagline} | ${siteMetadata.name}`,
    description: siteMetadata.description,
    siteName: siteMetadata.name,
    locale: siteMetadata.locale,
    images: [
      {
        url: siteMetadata.socialImage,
        width: 1200,
        height: 630,
        alt: siteMetadata.tagline,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: siteMetadata.twitterHandle,
    creator: siteMetadata.twitterHandle,
    title: `${siteMetadata.tagline} | ${siteMetadata.name}`,
    description: siteMetadata.description,
    images: [siteMetadata.socialImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/gigi.png',
    shortcut: '/gigi.png',
    apple: '/gigi.png',
  },
  // verification: {
  //   other: {
  //     'google-site-verification': process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? '',
  //   },
  // },
  other: {
    "google-site-verification": "ABCDEFG12345",
  },
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteMetadata.name,
    url: siteMetadata.siteUrl,
    headline: siteMetadata.tagline,
    description: siteMetadata.description,
    inLanguage: 'id-ID',
    publisher: {
      '@type': 'Organization',
      name: siteMetadata.publisher,
      url: siteMetadata.siteUrl,
      logo: `${metadataBase.origin}/gigi.png`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteMetadata.siteUrl}/fsaw-detection?query={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  } as const;

  return (
    <html lang='id'>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <script
          type='application/ld+json'
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
        <SmoothCursor />
        <Toaster />
      </body>
    </html>
  );
}
