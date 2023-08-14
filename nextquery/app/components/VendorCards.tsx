import React from "react";
import Image from "next/image";
import { Vendor } from "../types";

interface Props {
  data: Vendor;
}

const RestaurantCards = ({ data }: Props) => {
  return (
    <>
      <div className='bg-white rounded-[16px] shadow-lg pb-1'>
        <div className='relative'>
          <Image
            src={data.banner?.url ? data.banner?.url : "/"}
            alt='rescard'
            width={378}
            height={180}
            className='mb-3 object-cover'
          />
          <div className='bg-yellow-500 flex w-[53px] px-2 right-2 top-2 absolute z-10 justify-around rounded-full'>
            <Image src='/Star.svg' alt='star' width={15} height={15} />
            <span className='text-white text-[18px] ml-2'>
              {data.rating.avg}
            </span>
          </div>
        </div>
        <div className='flex flex-wrap p-2 justify-between'>
          <div>
            <div>
              <p className='mb-2 text-blue-900 font-semibold text-2xl'>
                {data.name}
              </p>
            </div>
            <div className='flex items-center'>
              <p className='border mr-3 p-[6px] text-white bg-blue-800 rounded-full'>
                {data.sorts[0].name}
              </p>
              <p className='border mr-3 p-[6px] text-white bg-blue-500 rounded-full flex items-center'>
                <span className='font-semibold mr-2'>
                  {data.closest_sale_point?.distance.toFixed(2)} km
                </span>
                <Image src='/Send.svg' alt='send' width={15} height={15} />
              </p>
            </div>
          </div>
          <Image
            src={data.logo?.url || "/"}
            alt='reslogo'
            width={100}
            height={78}
            className='rounded-full'
          />
        </div>
      </div>
    </>
  );
};

export default RestaurantCards;
