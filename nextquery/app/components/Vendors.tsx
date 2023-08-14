"use client";
import RestaurantCards from "./VendorCards";
import Link from "next/link";
import { AddressType } from "../types";
import Cookies from "js-cookie";
import useVendors from "../tanstack/queries/useVendors";

const Restaurants = () => {
  const address: AddressType = Cookies.get("address")
    ? JSON.parse(Cookies.get("address") || "")
    : null;
  const { data: vendors } = useVendors({
    enabled: true,
    lat: address?.lat || 41.28768,
    lng: address?.lng || 69.2289536,
  });
  return (
    <div className='px-60 mt-20'>
      <h1 className='text-3xl font-semibold mb-8'>
        Популярные <span className='text-gray-500'>Рестораны</span>
      </h1>
      <div className='flex justify-between items-center'>
        {vendors?.map((vendor) => (
          <Link href={`/restaurant/${vendor.id}`} className=''>
            <RestaurantCards data={vendor} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Restaurants;
