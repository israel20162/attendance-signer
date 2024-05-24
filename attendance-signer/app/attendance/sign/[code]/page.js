import SignAttendancePage from "./components/SignAttendance";

async function SignAttendance({ params }) {
  //  const attendance = await getData(params.code)
   
    return <SignAttendancePage code={params.code} />
}

export default SignAttendance;