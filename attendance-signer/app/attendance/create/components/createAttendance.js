'use client'
// pages/attendance/create.js
import { useState } from 'react';
import { useRouter } from 'next/navigation'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import AttendanceCodeDisplay from "./attendanceCodeDisplay";
import AccessDeniedMessage from '@/app/components/error';
const CreateAttendancePage = () => {
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [code, setCode] = useState('');
    const [courseCode, setCourseCode] = useState('')
    const [courseTitle, setCourseTitle] = useState('')
    const [showCode, setShowCode] = useState(false)

    const [attendance, setAttendance] = useState({})


    // const router = useRouter()
    console.log(sessionStorage.getItem('courseRepToken'))

    const handleCreateAttendance = async () => {
        function generateAttendanceCode() {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            let code = '';

            for (let i = 0; i < 6; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                code += characters.charAt(randomIndex);
            }

            return code


        }
        setCode(generateAttendanceCode())

        const formData = new FormData();
        //  formData.append('date', date);
        formData.append('startTime', startTime);
        formData.append('endTime', endTime);
        formData.append('code', generateAttendanceCode());
        formData.append('course_code', courseCode);
        formData.append('course_title', courseTitle);
        formData.append('classId', Math.floor(Math.random() * 1000));
        formData.append('repId',sessionStorage.getItem('repId'))

        try {
            const response = await fetch('/api/attendance/create', {
                method: 'POST',

                body: formData
            });

            if (response.ok) {
                const data = await response.json();
                setAttendance(data)
                //  console.log('Attendance created successfully:', data);
                setShowCode(true)
                console.log(attendance.id);
            } else {
                console.error('Failed to create attendance:', response.statusText);
            }
        } catch (error) {
            console.error('Error creating attendance:', error);
        }

    };


    if (!sessionStorage.getItem('courseRepToken')) {
        return (
           <AccessDeniedMessage/>
        )
    }

    return (
        <div className="container mx-auto  flex min-h-screen flex-col items-center justify-between p-12">
            <h1 className="text-2xl font-bold mb-4">Create Attendance</h1>

            <div className='grid md:grid-cols-2 md:gap-4'>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">Start Time:</label>
                    <DatePicker
                        selected={startTime}
                        onChange={(date) => setStartTime(date)}
                        showTimeSelect
                        timeFormat=" hh:mm"
                        timeIntervals={30}
                        dateFormat="MMMM d,yyyy HH:mm "
                        className="border rounded p-2 w-full"
                    />

                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">End Time:</label>
                    <DatePicker
                        selected={endTime}
                        onChange={(date) => setEndTime(date)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={30}
                        dateFormat="MMMM d,yyyy HH:mm "
                        className="border rounded p-2 w-full"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">Course Code:</label>
                    <input
                        type="text"
                        value={courseCode}
                        onChange={(e) => setCourseCode(e.target.value)}
                        placeholder="Enter course code"
                        className="border rounded p-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">Course Title:</label>
                    <input
                        type="text"
                        value={courseTitle}
                        onChange={(e) => setCourseTitle(e.target.value)}
                        placeholder="Enter course title"
                        className="border rounded p-2 w-full"
                    />
                </div>
            </div>
            {showCode && <AttendanceCodeDisplay code={attendance.code} />}

            {!showCode && <button
                onClick={handleCreateAttendance}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Create Attendance
            </button>}
        </div>
    );
};

export default CreateAttendancePage;
