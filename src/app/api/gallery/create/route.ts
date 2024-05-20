import {NextRequest, NextResponse} from "next/server";
import {uploadToS3} from "~/server/aws-s3/actions";
import {createYearbookCard, isCardAlreadyExist} from "~/server/gallery/actions";
import {NewCard} from "~/slices/cardSlice";
import {verifyToken} from "~/server/auth/actions";

export const POST =async (req:NextRequest)=>{
   try {

   const { searchParams } = new URL(req.url);
    const fileName = searchParams.get("fileName");
    const formData = await req.formData();
    const file: any = formData.get("file")!;
    const rawData=formData.get('data')!
       const data=JSON.parse(rawData as string)
       const token=req.cookies.get('token')?.value

       const {id}=await verifyToken(token!)
       if(await isCardAlreadyExist(data.name as string, data.studentId as string)){
           return NextResponse.json({message:'Card with this name and student Id Already exists'},{status:400})
       }
    const uploadResults=await uploadToS3(file,fileName as string)

await createYearbookCard(data as unknown as NewCard,uploadResults,id as number)
    return NextResponse.json({message:'Card created successfully'},{status:200})}
    catch (e:any) {
        return NextResponse.json({message:e.message},{status:500})
    }
}
