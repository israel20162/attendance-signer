import { useState } from 'react';

const AttendanceCodeDisplay = (props) => {
    const [attendanceCode, setAttendanceCode] = useState(props.code); // Replace with your actual attendance code
   // setAttendanceCode(props.code)
    const handleCopyCode = () => {
        const codeElement = document.getElementById('attendanceCode');

        // Create a range and select the text
        const range = document.createRange();
        range.selectNode(codeElement);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);

        // Execute the copy command
        document.execCommand('copy');

        // Deselect the text
        window.getSelection().removeAllRanges();
    };

    return (
        <div className="px-12 py-4 border ">
            <p className=" font-semibold mb-4 flex flex-col text-center">
                <span> Attendance Code</span>  <span id="attendanceCode" className="bg-gray-100 p-2 flex justify-center gap-4 font-bold text-2xl font-mono">{attendanceCode}</span><button onClick={handleCopyCode}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                </svg>
                </button>
            </p>

        </div>
    );
};

export default AttendanceCodeDisplay;
