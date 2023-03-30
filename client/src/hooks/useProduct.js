import { useQuery } from "@tanstack/react-query";

export const fetchProduct = async ({ queryKey }) => {
  const user = queryKey[1];

  const res = await fetch(`http://localhost:3001/api/product`, {
    headers: { Authorization: `Bearer ${user.accessToken}` },
  });

  return res.json();
};

export const useProductData = (user) => {
  return useQuery(["products", user], fetchProduct);
};
