import { connectToDatabase } from "@/database/db";
import jwt from 'jsonwebtoken';
import { PrismaClient } from "@prisma/client";

export  async function POST(request) {
    const prisma = new PrismaClient()

    const formData = await request.formData()

    const matricNumber = formData.get('matric')
    const password = formData.get('password')
    try {
        // Fetch instructor details based on the provided email
        const courseRep = await prisma.rep.findUnique({
            where: {
                matricNumber: matricNumber,
            },
           
        });

        if (!courseRep) {
            return Response.json({ error: 'Invalid  matric number or password' });
        }
        console.log(courseRep);

        // Compare the provided password with the hashed password from the database
        //  const passwordMatch = await bcrypt.compare(password, instructor.password);
        const passwordMatch = courseRep.password === password

        if (!passwordMatch) {
            return Response.json({ error: 'Invalid matric number or password' });
        }

        // Generate a JWT token for authentication
        const token = jwt.sign({ instructorId: courseRep.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return Response.json({ token:token, id: courseRep.id });
    } catch (error) {
        console.error('Error logging in instructor:', error);
     return   Response.json({ error: 'Failed to log in instructor' });
    } finally {
        await prisma.$disconnect(); // Disconnect from the database after the operation
    }

}