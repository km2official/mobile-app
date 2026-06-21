import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Plus, CreditCard, Wallet, Building2, Smartphone, Check } from 'lucide-react';

type PaymentMethod = {
  id: string;
  type: 'wallet' | 'card' | 'upi' | 'netbanking';
  name: string;
  details: string;
  icon: string;
  balance?: number;
  isDefault?: boolean;
};

const paymentMethods: PaymentMethod[] = [
  {
    id: '1',
    type: 'wallet',
    name: 'Corporate Wallet',
    details: 'Available Balance',
    icon: '💳',
    balance: 15240,
    isDefault: true,
  },
  {
    id: '2',
    type: 'card',
    name: 'HDFC Credit Card',
    details: '**** **** **** 4532',
    icon: '💳',
  },
  {
    id: '3',
    type: 'upi',
    name: 'UPI',
    details: 'business@oksbi',
    icon: '📱',
  },
  {
    id: '4',
    type: 'netbanking',
    name: 'ICICI Net Banking',
    details: 'Corporate Account',
    icon: '🏦',
  },
];

export default function PaymentMethods() {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState('1');
  const [showAddCard, setShowAddCard] = useState(false);

  return (
    <div className="size-full flex flex-col bg-gray-50 overflow-auto">
      {/* Header */}
      <header className="bg-white p-4 flex items-center gap-4 shadow-sm sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="p-2">
          <ArrowLeft size={24} className="text-gray-800" />
        </button>
        <h1 className="text-xl font-semibold text-gray-900">Payment Methods</h1>
      </header>

      <div className="flex-1 p-4 space-y-6 pb-24">
        {/* Saved Payment Methods */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Saved Methods</h3>
          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`bg-white rounded-xl p-4 shadow-sm border-2 cursor-pointer transition-all ${
                  selectedMethod === method.id
                    ? 'border-green-600 bg-green-50'
                    : 'border-gray-100 hover:border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-2xl">
                      {method.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-gray-900">{method.name}</p>
                        {method.isDefault && (
                          <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{method.details}</p>
                      {method.balance !== undefined && (
                        <p className="text-sm font-semibold text-green-600 mt-1">
                          ₹{method.balance.toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>
                  {selectedMethod === method.id && (
                    <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                      <Check className="text-white" size={16} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add New Payment Method */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Add New Method</h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setShowAddCard(true)}
              className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all border border-gray-100 hover:border-green-600 group"
            >
              <div className="w-12 h-12 bg-blue-100 group-hover:bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3 transition-colors">
                <CreditCard className="text-blue-600 group-hover:text-white transition-colors" size={24} />
              </div>
              <p className="text-sm font-semibold text-gray-900">Credit/Debit Card</p>
            </button>

            <button className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all border border-gray-100 hover:border-green-600 group">
              <div className="w-12 h-12 bg-purple-100 group-hover:bg-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3 transition-colors">
                <Smartphone className="text-purple-600 group-hover:text-white transition-colors" size={24} />
              </div>
              <p className="text-sm font-semibold text-gray-900">UPI</p>
            </button>

            <button className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all border border-gray-100 hover:border-green-600 group">
              <div className="w-12 h-12 bg-green-100 group-hover:bg-green-600 rounded-xl flex items-center justify-center mx-auto mb-3 transition-colors">
                <Building2 className="text-green-600 group-hover:text-white transition-colors" size={24} />
              </div>
              <p className="text-sm font-semibold text-gray-900">Net Banking</p>
            </button>

            <button className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all border border-gray-100 hover:border-green-600 group">
              <div className="w-12 h-12 bg-orange-100 group-hover:bg-orange-600 rounded-xl flex items-center justify-center mx-auto mb-3 transition-colors">
                <Wallet className="text-orange-600 group-hover:text-white transition-colors" size={24} />
              </div>
              <p className="text-sm font-semibold text-gray-900">Other Wallets</p>
            </button>
          </div>
        </div>

        {/* Payment Gateways Info */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6">
          <h4 className="font-semibold text-gray-900 mb-3">Supported Payment Gateways</h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-3 text-center shadow-sm">
              <p className="text-2xl mb-1">💳</p>
              <p className="text-xs font-medium text-gray-700">Razorpay</p>
            </div>
            <div className="bg-white rounded-lg p-3 text-center shadow-sm">
              <p className="text-2xl mb-1">🔐</p>
              <p className="text-xs font-medium text-gray-700">Stripe</p>
            </div>
            <div className="bg-white rounded-lg p-3 text-center shadow-sm">
              <p className="text-2xl mb-1">💰</p>
              <p className="text-xs font-medium text-gray-700">PayU</p>
            </div>
          </div>
          <p className="text-xs text-gray-600 mt-4 text-center">
            🔒 All transactions are secured with 256-bit SSL encryption
          </p>
        </div>
      </div>

      {/* Add Card Modal */}
      {showAddCard && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
          <div className="bg-white rounded-t-3xl p-6 w-full max-h-[80vh] overflow-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Add Card</h3>
              <button onClick={() => setShowAddCard(false)} className="text-gray-500">
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600 mb-2 block">Card Number</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full p-4 bg-gray-50 rounded-xl border-2 border-gray-200 focus:border-green-600 outline-none"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600 mb-2 block">Cardholder Name</label>
                <input
                  type="text"
                  placeholder="Name on Card"
                  className="w-full p-4 bg-gray-50 rounded-xl border-2 border-gray-200 focus:border-green-600 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600 mb-2 block">Expiry Date</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full p-4 bg-gray-50 rounded-xl border-2 border-gray-200 focus:border-green-600 outline-none"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-2 block">CVV</label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full p-4 bg-gray-50 rounded-xl border-2 border-gray-200 focus:border-green-600 outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 p-4 bg-blue-50 rounded-xl">
                <input type="checkbox" id="saveCard" className="w-4 h-4" />
                <label htmlFor="saveCard" className="text-sm text-gray-700">
                  Save this card for future payments
                </label>
              </div>

              <button
                onClick={() => setShowAddCard(false)}
                className="w-full bg-green-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-green-700 transition-colors"
              >
                Add Card
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
