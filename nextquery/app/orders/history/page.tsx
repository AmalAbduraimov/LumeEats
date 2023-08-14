"use client";
import Image from "next/image";
import { getHistoryOrders } from "@/api/orders";
import { useEffect } from "react";
import EmptyList from "@/app/components/EmptyList";
import useHistoryOrders from "@/app/tanstack/queries/useHistoryOrders";

const OrdersHistory = () => {
  const { data } = useHistoryOrders({ enabled: true });
  useEffect(() => {
    getHistoryOrders();
  });

  return (
    <div className='px-[230px] py-8'>
      <h1 className='font-semibold text-[26px]'>orders-history</h1>
      <EmptyList />
    </div>
  );
};

export default OrdersHistory;
