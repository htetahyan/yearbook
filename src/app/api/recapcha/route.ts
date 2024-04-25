import {NextRequest,NextResponse} from "next/server";
import axios from 'axios'
export const POST=async(req:NextRequest)=>{
    const res=await req.json()
    try{
        const data= await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPCHA_SECRET}&response=${res.value}`,
{headers:{
    "Content-type":"application/x-www-form-urlencoded"
}})
    console.log(data);
    console.log(res);
        return NextResponse.json({data:res.value})
    }catch(e:any){
return NextResponse.json({message:e.message})
    }
   


}
