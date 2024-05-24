import { connectToDatabase } from "@/database/db";

export async function POST(request) {
    const prisma = await connectToDatabase()

    const formData = await request.formData()
    const attendanceId = formData.get('attendanceId')
    const matricNumber = formData.get('matric')
    const sign = formData.get('signature')
    const signTime = formData.get('signTime')
   
    try {
        const signature = await prisma.attendanceSignature.create({
            data: {
                attendanceId: Number(attendanceId),
                matricNumber,
                signature: sign,
                signTime: new Date(signTime)

            }
        })
        return Response.json({message:'success',signature})
    } catch (error) {
        console.log(error);
        return Response.error()
    }
}