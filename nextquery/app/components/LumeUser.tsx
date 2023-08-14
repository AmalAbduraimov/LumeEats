"use client";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import useUser from "../tanstack/queries/useUser";
import Link from "next/link";
import Cookies from "js-cookie";

interface Props {
  opened: boolean;
  $opened: (open: boolean) => void;
}

const LumeUser = ({ opened, $opened }: Props) => {
  const { data: user } = useUser({ enabled: false });
  const logout = () => {
    Cookies.remove("token");
    localStorage.removeItem("token");
    $opened(false);
  };

  return (
    <>
      <Transition show={opened} appear as={Fragment}>
        <Dialog
          as='div'
          className='relative z-10'
          onClose={() => $opened(false)}
        >
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>
          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel
                  className='relative overflow-y-auto transform rounded-2xl
               bg-white shadow-xl transition-all flex flex-col px-3 py-5'
                >
                  <div className='flex items-center justify-around mb-7'>
                    <span className='border rounded-full bg-[#165076] px-[25px] py-[20px]'>
                      <Image
                        src='https://eatslume.vercel.app/assets/icons/userWhite.svg'
                        alt='profile'
                        width={25}
                        height={25}
                      />
                    </span>
                    <div className=''>
                      <h1 className='text-[#165076] text-2xl'>{user?.name}</h1>
                      <p className='text-[#165076] text-2xl'>{user?.phone}</p>
                    </div>
                    <span
                      className='border cursor-pointer rounded-full bg-[#ff6868] px-[17px] py-[15px]'
                      onClick={logout}
                    >
                      <Image
                        src='https://eatslume.vercel.app/assets/icons/logout.svg'
                        alt='profile'
                        width={22}
                        height={22}
                      />
                    </span>
                  </div>

                  <div
                    className='flex w-[320px] flex-col list-none text-2xl'
                    onClick={() => $opened(false)}
                  >
                    <Link
                      href='/orders'
                      className='border rounded-2xl outline-none shadow-lg mb-5 px-3 py-1 border-none flex justify-between items-center'
                    >
                      <Image
                        src='https://eatslume.vercel.app/assets/icons/currentOrders.svg'
                        alt='orders'
                        width={20}
                        height={20}
                      />
                      <span>Текущие заказы</span>
                      <Image
                        src='https://eatslume.vercel.app/assets/icons/toRight.svg'
                        alt='right'
                        width={9}
                        height={9}
                      />
                    </Link>
                    <Link
                      href='/orders/history'
                      className='border rounded-2xl shadow-lg mb-5 px-3 py-1 border-none flex justify-between items-center'
                    >
                      <Image
                        src='https://eatslume.vercel.app/assets/icons/historyOfOrders.svg'
                        alt='orders'
                        width={20}
                        height={20}
                      />
                      <span>История заказов</span>
                      <Image
                        src='https://eatslume.vercel.app/assets/icons/toRight.svg'
                        alt='right'
                        width={9}
                        height={9}
                      />
                    </Link>
                    <Link
                      href='/'
                      className='border rounded-2xl shadow-lg mb-5 px-3 py-1 border-none flex justify-between items-center'
                    >
                      <Image
                        src='https://eatslume.vercel.app/assets/icons/myAddress.svg'
                        alt='orders'
                        width={20}
                        height={20}
                      />
                      <span>Мои адреса</span>
                      <Image
                        src='https://eatslume.vercel.app/assets/icons/toRight.svg'
                        alt='right'
                        width={9}
                        height={9}
                      />
                    </Link>
                    <Link
                      href='/favourite'
                      className='border rounded-2xl shadow-lg mb-5 px-3 py-1 border-none flex justify-between items-center'
                    >
                      <Image
                        src='https://eatslume.vercel.app/assets/icons/favourite.svg'
                        alt='orders'
                        width={20}
                        height={20}
                      />
                      <span>Любимое</span>
                      <Image
                        src='https://eatslume.vercel.app/assets/icons/toRight.svg'
                        alt='right'
                        width={9}
                        height={9}
                      />
                    </Link>
                    <Link
                      href='/'
                      className='border rounded-2xl shadow-lg mb-5 px-3 py-1 border-none flex justify-between items-center'
                    >
                      <Image
                        src='https://eatslume.vercel.app/assets/icons/setting.svg'
                        alt='orders'
                        width={20}
                        height={20}
                      />
                      <span>Настройка</span>
                      <Image
                        src='https://eatslume.vercel.app/assets/icons/toRight.svg'
                        alt='right'
                        width={9}
                        height={9}
                      />
                    </Link>
                    <Link
                      href='/'
                      className='border rounded-2xl shadow-lg mb-5 px-3 py-1 border-none flex justify-between items-center'
                    >
                      <Image
                        src='https://eatslume.vercel.app/assets/icons/supportService.svg'
                        alt='orders'
                        width={20}
                        height={20}
                      />
                      <span>Служба поддержки</span>
                      <Image
                        src='https://eatslume.vercel.app/assets/icons/toRight.svg'
                        alt='right'
                        width={9}
                        height={9}
                      />
                    </Link>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default LumeUser;
