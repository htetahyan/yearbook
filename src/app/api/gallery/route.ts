import { NextRequest, NextResponse } from "next/server"
import {getCardsFromGallery} from "~/server/gallery/actions";
import {Filter} from "~/server/type";

export const GET=async(req:NextRequest)=>{
    try {
        const { searchParams } = new URL(req.url)
        const limit = searchParams.get('limit')
        const offset = searchParams.get('offset')
        const filter = searchParams.get('filter')
        const cards = await getCardsFromGallery({ limit: Number(limit), offset: Number(offset), filter: filter as Filter })

if (cards?.length === 0) {
    return NextResponse.json({message:'No cards found'},{status:404})
}
        return NextResponse.json({data:cards},{status:200})
    }catch (error:any) {
        return NextResponse.json({message:error.message},{status:500})
    }
}
