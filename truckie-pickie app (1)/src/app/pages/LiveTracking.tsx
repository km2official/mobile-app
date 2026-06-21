import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router';
import { ArrowLeft, Phone, MessageCircle, MapPin, Navigation, Clock, User } from 'lucide-react';

export default function LiveTracking() {
  const { bookingId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { truck, pickup, destination, distance, totalCost } = location.state || {};

  const [truckPosition, setTruckPosition] = useState({ x: 30, y: 70 });
  const [progress, setProgress] = useState(25);
  const [eta, setEta] = useState('28 min');

  useEffect(() => {
    const interval = setInterval(() => {
      setTruckPosition(prev => ({
        x: Math.min(prev.x + 1, 70),
        y: Math.max(prev.y - 0.8, 30),
      }));
      setProgress(prev => Math.min(prev + 2, 100));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="size-full flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white p-4 flex items-center justify-between shadow-sm relative z-10">
        <button onClick={() => navigate('/bookings')} className="p-2">
          <ArrowLeft size={24} className="text-gray-800" />
        </button>
        <div>
          <h1 className="text-lg font-semibold text-gray-900">Live Tracking</h1>
          <p className="text-xs text-gray-500">ID: {bookingId}</p>
        </div>
        <div className="flex gap-2">
          <button className="p-2 bg-green-100 rounded-full">
            <Phone size={20} className="text-green-600" />
          </button>
          <button className="p-2 bg-blue-100 rounded-full">
            <MessageCircle size={20} className="text-blue-600" />
          </button>
        </div>
      </header>

      {/* Map Area with Live Tracking */}
      <div className="relative flex-1 bg-gradient-to-br from-blue-50 via-gray-100 to-green-50 overflow-hidden">
        <div className="absolute inset-0">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path
              d="M 30 70 Q 40 60 50 50 T 70 30"
              stroke="#10b981"
              strokeWidth="0.5"
              fill="none"
              strokeDasharray="2,1"
            />
          </svg>

          {/* Pickup Location */}
          <div
            className="absolute"
            style={{ left: '30%', top: '70%', transform: 'translate(-50%, -50%)' }}
          >
            <div className="relative">
              <div className="w-8 h-8 bg-green-500 rounded-full border-4 border-white shadow-lg" />
              <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-lg shadow-md whitespace-nowrap text-xs">
                {pickup || 'Pickup Point'}
              </div>
            </div>
          </div>

          {/* Destination */}
          <div
            className="absolute"
            style={{ left: '70%', top: '30%', transform: 'translate(-50%, -50%)' }}
          >
            <div className="relative">
              <div className="w-8 h-8 bg-red-500 rounded-full border-4 border-white shadow-lg animate-pulse" />
              <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-lg shadow-md whitespace-nowrap text-xs">
                {destination || 'Destination'}
              </div>
            </div>
          </div>

          {/* Moving Truck */}
          <div
            className="absolute transition-all duration-2000"
            style={{
              left: `${truckPosition.x}%`,
              top: `${truckPosition.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className="relative">
              <div className="text-5xl animate-bounce" style={{ animationDuration: '2s' }}>
                {truck?.icon || '🚚'}
              </div>
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-2 py-1 rounded-lg shadow-lg text-xs font-semibold whitespace-nowrap">
                {truck?.name || 'Truck'} - {eta}
              </div>
            </div>
          </div>

          {/* Current Location Button */}
          <button className="absolute bottom-6 right-6 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow">
            <Navigation className="text-blue-600" size={24} />
          </button>
        </div>
      </div>

      {/* Bottom Sheet */}
      <div className="bg-white rounded-t-3xl shadow-2xl p-6 space-y-4 max-h-[45vh] overflow-y-auto">
        {/* Progress Bar */}
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Trip Progress</span>
            <span className="text-sm font-semibold text-green-600">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-green-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Driver Info */}
        <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
              <User size={24} />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Rajesh Kumar</p>
              <p className="text-sm text-gray-500">Driver • {truck?.name || 'Truck'}</p>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-yellow-500">⭐</span>
                <span className="text-sm font-medium text-gray-700">4.8</span>
                <span className="text-xs text-gray-500">(245 trips)</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <button className="p-2 bg-green-100 rounded-full">
              <Phone size={18} className="text-green-600" />
            </button>
            <button className="p-2 bg-blue-100 rounded-full">
              <MessageCircle size={18} className="text-blue-600" />
            </button>
          </div>
        </div>

        {/* Trip Details */}
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <MapPin className="text-green-600 mt-1" size={20} />
            <div>
              <p className="text-xs text-gray-500">Pickup</p>
              <p className="font-medium text-gray-900">{pickup || 'Pickup Location'}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="text-red-600 mt-1" size={20} />
            <div>
              <p className="text-xs text-gray-500">Destination</p>
              <p className="font-medium text-gray-900">{destination || 'Delivery Location'}</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-blue-50 rounded-lg p-3 text-center">
            <Clock className="text-blue-600 mx-auto mb-1" size={20} />
            <p className="text-xs text-gray-500">ETA</p>
            <p className="font-semibold text-gray-900">{eta}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-3 text-center">
            <MapPin className="text-green-600 mx-auto mb-1" size={20} />
            <p className="text-xs text-gray-500">Distance</p>
            <p className="font-semibold text-gray-900">{distance || 12} km</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-3 text-center">
            <span className="text-2xl">💰</span>
            <p className="text-xs text-gray-500">Amount</p>
            <p className="font-semibold text-gray-900">₹{totalCost || 0}</p>
          </div>
        </div>

        {/* Status Timeline */}
        <div className="bg-gray-50 rounded-xl p-4">
          <h4 className="font-semibold text-gray-900 mb-3">Trip Status</h4>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Booking Confirmed</p>
                <p className="text-xs text-gray-500">2 min ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Driver Assigned</p>
                <p className="text-xs text-gray-500">1 min ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-blue-600 rounded-full animate-pulse" />
              <div>
                <p className="text-sm font-medium text-gray-900">En Route to Pickup</p>
                <p className="text-xs text-gray-500">In progress</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-gray-300 rounded-full" />
              <div>
                <p className="text-sm font-medium text-gray-400">Cargo Loaded</p>
                <p className="text-xs text-gray-400">Pending</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
