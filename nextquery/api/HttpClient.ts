import { cookies } from "next/headers";
import Cookies from "js-cookie";

const BASE_URL = "https://staging.lume.uz/";

export const HttpConfig = {
  BASE_URL,
  API_PATH: BASE_URL + "api",
};
class HttpClient {
  static prepareOptions(params: RequestInit) {
    const headers: RequestInit["headers"] = {
      "Content-Type": "application/json",
      "Accept-Language": "ru",
    };

    let token: string | undefined | null = undefined;

    if (typeof window !== "undefined") {
      if (localStorage.getItem("token")) {
        token = localStorage.getItem("token");
      }
    } else {
      const authToken = Cookies.get("token");
      if (authToken) {
        token = authToken;
      }
    }

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const options: RequestInit = {
      headers: { ...headers, ...params.headers },
      method: params.method,
    };

    return { ...params, ...options };
  }

  static async doGet(url = "", params = {}) {
    params = params ? "?" + new URLSearchParams(params) : "";
    return fetch(
      makeUrl(url + params),
      HttpClient.prepareOptions({ method: "GET", cache: "default" })
    ).then((response) => response.json());
  }
  static async doCleanGet(url = "", params = {}, headers = {}) {
    params = params ? "?" + new URLSearchParams(params) : "";
    return fetch(
      makeUrl(url + params),
      HttpClient.prepareOptions({ method: "GET", cache: "default", ...headers })
    );
  }
  static async doPost(url: string, data = {}) {
    return fetch(
      makeUrl(url),
      HttpClient.prepareOptions({
        method: "POST",
        cache: "default",
        body: JSON.stringify(data),
      })
    ).then((response) => response.json());
  }

  //   async doPut(url = "", data = {}) {
  //     return (await this.doRequest()).put(makeUrl(url), data);
  //   }
}

function makeUrl(url = "") {
  return url.includes("http") ? url : `${HttpConfig.API_PATH}${url}`;
}

export function makeBaseUrl(url = "") {
  return url.includes("http") ? url : `${HttpConfig.BASE_URL}${url}`;
}

export default HttpClient;
