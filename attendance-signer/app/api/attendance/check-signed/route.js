import { connectToDatabase } from "@/database/db";

export async function POST(request) {
    const prisma = await connectToDatabase()
    const formData = await request.formData()
    const matric = formData.get('matric')
    const attendanceId = formData.get('attendanceId')

    try {

        const signed = await prisma.attendanceSignature.findFirst({
            where: {
                attendanceId: Number(attendanceId),
                matricNumber: matric
            }
        })
        return Response.json({ signed: !!signed });
    } catch (error) {
        console.error('Error checking if student signed:', error);
        return Response.error();
    }
}