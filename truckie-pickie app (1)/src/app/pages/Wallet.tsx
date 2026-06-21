import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Plus, ArrowDownLeft, ArrowUpRight, TrendingUp, CreditCard, Download } from 'lucide-react';

type Transaction = {
  id: string;
  type: 'debit' | 'credit';
  amount: number;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
};

const transactions: Transaction[] = [
  {
    id: '1',
    type: 'debit',
    amount: 1215,
    description: 'Tata 407 - Trip to Mumbai',
    date: '2026-05-17 10:30 AM',
    status: 'completed'
  },
  {
    id: '2',
    type: 'credit',
    amount: 5000,
    description: 'Wallet Recharge',
    date: '2026-05-16 03:15 PM',
    status: 'completed'
  },
  {
    id: '3',
    type: 'debit',
    amount: 449,
    description: 'Pickup 8ft - Local Delivery',
    date: '2026-05-16 11:20 AM',
    status: 'completed'
  },
  {
    id: '4',
    type: 'credit',
    amount: 10000,
    description: 'Wallet Recharge',
    date: '2026-05-15 09:45 AM',
    status: 'completed'
  },
  {
    id: '5',
    type: 'debit',
    amount: 299,
    description: 'Tata Ace - Warehouse Transfer',
    date: '2026-05-14 02:30 PM',
    status: 'completed'
  },
];

export default function Wallet() {
  const navigate = useNavigate();
  const [balance] = useState(15240);
  const [showAddMoney, setShowAddMoney] = useState(false);
  const [amount, setAmount] = useState('');

  const quickAmounts = [1000, 2000, 5000, 10000];

  const handleAddMoney = () => {
    setShowAddMoney(true);
  };

  const handleQuickAmount = (amt: number) => {
    setAmount(amt.toString());
  };

  const totalSpent = transactions
    .filter(t => t.type === 'debit')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalAdded = transactions
    .filter(t => t.type === 'credit')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="size-full flex flex-col bg-gray-50 overflow-auto">
      {/* Header */}
      <header className="bg-gradient-to-br from-green-600 to-green-700 p-6 pb-8 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => navigate(-1)} className="p-2 text-white">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-semibold text-white">Wallet</h1>
          <button className="p-2 text-white">
            <Download size={24} />
          </button>
        </div>

        {/* Balance Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
          <p className="text-green-100 text-sm mb-2">Available Balance</p>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-4xl font-bold text-white">₹{balance.toLocaleString()}</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleAddMoney}
              className="bg-white text-green-700 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-green-50 transition-colors"
            >
              <Plus size={20} />
              Add Money
            </button>
            <button
              onClick={() => navigate('/payment-methods')}
              className="bg-white/20 backdrop-blur text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-white/30 transition-colors border border-white/30"
            >
              <CreditCard size={20} />
              Pay
            </button>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="bg-white p-4 grid grid-cols-2 gap-4 shadow-sm">
        <div className="bg-red-50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <ArrowUpRight className="text-red-600" size={20} />
            <span className="text-sm text-gray-600">Total Spent</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">₹{totalSpent.toLocaleString()}</p>
        </div>
        <div className="bg-green-50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <ArrowDownLeft className="text-green-600" size={20} />
            <span className="text-sm text-gray-600">Total Added</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">₹{totalAdded.toLocaleString()}</p>
        </div>
      </div>

      {/* Add Money Modal */}
      {showAddMoney && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
          <div className="bg-white rounded-t-3xl p-6 w-full max-h-[80vh] overflow-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Add Money</h3>
              <button onClick={() => setShowAddMoney(false)} className="text-gray-500">
                ✕
              </button>
            </div>

            <div className="mb-6">
              <label className="text-sm text-gray-600 mb-2 block">Enter Amount</label>
              <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-xl border-2 border-gray-200 focus-within:border-green-600">
                <span className="text-2xl font-semibold text-gray-900">₹</span>
                <input
                  type="number"
                  placeholder="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-2xl font-semibold text-gray-900"
                />
              </div>
            </div>

            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-3">Quick Add</p>
              <div className="grid grid-cols-4 gap-3">
                {quickAmounts.map((amt) => (
                  <button
                    key={amt}
                    onClick={() => handleQuickAmount(amt)}
                    className="bg-gray-100 hover:bg-green-100 hover:text-green-700 py-3 rounded-xl font-semibold transition-colors"
                  >
                    ₹{amt}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setShowAddMoney(false);
                setAmount('');
              }}
              className="w-full bg-green-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-green-700 transition-colors"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      )}

      {/* Transactions */}
      <div className="flex-1 p-4 pb-24">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-gray-900">Recent Transactions</h3>
          <button className="text-sm text-green-600 font-medium">View All</button>
        </div>

        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    transaction.type === 'debit'
                      ? 'bg-red-100'
                      : 'bg-green-100'
                  }`}
                >
                  {transaction.type === 'debit' ? (
                    <ArrowUpRight className="text-red-600" size={20} />
                  ) : (
                    <ArrowDownLeft className="text-green-600" size={20} />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{transaction.description}</p>
                  <p className="text-xs text-gray-500">{transaction.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p
                  className={`font-bold ${
                    transaction.type === 'debit'
                      ? 'text-red-600'
                      : 'text-green-600'
                  }`}
                >
                  {transaction.type === 'debit' ? '-' : '+'}₹{transaction.amount.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500 capitalize">{transaction.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
