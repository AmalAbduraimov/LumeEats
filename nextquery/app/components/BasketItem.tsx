import Image from "next/image";
import { BasketFoodTypes } from "../types";

interface Props {
  data: BasketFoodTypes;
  index: number;
  increment: (index: number) => void;
  decrement: (index: number) => void;
  removeOrder: (index: number) => void;
}

const BasketItem = ({
  data,
  index,
  increment,
  decrement,
  removeOrder,
}: Props) => {
  return (
    <div className='bg-white flex items-center justify-between px-5 py-6 shadow-md rounded-3xl mb-5'>
      <div className='flex items-center'>
        <div className='flex items-center'>
          <Image
            src='https://eatslume.vercel.app/assets/icons/close.svg'
            alt='close'
            width={45}
            height={45}
            className='mr-4 cursor-pointer'
            onClick={() => removeOrder(index)}
          />
          <Image
            src={data?.image?.url || "/"}
            alt='foodlogo'
            width={340}
            height={165}
          />
        </div>
        <div className='flex flex-col ml-10'>
          <span className='font-bold text-[27px]'>{data.name}</span>
          <span className='font-bold text-[22px] text-blue-500 my-11'>
            {data?.description}
          </span>
          <span className='font-bold text-[20px] text-[#6D6D6D]'>
            {data.params?.price} UZS
          </span>
        </div>
      </div>
      <div className='flex items-center'>
        <div
          className='border bg-white rounded-[50%] shadow-md py-4 px-2 border-none cursor-pointer'
          onClick={() => decrement(index)}
        >
          <Image
            src='https://eatslume.vercel.app/assets/icons/minus.svg'
            alt='minus'
            width={20}
            height={20}
          />
        </div>
        <span className='text-[25px] mx-5 border bg-white rounded-full px-[34px] shadow-md py-[26px] border-none'>
          {data.count}
        </span>
        <div
          className='border bg-white rounded-[50%] shadow-md py-2 px-2 border-none cursor-pointer'
          onClick={() => increment(index)}
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
  );
};

export default BasketItem;
