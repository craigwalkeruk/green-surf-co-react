import * as React from 'react';
import { Button } from '../button';
import { Image } from '../image/image';
import leavesImg from '@/assets/world-peas/leaves.png';
import breadImg from '@/assets/world-peas/bread.png';
import { cn } from '@/utils/cn';

const Header = () => (
  <header className="flex items-center justify-between px-6 py-8 md:px-12 lg:px-24">
    <h1 className="text-2xl md:text-3xl font-serif text-[#426b1f] font-medium tracking-tight">
      World Peas
    </h1>
    <nav aria-label="Main Navigation" className="hidden md:flex items-center space-x-8 text-sm md:text-base font-normal">
      <a href="#" className="hover:text-[#426b1f] transition-colors">Shop</a>
      <a href="#" className="hover:text-[#426b1f] transition-colors">Newstand</a>
      <a href="#" className="hover:text-[#426b1f] transition-colors">Who we are</a>
      <a href="#" className="hover:text-[#426b1f] transition-colors">My profile</a>
    </nav>
    <Button className="bg-[#426b1f] hover:bg-[#355619] rounded-lg px-6 h-12 text-white">
      Basket (3)
    </Button>
  </header>
);

const Hero = () => (
  <section className="px-6 py-16 md:px-12 lg:px-24 flex flex-col items-center text-center">
    <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif leading-tight max-w-4xl tracking-tight">
      We’re <span className="italic">farmers</span>, <span className="italic">purveyors</span>, and <span className="italic">eaters</span> of organically grown food.
    </h2>
    <Button className="mt-12 bg-[#426b1f] hover:bg-[#355619] rounded-lg px-8 h-16 text-lg md:text-xl">
      Browse our shop
    </Button>
  </section>
);

const ImageGrid = () => (
  <section className="px-6 py-12 md:px-12 lg:px-24 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
    <div className="md:col-span-5 aspect-[3/4] overflow-hidden">
      <Image 
        src={leavesImg} 
        alt="Fresh green leaves" 
        className="w-full h-full object-cover"
      />
    </div>
    <div className="md:col-span-7 flex flex-col">
      <div className="aspect-video overflow-hidden">
        <Image 
          src={breadImg} 
          alt="Artisan bread with fresh produce" 
          className="w-full h-full object-cover"
        />
      </div>
      <p className="mt-4 text-sm md:text-base max-w-md">
        <span className="font-semibold">Central California</span> — The person who grew these was located in Central California and, er, hopefully very well-compensated.
      </p>
    </div>
  </section>
);

const Beliefs = () => (
  <section className="px-6 py-24 md:px-12 lg:px-24 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
    <div className="md:col-span-3">
      <h3 className="text-xs md:text-sm font-semibold uppercase tracking-widest">
        What we believe
      </h3>
    </div>
    <div className="md:col-span-9 space-y-8 text-lg md:text-xl leading-relaxed">
      <p>
        We believe in produce. Tasty produce. Produce like:
      </p>
      <p className="text-gray-700">
        Apples. Oranges. Limes. Lemons. Guavas. Carrots. Cucumbers. Jicamas. Cauliflowers. Brussels sprouts. Shallots. Japanese eggplants. Asparagus. Artichokes—Jerusalem artichokes, too. Radishes. Broccoli. Baby broccoli. Broccolini. Bok choy. Scallions. Ginger. Cherries. Raspberries. Cilantro. Parsley. Dill.
      </p>
      <p>
        What are we forgetting?
      </p>
      <p className="text-gray-700">
        Oh! Onions. Yams. Avocados. Lettuce. Arugula (to some, “rocket”). Persian cucumbers, in addition to aforementioned “normal” cucumbers. Artichokes. Zucchinis. Pumpkins. Squash (what some cultures call pumpkins). Sweet potatoes and potato-potatoes. Jackfruit. Monk fruit. Fruit of the Loom. Fruits of our labor (this website). Sorrel. Pineapple. Mango. Gooseberries. Blackberries. Tomatoes. Heirloom tomatoes. Beets. Chives. Corn. Endive. Escarole, which, we swear, we’re vendors of organic produce, but if you asked us to describe what escaroles are...
      </p>
    </div>
  </section>
);

export const WorldPeasHomepage = () => {
  return (
    <div className="bg-white min-h-screen text-black font-sans">
      <Header />
      <main>
        <Hero />
        <ImageGrid />
        <Beliefs />
      </main>
    </div>
  );
};
