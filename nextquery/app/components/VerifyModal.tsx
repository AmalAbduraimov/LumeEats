"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import LumeUser from "./LumeUser";
import authMutation from "../tanstack/mutations/authMutation";

interface Props {
  opened: boolean;
  $opened: (open: boolean) => void;
  phone: string;
}

const VerifyModal = ({ opened, phone, $opened }: Props) => {
  const [code, $code] = useState("");
  const [step, $step] = useState(1);
  const { mutate } = authMutation();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(
      { phone, verify_code: code },
      {
        onSuccess: () => $step(2),
      }
    );
  };
  return (
    <>
      {step === 1 ? (
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
                    <form onSubmit={handleSubmit}>
                      <h1 className='text-center text-2xl font-[700] mb-7'>
                        Код из СМС
                      </h1>
                      <p className='text-[18px] mb-7'>
                        Введите код из СМС, которую мы
                        <br />
                        отправили на ваш мобильный телефон.
                      </p>
                      <input
                        type='text'
                        max={4}
                        min={4}
                        className='w-full border border-blue-500 rounded-[10px] mb-7 h-14'
                        value={code}
                        onChange={(e) => $code(e.target.value)}
                      />
                      <p className='text-center text-blue-500 text-[18px] mb-7'>
                        Отправить код обратно
                      </p>
                      <button className='text-center px-10 w-full py-[16px] rounded-full bg-blue-900 text-white mb-7'>
                        Войти
                      </button>
                      <p>Набрали неправильный номер?</p>
                      <p className='text-blue-500'>Вернуться в авторизацию</p>
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      ) : (
        <LumeUser opened={opened} $opened={$opened} />
      )}
    </>
  );
};

export default VerifyModal;
