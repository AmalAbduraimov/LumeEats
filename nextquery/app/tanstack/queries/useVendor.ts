"use client";
import { useQuery } from "@tanstack/react-query";
import HttpClient from "../../../api/HttpClient";
import { VendorType } from "@/app/types";

interface Props {
  id: string;
  enabled?: boolean;
  lat: number;
  lng: number;
}

const useVendor = ({ enabled, id, lat, lng }: Props) => {
  return useQuery({
    queryKey: ["vendor"],
    queryFn: () =>
      HttpClient.doGet(`/vendor/${id}`, { lat: lat, lng: lng }).then(
        ({ data: response }) => response as VendorType
      ),
    enabled,
  });
};

export default useVendor;
