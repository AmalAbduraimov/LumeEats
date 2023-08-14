"use client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Image from "next/image";
import UserModal from "./UserModal";
import Link from "next/link";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnReconnect: true,
      refetchOnWindowFocus: false,
    },
  },
});

const Header = () => {
  const [basket, $basket] = useState([]);

  useEffect(() => {
    $basket(
      Cookies.get("basket") ? JSON.parse(Cookies.get("basket") || "") : []
    );
  }, []);

  return (
    <QueryClientProvider client={client}>
      <header className=' px-[410px] shadow-md py-10 bg-white'>
        <div className='flex justify-between'>
          <Link href='/' className='flex items-center'>
            <Image
              src='/Group.svg'
              alt='group'
              width={50}
              height={50}
              className='mr-5'
            />
            <h1 className='text-[21px] font-semibold text-[#165076]'>Basket</h1>
          </Link>

          <Link
            href='/location'
            className='border rounded-full p-3 shadow-md border-none'
          >
            <Image src='/Discovery.svg' alt='group' width={30} height={30} />
          </Link>

          <div className='relative'>
            <input
              type='text'
              placeholder='Поиск'
              className='w-[550px] relative border rounded-3xl p-3 shadow-md border-none outline-none'
            />
            <Image
              src='https://eatslume.vercel.app/assets/icons/search.svg'
              alt='search'
              width={23}
              height={23}
              className='absolute right-[20px] top-[14px]'
            />
          </div>
          <div className='flex items-center leading-[5px]'>
            <Image
              src='/call.svg'
              alt='Call'
              width={33}
              height={33}
              className='mr-3'
            />
            <p className=''>
              Call center <br />
              <span className='text-lg font-semibold text-[#165076]'>
                +998908053502
              </span>
            </p>
          </div>
          <div className='flex items-center'>
            <div className='border rounded-full p-3 shadow-md border-none mr-7 relative'>
              <Link href='/basket'>
                <Image src='/Bag.svg' alt='basket' width={30} height={30} />
                {basket?.length >= 1 ? (
                  <span className='border absolute top-[-5px] right-[-5px] px-2 rounded-full bg-yellow-500 text-white text-[18px]'>
                    {basket?.length}
                  </span>
                ) : (
                  ""
                )}
              </Link>
            </div>
            <UserModal />
          </div>
        </div>
      </header>
    </QueryClientProvider>
  );
};

export default Header;
