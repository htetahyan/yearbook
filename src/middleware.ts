import { NextRequest, NextResponse } from "next/server"
import { verifyToken } from "./server/auth/actions"

const rateLimitMap = new Map();
export default async function middleware(req:NextRequest,res:NextResponse) {
    const token = req.cookies.get('refresh_token')?.value

    if(req.method!=='GET'){
        const ip = req.ip
        const limit = 10; // Limiting requests to 5 per minute per IP
        const windowMs = 60 * 1000; // 1 minute

        if (!rateLimitMap.has(ip)) {
            rateLimitMap.set(ip, {
                count: 0,
                lastReset: Date.now(),
            });
        }

        const ipData = rateLimitMap.get(ip);

        if (Date.now() - ipData.lastReset > windowMs) {
            ipData.count = 0;
            ipData.lastReset = Date.now();
        }

        if (ipData.count >= limit) {
            return NextResponse.json({
                message: 'Rate limit exceeded. Please try again later.',
                success: false,
            }, {
                status: 429,
            })
        }

        ipData.count += 1;
        return NextResponse.next()
    }


}

export const config={
   /* matcher:['/((?!api|_next|favicon.ico).*)']*/
    matcher:['/api/:path*']
}
export const runtime='experimental-edge'
