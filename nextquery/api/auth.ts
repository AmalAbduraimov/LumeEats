import HttpClient from "./HttpClient";
import Cookies from "js-cookie";

interface LoginBody {
  phone: string;
  verify_code: string;
}

export const verify = (data: LoginBody) => {
  HttpClient.doPost("/auth", data).then(({ data: response }) => {
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
  });
};

interface VerifyBody {
  phone: string;
}
export const login = async (data: VerifyBody) => {
  const response = await HttpClient.doPost("/verification", data);
};
