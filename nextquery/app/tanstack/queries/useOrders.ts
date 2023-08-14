import HttpClient from "@/api/HttpClient";
import { useQuery } from "@tanstack/react-query";

interface Props {
  enabled: boolean;
}

const useOrders = ({ enabled }: Props) => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      HttpClient.doGet("/user/orders").then(({ data: response }) => response),
    enabled,
  });
};

export default useOrders;
