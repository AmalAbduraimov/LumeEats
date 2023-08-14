import { VendorType, Vendor } from "@/app/types";
import HttpClient from "./HttpClient";

interface Props {
  lat: number;
  lng: number;
  radius?: number;
}

export const getVendors = (params: Props) =>
  HttpClient.doGet("/vendors", params).then(
    ({ data: response }) => response as Vendor[]
  );

export const getVendor = (params: Props, id: string | undefined) =>
  HttpClient.doGet(`/vendor/${id}`, params).then(
    ({ data: response }) => response as VendorType
  );
