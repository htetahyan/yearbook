import { NextRequest, NextResponse } from "next/server"
import {isCurrentUserLiked, likeCard, toggleLike, unlikeCard} from "~/server/gallery/actions";
import { revalidateTag,revalidatePath} from "next/cache";
import {validateRevalidate} from "next/dist/server/lib/patch-fetch";
import {verifyToken} from "~/server/auth/actions";

export const  POST=async(req:NextRequest)=>{

    try {
        const token = req.cookies.get('token')?.value
        const { searchParams } = new URL(req.url)
        const cardId = searchParams.get('cardId')
     const {id}=await verifyToken(token ?? '')
revalidateTag('cards')
await toggleLike(parseInt(cardId!),id as number)

        return NextResponse.json({message:'liked'},{status:200})
    } catch (error:any) {
        return NextResponse.json({message: error.message}, {status: 401})
    }

}
export const GET=async(req:NextRequest)=>{

const liked=await isCurrentUserLiked(1,1)
    return NextResponse.json({message:liked},{status:200})
}
