import { BASE_URL } from "../_constants/constants";

export const fetchClient = async (url, options) => {
  //   const session = await auth();

  const res = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers: {
      ...options?.headers,
      //   ...(session && { Authorization: `Bearer ${session.accessToken}` }),
    },
  });

  return res;
};
