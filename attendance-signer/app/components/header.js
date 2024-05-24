'use client'
import Link from 'next/link';
import { useState } from 'react';

const Header = () => {
    const [showMenu, setShowMenu] = useState(false)
    return (
        <header className="bg-gray-900 p-4 text-white">
            <div className="container mx-auto md:flex md:justify-between items-center   w-full">
               <div className='flex justify-between items-center mb-4'>
                    <Link href="/" className='col-span--3'>
                        <p className="text-xl font-semibold md:mb-2 mb-0 md:mr-4">Attendance System</p>
                    </Link>

                    <button className="md:hidden col-span-1" onClick={() => setShowMenu(prev => !prev)}>
                        {/* Add your mobile menu icon here (e.g., hamburger icon) */}
                        <span className="bg-white w-6 h-px block mb-1"></span>
                        <span className="bg-white w-6 h-px block mb-1"></span>
                        <span className="bg-white w-6 h-px block"></span>
                    </button>
               </div>

                {/* Mobile navigation button */}
                <div className={`md:flex col-span- ${!showMenu && 'hidden'}`}>
                  
                    {/* Navigation links */}
                    <nav className={`md:flex ${!showMenu && 'hidden'}`}>
                        <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                            <li>
                                <Link href="/dashboard">
                                    <p className="hover:text-gray-300">Dashboard</p>
                                </Link>
                            </li>
                            {/* <li>
                                <Link href="/profile">
                                    <p className="hover:text-gray-300">Profile</p>
                                </Link>
                            </li> */}
                            {/* Add more navigation links as needed */}
                        </ul>
                    </nav>
               </div>
            </div>
        </header>
    );
};

export default Header;
