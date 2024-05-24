import { connectToDatabase } from "@/database/db";

export async function GET(request) {
    const prisma = await connectToDatabase()

    const formData = await request.formData()
    const repId = formData.get('repId')
    try {
         const attendances = await prisma.attendance.findMany({
        where: {
            repId: repId
        },
        include:{
            signatures:true
       }
    })
    return Response.json({m:'hi'})
    } catch (error) {
        console.log(error);
        return Response.error()
    }
    
}

