import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 1. Ambil token dari cookie
  const token = request.cookies.get('token')?.value;

  // 2. Tentukan halaman mana saja yang mau diproteksi
  const isDashboardPage = request.nextUrl.pathname.startsWith('/dashboard');
  const isLoginPage = request.nextUrl.pathname === '/';

  // 3. LOGIKA PROTEKSI:
  // Jika user mau ke dashboard tapi TIDAK punya token, lempar ke Login
  if (isDashboardPage && !token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Jika user sudah login (punya token) tapi malah buka halaman Login, lempar ke Dashboard
  if (isLoginPage && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// 4. Atur rute mana saja yang harus dilewati middleware ini
export const config = {
  matcher: ['/', '/dashboard/:path*'],
};