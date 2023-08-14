import HttpClient from "@/api/HttpClient";
import { User } from "@/app/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";

interface Body {
  phone: string;
  verify_code: string;
}

const authMutation = () => {
  const client = useQueryClient();
  return useMutation({
    mutationKey: ["auth"],
    mutationFn: (body: Body) =>
      HttpClient.doPost("/auth", body).then(async ({ data: response }) => {
        const token = response.accessToken as string;
        const now = new Date();
        const nextMonth = now.getMonth() + 1;
        const date = now.setMonth(nextMonth === 12 ? 0 : nextMonth);
        Cookies.remove("token");
        Cookies.set("token", token, {
          httpOnly: false,
          sameSite: "Lax",
          expires: date,
        });
        localStorage.setItem("token", token);

        await client.invalidateQueries<User>(["user"]);
      }),
  });
};

export default authMutation;
