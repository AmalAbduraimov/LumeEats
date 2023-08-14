"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import VerifyModal from "./VerifyModal";
import verifyMutation from "../tanstack/mutations/verifyMutation";

interface Props {
  opened: boolean;
  $opened: (open: boolean) => void;
}

const AuthorizationModal = ({ opened, $opened }: Props) => {
  const [phone, $phone] = useState("");
  const [step, $step] = useState(1);
  const { mutate } = verifyMutation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ phone }, { onSuccess: () => $step(2) });
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
                      <h1 className='text-center text-2xl font-semibold mb-7'>
                        Авторизация
                      </h1>
                      <p className='text-xl/8 mb-7'>
                        Введите номер телефона, на который <br /> мы вышлем
                        проверочный код
                      </p>
                      <input
                        max={9}
                        min={9}
                        type='phone'
                        className='w-full border border-blue-500 rounded-[10px] mb-7 h-14'
                        value={phone}
                        onChange={(e) => $phone(e.target.value)}
                      />
                      <p className='text-xl/8 mb-7'>
                        Нажимая кнопку продолжить вы <br /> соглашаетесь с
                        условиями <br /> оферты
                      </p>
                      <button className='text-center px-10 w-full py-[16px] rounded-full bg-blue-900 text-white'>
                        Получить код
                      </button>
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      ) : (
        <VerifyModal opened={opened} $opened={$opened} phone={phone} />
      )}
    </>
  );
};

export default AuthorizationModal;
