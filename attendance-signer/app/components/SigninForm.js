'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation'


export default function SigninForm() {
    const [attendanceCode, setAttendanceCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const router = useRouter()
    const handleAccessAttendance = async () => {

        try {
            // Set loading state to true during the API request
            setLoading(true);
            const formData = new FormData();
            formData.append('code', attendanceCode)
            // Send a POST request to the API route with the provided attendance code
            const response = await fetch('/api/attendance/access', {
                method: 'POST',

                body: formData,
            });
            

            // Check the response status
            if (response.ok) {
                const attendanceData = await response.json();
                if(attendanceData.error){
                    setError('Attendance not found')
                    return
                }
                console.log('Attendance details:', attendanceData);

                // Check if the current time is within the allowed time range
                const currentTime = new Date();
                const startTime = new Date(attendanceData.startTime);
                const endTime = new Date(attendanceData.endTime);

                if (currentTime >= startTime && currentTime <= endTime) {
                    // Continue with the sign-in process
                    console.log('You can sign in now!');
                    router.push(`/attendance/sign/${attendanceData.code}?id=${attendanceData.id}&title=${attendanceData.course_title}&code=${attendanceData.course_code}&date=${attendanceData.startTime}`, {
                        scroll: false, 
                    })
                } else {
                    setError('Attendance access is not allowed at the current time.');
                }

                // Handle success, e.g., redirect or show a success message
            } else {
                const errorMessage = await response.text();
                setError(errorMessage);
                // Handle error, e.g., display an error message to the user
            }
        } catch (error) {
            console.error('Error signing in:', error);
            setError('Failed to sign in. Please try again.');
        } finally {
            // Set loading state back to false after the API request is completed
            setLoading(false);
        }
        // router.push(`/attendance/signin?code=${attendanceCode}`);
    };

    return (
        <div className='flex flex-col'>


            <input
                type="text"
                className='py-2 px-4 my-6 text-xl rounded'
                value={attendanceCode}
                onInput={(e) => setAttendanceCode(e.target.value)}
                onChange={(e) => setAttendanceCode(e.target.value)}
                placeholder="Enter attendance code"
            />

            <button className='p-2 bg-green-500 text-white' onClick={handleAccessAttendance} disabled={loading}>
                {loading ? 'Signing In...' : 'Sign In'}
            </button>

            {error && <p className="text-red-500 bg-red-100 rounded my-2 text-center">{error}</p>}
        </div>
    );
};


