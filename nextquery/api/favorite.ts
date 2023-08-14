import { FavoriteCards, Product, FoodParams } from "@/app/types";
import HttpClient from "./HttpClient";

interface FavoriteProps {
  withData: boolean;
}

export const getFavorite = (data: FavoriteProps) =>
  HttpClient.doGet("/user/favourite", {
    withData: data.withData,
    lat: 41.28768,
    lng: 69.2289536,
  }).then(({ data: response }) => response as FavoriteCards[]);

interface Props {
  product_id?: string;
}

export const postFavorite = (data: Props) =>
  HttpClient.doPost("/user/favourite", data);
