import HttpClient from "@/api/HttpClient";
import { useMutation } from "@tanstack/react-query";

interface Body {
  phone: string;
}

const verifyMutation = () => {
  return useMutation({
    mutationKey: ["verify"],
    mutationFn: (body: Body) =>
      HttpClient.doPost("/verification", body).then(
        ({ data: response }) => response
      ),
  });
};

export default verifyMutation;
