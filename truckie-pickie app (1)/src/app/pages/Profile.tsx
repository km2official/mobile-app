import { useNavigate } from 'react-router';
import {
  User,
  Building2,
  CreditCard,
  Bell,
  Shield,
  HelpCircle,
  FileText,
  LogOut,
  ChevronRight,
  Settings,
  Star,
  Truck,
  MapPin,
} from 'lucide-react';

export default function Profile() {
  const navigate = useNavigate();

  const menuSections = [
    {
      title: 'Account',
      items: [
        { icon: User, label: 'Personal Information', onClick: () => {} },
        { icon: Building2, label: 'Company Details', onClick: () => {} },
        { icon: CreditCard, label: 'Payment Methods', onClick: () => navigate('/payment-methods') },
        { icon: MapPin, label: 'Saved Addresses', onClick: () => {} },
      ],
    },
    {
      title: 'Preferences',
      items: [
        { icon: Bell, label: 'Notifications', onClick: () => {} },
        { icon: Settings, label: 'App Settings', onClick: () => {} },
        { icon: Truck, label: 'Vehicle Preferences', onClick: () => {} },
      ],
    },
    {
      title: 'Support',
      items: [
        { icon: HelpCircle, label: 'Help & Support', onClick: () => {} },
        { icon: FileText, label: 'Terms & Conditions', onClick: () => {} },
        { icon: Shield, label: 'Privacy Policy', onClick: () => {} },
        { icon: Star, label: 'Rate Us', onClick: () => {} },
      ],
    },
  ];

  return (
    <div className="size-full flex flex-col bg-gray-50 overflow-auto pb-24">
      {/* Header with Profile Info */}
      <div className="bg-gradient-to-br from-green-600 to-green-700 p-6 pb-8">
        <h1 className="text-xl font-semibold text-white mb-6">Profile</h1>

        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
              <Building2 className="text-green-600" size={40} />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-white">ABC Logistics Pvt Ltd</h2>
              <p className="text-green-100 text-sm">Corporate Account</p>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-1">
                  <Star className="text-yellow-400 fill-yellow-400" size={16} />
                  <span className="text-white font-semibold">4.9</span>
                </div>
                <span className="text-green-100 text-sm">• 142 trips</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/20">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">142</p>
              <p className="text-xs text-green-100">Total Trips</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">₹1.2L</p>
              <p className="text-xs text-green-100">Spent</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">₹15.2K</p>
              <p className="text-xs text-green-100">Wallet</p>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Sections */}
      <div className="p-4 space-y-6">
        {menuSections.map((section) => (
          <div key={section.title}>
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3 px-2">
              {section.title}
            </h3>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {section.items.map((item, index) => (
                <button
                  key={item.label}
                  onClick={item.onClick}
                  className={`w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${
                    index !== section.items.length - 1 ? 'border-b border-gray-100' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <item.icon className="text-gray-600" size={20} />
                    </div>
                    <span className="font-medium text-gray-900">{item.label}</span>
                  </div>
                  <ChevronRight className="text-gray-400" size={20} />
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Future Transport Modes */}
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3 px-2">
            Coming Soon
          </h3>
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6">
            <h4 className="font-semibold text-gray-900 mb-3">Future Transport Modes</h4>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white rounded-xl p-3 text-center shadow-sm opacity-60">
                <p className="text-3xl mb-1">🚂</p>
                <p className="text-xs font-medium text-gray-700">Railways</p>
              </div>
              <div className="bg-white rounded-xl p-3 text-center shadow-sm opacity-60">
                <p className="text-3xl mb-1">✈️</p>
                <p className="text-xs font-medium text-gray-700">Airways</p>
              </div>
              <div className="bg-white rounded-xl p-3 text-center shadow-sm opacity-60">
                <p className="text-3xl mb-1">🚢</p>
                <p className="text-xs font-medium text-gray-700">Waterways</p>
              </div>
            </div>
            <p className="text-xs text-gray-600 mt-3 text-center">
              Expanding to multi-modal logistics soon!
            </p>
          </div>
        </div>

        {/* App Info */}
        <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
          <p className="text-sm text-gray-600 mb-1">Freight Transport B2B</p>
          <p className="text-xs text-gray-400">Version 1.0.0</p>
        </div>

        {/* Logout */}
        <button className="w-full bg-white border-2 border-red-200 text-red-600 py-4 rounded-xl font-semibold hover:bg-red-50 transition-colors flex items-center justify-center gap-2 shadow-sm">
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
}
