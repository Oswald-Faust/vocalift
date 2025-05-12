import { NextRequest, NextResponse } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // Vérifier si l'utilisateur est authentifié
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Vérifier si la route demandée est protégée
  const isProtectedRoute = req.nextUrl.pathname.startsWith('/dashboard') || 
                          req.nextUrl.pathname.startsWith('/api/') && 
                          !req.nextUrl.pathname.startsWith('/api/auth/login') && 
                          !req.nextUrl.pathname.startsWith('/api/auth/register');

  // Vérifier si la route demandée est réservée aux utilisateurs non authentifiés
  const isAuthRoute = req.nextUrl.pathname === '/Login' || req.nextUrl.pathname === '/Register';

  // Si la route est protégée et l'utilisateur n'est pas connecté, rediriger vers la page de connexion
  if (isProtectedRoute && !session) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = '/Login';
    redirectUrl.searchParams.set('redirectedFrom', req.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // Si l'utilisateur est connecté et essaie d'accéder à la page de connexion ou d'inscription, 
  // rediriger vers le tableau de bord
  if (isAuthRoute && session) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = '/dashboard';
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}

// Définir les routes qui seront soumises au middleware
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/:path*',
    '/Login',
    '/Register',
  ],
}; 