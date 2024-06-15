import { NextRequest, NextResponse } from "next/server"
import {getCardsFromGallery} from "~/server/gallery/actions";
import {Filter} from "~/server/type";
import {redis} from "~/server/cache/redis";

export const GET=async(req:NextRequest)=>{
    try {
        const { searchParams } = new URL(req.url)
        const limit = searchParams.get('limit')
        const offset = searchParams.get('offset')
        const filter = searchParams.get('filter') ?? 'newest'
        console.log(filter)
        const key = `gallery`
                const {count,cards} = await getCardsFromGallery({ limit: Number(limit), offset: Number(offset), filter: filter as Filter })

if (cards?.length === 0) {
    return NextResponse.json({message:'No cards found'},{status:404})
}

        console.log(count)
        return NextResponse.json({data: {cards,total:count }},{status:200})
    }catch (error:any) {
        return NextResponse.json({message:error.message},{status:500})
    }
}
