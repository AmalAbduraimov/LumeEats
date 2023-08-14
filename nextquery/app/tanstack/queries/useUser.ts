"use client";
import { useQuery } from "@tanstack/react-query";
import HttpClient from "../../../api/HttpClient";
import { User } from "@/app/types";

interface Props {
  enabled?: boolean;
}

const useUser = ({ enabled }: Props) => {
  return useQuery({
    queryKey: ["user"],
    queryFn: () =>
      HttpClient.doGet("/user").then(({ data: response }) => response as User),
    enabled,
  });
};

export default useUser;
