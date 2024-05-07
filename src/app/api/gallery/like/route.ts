import { NextRequest, NextResponse } from "next/server"
import {isCurrentUserLiked, likeCard, unlikeCard} from "~/server/gallery/actions";
import {revalidatePath, revalidateTag} from "next/cache";

export const  POST=async(req:NextRequest)=>{
revalidatePath('like')
    try {
        const token = req.cookies.get('token')?.value
        const { searchParams } = new URL(req.url)
        const card_id = searchParams.get('card_id')
        const liked = 'true'===searchParams.get('liked')

        liked ? await unlikeCard(parseInt(card_id!),1) :await likeCard(parseInt(card_id!),1)

        return NextResponse.json({message:liked ?? false},{status:200})
    } catch (error:any) {
        return NextResponse.json({message:error.message},{status:401})
    }

}
export const GET=async(req:NextRequest)=>{

const liked=await isCurrentUserLiked(1,1)
    return NextResponse.json({message:liked},{status:200})
}
