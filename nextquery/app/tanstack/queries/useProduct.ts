"use client";
import { useQuery } from "@tanstack/react-query";
import HttpClient from "../../../api/HttpClient";
import { FavoriteCards, Product, User } from "@/app/types";

interface Props {
  id: string;
  enabled?: boolean;
}

const useProduct = ({ enabled, id }: Props) => {
  return useQuery({
    queryKey: ["product"],
    queryFn: () =>
      HttpClient.doGet(`/show/product/${id}`).then(
        ({ data: response }) => response as Product
      ),
    enabled,
  });
};

export default useProduct;
