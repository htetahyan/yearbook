import { NextRequest, NextResponse } from "next/server"
import {isCurrentUserLiked, toggleLike} from "~/server/gallery/actions";
import { revalidateTag} from "next/cache";
import {verifyToken} from "~/server/auth/actions";
import {redis} from "~/server/cache/redis";

export const  POST=async(req:NextRequest)=>{

    try {
        const token = req.cookies.get('token')?.value
        const { searchParams } = new URL(req.url)
        const cardId = searchParams.get('cardId')



     const {id}=await verifyToken(token ?? '')

await toggleLike(parseInt(cardId!),id as number)

        return NextResponse.json({message:'Success'},{status:200})
    } catch (error:any) {
        return NextResponse.json({message: error.message}, {status: 500})
    }

}

