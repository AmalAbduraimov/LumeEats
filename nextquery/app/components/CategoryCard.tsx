import React from "react";
import Image from "next/image";
import { Category } from "../types";

const CategoryCard = ({ name, image, product_count }: Category) => {
  return (
    <div className='bg-gradient-to-r w-[190px] from-cyan-500 to-blue-500 h-[180px] rounded-xl p-2 relative'>
      <p className='font-semibold leading-[14px] text-lg text-white '>{name}</p>
      <p className='rotate-[-90deg] text-lg absolute font-semibold left-[-13px] top-[110px]'>
        {product_count} - Место
      </p>
      <Image
        src={image || "/"}
        alt='reslogo'
        width={120}
        height={120}
        className='absolute right-[-18px] bottom-[-15px] rounded-full'
      />
    </div>
  );
};

export default CategoryCard;
