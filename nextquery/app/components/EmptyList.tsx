"use client";
import React from "react";
import Image from "next/image";

const EmptyList = () => {
  return (
    <div className='mx-[580px] py-[290px] flex flex-col items-center'>
      <Image
        src='https://eatslume.vercel.app/assets/icons/emptylist.svg'
        alt='emtylist'
        width={130}
        height={130}
        className='mb-5'
      />
      <p className='font-bold text-start text-[27px]'>Список пуст</p>
    </div>
  );
};

export default EmptyList;
