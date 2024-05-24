import Image from 'next/image';
import Link from 'next/link';
import  SigninForm  from './components/SigninForm.js'

export default function Home() {
  // const [attendanceCode, setAttendanceCode] = useState('');

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-12">
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold mb-6 text-center">Welcome to the Attendance System</h1>
       
        <SigninForm />
        <nav className="flex space-x-4">
          {/* <Link href="/students/signin">
            <p className="text-blue-500 hover:underline">Student Sign In</p>
          </Link> */}
          <Link href="/login">
            <p className="text-blue-500 hover:underline">Course Rep Sign In</p>
          </Link>
        </nav>
      </div>
    </main>
  )
}
