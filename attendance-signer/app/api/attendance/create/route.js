import { connectToDatabase } from "@/database/db";

export async function POST(request) {
    const prisma = await connectToDatabase()

    const formData = await request.formData()
  

    try {
        // Save attendance to the database using Prisma
        const createdAttendance = await prisma.attendance.create({
            data: {
                classId: Number(formData.get('classId')),
               // date: formData.get('date'),
                startTime:new Date( formData.get('startTime')),
                endTime: new Date(formData.get('endTime')),
                course_code: formData.get('course_code'), 
                course_title: formData.get('course_title'),
                code: formData.get('code'),
                repId:Number(formData.get('repId'))
            },
        });

       return  Response.json(createdAttendance);
    } catch (error) {
        console.error('Error creating attendance:', error);
        return Response.error();
    }


}