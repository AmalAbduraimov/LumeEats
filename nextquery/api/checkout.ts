import { CheckoutType } from "@/app/types";
import HttpClient from "./HttpClient";

export const checkout = (data: CheckoutType) =>
  HttpClient.doPost("/user/checkout", data).then(
    ({ data: response }) => response
  );
