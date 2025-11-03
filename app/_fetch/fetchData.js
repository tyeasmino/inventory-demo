"use server";
import { cookies } from "next/headers";
import { BASE_URL } from "../_constants/constants";
import { getFetchErrorMessage } from "../_utils";
import { fetchClient } from "./fetch-client";
import { decryptCookie } from "../_utils/encryption";
import { jwtDecode } from "jwt-decode";

function appendQueryParams(path, query = {}) {
  const hasExistingQuery = path.includes("?");
  const url = new URLSearchParams(path.split("?")[1] || "");

  for (const key in query) {
    if (query[key]) {
      url.set(key, query[key]);
    }
  }

  return `${path.split("?")[0]}?${url.toString()}`;
}

export const fetchData = async (
  url,
  { isBranch = false, options = {} } = {}
) => {
  const cookieStore = await cookies();
  const data = cookieStore.get("guest-info")?.value || {};
  const { guestInfo, access, refresh } = JSON.parse(data);

  let token = null;

  if (guestInfo) {
    try {
      token = await decryptCookie(guestInfo);
    } catch (error) {
      console.error("Failed to decrypt cookie:", error);
      throw new Error("Invalid guest token");
    }
  }

  let endpoint = url;

  if (isBranch && token?.branch_id) {
    endpoint = appendQueryParams(url, { branch_id: token?.branch_id });
  }

  // console.log("=== endpoint ===");
  // console.log(endpoint);

  try {
    let res = await fetchClient(endpoint, {
      ...options,
      headers: {
        // Authorization: `Bearer ${access}`,
        ...options?.headers,
      },
    });

    // console.log("### res status from fetch data ###");
    // console.log(res.status);
    console.log(`Endpoint: ${endpoint} || States: ${res.status}`);

    if (res.status === 401 && refresh) {
      console.log("### refresh from fetch data ###");
      console.log("## refresh ##");
      const refreshData = JSON.stringify({ refresh: refresh });
      console.log(refreshData);
      const refreshRes = await fetch(`${BASE_URL}/api/token/refresh/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: refreshData,
      });

      if (refreshRes.status === 401) {
        return {
          status: "error",
          message: "Unauthenticated: Refresh token expired",
        };
      }

      // if (!refreshRes.ok) {
      //   throw new Error("Unauthenticated: Refresh token expired");
      // }

      // console.log("## res refresh from fetch data ###");
      // console.log(refreshRes);

      const data = await refreshRes.json();

      const decoded = jwtDecode(data.refresh);

      const expiryDate = new Date(decoded.exp * 1000);

      setCookie(
        "guest-info",
        { access: data.access, refresh: data.refresh, guestInfo },
        {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          expires: expiryDate,
        }
      );

      res = await fetch(`${BASE_URL}${path}`, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${data.access}`,
        },
      });

      if (!res.ok) {
        return {
          status: "error",
          message: "Failed to fetch user data",
        };
      }
    }

    const data = await res.json();
    // console.log(data);

    if (res.ok) {
      return {
        status: "success",
        data,
      };
    } else {
      return {
        status: "error",
        message: getFetchErrorMessage(data) || "There was an error!",
      };
    }
  } catch (error) {
    console.error("Fetch error:", error);
    return {
      status: "error",
      message: "Server error!",
    };
  }
};

export async function userFetchClient(path, options = {}) {
  try {
    const cookieStore = await cookies();

    // const tokenRes = await fetch(`${LOCAL_URL}/api/set-cookie`, {
    //   method: "GET",
    //   credentials: "include",
    // });
    // console.log("### toke response ###");
    // console.log(await tokenRes.json());
    // console.log(tokenRes);

    const access = cookieStore.get("user-access")?.value;
    const refresh = cookieStore.get("user-refresh")?.value;
    // const token = await tokenRes.json();

    // console.log("token from cookie");
    // console.log(token);

    if (!access && !refresh) {
      return {
        status: "error",
        message: "Unauthenticated: Token not found",
      };
    }

    // first request
    const mainRes = await fetch(`${BASE_URL}${path}`, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${access}`,
      },
    });

    if (mainRes.ok) {
      return { status: "success", data: await mainRes.json() };
    } else {
      const data = await mainRes.json();
      return {
        status: "error",
        message: getFetchErrorMessage(data) || "There was an error!",
      };
    }
  } catch (error) {
    console.error("Fetch error:", error);
    return {
      status: "error",
      message: "Server error!",
    };
  }
}

export async function getSiteData() {
  try {
    // const res = await fetch(`${BASE_URL}/api/brand/`, {
    //   next: { revalidate: 3600 },
    // });
    const res = await fetch(`${BASE_URL}/api/brand/`);
    return res.json();
  } catch (e) {
    throw new Error(e);
  }
}
