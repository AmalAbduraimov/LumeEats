import HttpClient from "@/api/HttpClient";
import { useQuery } from "@tanstack/react-query";

interface Props {
  enabled: boolean;
  lat: number;
  lng: number;
}

const useAddress = ({ enabled, lat, lng }: Props) => {
  return useQuery({
    queryKey: ["address"],
    queryFn: () =>
      HttpClient.doGet("/reverse/geocode", { lat: lat, lng: lng }).then(
        ({ data: response }) => response.display_name
      ),
    enabled,
  });
};

export default useAddress;
