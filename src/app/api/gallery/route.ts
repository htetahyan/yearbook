import { NextRequest, NextResponse } from "next/server"

export const GET=async(req:NextRequest)=>{
    const { searchParams } = new URL(req.url)
    const limit = searchParams.get('limit')
    const offset = searchParams.get('offset')
    const filter = searchParams.get('filter')

    return NextResponse.json({message:'hello'})
}