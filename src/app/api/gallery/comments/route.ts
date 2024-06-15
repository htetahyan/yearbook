import {NextRequest, NextResponse} from "next/server";
import { verifyToken } from "~/server/auth/actions";
import { getComments, postComment } from "~/server/gallery/comments/actions";

export const GET =async(req:NextRequest)=>{

    try {
        const { searchParams } = new URL(req.url)
        const limit = parseInt(searchParams.get('limit')!)
        const offset = parseInt(searchParams.get('offset')!)
        const card_id = parseInt(searchParams.get('cardId')!)
        const comments = await getComments(limit, offset, card_id)
        if (comments.length === 0) {
            return NextResponse.json({ message: 'No comments found' }, { status: 404 })
        }
        return NextResponse.json({data:comments},{status:200})
    }
    catch (error:any) {
        return NextResponse.json({message:error.message},{status:500})
    }
}
export const POST = async (req: NextRequest) => {
    try {
        const token = req.cookies.get('token')?.value
        const { id } = await verifyToken(token!)
        if(!id || token===null || token===undefined || id===null || id===undefined){
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
        }
        const {searchParams} = new URL(req.url)
        const cardId = parseInt(searchParams.get('cardId')!)
        const { content } = await req.json()
        await postComment(content, cardId , parseInt(id as string) as number)
        return NextResponse.json({ message: 'Comment created successfully' }, { status: 201 })
    } catch (error:any) {
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}
