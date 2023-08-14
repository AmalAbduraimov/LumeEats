"use client";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { AddressType } from "../types";
import Link from "next/link";
import useFavourite from "../tanstack/queries/useFavourite";

const Favourite = () => {
  const [address, $address] = useState<AddressType>();
  const { data } = useFavourite({
    enabled: true,
    lat: address?.lat || 41.28768,
    lng: address?.lng || 69.2289536,
  });

  useEffect(() => {
    $address(
      Cookies.get("address")
        ? JSON.parse(Cookies.get("address") || "")
        : undefined
    );
  }, []);

  return (
    <div className='px-56 py-10'>
      <h1 className='font-semibold text-[28px] mb-10'>Любимое</h1>
      <div className='flex flex-wrap justify-between'>
        {data?.map((product) => (
          <Link
            key={product.product?.id}
            href={`/restaurant/${product.product?.vendor_id}?product_id=${product.product?.id}`}
          >
            <ProductCard data={product.product} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Favourite;
