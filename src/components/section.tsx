import React from 'react';
import Image from 'next/image';
import { GridPatternDemo } from '@/components/fragments/molecule/GridPatternDemo';
import { ShimmerButton } from '@/components/magicui/shimmer-button';
import Link from 'next/link';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import IconTeam from '@/components/iconteam';
const world = `Eksplorasi Fuzzy Simple Additive Weighting`;
const Section = () => {
  return (
    <section
      id='home-section'
      className='relative flex w-full min-h-screen items-center justify-center overflow-hidden py-16'
    >
      <GridPatternDemo className='absolute inset-0 h-full w-full' />
      <div className='relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 md:px-8'>
        <IconTeam />
        <div className='flex flex-col-reverse items-center justify-between gap-10 md:flex-row md:items-center'>
          <div className='w-full max-w-xl text-center md:text-left'>
            <h2 className='text-3xl md:text-5xl lg:text-6xl font-bold mb-4 text-black'>
              <TextGenerateEffect
                words={world}
                className='w-full font-extrabold'
                textColor='text-black'
              />
            </h2>

            <p className='text-base md:text-lg lg:text-xl mb-6 text-gray-600'>
              Pelajari cara menerapkan metode Fuzzy Simple Additive Weighting (SAW) untuk menilai berbagai
              alternatif keputusan. Pahami tahapan penilaian fuzzy, normalisasi, hingga pembobotan agar
              proses pengambilan keputusan menjadi lebih transparan dan terukur.
            </p>
            <div className='flex justify-center md:justify-start'>
              <Link href='/fsaw-detection' passHref>
                <ShimmerButton className='text-base font-semibold px-6 py-3' background='#87003d' shimmerSize='0.1em'>
                  Yuk, Deteksi
                </ShimmerButton>
              </Link>
            </div>
          </div>
          <div className='flex w-full max-w-md justify-center md:max-w-lg'>
            <div className='relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-xl overflow-hidden'>
              <Image
                src='/gigii.png'
                alt='Logo'
                objectFit='cover'
                width={600}
                height={600}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section;
