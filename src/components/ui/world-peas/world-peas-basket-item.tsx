import { Pencil1Icon } from '@radix-ui/react-icons';
import * as React from 'react';

import { cn } from '@/utils/cn';

const DEFAULT_EDIT_LABEL = 'Edit quantity';

type ProducePreviewProps = {
  className?: string;
};

const ProducePreview = ({ className }: ProducePreviewProps) => (
  <div
    aria-hidden="true"
    className={cn(
      'relative flex h-full w-full items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_35%_35%,#ffffff_0%,#fff7f2_35%,#f3efe8_100%)]',
      className,
    )}
  >
    <div className="absolute left-[38px] top-[41px] h-[92px] w-[92px] rounded-full bg-[rgba(95,56,40,0.18)] blur-[2px]" />
    <div className="absolute left-[29px] top-[29px] h-[96px] w-[96px] rounded-full bg-[radial-gradient(circle_at_32%_28%,#ffb785_0%,#ff7b2d_38%,#ef5a20_72%,#dd4619_100%)] shadow-[0_8px_18px_rgba(221,70,25,0.22)]" />
    <div className="absolute left-[58px] top-[27px] h-[54px] w-[12px] -rotate-[8deg] rounded-full bg-[linear-gradient(180deg,#6e8e31_0%,#486420_100%)]" />
    <div className="absolute left-[43px] top-[44px] h-[12px] w-[44px] -rotate-[52deg] rounded-full bg-[linear-gradient(180deg,#6e8e31_0%,#486420_100%)]" />
    <div className="absolute left-[61px] top-[42px] h-[12px] w-[40px] rotate-[18deg] rounded-full bg-[linear-gradient(180deg,#6e8e31_0%,#486420_100%)]" />
    <div className="absolute left-[55px] top-[57px] h-[12px] w-[46px] rotate-[72deg] rounded-full bg-[linear-gradient(180deg,#6e8e31_0%,#486420_100%)]" />
    <div className="absolute left-[41px] top-[62px] h-[12px] w-[40px] -rotate-[84deg] rounded-full bg-[linear-gradient(180deg,#6e8e31_0%,#486420_100%)]" />
    <div className="absolute left-[52px] top-[53px] h-[12px] w-[12px] rounded-full bg-[#587728]" />
    <div className="absolute left-[43px] top-[52px] h-[10px] w-[10px] rounded-full bg-[rgba(255,255,255,0.35)]" />
  </div>
);

export type WorldPeasBasketItemProps = {
  className?: string;
  editLabel?: string;
  itemName?: string;
  itemTotal?: string;
  itemValue?: string;
  quantity?: string;
  onEditQuantity?: () => void;
};

export const WorldPeasBasketItem = ({
  className,
  editLabel = DEFAULT_EDIT_LABEL,
  itemName = 'Item Name e.g. Apple',
  itemTotal = '$5.99',
  itemValue = 'Item Value e.g. $5.99 / lb',
  quantity = '1 lb',
  onEditQuantity,
}: WorldPeasBasketItemProps) => {
  return (
    <article
      className={cn(
        'grid min-h-[159px] grid-cols-[160px_minmax(0,1fr)] overflow-hidden rounded-[24px] border-2 border-[#e6e6e6] bg-[#fafaf5]',
        className,
      )}
    >
      <ProducePreview />
      <div className="flex items-start justify-between gap-6 px-[22px] py-[22px]">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-[20px] font-semibold leading-[1.3] text-black">
            {itemName}
          </h3>
          <p className="mt-1 truncate text-[20px] font-semibold leading-[1.3] text-[#426b1f]">
            {itemValue}
          </p>
          <button
            type="button"
            onClick={onEditQuantity}
            aria-label={editLabel}
            className="mt-[18px] inline-flex h-10 items-center gap-3 rounded-[999px] border-2 border-[rgba(0,0,0,0.06)] bg-white px-[14px] text-left text-[16px] font-semibold leading-[1.3] text-black transition-colors hover:bg-[#f8f8f3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#426b1f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fafaf5]"
          >
            <span>{quantity}</span>
            <Pencil1Icon className="h-4 w-4 text-[rgba(0,0,0,0.65)]" />
          </button>
        </div>
        <p className="shrink-0 text-[20px] font-semibold leading-[1.3] text-black">
          {itemTotal}
        </p>
      </div>
    </article>
  );
};
