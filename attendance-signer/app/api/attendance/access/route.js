import { connectToDatabase } from "@/database/db";

export async function POST(request) {
    const prisma = await connectToDatabase()

    const formData = await request.formData()
    try {


        //  Retrieve the attendance based on the provided code
        const attendance = await prisma.attendance.findFirst({
            where: {
                code: formData.get('code'),
            },
            include: {
                // Include any related models if needed
            },
        });

        if (!attendance) {
            return Response.json({ error: 'Attendance not found' });
        }

        return Response.json(attendance);
    } catch (error) {
        console.error('Error accessing attendance:', error);
        return Response.error();
    } finally {
        await prisma.$disconnect(); // Disconnect from the database after the operation
    }
    return Response.json('success')
}

