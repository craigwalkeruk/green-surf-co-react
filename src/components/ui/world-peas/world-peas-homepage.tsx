import * as React from 'react';

import { Button } from '../button';
import { Image } from '../image/image';

const leafyGreensImg =
  'http://localhost:3845/assets/76f3f33d7951544296fe5516d1417ff7d33f1e60.png';
const breadStillLifeImg =
  'http://localhost:3845/assets/0df0723d98ed140baad5fa88103f2153d6fd6a19.png';

export const WorldPeasHomepage = () => {
  return (
    <div className="relative h-[2092px] w-[1440px] overflow-hidden bg-white font-sans text-black">
      <header className="absolute inset-x-0 top-0 h-[112px] overflow-hidden">
        <h1 className="absolute left-24 top-[41px] font-['Newsreader',serif] text-[32px] font-medium leading-none tracking-[-0.32px] text-[#426b1f]">
          World Peas
        </h1>
        <nav
          aria-label="Main Navigation"
          className="absolute right-[280px] top-[50px] flex items-center gap-[40px] text-[16px] font-normal leading-[1.3]"
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
        <Button className="absolute right-24 top-8 min-w-[126px] rounded-[8px] px-[18px] text-[16px] font-semibold text-white hover:bg-[#355619]">
          Basket (3)
        </Button>
      </header>

      <h2 className="absolute left-1/2 top-[279px] w-[1164px] -translate-x-1/2 text-center font-['Newsreader',serif] text-[64px] font-normal leading-[1.2] tracking-[-1.28px] text-black">
        We’re <span className="italic">farmers</span>,{' '}
        <span className="italic">purveyors</span>, and{' '}
        <span className="italic">eaters</span> of organically grown food.
      </h2>

      <Button className="absolute left-1/2 top-[481px] h-[64px] w-[227px] -translate-x-1/2 rounded-[8px] px-0 text-[20px] font-semibold leading-[1.3] hover:bg-[#355619]">
        Browse our shop
      </Button>

      <div className="absolute left-24 top-[701px] h-[693px] w-[481px] overflow-hidden">
        <Image
          src={leafyGreensImg}
          alt="Fresh green leaves"
          className="size-full object-cover"
          loading="eager"
        />
      </div>

      <div className="absolute left-[660px] top-[791px] h-[480px] w-[684px] overflow-hidden">
        <Image
          src={breadStillLifeImg}
          alt="Artisan bread with fresh produce"
          className="size-full object-cover"
          loading="eager"
        />
      </div>

      <p className="absolute left-[660px] top-[1287px] w-[640px] text-[14px] leading-[1.6] tracking-[-0.14px] text-black">
        <span className="font-medium">Central California</span>
        <span className="font-light">
          {' '}
          — The person who grew these was located in Central California and, er,
          hopefully very well-compensated.
        </span>
      </p>

      <h3 className="absolute left-24 top-[1555px] w-[181px] text-[14px] font-semibold uppercase leading-[1.6] tracking-[0.56px] text-black">
        What we believe
      </h3>

      <div className="absolute left-[309px] top-[1550px] w-[822px] text-[20px] leading-[1.6] text-black">
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
  );
};
