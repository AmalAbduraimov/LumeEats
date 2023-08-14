import { Product as Product, FoodParams } from "@/app/types";
import HttpClient from "./HttpClient";

export const getProducts = () =>
  HttpClient.doGet("/product").then(
    ({ data: response }) => response as Product[]
  );

interface Props {
  vendor_id: string;
}

export const getRestaurantProducts = (params: Props) =>
  HttpClient.doGet("/products/1", params).then(
    ({ data: response }) => response as Product[]
  );

interface ProductProps {
  id: string;
}

export const getOneProduct = ({ id }: ProductProps) =>
  HttpClient.doGet(`/show/product/${id}`).then(
    ({ data: response }) => response as Product
  );
