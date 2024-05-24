import { connectToDatabase } from "@/database/db";


export async function GET(request) {
    const db = await connectToDatabase();

    return Response.json('successful')
}


export async function POST(req, res) {
   
}

