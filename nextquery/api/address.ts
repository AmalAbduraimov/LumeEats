import HttpClient from "./HttpClient";

interface Props {
  lat: number;
  lng: number;
}

export const getAddress = (data: Props) =>
  HttpClient.doGet("/reverse/geocode", data).then(
    ({ data: response }) => response
  );
