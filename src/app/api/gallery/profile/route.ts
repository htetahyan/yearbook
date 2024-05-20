import {NextRequest, NextResponse} from "next/server";
import {verifyToken} from "~/server/auth/actions";
import {getUserCards} from "~/server/gallery/actions";

export const GET = async (req:NextRequest) => {
try {
    const token=req.cookies.get('token')?.value
    const {id}=await verifyToken(token!)
    const cards=await getUserCards(id as number)
    return NextResponse.json(JSON.stringify({data:cards}), { status: 200 })
}catch (error:any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
}
}
