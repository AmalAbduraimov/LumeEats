import React from "react";
import ProductCard from "./ProductCard";
import { getProducts } from "@/api/products";
import Link from "next/link";

const PopularFoods = async () => {
  const data = await getProducts();
  return (
    <div className='px-60 mt-20 mb-10'>
      <h1 className='text-3xl font-semibold mb-8'>
        Популярные <span className='text-gray-500'>Блюда</span>
      </h1>
      <div className='flex flex-wrap justify-between'>
        {data.map((product) => (
          <Link
            key={product.id}
            href={`/restaurant/${product.vendor_id}?product_id=${product.id}`}
          >
            <ProductCard data={product} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularFoods;
