import { jwtVerify } from 'jose';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import constant from './common/constant';

const publicPaths = ['/login', '/signup'];
const secret = new TextEncoder().encode(constant.token);

export async function middleware(req: NextRequest) {
  try {
    const path = req.nextUrl.pathname;
    const isPublicPath = publicPaths.includes(path);
    const token = req.cookies.get(constant.tokenName)?.value;
    if (isPublicPath) {
      if (token) {
        const { payload } = await jwtVerify(token, secret);
        if (payload) {
          return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
        }
      }
    } else if (!token) {
      return NextResponse.redirect(new URL('/login', req.nextUrl));
    }
    return NextResponse.next();
  } catch (error: any | Error) {
    console.error(error);
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }
}

export const config = {
  matcher: ['/', '/login', '/signup', '/dashboard'],
};
