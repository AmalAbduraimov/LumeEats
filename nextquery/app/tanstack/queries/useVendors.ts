"use client";
import { useQuery } from "@tanstack/react-query";
import HttpClient from "../../../api/HttpClient";
import { Vendor } from "@/app/types";

interface Props {
  enabled?: boolean;
  lat: number;
  lng: number;
}

const useVendors = ({ enabled, lat, lng }: Props) => {
  return useQuery({
    queryKey: ["vendor"],
    queryFn: () =>
      HttpClient.doGet("/vendors", { lat: lat, lng: lng }).then(
        ({ data: response }) => response as Vendor[]
      ),
    enabled,
  });
};

export default useVendors;
