import type { Metadata } from 'next';
import { siteMetadata } from '@/lib/siteMetadata';
import FsawDetectionClient from './FsawDetectionClient';

const pageTitle = 'Deteksi Fuzzy SAW & Ranking Alternatif';
const pageDescription =
  'Masukkan alternatif, bobot, dan Triangular Fuzzy Number untuk langsung melihat normalisasi, pembobotan, serta ranking metode SAW yang transparan.';

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical:'https://tfsaw-greenflag.vercel.app/fsaw-detection',
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: 'https://tfsaw-greenflag.vercel.app/fsaw-detection',
    images: [
      {
        url: siteMetadata.socialImage,
        width: 1200,
        height: 630,
        alt: pageTitle,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: pageTitle,
    description: pageDescription,
    images: [siteMetadata.socialImage],
  },
};

export default function FsawDetectionPage() {
  return <FsawDetectionClient />;
}
