import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";
import { BASE_URL } from "./app/_constants/constants";

export async function middleware(request) {
  const guestToken = request.cookies.get("guest-info")?.value;
  const path = request.nextUrl.pathname;
  const response = NextResponse.next();

  if (!guestToken && path !== "/guest-auth") {
    return NextResponse.redirect(new URL("/guest-auth", request.url));
  }

  if (guestToken && path === "/guest-auth") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (path.startsWith("/profile") || path.startsWith("/checkout")) {
    // await userTokenRotation();
    // get token
    const userAccess = request.cookies.get("user-access")?.value;
    const userRefresh = request.cookies.get("user-refresh")?.value;

    // Protect profile page
    if (path.startsWith("/profile") && !userRefresh) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // is fetch refresh token
    let isRefresh = false;
    if (!userAccess) {
      isRefresh = true;
    } else {
      const decodedAccess = jwtDecode(userAccess);
      const accessExp = new Date(decodedAccess.exp * 1000);
      if (accessExp < Date.now()) {
        isRefresh = true;
      }
    }

    // fetch refresh
    if (isRefresh && userRefresh) {
      const refreshRes = await fetch(`${BASE_URL}/api/token/refresh/`, {
        method: "POST",
        body: JSON.stringify({ refresh: userRefresh }),
        headers: { "Content-Type": "application/json" },
      });

      //
      if (refreshRes.ok) {
        const { access, refresh } = await refreshRes.json();

        const decoded = jwtDecode(access);
        const refreshDecoded = jwtDecode(refresh);

        const accessExp = new Date(decoded.exp * 1000);
        const refreshExp = new Date(refreshDecoded.exp * 1000);

        response.cookies.set("user-access", access, {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
          expires: accessExp,
        });
        response.cookies.set("user-refresh", refresh, {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
          expires: refreshExp,
        });

        // await setToken({ access, refresh });
      } else {
        request.cookies.delete("user-access");
        request.cookies.delete("user-refresh");
        request.cookies.delete("user");
        return NextResponse.redirect(new URL("/", request.url));
      }
    }
    // else {
    //   request.cookies.delete("user-access");
    //   request.cookies.delete("user-refresh");
    //   return NextResponse.redirect(new URL("/login", request.url));
    // }

    return response;
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};
