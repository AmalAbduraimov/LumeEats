"use client";
import { useQuery } from "@tanstack/react-query";
import HttpClient from "../../../api/HttpClient";
import { FavoriteCards, Product, User } from "@/app/types";

interface Props {
  vendor_id: string;
  enabled?: boolean;
}

const useVendorProducts = ({ enabled, vendor_id }: Props) => {
  return useQuery({
    queryKey: ["products"],
    queryFn: () =>
      HttpClient.doGet(`/products/1`, { vendor_id: vendor_id }).then(
        ({ data: response }) => response as Product[]
      ),
    enabled,
  });
};

export default useVendorProducts;
