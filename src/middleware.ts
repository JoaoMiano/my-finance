import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken";

const redirectWhenNotAutenticatedRoute = '/'

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname

    if (
        pathname.startsWith("/_next") ||
        pathname.startsWith("/favicon") ||
        pathname.startsWith("/images") ||
        pathname.startsWith("/assets") ||
        pathname.startsWith("/api")
    ) {
        return NextResponse.next();
    }

    const publicRoute = "/"
    const privateRoute = "/app"
    const token = request.cookies.get("token")?.value

    //nao autenticado tentando acessar rota publica
    if (!token && pathname === publicRoute) {
        return NextResponse.next()
    }

    //nao autenticado tentando acessar rota privada
    if (!token && pathname === privateRoute) {
        const redirectUrl = request.nextUrl.clone()
        redirectUrl.pathname = redirectWhenNotAutenticatedRoute
        return NextResponse.redirect(redirectUrl)
    }

    //validando se o token ainda esta valido
    if (token) {
        const decoded = jwt.decode(token) as { exp?: number }

        if (decoded?.exp && Date.now() >= decoded.exp * 1000) {
            const redirectUrl = request.nextUrl.clone()
            redirectUrl.pathname = redirectWhenNotAutenticatedRoute

            const res = NextResponse.redirect(redirectUrl)
            // Remover o cookie manualmente
            res.cookies.set('token', '', {
                maxAge: 0,
                path: '/',
            })

            return res
        }
    }


    //autenticado tentando acessar rota publica
    if (token && pathname === publicRoute) {
        const redirectUrl = request.nextUrl.clone()
        redirectUrl.pathname = '/app'

        return NextResponse.redirect(redirectUrl)
    }
}