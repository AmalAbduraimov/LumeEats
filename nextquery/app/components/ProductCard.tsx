import React from "react";
import Image from "next/image";
import { Product } from "../types";

interface Props {
  data: Product;
}

const ProductCard = ({ data }: Props) => {
  return (
    <div className='bg-white rounded-[16px] relative w-[390px] mb-5 shadow-xl p-3'>
      <div className='relative h-[170px]'>
        <Image
          src={data.image?.url || "/"}
          alt='food'
          width={370}
          height={140}
          className='rounded-[16px]'
        />
        <div className='absolute right-[-9px] rounded-tl-[20px] top-[141px] z-10 border bg-white border-none pt-[6px] pl-[6px]'>
          <Image
            src={data.vendor_logo?.url || "/"}
            alt='foodlogo'
            width={50}
            height={50}
            className='rounded-full'
          />
        </div>
      </div>
      <div className='flex items-end mt-10 justify-between'>
        <p className='mb-2 text-blue-900 font-semibold text-2xl'>{data.name}</p>
        <p className='mb-2 text-blue-400 font-semibold text-lg'>
          {data.params[0].price} сум
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
