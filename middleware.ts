// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['ua', 'en'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Редірект з кореня `/` → `/ua`
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/ua', request.url));
  }

  // Дозволити далі, якщо шлях починається з валідної локалі
  if (locales.some((locale) => pathname.startsWith(`/${locale}`))) {
    return NextResponse.next();
  }

  // Усі інші — 404 (можеш змінити)
  return NextResponse.rewrite(new URL('/_not-found', request.url));
}

export const config = {
  matcher: [
    '/',                // 🟢 Обов'язково явно
    '/((?!_next|api|favicon.ico|icons).*)', // для решти
  ],
};
