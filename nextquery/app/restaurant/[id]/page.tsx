"use client";
import Image from "next/image";
import classNames from "classnames";
import ProductCard from "@/app/components/ProductCard";
import Link from "next/link";
import ModalFood from "@/app/components/ModalFood";
import CategoryCard from "@/app/components/CategoryCard";
import { useSearchParams } from "next/navigation";
import useVendor from "@/app/tanstack/queries/useVendor";
import useVendorProducts from "@/app/tanstack/queries/useVendorProducts";

interface Props {
  params: {
    id: string;
  };
}

const Restaurant = ({ params: { id } }: Props) => {
  const searchParams = useSearchParams();
  const productId = new URLSearchParams(searchParams.toString()).get(
    "product_id"
  ) as string;
  const { data: vendor } = useVendor({
    id: id,
    enabled: true,
    lat: 41.28768,
    lng: 69.2289536,
  });
  const { data: products } = useVendorProducts({ vendor_id: id });

  const url = vendor?.banner?.url;
  return (
    <div className='px-[230px] mt-16'>
      <div
        className={classNames(
          "h-[675px] relative",
          { ["bg-blue-500"]: !url },
          `px-6 rounded-[20px] bg-cover`
        )}
      >
        {url && (
          <Image
            src={url}
            alt='asdfas'
            width={230}
            height={150}
            className='bg-cover w-full h-full z-[-1]'
          />
        )}
        <div className='pt-[350px]'>
          <div className='bg-yellow-500 absolute top-[330px] left-[60px] mb-4 flex w-[98px] h-[46px] items-center rounded-full'>
            <Image
              src='/Star.svg'
              alt='star'
              width={22}
              height={22}
              className='ml-3 mr-4'
            />
            <span className='text-white text-[28px] ml-2'>
              {vendor?.rating.avg}
            </span>
          </div>
          <p className='text-white absolute top-[380px] left-[60px] font-bold text-[60px] mb-4'>
            {vendor?.name}
          </p>
          <span className='border rounded-[35px] absolute top-[480px] left-[60px] text-[20px] font-bold bg-white px-3 py-2'>
            Местоположение по карте
          </span>
          <div className='px-8 py-4 absolute top-[540px] left-[60px] mt-5 flex justify-between bg-white rounded-[25px]'>
            <p className='text-[20px] font-semibold mr-[350px]'>
              Условие ресторана <br />
              <span className='text-[16px] text-[#6d6d6d]'>Мин заказ</span>
            </p>
            <p className='text-[20px] font-semibold'>
              Цена доставки <br />
              <span className='text-[16px] text-[#6d6d6d] mr-[350px]'>
                61,000.00 UZS
              </span>
            </p>
            <p className='text-[20px] text-[#165076] font-semibold'>
              Информация <br /> о ресторане
            </p>
          </div>
        </div>
      </div>
      <div className='flex justify-center items-center mt-20'>
        <CategoryCard
          id={vendor?.categories[0].id || 0}
          name={vendor?.categories[0].name || ""}
          image={vendor?.categories[0].image ? vendor?.categories[0].image : ""}
          product_count={0}
        />
      </div>

      <div className='mt-16'>
        <h1 className='font-bold text-[28px] mb-14'>Национальная</h1>
        <div className='grid grid-cols-3 gap-5 mb-10'>
          {products?.map((product, i) => (
            <>
              <Link
                href={`/restaurant/${product.vendor_id}?product_id=${product?.params[0]?.product_id}`}
                className='cursor-pointer'
                key={product.id}
              >
                <ProductCard data={product} />
              </Link>
            </>
          ))}
        </div>
      </div>
      {productId ? <ModalFood /> : ""}
    </div>
  );
};

export default Restaurant;
