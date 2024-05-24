'use client'

import Link from "next/link";


// components/AccessDeniedMessage.js
const AccessDeniedMessage = () => {
    return (
        <div className="flex flex-col gap-y-4 items-center justify-center h-screen">
            <div className="bg-red-500 p-8 text-white rounded-md">
                <h2 className="text-2xl font-semibold mb-4">Access Denied</h2>
                <p>You don't have permission to access this page. Please log in as a Course rep</p>
            </div>
            <Link href={'/login'} className="text-blue-500 text-underline">Login</Link>
        </div>
    );
};

export default AccessDeniedMessage;
