import Link from "next/link";
import { AccessDenied } from "./components/auth";

async function getData() {
    const res = await fetch(process.env.URL + 'api/attendance/get', {
        method: 'GET',
        //body: formData
    })


    const data = await res.json()

    return data
}

async function page() {
   
    console.log(getData());

    return (
        <>
            <AccessDenied />
            <div className="bg-gray-100 min-h-screen">
                <div className="container mx-auto p-8">
                    <div className="mb-8">
                        <h2 className="text-3xl font-extrabold text-gray-800 mb-4">Welcome, Course Rep!</h2>
                        <p className="text-gray-600">Manage your attendance records and create new ones.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white p-6 col-span-2 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-4">Create Attendance</h3>
                            <p className="text-gray-600 mb-4">Click below to create a new attendance:</p>
                            <Link href="/attendance/create" className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-700"
                            >
                                Create Attendance
                            </Link>

                        </div>

                        <div className="col-span-2">
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-xl font-semibold mb-4">Attendance Records</h3>
                                {/* {attendances.length === 0 ? (
                                    <p className="text-gray-600">No attendance records available.</p>
                                ) : (
                                    <ul>
                                        {attendances.map((attendance) => (
                                            <li key={attendance.id} className="mb-4">
                                                <div className="bg-gray-200 p-4 rounded-md">
                                                    <h4 className="text-lg font-semibold mb-2">{attendance.title}</h4>
                                                    <p className="text-gray-600">Date: {attendance.date}</p>
                                                    <p className="text-gray-600">Time: {attendance.startTime} - {attendance.endTime}</p>
                                                </div>
                                                <div className="mt-2">
                                                    <p className="font-semibold">Students:</p>
                                                    <ul className="list-disc pl-6">
                                                        {attendance.students.map((student) => (
                                                            <li key={student.id}>{student.name} - {student.matricNumber}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                )} */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default page;