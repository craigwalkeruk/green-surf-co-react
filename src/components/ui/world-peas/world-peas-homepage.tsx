import * as React from 'react';

import breadImg from '@/assets/world-peas/bread.png';
import leavesImg from '@/assets/world-peas/leaves.png';

import { Button } from '../button';
import { Image } from '../image/image';

const Header = () => (
  <header className="flex h-[112px] items-center justify-between px-[56px]">
    <h1 className="font-serif text-[32px] font-medium leading-none tracking-[-0.32px] text-[#426b1f]">
      World Peas
    </h1>
    <nav
      aria-label="Main Navigation"
      className="hidden items-center space-x-[40px] text-base font-normal md:flex"
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
    <Button className="h-12 rounded-lg bg-[#426b1f] px-6 text-base font-semibold text-white hover:bg-[#355619]">
      Basket (3)
    </Button>
  </header>
);

const Hero = () => (
  <section className="flex flex-col items-center px-24 pt-[167px] text-center">
    <h2 className="mx-auto max-w-none font-serif text-[64px] leading-[1.2] tracking-[-1.28px]">
      We’re <span className="italic">farmers</span>,{' '}
      <span className="italic">purveyors</span>, and{' '}
      <span className="italic">eaters</span> of organically grown food.
    </h2>
    <div className="mt-[38px] flex w-full justify-center">
      <Button className="h-[64px] w-[227px] rounded-lg bg-[#426b1f] px-8 text-[20px] font-semibold leading-[1.3] hover:bg-[#355619]">
        Browse our shop
      </Button>
    </div>
  </section>
);

const ImageGrid = () => (
  <section className="grid grid-cols-12 items-start gap-x-[15px] px-24 pt-[180px]">
    <div className="col-span-5 h-[693px] overflow-hidden">
      <Image
        src={leavesImg}
        alt="Fresh green leaves"
        className="size-full object-cover"
        loading="eager"
      />
    </div>
    <div className="col-span-1"></div>
    <div className="col-span-6 flex flex-col pt-[90px]">
      <div className="h-[480px] overflow-hidden">
        <Image
          src={breadImg}
          alt="Artisan bread with fresh produce"
          className="size-full object-cover"
          loading="eager"
        />
      </div>
      <p className="mt-[16px] text-sm leading-[1.6]">
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
  <section className="grid grid-cols-12 gap-x-[15px] px-24 pb-[160px] pt-[210px]">
    <div className="col-span-2">
      <h3 className="pt-[5px] text-sm font-semibold uppercase leading-[1.6] tracking-[0.56px]">
        What we believe
      </h3>
    </div>
    <div className="col-span-10 text-[20px] leading-[1.6]">
      <div className="max-w-[822px]">
        <p>We believe in produce. Tasty produce. Produce like:</p>
        <p className="mt-[32px]">
          Apples. Oranges. Limes. Lemons. Guavas. Carrots. Cucumbers. Jicamas.
          Cauliflowers. Brussels sprouts. Shallots. Japanese eggplants.
          Asparagus. Artichokes—Jerusalem artichokes, too. Radishes. Broccoli.
          Baby broccoli. Broccolini. Bok choy. Scallions. Ginger. Cherries.
          Raspberries. Cilantro. Parsley. Dill.
        </p>
        <p className="mt-[32px]">What are we forgetting?</p>
        <p className="mt-[32px]">
          Oh! Onions. Yams. Avocados. Lettuce. Arugula (to some, “rocket”).
          Persian cucumbers, in addition to aforementioned “normal” cucumbers.
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
    <div className="relative h-[2092px] w-[1440px] overflow-hidden bg-white font-sans text-black">
      <Header />
      <main>
        <Hero />
        <ImageGrid />
        <Beliefs />
      </main>
    </div>
  );
};
