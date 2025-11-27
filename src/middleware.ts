import { type MiddlewareConfig, type NextRequest, NextResponse } from "next/server"
import { validateToken } from "./helppers/getUserIdForToken"


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


    //autenticado tentando acessar rota publica
    if (token && pathname === publicRoute) {
        const redirectUrl = request.nextUrl.clone()
        redirectUrl.pathname = '/app'

        return NextResponse.redirect(redirectUrl)
    }
}