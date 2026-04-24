import * as React from 'react';

import breadImg from '@/assets/world-peas/bread.png';
import leavesImg from '@/assets/world-peas/leaves.png';

import { Button } from '../button';
import { Image } from '../image/image';

const Header = () => (
  <header className="flex items-center justify-between px-6 py-6 md:px-14 md:py-0 md:h-28">
    <h1 className="font-serif text-2xl font-medium leading-none tracking-tight text-[#426b1f] md:text-[32px]">
      World Peas
    </h1>
    <nav
      aria-label="Main Navigation"
      className="hidden items-center space-x-10 text-base font-normal md:flex"
    >
      <a href="#" className="transition-colors hover:text-[#426b1f]">
        Shop
      </a>
      <a href="#" className="transition-colors hover:text-[#426b1f]">
        Newstand
      </a>
      <a href="#" className="transition-colors hover:text-[#426b1f]">
        Who we are
      </a>
      <a href="#" className="transition-colors hover:text-[#426b1f]">
        My profile
      </a>
    </nav>
    <Button className="h-10 rounded-lg bg-[#426b1f] px-5 text-sm font-semibold text-white hover:bg-[#355619] md:h-12 md:px-6 md:text-base">
      Basket (3)
    </Button>
  </header>
);

const Hero = () => (
  <section className="flex flex-col items-center px-6 pt-16 text-center md:px-24 md:pt-28 lg:pt-[167px]">
    <h2 className="mx-auto max-w-4xl font-serif text-4xl leading-[1.2] tracking-tight md:text-5xl lg:text-[64px] lg:tracking-[-1.28px]">
      We're <span className="italic">farmers</span>,{' '}
      <span className="italic">purveyors</span>, and{' '}
      <span className="italic">eaters</span> of organically grown food.
    </h2>
    <div className="mt-8 flex w-full justify-center md:mt-10">
      <Button className="h-14 w-48 rounded-lg bg-[#426b1f] px-8 text-base font-semibold leading-[1.3] hover:bg-[#355619] md:h-16 md:w-56 md:text-lg lg:h-[64px] lg:w-[227px] lg:text-[20px]">
        Browse our shop
      </Button>
    </div>
  </section>
);

const ImageGrid = () => (
  <section className="flex flex-col gap-6 px-6 pt-16 md:grid md:grid-cols-12 md:items-start md:gap-x-4 md:px-24 md:pt-24 lg:pt-[180px]">
    <div className="h-72 overflow-hidden md:col-span-5 md:h-[693px]">
      <Image
        src={leavesImg}
        alt="Fresh green leaves"
        className="size-full object-cover"
        loading="eager"
      />
    </div>
    <div className="hidden md:col-span-1 md:block"></div>
    <div className="flex flex-col md:col-span-6 md:pt-20 lg:pt-[90px]">
      <div className="h-60 overflow-hidden md:h-[480px]">
        <Image
          src={breadImg}
          alt="Artisan bread with fresh produce"
          className="size-full object-cover"
          loading="eager"
        />
      </div>
      <p className="mt-4 text-sm leading-[1.6]">
        <span className="font-medium">Central California</span> —{' '}
        <span className="font-light text-black">
          The person who grew these was located in Central California and, er,
          hopefully very well-compensated.
        </span>
      </p>
    </div>
  </section>
);

const Beliefs = () => (
  <section className="flex flex-col gap-6 px-6 pb-16 pt-16 md:grid md:grid-cols-12 md:gap-x-4 md:px-24 md:pb-24 md:pt-28 lg:pb-[160px] lg:pt-[210px]">
    <div className="md:col-span-2">
      <h3 className="text-sm font-semibold uppercase leading-[1.6] tracking-[0.56px] md:pt-[5px]">
        What we believe
      </h3>
    </div>
    <div className="text-base leading-[1.6] md:col-span-10 md:text-lg lg:text-[20px]">
      <div className="max-w-3xl lg:max-w-[822px]">
        <p>We believe in produce. Tasty produce. Produce like:</p>
        <p className="mt-6 md:mt-8">
          Apples. Oranges. Limes. Lemons. Guavas. Carrots. Cucumbers. Jicamas.
          Cauliflowers. Brussels sprouts. Shallots. Japanese eggplants.
          Asparagus. Artichokes—Jerusalem artichokes, too. Radishes. Broccoli.
          Baby broccoli. Broccolini. Bok choy. Scallions. Ginger. Cherries.
          Raspberries. Cilantro. Parsley. Dill.
        </p>
        <p className="mt-6 md:mt-8">What are we forgetting?</p>
        <p className="mt-6 md:mt-8">
          Oh! Onions. Yams. Avocados. Lettuce. Arugula (to some, "rocket").
          Persian cucumbers, in addition to aforementioned "normal" cucumbers.
          Artichokes. Zucchinis. Pumpkins. Squash (what some cultures call
          pumpkins). Sweet potatoes and potato-potatoes. Jackfruit. Monk fruit.
          Fruit of the Loom. Fruits of our labor (this website). Sorrel.
          Pineapple. Mango. Gooseberries. Blackberries. Tomatoes. Heirloom
          tomatoes. Beets. Chives. Corn. Endive. Escarole, which, we swear,
          we’re vendors of organic produce, but if you asked us to describe what
          escaroles are...
        </p>
      </div>
    </div>
  </section>
);

export const WorldPeasHomepage = () => {
  return (
    <div className="mx-auto w-full max-w-[1440px] bg-white font-sans text-black">
      <Header />
      <main>
        <Hero />
        <ImageGrid />
        <Beliefs />
      </main>
    </div>
  );
};
