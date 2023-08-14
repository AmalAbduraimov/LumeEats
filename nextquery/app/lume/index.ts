import httpProxy from "http-proxy";
import Cookies from "cookies";
import { NextApiRequest, NextApiResponse } from "next/types";

const API_URL = "https://staging.lume.uz/";

const proxy = httpProxy.createProxyServer();

export const config = {
  api: {
    externalResolver: true,
    bodyParser: true,
  },
};

export default (req: NextApiRequest, res: NextApiResponse) => {
  return new Promise<void>((resolve, reject) => {
    const cookies = new Cookies(req, res);
    const authToken = cookies.get("auth-token");

    console.log("works");
    // req.headers.cookie = "";

    if (authToken) {
      req.headers["Authorization"] = `Bearer ${authToken}`;
    }

    proxy.once("error", reject);

    proxy.web(req, res, {
      target: API_URL,
      autoRewrite: false,
      selfHandleResponse: false,
    });

    proxy.on("end", resolve);
  });
};
