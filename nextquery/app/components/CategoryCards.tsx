import React from "react";
import CategoryCard from "./CategoryCard";
import { getCategory } from "@/api/category";

const Category = async () => {
  const data = await getCategory();
  return (
    <div className='flex justify-around px-[600px] mt-10'>
      {data.map((category) => (
        <CategoryCard
          key={category.id}
          id={category.id}
          name={category.name}
          product_count={category.product_count}
          image={category?.image ? category.image : "/"}
        />
      ))}
    </div>
  );
};

export default Category;
