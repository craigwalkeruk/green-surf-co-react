import * as React from 'react';
import { Button } from '../button';
import { Image } from '../image/image';
import leavesImg from '@/assets/world-peas/leaves.png';
import breadImg from '@/assets/world-peas/bread.png';
import { cn } from '@/utils/cn';

const Header = () => (
  <header className="flex items-center justify-between px-[56px] h-[112px]">
    <h1 className="text-[32px] font-serif text-[#426b1f] font-medium tracking-[-0.32px] leading-none">
      World Peas
    </h1>
    <nav aria-label="Main Navigation" className="hidden md:flex items-center space-x-[40px] text-base font-normal">
      <a href="#" className="hover:text-[#426b1f] transition-colors">Shop</a>
      <a href="#" className="hover:text-[#426b1f] transition-colors">Newstand</a>
      <a href="#" className="hover:text-[#426b1f] transition-colors">Who we are</a>
      <a href="#" className="hover:text-[#426b1f] transition-colors">My profile</a>
    </nav>
    <Button className="bg-[#426b1f] hover:bg-[#355619] rounded-lg px-6 h-12 text-white text-base font-semibold">
      Basket (3)
    </Button>
  </header>
);

const Hero = () => (
  <section className="px-24 pt-[167px] flex flex-col items-center text-center">
    <h2 className="text-[64px] font-serif leading-[1.2] tracking-[-1.28px] max-w-none mx-auto">
      We’re <span className="italic">farmers</span>, <span className="italic">purveyors</span>, and <span className="italic">eaters</span> of organically grown food.
    </h2>
    <div className="flex justify-center w-full mt-[38px]">
      <Button className="bg-[#426b1f] hover:bg-[#355619] rounded-lg px-8 h-[64px] w-[227px] text-[20px] font-semibold leading-[1.3]">
        Browse our shop
      </Button>
    </div>
  </section>
);

const ImageGrid = () => (
  <section className="px-24 pt-[180px] grid grid-cols-12 gap-x-[15px] items-start">
    <div className="col-span-5 h-[693px] overflow-hidden">
      <Image 
        src={leavesImg} 
        alt="Fresh green leaves" 
        className="w-full h-full object-cover"
        loading="eager"
      />
    </div>
    <div className="col-span-1"></div>
    <div className="col-span-6 flex flex-col pt-[90px]">
      <div className="h-[480px] overflow-hidden">
        <Image 
          src={breadImg} 
          alt="Artisan bread with fresh produce" 
          className="w-full h-full object-cover"
          loading="eager"
        />
      </div>
      <p className="mt-[16px] text-sm leading-[1.6]">
        <span className="font-medium">Central California</span> — <span className="font-light text-black">The person who grew these was located in Central California and, er, hopefully very well-compensated.</span>
      </p>
    </div>
  </section>
);

const Beliefs = () => (
  <section className="px-24 pt-[210px] grid grid-cols-12 gap-x-[15px] pb-[160px]">
    <div className="col-span-2">
      <h3 className="text-sm font-semibold leading-[1.6] uppercase tracking-[0.56px] pt-[5px]">
        What we believe
      </h3>
    </div>
    <div className="col-span-10 text-[20px] leading-[1.6]">
      <div className="max-w-[822px]">
        <p>We believe in produce. Tasty produce. Produce like:</p>
        <p className="mt-[32px]">
          Apples. Oranges. Limes. Lemons. Guavas. Carrots. Cucumbers. Jicamas. Cauliflowers. Brussels sprouts. Shallots. Japanese eggplants. Asparagus. Artichokes—Jerusalem artichokes, too. Radishes. Broccoli. Baby broccoli. Broccolini. Bok choy. Scallions. Ginger. Cherries. Raspberries. Cilantro. Parsley. Dill.
        </p>
        <p className="mt-[32px]">
          What are we forgetting?
        </p>
        <p className="mt-[32px]">
          Oh! Onions. Yams. Avocados. Lettuce. Arugula (to some, “rocket”). Persian cucumbers, in addition to aforementioned “normal” cucumbers. Artichokes. Zucchinis. Pumpkins. Squash (what some cultures call pumpkins). Sweet potatoes and potato-potatoes. Jackfruit. Monk fruit. Fruit of the Loom. Fruits of our labor (this website). Sorrel. Pineapple. Mango. Gooseberries. Blackberries. Tomatoes. Heirloom tomatoes. Beets. Chives. Corn. Endive. Escarole, which, we swear, we’re vendors of organic produce, but if you asked us to describe what escaroles are...
        </p>
      </div>
    </div>
  </section>
);

export const WorldPeasHomepage = () => {
  return (
    <div className="bg-white text-black font-sans w-[1440px] h-[2092px] relative overflow-hidden">
      <Header />
      <main>
        <Hero />
        <ImageGrid />
        <Beliefs />
      </main>
    </div>
  );
};
