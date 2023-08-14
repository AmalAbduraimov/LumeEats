"use client";
import Restaurants from "./components/Vendors";
import PopularFoods from "./components/PopularFoods";
import Category from "./components/CategoryCards";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Home() {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <section>
        <Category />
      </section>
      <section>
        <Restaurants />
      </section>
      <section>
        <PopularFoods />
      </section>
    </QueryClientProvider>
  );
}
