"use client";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useGeolocation } from "react-use";
import { AddressType, EPresetTimes } from "../types";
import qs from "query-string";
import Image from "next/image";
import Cookies from "js-cookie";
import useAddress from "../tanstack/queries/useAddress";
import { useQueryClient } from "@tanstack/react-query";

const center = {
  lat: 41.29715870115433,
  lng: 69.18175616711075,
};

export const containerStyle = {
  width: "100%",
  height: "100vh",
  top: 0,
  bottom: 0,
};

const Location = () => {
  const searchParam = useSearchParams();
  const search = new URLSearchParams(searchParam.toString()).toString();
  const router = useRouter();
  const client = useQueryClient();
  const { add_address } = qs.parse(search);
  const map = useRef<google.maps.Map>();
  const { latitude, longitude, error } = useGeolocation({
    enableHighAccuracy: true,
    maximumAge: EPresetTimes.MINUTE,
  });

  const [location, $location] = useState({ lat: 0, lng: 0 });
  const [addressModal, $addressModal] = useState(false);
  const { data: address_name, refetch: fetchAddress } = useAddress({
    enabled: true,
    lat: location.lat,
    lng: location.lng,
  });
  let address: AddressType = Cookies.get("address")
    ? JSON.parse(Cookies.get("address") || "")
    : null;
  // change
  useEffect(() => {
    fetchAddress();

    return () => {
      client.cancelQueries({ queryKey: ["address"] });
    };
  }, [location]);
  // react_query

  const onCenterChange = () => {
    const center = map?.current?.getCenter();
    const lat = center?.lat();
    const lng = center?.lng();

    if (lat && lng) {
      $location({ lat, lng });
    }
  };

  const goToUserLocation = () => {
    if (longitude !== null && latitude !== null) {
      $location({ lat: latitude, lng: longitude });
    } else {
      if (error) {
        alert("give permission to location");
      }
    }
  };

  const handleSubmit = () => {
    if (!!add_address) {
      $addressModal(true);
    } else {
      if (address_name) {
        address = {
          display_name: address_name,
          lat: location.lat,
          lng: location.lng,
        };

        Cookies.set("address", JSON.stringify(address));
        router.replace("/");
      }
    }
  };

  return (
    <div className='absolute h-[100%] w-[100%] top-0 bottom-0 left-0 right-0'>
      <div className='relative'>
        <LoadScript googleMapsApiKey=''>
          <GoogleMap
            options={{ fullscreenControl: false, zoomControl: false }}
            mapContainerStyle={containerStyle}
            center={location.lat ? location : center}
            onDragEnd={onCenterChange}
            onLoad={(ref) => {
              map.current = ref;
            }}
            zoom={14}
          >
            <div className='absolute bottom-[150px] right-[43%] flex flex-col items-center text-[#165076] font-semibold text-[16px]'>
              <button className='border w-[355px] py-3 bg-white border-none rounded-full mb-5'>
                Мои адреса
              </button>
              <div>
                <button
                  className='border mr-5 w-[167px] py-3 bg-white border-none rounded-full'
                  onClick={goToUserLocation}
                >
                  Найди меня
                </button>
                <button
                  className='border w-[167px] py-3 bg-white border-none rounded-full'
                  onClick={handleSubmit}
                >
                  Подтвердить
                </button>
              </div>
            </div>
          </GoogleMap>
        </LoadScript>
      </div>
      <Image
        src='https://eatslume.vercel.app/assets/icons/marker.svg'
        alt='marker'
        width={55}
        height={55}
        className='absolute top-[43%] right-[50%]'
      />
      <Image
        src='/reslogo.svg'
        alt='reslogo'
        width={45}
        height={45}
        className='absolute top-[469px] right-[1071px]'
      />
      <div className='absolute top-14 right-[37%] border z-99 bg-white rounded-full px-3 py-4 w-[650px]'>
        <input
          type='text'
          disabled={true}
          value={address_name ? address_name : address?.display_name}
          placeholder='Show address'
          className='overflow-hidden z-99 w-[100%]'
        />
        <Image
          src='/Discovery.svg'
          alt='compass'
          width={30}
          height={30}
          className='absolute right-5 top-[13px]'
        />
      </div>
    </div>
  );
};

export default Location;
