"use client";
import Image from "next/image";
import { useState } from "react";
import AuthorizationModal from "./AuthorizationModal";
import LumeUser from "./LumeUser";
import useUser from "@/app/tanstack/queries/useUser";

const UserModal = () => {
  const [opened, $opened] = useState(false);
  const { data: user } = useUser({
    enabled: true,
  });

  return (
    <>
      <div className='border cursor-pointer rounded-full p-3 shadow-md border-none'>
        <Image
          src='/Profile.svg'
          alt='profile'
          width={20}
          height={20}
          onClick={() => $opened(true)}
        />
      </div>
      {user ? (
        <LumeUser opened={opened} $opened={$opened} />
      ) : (
        <AuthorizationModal opened={opened} $opened={$opened} />
      )}
    </>
  );
};

export default UserModal;
