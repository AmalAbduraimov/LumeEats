import HttpClient from "@/api/HttpClient";
import { FavoriteCards } from "@/app/types";
import { useQuery } from "@tanstack/react-query";

interface Props {
  enabled: boolean;
  lat: number;
  lng: number;
}

const useFavourite = ({ enabled, lat, lng }: Props) => {
  return useQuery({
    queryKey: ["favourite"],
    queryFn: () =>
      HttpClient.doGet("/user/favourite", {
        withData: true,
        // todo use real location
        lat: lat,
        lng: lng,
      }).then(({ data: response }) => response as FavoriteCards[]),
    enabled,
  });
};

export default useFavourite;
