import HttpClient from "@/api/HttpClient";
import { CheckoutType } from "@/app/types";
import { useMutation } from "@tanstack/react-query";

const checkoutMutation = () => {
  return useMutation({
    mutationKey: ["favourite"],
    mutationFn: (data: CheckoutType) =>
      HttpClient.doPost("/user/checkout", data).then(
        ({ data: response }) => response
      ),
  });
};

export default checkoutMutation;
