import React, { useState } from 'react';

interface Transaction {
    id: number;
    sender: string;
    receiver: string;
    amount: number;
    status: string;
}

const PaymentsPage: React.FC = () => {
    const [balance, setBalance] = useState(5000);

    const [transactions, setTransactions] = useState<Transaction[]>([
        {
            id: 1,
            sender: 'John Investor',
            receiver: 'Alice Startup',
            amount: 2500,
            status: 'Completed',
        },
        {
            id: 2,
            sender: 'Sarah VC',
            receiver: 'TechNova',
            amount: 5000,
            status: 'Pending',
        },
        {
            id: 3,
            sender: 'Jason Investor',
            receiver: 'Alicia Startup',
            amount: 2800,
            status: 'Completed',
        },
        {
            id: 4,
            sender: 'Serena VC',
            receiver: 'TechNovaland',
            amount: 7000,
            status: 'Pending',
        },
    ]);

    const handleDeposit = () => {
        setBalance((prev) => prev + 1000);

        setTransactions((prev) => [
            {
                id: Date.now(),
                sender: 'Bank',
                receiver: 'My Wallet',
                amount: 1000,
                status: 'Completed',
            },
            ...prev,
        ]);
    };

    const handleWithdraw = () => {
        if (balance < 500) {
            alert('Insufficient funds');
            return;
        }

        setBalance((prev) => prev - 500);

        setTransactions((prev) => [
            {
                id: Date.now(),
                sender: 'My Wallet',
                receiver: 'Bank',
                amount: 500,
                status: 'Completed',
            },
            ...prev,
        ]);
    };

    const handleTransfer = () => {
        alert('Transfer Sent');

        setTransactions((prev) => [
            {
                id: Date.now(),
                sender: 'My Wallet',
                receiver: 'Business Partner',
                amount: 750,
                status: 'Completed',
            },
            ...prev,
        ]);
    };

    const handleFundingDeal = () => {
        alert('Funding Deal Sent');

        setTransactions((prev) => [
            {
                id: Date.now(),
                sender: 'Investor',
                receiver: 'Startup Founder',
                amount: 10000,
                status: 'Pending',
            },
            ...prev,
        ]);
    };

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-3xl font-bold text-black">
                Payments Dashboard
            </h1>

            {/* Wallet Balance */}
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-gray-700">
                    Wallet Balance
                </h2>

                <p className="text-4xl font-bold text-green-600 mt-2">
                    ${balance.toLocaleString()}
                </p>

                <div className="flex flex-wrap gap-3 mt-6">
                    <button
                        onClick={handleDeposit}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                        Deposit
                    </button>

                    <button
                        onClick={handleWithdraw}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Withdraw
                    </button>

                    <button
                        onClick={handleTransfer}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Transfer
                    </button>

                    <button
                        onClick={handleFundingDeal}
                        className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                    >
                        Fund Startup
                    </button>
                </div>
            </div>

            {/* Transaction History */}
            <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
                <h2 className="text-xl font-semibold mb-4">
                    Transaction History
                </h2>

                <table className="min-w-full border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-3 text-left">Sender</th>
                            <th className="border p-3 text-left">Receiver</th>
                            <th className="border p-3 text-left">Amount</th>
                            <th className="border p-3 text-left">Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {transactions.map((tx) => (
                            <tr key={tx.id}>
                                <td className="border p-3">{tx.sender}</td>
                                <td className="border p-3">{tx.receiver}</td>
                                <td className="border p-3">
                                    ${tx.amount.toLocaleString()}
                                </td>
                                <td className="border p-3">
                                    <span
                                        className={`px-2 py-1 rounded text-sm ${tx.status === 'Completed'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-yellow-100 text-yellow-700'
                                            }`}
                                    >
                                        {tx.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentsPage;