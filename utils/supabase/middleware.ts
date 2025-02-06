import { createServerClient } from '@supabase/ssr';
import { type NextRequest, NextResponse } from 'next/server';

export const updateSession = async (request: NextRequest) => {
  try {
    let response = NextResponse.next({
      request: {
        headers: request.headers
      }
    });

    const supabase = createServerClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({
            request
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        }
      }
    });
    const user = await supabase.auth.getUser();
    const {
      data: { session }
    } = await supabase.auth.getSession();
    if (!session && request.nextUrl.pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    if (session && request.nextUrl.pathname === '/sign-in') {
      return NextResponse.redirect(new URL('/admin', request.url));
    }

    return response;
  } catch (e) {
    return NextResponse.next({
      request: {
        headers: request.headers
      }
    });
  }
};
