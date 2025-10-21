import React, { useState, useEffect } from 'react';

function Home() {
    const [userSpending, setUserSpending] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch user spending data when component mounts
    useEffect(() => {
        fetchUserSpending();
    }, []);

    const fetchUserSpending = async () => {
        try {
            setLoading(true);
            
            // Get user from localStorage (assuming they're logged in)
            const user = JSON.parse(localStorage.getItem('user'));
            if (!user) {
                setError('User not logged in');
                setLoading(false);
                return;
            }

            // Fetch spending data from backend
            const response = await fetch(`http://localhost:5000/api/transactions/user/${user.id}`, {
                method: 'GET',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // if you're using tokens
                }
            });

            if (response.ok) {
                const data = await response.json();
                setUserSpending(data.totalSpending || 0);
            } else {
                setError('Failed to fetch spending data');
            }
        } catch (error) {
            console.error('Error fetching spending:', error);
            setError('Something went wrong while fetching data');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pt-16 sm:pt-20 min-h-screen bg-gray-50 p-4 sm:p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Spending Overview</h1>
                
                {loading ? (
                    <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading your spending data...</p>
                    </div>
                ) : error ? (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        <p>{error}</p>
                        <button 
                            onClick={fetchUserSpending}
                            className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                            Try Again
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Total Spending Card */}
                        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-emerald-500">
                            <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Spending</h3>
                            <p className="text-3xl font-bold text-emerald-600">${userSpending.toFixed(2)}</p>
                        </div>

                        {/* Monthly Spending Card */}
                        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                            <h3 className="text-lg font-semibold text-gray-700 mb-2">This Month</h3>
                            <p className="text-3xl font-bold text-blue-600">${userSpending.toFixed(2)}</p>
                        </div>

                        {/* Transactions Count Card */}
                        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
                            <h3 className="text-lg font-semibold text-gray-700 mb-2">Transactions</h3>
                            <p className="text-3xl font-bold text-purple-600">0</p>
                        </div>
                    </div>
                )}

                {/* Refresh Button */}
                <div className="mt-8 text-center">
                    <button 
                        onClick={fetchUserSpending}
                        disabled={loading}
                        className="bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Refreshing...' : 'Refresh Data'}
                    </button>
                </div>
            </div>
        </div>
    );
}
export default Home;