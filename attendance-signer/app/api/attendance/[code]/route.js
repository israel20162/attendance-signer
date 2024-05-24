import { connectToDatabase } from "@/database/db";

export async function GET(request,{params}) {
    const prisma = await connectToDatabase()
    const attendance = await prisma.attendance.findFirst({
        where: {
            code: params.code,
        },
        include: {
            // Include any related models if needed
        },
    });
    return Response.json({attendance:attendance})
}