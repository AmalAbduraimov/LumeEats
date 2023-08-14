"use client";
import EmptyList from "../components/EmptyList";
import useOrders from "../tanstack/queries/useOrders";

const Orders = () => {
  const { data } = useOrders({ enabled: true });

  return (
    <div className='px-[230px] py-8'>
      <h1 className='font-semibold text-[26px]'>current-orders</h1>
      <EmptyList />
    </div>
  );
};

export default Orders;
