"use server";

import { cookies, headers } from "next/headers";
import { BASE_URL, LOCAL_URL } from "../_constants/constants";
import { getFetchErrorMessage } from "../_utils";
import { decryptCookie, encryptCookie } from "../_utils/encryption";
import { fetchData, userFetchClient } from "../_fetch/fetchData";
import { fetchClient } from "../_fetch/fetch-client";
import { jwtDecode } from "jwt-decode";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const guestAuth = async (_, formData) => {
  if (!formData.get("guest_password")) {
    return {
      status: "error",
      message: "Provide guest password",
      errors: "Provide guest password",
    };
  }

  try {
    const res = await fetch(`${BASE_URL}/client/guest-login/`, {
      method: "POST",
      body: formData,
    });
    console.log(res);

    const data = await res.json();

    if (res.ok) {
      console.log("### data ###");
      console.log(data);
      const { guest_id, branch_id, branch_name, access, refresh } = data;
      const cookieStore = await cookies();

      const decoded = jwtDecode(refresh);

      const expiryDate = new Date(decoded.exp * 1000);

      const guestInfo = await encryptCookie({
        guest_id,
        branch_id,
        branch_name,
      });

      console.log({ guestInfo, access, refresh });

      cookieStore.set(
        "guest-info",
        JSON.stringify({ guestInfo, access, refresh }),
        {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          expires: expiryDate,
        }
      );
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
    console.error(error);
    return {
      status: "error",
      message: "Server error!",
    };
  }
};

export async function fetchProducts({
  page = 1,
  category = "",
  search = "",
  min,
  max,
}) {
  const params = new URLSearchParams({
    page: page.toString(),
    ...(category && { category }),
    ...(search && { search }),
    ...(min && { min_price: min }),
    ...(max && { max_price: max }),
  });

  const res = await fetchData(`/inventory/public/available-stocks/?${params}`, {
    isBranch: true,
  });

  return res;
}

export const setToken = async ({ access, refresh }) => {
  try {
    const decoded = jwtDecode(access);
    const refreshDecoded = jwtDecode(refresh);

    const accessExp = new Date(decoded.exp * 1000);
    const refreshExp = new Date(refreshDecoded.exp * 1000);

    const cookieStore = await cookies();
    cookieStore.set("user-access", access, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      expires: accessExp,
    });
    cookieStore.set("user-refresh", refresh, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      expires: refreshExp,
    });
    console.log(" === token set ==");
  } catch (e) {
    console.error(e);
  }
};

export async function register(_, formData) {
  if (!formData.get("email")) {
    return {
      status: "error",
      message: "Email is required",
      email: "Email is required",
    };
  }
  if (!formData.get("password")) {
    return {
      status: "error",
      message: "Password is required",
      password: "Password is required",
      data: formData.get("email"),
    };
  }

  if (!formData.get("confirm_password")) {
    return {
      status: "error",
      message: "Confirm password is required",
      confirm_password: "Confirm password is required",
      data: formData.get("email"),
    };
  }

  try {
    const res = await fetchClient(`/client/register/`, {
      method: "POST",
      body: formData,
    });
    console.log(res);

    const data = await res.json();

    if (res.ok) {
      const cookieStore = cookies();
      const token = data;
      console.log(token);

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
    console.error(error);
    return {
      status: "error",
      message: "Server error!",
    };
  }
}

export async function login(_, formData) {
  if (!formData.get("username")) {
    return {
      status: "error",
      message: "Email is required",
      email: "Email is required",
    };
  }
  if (!formData.get("password")) {
    return {
      status: "error",
      message: "Password is required",
      password: "Password is required",
      data: formData.get("username"),
    };
  }

  try {
    const res = await fetchClient(`/api/token/`, {
      method: "POST",
      body: formData,
    });

    console.log(res);
    console.log(formData);
    const data = await res.json();
    console.log(data);

    if (res.ok) {
      // const cookieStore = await cookies();
      const { access, refresh } = data;

      await setToken({ access, refresh });

      // const cookieFromAuth = await setCookie(
      //   "user-token",
      //   JSON.stringify({ access: token.access, refresh: token.refresh }),
      //   expiryDate
      // );

      // await setSession(
      //   "user-token",
      //   JSON.stringify({ access: token.access, refresh: token.refresh }),
      //   expiryDate
      // // );
      // console.log("=== cookieFromAuth ====");
      // console.log(cookieFromAuth);

      return {
        status: "success",
        data: formData.get("username"),
      };
    } else {
      return {
        status: "error",
        message: getFetchErrorMessage(data) || "There was an error!",
        data: formData.get("username"),
      };
    }
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      message: "Server error!",
      data: formData.get("username"),
    };
  }
}
export async function resetPassword(_, formData) {
  const email = formData.get("email");
  if (!email) {
    return {
      status: "error",
      message: "Email is required",
      email: "Email is required",
      data: email,
    };
  }

  try {
    const res = await fetchClient(`/client/password-reset/`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (res.ok) {
      // const cookieStore = await cookies();

      return {
        status: "success",
        data: formData.get("username"),
      };
    } else {
      return {
        status: "error",
        message: getFetchErrorMessage(data) || "There was an error!",
        data: formData.get("username"),
      };
    }
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      message: "Server error!",
      data: formData.get("username"),
    };
  }
}
export async function changePassword(_, formData) {
  const password = formData.get("password");
  const confirm = formData.get("confirm_password");
  if (!password || !confirm) {
    return {
      status: "error",
      message: "Password and confirm password are required",
    };
  }

  if (password !== confirm) {
    return {
      status: "error",
      message: "Password and confirm does not match",
    };
  }

  try {
    const res = await fetchClient(`/client/password-reset-confirm/`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (res.ok) {
      // const cookieStore = await cookies();

      return {
        status: "success",
      };
    } else {
      return {
        status: "error",
        message: getFetchErrorMessage(data) || "There was an error!",
      };
    }
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      message: "Server error!",
    };
  }
}

export async function postSimpleData({ url, body, revalidate }) {
  try {
    console.log(" === body ===");
    console.log(body);
    const res = await fetchClient(url, {
      method: "POST",
      body,
    });

    console.log("== res ===");
    console.log(res);

    // const data = await res.json();

    if (res.ok) {
      revalidate && revalidatePath(revalidate);
      return {
        status: "success",
        data: await res.json(),
      };
    } else {
      return {
        status: "error",
        message:
          getFetchErrorMessage(await res.json()) || "There was an error!",
        prev: body,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      message: "Server error!",
      prev: body,
    };
  }
}
export async function postUserRelatedData({ url, body, revalidate }) {
  try {
    console.log(" === body from user post ===");
    console.log(body);

    const { access } = await userTokenRotation();

    if (!access) {
      return {
        status: "error",
        message: "Unauthenticated user, login first",
      };
    }

    const res = await fetch(`${BASE_URL}${url}`, {
      method: "POST",
      body,
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });

    console.log("== post res ===");
    console.log(res);

    // const data = await res.json();

    if (res.ok) {
      if (revalidate) {
        revalidatePath(revalidate);
      }
      return {
        status: "success",
        data: await res.json(),
      };
    } else {
      return {
        status: "error",
        message:
          getFetchErrorMessage(await res.json()) || "There was an error!",
        prev: body,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      message: "Server error!",
      prev: body,
    };
  }
}
export async function updateUserRelatedData({ url, body, revalidate }) {
  try {
    console.log(" === body from updateWithfetch ===");
    console.log(body);

    const { access } = await userTokenRotation();

    if (!access) {
      return {
        status: "error",
        message: "Unauthenticated user, login first",
      };
    }

    const res = await fetch(`${BASE_URL}${url}`, {
      method: "PATCH",
      body,
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });

    console.log("== update use fatch res ===");
    console.log(res);

    // const data = await res.json();

    if (res.ok) {
      if (revalidate) {
        revalidatePath(revalidate);
      }
      return {
        status: "success",
        data: await res.json(),
      };
    } else {
      return {
        status: "error",
        message:
          getFetchErrorMessage(await res.json()) || "There was an error!",
        prev: body,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      message: "Server error!",
      prev: body,
    };
  }
}
export async function putUserRelatedData({ url, body, revalidate }) {
  try {
    console.log(" === body from update put method ===");
    console.log(body);

    const { access } = await userTokenRotation();

    if (!access) {
      return {
        status: "error",
        message: "Unauthenticated user, login first",
      };
    }

    const res = await fetch(`${BASE_URL}${url}`, {
      method: "PUT",
      body,
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });

    console.log("== update use put res ===");
    console.log(res);

    // const data = await res.json();

    if (res.ok) {
      if (revalidate) {
        revalidatePath(revalidate);
      }
      return {
        status: "success",
        data: await res.json(),
      };
    } else {
      return {
        status: "error",
        message:
          getFetchErrorMessage(await res.json()) || "There was an error!",
        prev: body,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      message: "Server error!",
      prev: body,
    };
  }
}
export async function userRelatedDataDelete({ url, revalidate }) {
  try {
    const { access } = await userTokenRotation();

    if (!access) {
      return {
        status: "error",
        message: "Unauthenticated: access token not found",
      };
    }

    let res = await fetch(`${BASE_URL}${url}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });

    console.log("## delete res ###");
    console.log(res);

    if (res.ok) {
      console.log("ok");
      if (revalidate) {
        revalidatePath(revalidate);
      }
      console.log("revlidate");
      return { status: "success" };
    } else {
      return {
        status: "error",
        message:
          getFetchErrorMessage(await res.json()) || "There was an error!",
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

export async function revalidateRoute(path) {
  revalidatePath(path);
}

export async function orderAction(formData, defaultData, carts) {
  console.log("data from order", formData, defaultData, carts);
  const cookieStore = await cookies();
  const formValue = Object.fromEntries(formData);
  const data = cookieStore.get("guest-info")?.value || "{}";
  const { guestInfo, access, refresh } = JSON.parse(data);

  const items = carts?.map((cart) => ({
    product_sku_code: cart.sku_code,
    quantity: cart.qty,
  }));
  const {
    order_notes,
    combo_selection,
    deliveryOption,
    referred_by,
    ...address_data
  } = Object.fromEntries(formData);

  let body;
  if (defaultData?.id) {
    console.log("default on");
    body = {
      delivery_type: formData.get("deliveryOption") || "delivery",
      delivery_address: defaultData?.id,
      ordered_from_branch: defaultData?.branch_in_range?.[0],
      combo_selection,
      order_notes,
      referred_by,
      items,
    };
  } else {
    const token = await decryptCookie(guestInfo);

    body = {
      delivery_type: formData.get("deliveryOption") || "delivery",
      ordered_from_branch: token?.branch_id,
      address_data: {
        ...address_data,
        branch_in_range: [token?.branch_id],
      },
      combo_selection,
      order_notes,
      referred_by,
      items,
    };
  }

  const userToken = cookieStore.get("user-refresh")?.value;
  console.log("order body", JSON.stringify(body));
  if (!userToken) {
    const res = await unauthOrder(JSON.stringify(body));
    return { ...res, formValue };
  } else {
    const s = await userFetchClient(`/client/client-orders-create/`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });
    console.log("submitted data", s);
    return { ...s, formValue };
  }
}

async function unauthOrder(body) {
  console.log("== body ==", body);
  try {
    const cookieStore = await cookies();
    const data = cookieStore.get("guest-info")?.value || "{}";
    const { guestInfo, access, refresh } = JSON.parse(data);

    const res = await fetch(`${BASE_URL}/client/client-orders-create/`, {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
    });

    console.log(`Unauth first status:${res.status}`);
    if (res.ok) {
      return { status: "success" };
    } else if (res.status === 401) {
      const refreshData = JSON.stringify({ refresh });
      console.log("refreshData", refreshData);

      const refreshRes = await fetch(`${BASE_URL}/api/token/refresh/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: refreshData,
      });

      console.log("refreshRes", refreshRes.status);

      if (refreshRes.ok) {
        const newData = await refreshRes.json();

        const decoded = jwtDecode(newData.refresh);
        const expiryDate = new Date(decoded.exp * 1000);

        await setCookie(
          "guest-info",
          { access: newData.access, refresh: newData.refresh, guestInfo },
          {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            expires: expiryDate,
          }
        );

        const retryRes = await fetch(
          `${BASE_URL}/client/client-orders-create/`,
          {
            method: "POST",
            body,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${newData.access}`,
            },
          }
        );

        console.log("retryRes", retryRes.status);

        if (retryRes.ok) {
          return { status: "success" };
        } else {
          return {
            status: "error",
            message:
              getFetchErrorMessage(await retryRes.json()) ||
              "There was an error!",
          };
        }
      }

      if (refreshRes.status === 401 || refreshRes.status === 403) {
        cookieStore.delete("guest-info");
        return {
          status: "error",
          message:
            getFetchErrorMessage(await refreshRes.json()) ||
            "Refresh token error",
        };
      }
    } else {
      return {
        status: "error",
        message:
          getFetchErrorMessage(await res.json()) || "There was an error!",
      };
    }
  } catch (e) {
    console.error(e);
    return { status: "error", message: "Server error" };
  }
}

export async function contactAction(_, formData) {
  try {
    const res = await fetch(`${BASE_URL}/api/contact/`, {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      return {
        status: "success",
      };
    } else {
      return {
        status: "error",
        message: getFetchErrorMessage(await res.json()) || "There was an error",
      };
    }
  } catch (e) {
    console.error(e);
    return {
      status: "error",
      message: "!Server error",
    };
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("user-access");
  cookieStore.delete("user-refresh");
  cookieStore.delete("user");
  redirect("/");
}

export async function gatCookie() {
  const cookieStore = await cookies();
  return cookieStore.get("user-token");
}

export async function userTokenRotation() {
  // get token form cookie
  const cookieStore = await cookies();
  const userAccess = cookieStore.get("user-access");
  const userRefresh = cookieStore.get("user-refresh");

  // defied token to return
  let token = {
    access: userAccess?.value,
    refresh: userRefresh?.value,
  };

  // check is refresh
  let isRefresh = false;
  if (!userAccess) {
    isRefresh = true;
  } else {
    const decodedAccess = jwtDecode(userAccess?.value);
    const accessExp = new Date(decodedAccess.exp * 1000);
    if (accessExp < Date.now()) {
      isRefresh = true;
    }
  }

  console.log("=== user access ===");

  // refresh token
  if (isRefresh && userRefresh?.value) {
    console.log("=== refreshing toke ===");

    const refreshRes = await fetch(`${BASE_URL}/api/token/refresh/`, {
      method: "POST",
      body: JSON.stringify({ refresh: userRefresh?.value }),
      headers: { "Content-Type": "application/json" },
    });

    if (refreshRes.ok) {
      const { access, refresh } = await refreshRes.json();
      await setToken({ access, refresh });
    } else {
      token = {};
      cookieStore.delete("user-access");
      cookieStore.delete("user-refresh");
      cookieStore.delete("user");
    }
  }

  return token;
}

export const testSetCookie = async () => {
  try {
    await fetch("http://localhost:3000/api/token", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ value: "test" }),
    });
    revalidatePath("/checkout/test");
  } catch (e) {
    console.log(e);
  }
};

/**
 * Custom fetch function to handle token refreshing.
 * It automatically retries the request with a new access token if the original token is expired.
 *
 * @param {string} url The API endpoint to call (relative to API_BASE_URL).
 * @param {RequestInit} [options={}] The fetch options (method, body, headers, etc.).
 * @returns {Promise<any>} The response data from the API.
 */

export async function refreshAndSetTokens(refreshToken) {
  const cookiesStore = await cookies();

  if (!refreshToken) {
    throw new Error("Unauthorized: No refresh token available.");
  }

  try {
    const refreshResponse = await fetch(`${API_BASE_URL}/api/token/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (!refreshResponse.ok) {
      throw new Error("Refresh token invalid or expired.");
    }

    const newTokens = await refreshResponse.json();
    const newAccessToken = newTokens.access;
    const newRefreshToken = newTokens.refresh;

    const decoded = jwtDecode(newAccessToken);
    const refreshDecoded = jwtDecode(newRefreshToken);

    const accessExp = new Date(decoded.exp * 1000);
    const refreshExp = new Date(refreshDecoded.exp * 1000);

    cookiesStore.set("user-access", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: accessExp,
    });

    cookiesStore.set("user-refresh", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: refreshExp,
    });

    return newAccessToken;
  } catch (error) {
    console.error("Failed to refresh token in Server Action:", error);
    throw error;
  }
}
export async function fetchDataWithAuth(url, options = {}) {
  const cookiesStore = await cookies();
  let accessToken = cookiesStore.get("user-access")?.value;

  const fullUrl = `${BASE_URL}${url}`;

  const makeRequest = async (token) => {
    const headers = new Headers(options.headers);
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return fetch(fullUrl, { ...options, headers });
  };

  let response = await makeRequest(accessToken);

  if (response.status === 401) {
    console.log("Access token expired. Attempting to refresh token...");
    const refreshToken = cookiesStore.get("user-refresh")?.value;

    try {
      // Call the dedicated Server Action to handle the refresh
      const newAccessToken = await refreshAndSetTokens(refreshToken);

      // Retry the original request with the new access token
      response = await makeRequest(newAccessToken);
    } catch (error) {
      console.error("Token refresh and retry failed:", error);
      throw error; // Re-throw the error to be handled by the component
    }
  }

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText);
  }

  return response.json();
}

// create address
export async function addressAction({ url, body, revalidate, edit }) {
  const cookieStore = await cookies();
  const data = cookieStore.get("guest-info")?.value || "{}";
  const { guestInfo } = JSON.parse(data);
  try {
    const token = await decryptCookie(guestInfo);
    const method = edit ? "PATCH" : "POST";

    body.append("branch_in_range", JSON.stringify([token?.branch_id]));

    const { access } = await userTokenRotation();

    if (!access) {
      return {
        status: "error",
        message: "Unauthenticated user, login first",
      };
    }

    const res = await fetch(`${BASE_URL}${url}`, {
      method,
      body,
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });

    console.log("== post res ===");
    console.log(res);

    // const data = await res.json();

    if (res.ok) {
      if (revalidate) {
        revalidatePath(revalidate);
      }
      return {
        status: "success",
        data: await res.json(),
      };
    } else {
      return {
        status: "error",
        message:
          getFetchErrorMessage(await res.json()) || "There was an error!",
        prev: body,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      message: "Server error!",
      prev: body,
    };
  }
}
