import { useState } from 'react';
import { useNavigate } from 'react-router';
import { MapPin, Clock, Calendar, Download, Search } from 'lucide-react';

type Booking = {
  id: string;
  bookingId: string;
  truck: string;
  truckIcon: string;
  pickup: string;
  destination: string;
  date: string;
  amount: number;
  status: 'completed' | 'ongoing' | 'cancelled';
  distance: number;
};

const bookings: Booking[] = [
  {
    id: '1',
    bookingId: 'BK12345678',
    truck: 'Tata 407',
    truckIcon: '🚛',
    pickup: 'Warehouse A, Andheri',
    destination: 'Godown B, Bandra',
    date: '2026-05-17 10:30 AM',
    amount: 1215,
    status: 'ongoing',
    distance: 12,
  },
  {
    id: '2',
    bookingId: 'BK12345677',
    truck: 'Pickup 8ft',
    truckIcon: '🛻',
    pickup: 'Factory, Pune',
    destination: 'Store, Mumbai',
    date: '2026-05-16 03:15 PM',
    amount: 449,
    status: 'completed',
    distance: 8,
  },
  {
    id: '3',
    bookingId: 'BK12345676',
    truck: '20ft Container',
    truckIcon: '🚚',
    pickup: 'Port, Nhava Sheva',
    destination: 'Warehouse, Bhiwandi',
    date: '2026-05-15 11:20 AM',
    amount: 2450,
    status: 'completed',
    distance: 25,
  },
  {
    id: '4',
    bookingId: 'BK12345675',
    truck: 'Tata Ace',
    truckIcon: '🚚',
    pickup: 'Shop, Dadar',
    destination: 'Office, Worli',
    date: '2026-05-14 09:45 AM',
    amount: 299,
    status: 'completed',
    distance: 6,
  },
  {
    id: '5',
    bookingId: 'BK12345674',
    truck: 'Tata 407',
    truckIcon: '🚛',
    pickup: 'Depot, Kalyan',
    destination: 'Market, Thane',
    date: '2026-05-13 02:30 PM',
    amount: 850,
    status: 'cancelled',
    distance: 10,
  },
];

export default function BookingsHistory() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'all' | 'ongoing' | 'completed' | 'cancelled'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBookings = bookings.filter(booking => {
    const matchesTab = activeTab === 'all' || booking.status === activeTab;
    const matchesSearch =
      booking.bookingId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.pickup.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.destination.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ongoing':
        return 'bg-blue-100 text-blue-700';
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="size-full flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white p-4 shadow-sm sticky top-0 z-10">
        <h1 className="text-xl font-semibold text-gray-900 mb-4">Bookings</h1>

        {/* Search */}
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl mb-4">
          <Search size={20} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search by booking ID or location"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent outline-none text-gray-900 placeholder-gray-400"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {(['all', 'ongoing', 'completed', 'cancelled'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                activeTab === tab
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </header>

      {/* Bookings List */}
      <div className="flex-1 overflow-auto p-4 space-y-3 pb-24">
        {filteredBookings.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>
            <p className="text-gray-500 font-medium">No bookings found</p>
            <p className="text-sm text-gray-400 mt-2">Try adjusting your filters</p>
          </div>
        ) : (
          filteredBookings.map((booking) => (
            <div
              key={booking.id}
              onClick={() => {
                if (booking.status === 'ongoing') {
                  navigate(`/tracking/${booking.bookingId}`);
                }
              }}
              className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{booking.truckIcon}</span>
                  <div>
                    <p className="font-semibold text-gray-900">{booking.truck}</p>
                    <p className="text-xs text-gray-500">ID: {booking.bookingId}</p>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                    booking.status
                  )}`}
                >
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </span>
              </div>

              {/* Locations */}
              <div className="space-y-2 mb-3 pl-2">
                <div className="flex items-start gap-3">
                  <MapPin className="text-green-600 mt-0.5 flex-shrink-0" size={16} />
                  <div className="flex-1">
                    <p className="text-xs text-gray-500">Pickup</p>
                    <p className="text-sm font-medium text-gray-900">{booking.pickup}</p>
                  </div>
                </div>
                <div className="border-l-2 border-dashed border-gray-200 ml-2 h-4" />
                <div className="flex items-start gap-3">
                  <MapPin className="text-red-600 mt-0.5 flex-shrink-0" size={16} />
                  <div className="flex-1">
                    <p className="text-xs text-gray-500">Destination</p>
                    <p className="text-sm font-medium text-gray-900">{booking.destination}</p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Calendar size={14} />
                    <span>{booking.date.split(' ')[0]}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock size={14} />
                    <span>{booking.date.split(' ')[1]} {booking.date.split(' ')[2]}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <p className="font-bold text-gray-900">₹{booking.amount}</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Download size={16} className="text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
