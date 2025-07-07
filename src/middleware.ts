import { match } from "assert";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const isLogin = request.cookies.get('auth');
    const {pathname} = request.nextUrl;

    if (!isLogin && pathname.includes('dashboard')) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (isLogin && (pathname.includes('login') || pathname.includes('signUp'))) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/signUp']
}