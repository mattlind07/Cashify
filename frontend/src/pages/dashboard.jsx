import React, { useState } from 'react';

function Dashboard() {
    const [transactions, setTransactions] = useState([]);
    const [formData, setFormData] = useState({
        description: '',
        amount: '',
        category: '',
        type: 'expense'
    });
    const [isLoading, setIsLoading] = useState(false);
    const [aiSummary, setAiSummary] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddTransaction = (e) => {
        e.preventDefault();
        if (!formData.description || !formData.amount || !formData.category) {
            alert('Please fill in all fields');
            return;
        }

        const newTransaction = {
            id: Date.now(),
            ...formData,
            amount: parseFloat(formData.amount)
        };

        setTransactions([...transactions, newTransaction]);
        setFormData({
            description: '',
            amount: '',
            category: '',
            type: 'expense'
        });
    };

    const handleDeleteTransaction = (id) => {
        setTransactions(transactions.filter(t => t.id !== id));
    };

    const handleAISummarization = async () => {
        if (transactions.length === 0) {
            alert('Please add some transactions first');
            return;
        }

        setIsLoading(true);
        setAiSummary('');

        try {
            // TODO: Replace with actual API call to your backend
            // For now, this is a placeholder that simulates an API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Calculate summary statistics
            const totalIncome = transactions
                .filter(t => t.type === 'income')
                .reduce((sum, t) => sum + t.amount, 0);
            
            const totalExpenses = transactions
                .filter(t => t.type === 'expense')
                .reduce((sum, t) => sum + t.amount, 0);
            
            const netAmount = totalIncome - totalExpenses;
            
            const categoryBreakdown = transactions
                .filter(t => t.type === 'expense')
                .reduce((acc, t) => {
                    acc[t.category] = (acc[t.category] || 0) + t.amount;
                    return acc;
                }, {});

            const topCategory = Object.entries(categoryBreakdown)
                .sort(([,a], [,b]) => b - a)[0];

            const summary = `
📊 **Spending Summary**

**Financial Overview:**
• Total Income: $${totalIncome.toFixed(2)}
• Total Expenses: $${totalExpenses.toFixed(2)}
• Net Amount: $${netAmount.toFixed(2)} ${netAmount >= 0 ? '(Surplus)' : '(Deficit)'}

**Category Analysis:**
${topCategory ? `• Top spending category: ${topCategory[0]} ($${topCategory[1].toFixed(2)})` : ''}

**Recommendations:**
${netAmount < 0 
    ? '⚠️ You are spending more than you earn. Consider reducing expenses in high-spending categories.' 
    : '✅ You are managing your finances well! Consider saving or investing your surplus.'}
${totalExpenses > totalIncome * 0.8 
    ? '💡 Your expenses are over 80% of your income. Try to maintain a buffer for unexpected costs.' 
    : ''}
            `.trim();

            setAiSummary(summary);
        } catch (error) {
            console.error('Error generating summary:', error);
            alert('Failed to generate summary. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="pt-16 sm:pt-20 min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Side - Transaction Entry Table */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add Transaction</h2>
                        
                        <form onSubmit={handleAddTransaction} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Description
                                </label>
                                <input
                                    type="text"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder="e.g., Groceries, Salary, Rent"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Amount ($)
                                </label>
                                <input
                                    type="number"
                                    name="amount"
                                    value={formData.amount}
                                    onChange={handleInputChange}
                                    placeholder="0.00"
                                    step="0.01"
                                    min="0"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Category
                                </label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                >
                                    <option value="">Select a category</option>
                                    <option value="Food & Dining">Food & Dining</option>
                                    <option value="Transportation">Transportation</option>
                                    <option value="Shopping">Shopping</option>
                                    <option value="Bills & Utilities">Bills & Utilities</option>
                                    <option value="Entertainment">Entertainment</option>
                                    <option value="Healthcare">Healthcare</option>
                                    <option value="Education">Education</option>
                                    <option value="Travel">Travel</option>
                                    <option value="Salary">Salary</option>
                                    <option value="Freelance">Freelance</option>
                                    <option value="Investment">Investment</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Type
                                </label>
                                <div className="flex gap-4">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="type"
                                            value="expense"
                                            checked={formData.type === 'expense'}
                                            onChange={handleInputChange}
                                            className="mr-2"
                                        />
                                        <span className="text-red-600">Expense</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="type"
                                            value="income"
                                            checked={formData.type === 'income'}
                                            onChange={handleInputChange}
                                            className="mr-2"
                                        />
                                        <span className="text-green-600">Income</span>
                                    </label>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                            >
                                Add Transaction
                            </button>
                        </form>

                        {/* Transactions List */}
                        {transactions.length > 0 && (
                            <div className="mt-8">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Transactions</h3>
                                <div className="space-y-2 max-h-64 overflow-y-auto">
                                    {transactions.map(transaction => (
                                        <div
                                            key={transaction.id}
                                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                        >
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-800">{transaction.description}</p>
                                                <p className="text-sm text-gray-500">
                                                    {transaction.category}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className={`font-semibold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                                                    {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                                                </span>
                                                <button
                                                    onClick={() => handleDeleteTransaction(transaction.id)}
                                                    className="text-red-500 hover:text-red-700 text-sm"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* AI Summarization Button at Bottom */}
                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <button
                                onClick={handleAISummarization}
                                disabled={isLoading || transactions.length === 0}
                                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Analyzing...
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                        </svg>
                                        Get AI Summarization
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Right Side - AI Summary Display */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">AI Spending Analysis</h2>
                        
                        {aiSummary ? (
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                                <div className="whitespace-pre-line text-gray-700 leading-relaxed">{aiSummary}</div>
                            </div>
                        ) : (
                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center text-gray-500">
                                <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                                <p>Add transactions and click the AI Summarization button to get insights about your spending habits.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;