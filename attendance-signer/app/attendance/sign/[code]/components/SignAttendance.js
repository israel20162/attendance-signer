'use client'
import { useRef, useState, useEffect, Suspense } from "react";
import SignatureCanvas from 'react-signature-canvas'
import { useRouter, useSearchParams } from 'next/navigation'


function SignAttendancePage(props) {

    const searchParams = useSearchParams();
    const title = searchParams.get('title')
    const date = searchParams.get('date')
    const code = searchParams.get('code')
    const attendanceId = searchParams.get('id')
    const router = useRouter()


    const [matric, setMatric] = useState('');
    const [signature, setSignature] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);


    let signPad = useRef({});
    const handleSubmitAttendance = async () => {

        if (!signPad.current.isEmpty()) {
            const hasSigned = await checkIfStudentSigned(props.code);

            if (hasSigned) {
                setError('You have already signed for this attendance.');
                //return;
            } else {
                try {
                    setLoading(true);
                    setSignature(signPad.current.toDataURL())
                    const formData = new FormData()
                    alert(signature)

                    formData.append('signature', signature)
                    formData.append('matric', matric)
                    formData.append('attendanceId', attendanceId)
                    formData.append('signTime', new Date())

                    const response = await fetch('/api/attendance/submit', {
                        method: 'POST',

                        body: formData,
                    });
                    if (response.ok) {
                        const data = await response.json();

                        console.log('Attendance submitted:', { data });
                        setSuccess(true);
                        setTimeout(() => router.push('/'), 2000)
                    }



                } catch (error) {
                    console.error('Error submitting attendance:', error);
                    setError('Failed to submit attendance. Please try again.');
                } finally {
                    setLoading(false);
                }
            }

        } else {
            setError('Signature needed to submit attendance');
        }

    };
    const checkIfStudentSigned = async (code) => {
        setLoading(true);
        const formData = new FormData()
        formData.append('matric', matric)
        formData.append('attendanceId', attendanceId)
        const response = await fetch('/api/attendance/check-signed', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const result = await response.json();
            console.log(result);
            if (result.signed) { return true } else {
                setError('')
                setSuccess(false)
                setLoading(false);
                return false
            }
            // This should be a boolean indicating whether the student has signed
        } else {
            // Handle error

            return false;
        }
      
    };

    return (
        <div className="container mx-auto  flex min-h-screen flex-col items-center justify-between p-4  md:p-12">
            <div className="p-8 rounded md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4">Submit Attendance</h1>

                <h2 className="block text-lg capitalize mb-2">Attendance Code: {props.code}</h2>
                <h2 className="block text-lg capitalize mb-2">Course Title: {title}</h2>
                <h2 className="block text-lg capitalize mb-2">Course Code: {code}</h2>
                <h2 className="block text-lg capitalize mb-2">Date: {new Date(date).toLocaleDateString()}</h2>





                <form className="my-6" onSubmit={(e) => {
                    e.preventDefault()
                    handleSubmitAttendance()
                }}>

                    <label className="block mb-2 text-sm">Matric no:</label>

                    <input
                        type="text"
                        required
                        value={matric}
                        onChange={(e) => setMatric(e.target.value)}
                        className="w-full p-2 mb-4 border rounded focus:outline-none focus:border-blue-500"
                        placeholder="Enter matric number"
                    />


                    <label className="block mb-2 text-sm">Signature:</label>
                    <div className="my-8 ">
                        <SignatureCanvas penColor='black'
                            canvasProps={{ height: 400, className: 'shadow-md w-full bg-white' }} onEnd={() => setSignature(signPad.current.toDataURL())} ref={signPad} />
                        <button type="button" className="mr-auto w-full text-right cursor-pointer text-red-500 my-2" onClick={() => signPad.current.clear()}>clear</button>

                    </div>
                    <button

                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                        disabled={loading}
                        type="submit"
                    >
                        {loading ? 'Submitting...' : 'Submit Attendance'}
                    </button>
                </form>

                {error && <p className="mt-4 text-red-500">{error}</p>}
                {success && <p className="mt-4 text-green-500">Attendance submitted successfully!</p>}
            </div>
        </div>
    );

}


export default SignAttendancePage;