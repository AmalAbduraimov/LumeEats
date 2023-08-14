import { User } from "@/app/types";
import HttpClient from "./HttpClient";

export const getUser = () =>
  HttpClient.doGet("/user").then(({ data: response }) => response as User);
