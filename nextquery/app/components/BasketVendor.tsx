import React from "react";
import Image from "next/image";
import { VendorType } from "../types";
import Link from "next/link";

interface Props {
  vendor?: VendorType;
}

const BasketVendor = ({ vendor }: Props) => {
  return (
    <div className='bg-white shadow-md rounded-3xl py-5 px-7 flex items-center relative justify-between mb-7'>
      <div className='flex items-center'>
        <Image
          src={vendor?.logo?.url || "/"}
          alt='reslogo'
          width={60}
          height={60}
          className='mr-6 rounded-full'
        />
        <p className='text-[24px] font-semibold'>{vendor?.name}</p>
      </div>
      <div className='flex'>
        <Image
          src='https://eatslume.vercel.app/assets/icons/minOrder.svg'
          alt='minOrder'
          width={55}
          height={55}
          className='mr-4'
        />
        <p className='text-[21px] font-semibold'>
          Мин заказ <br />
          <span className='font-semibold text-[21px] text-[#6D6D6D]'>
            minorder
          </span>
        </p>
      </div>
      <div className='flex items-center mr-32'>
        <Image
          src='https://eatslume.vercel.app/assets/icons/timer.svg'
          alt='timer'
          width={60}
          height={60}
          className='mr-5'
        />
        <p className='text-[21px] font-semibold'>
          Время работы <br />
          <span className='font-semibold text-[21px] text-[#6D6D6D]'>
            {vendor?.workdays[0].open_time} - {vendor?.workdays[0].close_time}
          </span>
        </p>
      </div>
      <Link
        href={`/restaurant/${vendor?.id}`}
        className='absolute right-[15px] bottom-[12px]'
      >
        <Image
          src='https://eatslume.vercel.app/assets/icons/info.svg'
          alt='info'
          width={35}
          height={35}
        />
      </Link>
    </div>
  );
};

export default BasketVendor;
