import HttpClient from "@/api/HttpClient";
import { useMutation } from "@tanstack/react-query";

interface Props {
  product_id: string;
}

const favouriteMutation = () => {
  return useMutation({
    mutationKey: ["favourite"],
    mutationFn: (data: Props) => HttpClient.doPost("/user/favourite", data),
  });
};

export default favouriteMutation;
