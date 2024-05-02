import { NextRequest, NextResponse } from "next/server"
import { verifyToken } from "./server/auth/actions"


export default async function middleware(req:NextRequest,res:NextResponse) {
    const token = req.cookies.get('refresh_token')?.value
}

export const config={
    matcher:['/((?!api|_next|favicon.ico).*)']
}
