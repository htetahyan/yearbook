import { NextRequest, NextResponse } from "next/server"

export const  POST=async(req:NextRequest)=>{
    const token = req.cookies.get('refresh_token')?.value

    return NextResponse.json({message:'hello'})
}