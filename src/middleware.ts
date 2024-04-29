import { NextRequest, NextResponse } from "next/server"
import { verifyToken } from "./server/auth/actions"

export const config={
    matcher:['/((?!api|_next|favicon.ico).*)']
}

export default async function middleware(req:NextRequest) {
    const token=req.cookies.get('refresh_token')?.value
const isTokenValid=await verifyToken(token!)
    if(isTokenValid){
        return NextResponse.next()
    }else {
        const url = req.nextUrl.clone();
        url.pathname = '/login';
        return NextResponse.redirect(url);
    }
}