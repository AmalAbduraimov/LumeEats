"use client";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import {
  BasketFoodTypes,
  CheckoutType,
  OrderType,
  AddressType,
} from "../types";
import EmptyList from "../components/EmptyList";
import BasketItem from "../components/BasketItem";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BasketVendor from "../components/BasketVendor";
import useVendor from "../tanstack/queries/useVendor";
import { useQueryClient } from "@tanstack/react-query";
import checkoutMutation from "../tanstack/mutations/checkoutMutation";

const labelArr = Object.values(OrderType).map((name) => ({
  name,
}));

const paymentBtns = [
  { id: 1, icon: "https://eatslume.vercel.app/assets/icons/money.svg" },
  { id: 2, icon: "https://eatslume.vercel.app/assets/icons/creditCard.svg" },
];

const Basket = () => {
  const route = useRouter();
  const client = useQueryClient();
  const [basket, $basket] = useState<BasketFoodTypes[]>([]);
  const [address, $address] = useState<AddressType | undefined>();
  const [activeButton, $activeButton] = useState<OrderType>(OrderType.book);
  const [comment, $comment] = useState<string>("");
  const [seatsCount, $seatsCount] = useState<string>("seats_count");
  const [active, $active] = useState<number>(1);
  const [paymentType, $paymentType] = useState<number>(0);
  const [reserve_time, $reserve_time] = useState(new Date());
  const { mutate } = checkoutMutation();
  const { data: vendor, refetch } = useVendor({
    id: basket[0]?.vendor_id,
    enabled: true,
    lat: address?.lat || 41.28768,
    lng: address?.lng || 69.228953,
  });

  useEffect(() => {
    $basket(
      Cookies.get("basket") ? JSON.parse(Cookies.get("basket") || "") : []
    );
    $address(
      Cookies.get("address")
        ? JSON.parse(Cookies.get("address") || "")
        : undefined
    );
  }, []);

  useEffect(() => {
    refetch();

    return () => {
      client.cancelQueries({ queryKey: ["vendor"] });
    };
  }, [basket]);

  const updateBasket = (item: BasketFoodTypes, index: number) => {
    const newBasket = [...(basket || [])];
    if (item) {
      newBasket[index] = item;
      setBasket(newBasket);
    }
  };

  const setBasket = (newBasket: BasketFoodTypes[]) => {
    $basket(newBasket);
    Cookies.set("basket", JSON.stringify(newBasket));
  };

  const increment = (index: number) => {
    const currentItem = basket[index];
    currentItem.count = currentItem.count + 1;
    updateBasket(currentItem, index);
  };

  const decrement = (index: number) => {
    const currentItem = basket[index];
    if (currentItem.count > 1) {
      currentItem.count = currentItem.count - 1;
    }
    updateBasket(currentItem, index);
  };

  const reserveTime = (time: Date) => $reserve_time(time);

  const removeOrder = (index: number) => {
    const filtered = basket.filter((_, i) => i !== index);
    setBasket(filtered);
  };

  const totalPrice = useMemo(() => {
    return basket?.reduce((sum, i) => sum + i.params?.price * i.count, 0);
  }, [basket]);

  const checkData = (data: CheckoutType) => {
    mutate(data, {
      onSuccess: () => {
        Cookies.remove("basket");
        route.replace("/");
      },
    });
  };

  const handleSubmit = () => {
    const data: CheckoutType = {
      order_product: basket.map((item) => {
        return {
          product_id: item.id,
          param_id: item.params.id,
          count: item.count,
          modification_ids: [2],
        };
      }),
      user_requested_time: reserve_time,
      description: comment,
      type: activeButton,
      payment_id: String(active),
      sale_point_id: vendor?.closest_sale_point?.id,
      ...(activeButton === OrderType.book && {
        seats_count: Number(seatsCount),
      }),
      ...(activeButton === OrderType.delivery && {
        address: address?.display_name,
        lat: address?.lat,
        lng: address?.lng,
        address_id: null,
      }),
    };

    if (activeButton === OrderType.book) {
      Number(seatsCount) >= 1 ? checkData(data) : alert("Choose seatsCount");
    } else if (activeButton === OrderType.delivery) {
      address !== null ? checkData(data) : alert("Choose address");
    } else {
      checkData(data);
    }
  };

  if (basket?.length == 0) {
    return <EmptyList />;
  }

  return (
    <div className='px-[230px] py-10'>
      <BasketVendor vendor={vendor} />
      <div className='flex items-center justify-center text-[22px] font-semibold mb-10'>
        {labelArr.map(({ name }, idx) => (
          <button
            key={idx}
            className={`mr-5 ${
              activeButton === name
                ? "text-white bg-blue-500"
                : "text-blue-300 bg-white"
            } border rounded-[25px] shadow-sm px-4 py-2 bg-blue-500`}
            onClick={() => $activeButton(name)}
          >
            {name}
          </button>
        ))}
      </div>
      <h1 className='text-[27px] font-bold mb-5'>
        Ваш <span className='text-[#6D6D6D]'>заказ</span>
      </h1>
      {basket.map((order, i) => (
        <BasketItem
          key={order.id}
          data={order}
          index={i}
          increment={increment}
          decrement={decrement}
          removeOrder={removeOrder}
        />
      ))}
      <div className='flex items-center justify-between bg-white rounded-3xl shadow-md px-5 py-6'>
        <div className='flex flex-col w-[500px] text-[22px] font-semibold'>
          <div className='flex justify-between'>
            <span>Общая сумма заказа:</span> <span>{totalPrice} UZS</span>
          </div>
          <div className='flex justify-between'>
            <span>Сумма предоплаты</span> <span>0 UZS</span>
          </div>
          <div className='flex justify-between'>
            <span>Оплачено</span> <span>0 UZS</span>
          </div>
          <div className='flex justify-between'>
            <span>Осталось</span> <span>0 UZS</span>
          </div>
        </div>
        <div>
          {activeButton === OrderType.delivery ? (
            <button
              className='mb-4 border overflow-hidden w-[100%] rounded-full py-1 shadow-md border-none block'
              onClick={() => route.replace("/location")}
            >
              {address?.display_name || "Add address"}
            </button>
          ) : (
            <div className='flex items-center mb-3'>
              <DatePicker
                selected={reserve_time}
                onChange={reserveTime}
                timeInputLabel='Time:'
                dateFormat='MM/dd/yyyy h:mm'
                className='w-[100%] mr-3  border rounded-3xl px-2 shadow-md border-none outline-none'
                showTimeInput
              />
              {activeButton === OrderType.book && (
                <input
                  type='number'
                  value={seatsCount}
                  onChange={(e) => $seatsCount(e.target.value)}
                  placeholder='seats_count'
                  className='border w-[120px] ml-3 rounded-3xl h-[25px] px-3  shadow-md border-none outline-none'
                />
              )}
            </div>
          )}
          <input
            type='text'
            value={comment}
            onChange={(e) => $comment(e.target.value)}
            placeholder='Комментарии к заказу'
            className='w-[100%] relative border rounded-3xl p-2 shadow-md border-none outline-none'
          />
        </div>
        <div className='flex flex-col'>
          <div className='flex'>
            {paymentBtns.map((item, idx) => {
              const active = idx === paymentType;
              return (
                <div
                  key={item.id}
                  className={`border rounded-[26px] ${
                    active ? "bg-blue-500" : "bg-white"
                  } shadow-md border-none pl-7 pr-3 py-5 mr-5`}
                  onClick={() => {
                    $paymentType(idx);
                    $active(item.id);
                  }}
                >
                  <Image src={item.icon} alt='money' width={45} height={45} />
                </div>
              );
            })}
          </div>
          <button
            type='submit'
            className='border px-3 py-2 text-[21px] font-semibold rounded-[25px] mt-3 border-none shadow-md'
            onClick={handleSubmit}
          >
            Оплатить
          </button>
        </div>
      </div>
    </div>
  );
};

export default Basket;
