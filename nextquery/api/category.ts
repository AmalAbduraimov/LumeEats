import { Category } from "@/app/types";
import HttpClient from "./HttpClient";

export const getCategory = () =>
  HttpClient.doGet("/category").then(
    ({ data: response }) => response as Category[]
  );
