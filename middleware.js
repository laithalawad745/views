import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // يمكنك إضافة منطق إضافي هنا إذا لزم الأمر
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        // السماح بالوصول للصفحة الرئيسية وصفحة تسجيل الدخول
        if (req.nextUrl.pathname === "/" || req.nextUrl.pathname === "/login") {
          return true;
        }
        // حماية صفحة Dashboard
        if (req.nextUrl.pathname.startsWith("/dashboard")) {
          return token !== null;
        }
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*"],
};