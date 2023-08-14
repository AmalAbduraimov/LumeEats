import HttpClient from "./HttpClient";

export const getOrders = () =>
  HttpClient.doGet("/user/orders").then(({ data: response }) => response);

export const getHistoryOrders = () =>
  HttpClient.doGet("/user/orders", { history: true }).then(
    ({ data: response }) => response
  );
