'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const CourseRepLoginPage = () => {
    const [matric, setMatric] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const router = useRouter();

    const handleLogin = async () => {
        const formData = new FormData()
        formData.append('matric', matric)
        formData.append('password', password)
        try {
            setLoading(true);

            const response = await fetch('/api/login', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const { token, id, error } = await response.json();
                console.log(error);
                if (error) {
                    setError(error)
                    return
                } else {
                    sessionStorage.setItem('courseRepToken', token);
                    sessionStorage.setItem('repId', id);
                    router.push('/dashboard');
                }

                // Store the token (you might use a state management library or browser storage)
                // Redirect or navigate to the instructor dashboard

            } else {
                const errorMessage = await response.text();
                setError(errorMessage);
            }
        } catch (error) {
            console.error('Error logging in instructor:', error);
            setError('Failed to log in. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center ">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-4">Course Rep Login</h2>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    handleLogin()
                }}>

                    <label className="block mb-2 text-sm capitalize">matric no:</label>
                    <input
                        type="text"
                        required
                        value={matric}
                        onChange={(e) => setMatric(e.target.value)}
                        className="w-full p-2 mb-4 border rounded focus:outline-none focus:border-blue-500"
                        placeholder="Enter your Matric no"
                    />

                    <label className="block mb-2 text-sm">Password:</label>
                    <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 mb-4 border rounded focus:outline-none focus:border-blue-500"
                        placeholder="Enter your password"
                    />

                    <button
                        type='submit'
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                        disabled={loading}
                    >
                        {loading ? 'Logging In...' : 'Log In'}
                    </button>
                </form>

                {error && <p className="mt-4 text-red-500">{error}</p>}
            </div>
        </div>
    );
};

export default CourseRepLoginPage;
