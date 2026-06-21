import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Menu, Heart, Search, MapPin } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  const [destination, setDestination] = useState('');
  const [pickup, setPickup] = useState('');

  const services = [
    { id: 'mini', name: 'Mini Truck', icon: '🚚', description: 'Up to 750kg' },
    { id: 'pickup', name: 'Pickup', icon: '🛻', description: 'Up to 1.5T' },
    { id: 'container', name: 'Container', icon: '📦', description: 'Up to 8T' },
  ];

  const handleSearch = () => {
    if (destination || pickup) {
      navigate('/booking', { state: { destination, pickup } });
    }
  };

  return (
    <div className="size-full flex flex-col bg-gray-50 relative overflow-hidden">
      {/* Header */}
      <header className="bg-white p-4 flex items-center justify-between shadow-sm relative z-10">
        <button className="bg-white p-3 rounded-full shadow-md hover:shadow-lg transition-shadow">
          <Menu size={24} className="text-gray-800" />
        </button>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
          <MapPin size={16} className="text-gray-600" />
          <span className="text-sm font-medium text-gray-800">Current Location</span>
        </div>
        <button className="bg-white p-3 rounded-full shadow-md hover:shadow-lg transition-shadow">
          <Heart size={24} className="text-gray-800" />
        </button>
      </header>

      {/* Map Area */}
      <div className="relative flex-1 bg-gradient-to-br from-blue-50 via-gray-100 to-green-50 overflow-hidden">
        <div className="absolute inset-0">
          <svg className="w-full h-full" viewBox="0 0 400 600" preserveAspectRatio="none">
            <path d="M 0 100 Q 150 120 200 200 T 300 350 L 400 400" stroke="#cbd5e1" strokeWidth="12" fill="none" />
            <path d="M 100 0 L 150 200 Q 180 280 250 350 L 300 600" stroke="#cbd5e1" strokeWidth="10" fill="none" />
            <path d="M 0 250 Q 100 240 200 280 T 400 300" stroke="#cbd5e1" strokeWidth="8" fill="none" />
          </svg>

          <div className="absolute" style={{ top: '35%', left: '45%', transform: 'translate(-50%, -50%)' }}>
            <div className="relative">
              <div className="w-10 h-10 bg-green-500 rounded-full border-4 border-white shadow-lg animate-pulse" />
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-green-500" />
            </div>
          </div>

          <div className="absolute bottom-4 left-4 flex items-center gap-2">
            <span className="font-bold text-xl text-gray-900">FREIGHT</span>
            <span className="font-normal text-lg text-gray-600">MAPS</span>
          </div>
        </div>

        {/* Search Box */}
        <div className="absolute bottom-0 left-0 right-0 p-4 space-y-3">
          <div className="bg-white rounded-2xl shadow-xl p-4 space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <MapPin className="text-green-600" size={20} />
              <input
                type="text"
                placeholder="Pickup Location"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                className="flex-1 outline-none bg-transparent text-gray-900 placeholder-gray-400"
              />
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <Search size={20} className="text-gray-600" />
              <input
                type="text"
                placeholder="Enter Destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="flex-1 outline-none bg-transparent text-gray-900 placeholder-gray-400"
              />
            </div>
            <button
              onClick={handleSearch}
              className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors"
            >
              Search Trucks
            </button>
          </div>
        </div>
      </div>

      {/* Service Categories */}
      <div className="bg-white px-4 py-6 space-y-4">
        <h3 className="font-semibold text-gray-900">Quick Services</h3>
        <div className="grid grid-cols-3 gap-3">
          {services.map((service) => (
            <button
              key={service.id}
              onClick={() => navigate('/booking')}
              className="bg-gray-50 rounded-xl p-4 flex flex-col items-center gap-2 hover:bg-gray-100 transition-all active:scale-95"
            >
              <div className="text-4xl">{service.icon}</div>
              <div className="text-center">
                <div className="text-sm font-semibold text-gray-900">{service.name}</div>
                <div className="text-xs text-gray-500 mt-1">{service.description}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Branding */}
        <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-6 mt-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">#TruckOnTheMove</h2>
          <p className="text-gray-600 flex items-center gap-2">
            Moving Businesses since 2024 <span className="text-xl">🚛</span>
          </p>
        </div>
      </div>
    </div>
  );
}
