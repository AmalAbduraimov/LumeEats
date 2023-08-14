import HttpClient from "@/api/HttpClient";
import { useQuery } from "@tanstack/react-query";

interface Props {
  enabled: boolean;
}

const useHistoryOrders = ({ enabled }: Props) => {
  return useQuery({
    queryKey: ["historyOrders"],
    queryFn: () =>
      HttpClient.doGet("/user/orders", { history: true }).then(
        ({ data: response }) => response
      ),
    enabled,
  });
};

export default useHistoryOrders;
