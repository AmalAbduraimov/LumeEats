"use client";
import Image from "next/image";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Cookies from "js-cookie";
import { useSearchParams, useRouter } from "next/navigation";
import useProduct from "../tanstack/queries/useProduct";
import { BasketFoodTypes } from "../types";
import useFavourite from "../tanstack/queries/useFavourite";
import favouriteMutation from "../tanstack/mutations/favouriteMutation";

const ModalFood = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = new URLSearchParams(searchParams.toString()).get(
    "product_id"
  ) as string;
  let basket = Cookies.get("basket")
    ? JSON.parse(Cookies.get("basket") || "")
    : [];

  const [param, $param] = useState<number>(0);
  const [basketActive, $basketActive] = useState(false);
  const [favouriteActive, $favouriteActive] = useState(false);
  const [count, $count] = useState(1);
  const { data: product } = useProduct({ enabled: true, id: productId });
  const { data: favourite } = useFavourite({
    enabled: true,
    lat: 41.28768,
    lng: 69.2289536,
  });
  const { mutate } = favouriteMutation();
  const findBasketId = basket.find(
    (item: BasketFoodTypes) => item.id === product?.id
  );
  const findFavouriteId = favourite?.find(
    (item) => item.product?.id === product?.id
  );

  const addToBasket = () => {
    if (basket.length > 0 && basket?.[0]?.vendor_id !== product?.vendor_id) {
      const isDelete = confirm(
        "You are choosing another vendor, delete other products?"
      );
      if (isDelete) {
        Cookies.remove("basket");
        basket = [];
      } else {
        return;
      }
    }
    if (!findBasketId) {
      basket.push({
        id: product?.id || "",
        image: { url: product?.image?.url },
        name: product?.name || "",
        vendor_id: product?.vendor_id || "",
        count: count,
        params: product?.params?.[param],
        description: product?.params?.[param].name || "",
        enabled: 0,
      });
    }

    Cookies.set("basket", JSON.stringify(basket));
    $basketActive(true);
  };

  const minusCount = () => {
    if (count > 1) {
      $count(count - 1);
    }
  };
  const plusCount = () => {
    $count(count + 1);
  };

  const onClose = () => {
    $param(0);
    $count(1);
    router.replace(`/restaurant/${product?.vendor_id}`);
  };

  const handleFavorite = () => {
    if (!findFavouriteId) {
      mutate({ product_id: productId });
      $favouriteActive(true);
    }
  };

  return (
    <>
      <Transition show={!!productId} appear as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={onClose}>
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
               bg-white shadow-xl transition-all max-w-[640px] h-[680px] mx-h-[689px] p-[20px]'
                >
                  <div className='h-[290px] mb-[80px]'>
                    <Image
                      src={product?.image?.url || "/"}
                      alt='rescard'
                      width={600}
                      height={150}
                    />
                    <div className='absolute right-[230px] flex items-center top-[310px]'>
                      <div
                        className='border bg-white rounded-[50%] shadow-md py-4 px-2 border-none cursor-pointer'
                        onClick={minusCount}
                      >
                        <Image
                          src='https://eatslume.vercel.app/assets/icons/minus.svg'
                          alt='minus'
                          width={20}
                          height={20}
                        />
                      </div>
                      <span className='text-[25px] mx-5 border bg-white rounded-full px-[34px] shadow-md py-[26px] border-none'>
                        {count}
                      </span>
                      <div
                        className='border bg-white rounded-[50%] shadow-md py-2 px-2 border-none cursor-pointer'
                        onClick={plusCount}
                      >
                        <Image
                          src='https://eatslume.vercel.app/assets/icons/plus.svg'
                          alt='minus'
                          width={20}
                          height={20}
                        />
                      </div>
                    </div>
                  </div>

                  <div className='text-start'>
                    <p className='text-[24px] font-bold mt-14 mb-4'>
                      {product?.name}
                    </p>
                    <p className='text-[22px] text-gray-400 font-bold mb-4'>
                      {product?.description}
                    </p>
                  </div>
                  <div className='text-start flex'>
                    {product?.params.map((parameter, i) => (
                      <>
                        <button
                          className={`mr-3 inline overflow-hidden shadow-xl text-center cursor-pointer ${
                            param === i
                              ? "text-white bg-blue-500"
                              : "text-[#165076] bg-white"
                          } w-[70px] h-[70px] max-h-[70px] min-w-[70px] text-[24px] font-bold mb-4 bg-blue-500 p-2 rounded-full left-5 top-[450px]`}
                          onClick={() => {
                            $param(i);
                          }}
                        >
                          <span>{parameter.name}</span>
                        </button>
                      </>
                    ))}
                  </div>
                  <div className='text-start'>
                    <p className='text-[22px] text-gray-400'>Цена</p>
                    <p className='font-bold text-[26px]'>
                      {product?.params[param]?.price} UZS
                    </p>
                  </div>
                  <div
                    className={`absolute ${
                      favouriteActive || findFavouriteId
                        ? "bg-blue-600"
                        : "bg-white"
                    } right-[80px] top-[550px] cursor-pointer border p-2 rounded-full shadow-md border-none`}
                    onClick={handleFavorite}
                  >
                    <Image
                      src='https://eatslume.vercel.app/assets/icons/heart.svg'
                      alt='heart'
                      width={20}
                      height={20}
                    />
                  </div>
                  <div
                    className={`absolute ${
                      findBasketId || basketActive ? "bg-blue-600" : "bg-white"
                    } right-[30px] top-[550px] cursor-pointer border p-2 rounded-full shadow-md border-none`}
                    onClick={addToBasket}
                  >
                    <Image
                      src='https://eatslume.vercel.app/assets/icons/bag.svg'
                      alt='bag'
                      width={20}
                      height={20}
                    />
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

export default ModalFood;
