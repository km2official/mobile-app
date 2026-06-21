import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { ArrowLeft, MapPin, Package, Weight, Ruler, Clock, ChevronRight } from 'lucide-react';

type TruckType = {
  id: string;
  name: string;
  type: string;
  capacity: string;
  dimensions: string;
  eta: string;
  basePrice: number;
  pricePerKm: number;
  icon: string;
};

const truckTypes: TruckType[] = [
  {
    id: '1',
    name: 'Tata Ace',
    type: 'Mini Truck',
    capacity: '750 kg',
    dimensions: '7ft x 4.5ft',
    eta: '15 min',
    basePrice: 299,
    pricePerKm: 12,
    icon: '🚚'
  },
  {
    id: '2',
    name: 'Pickup 8ft',
    type: 'Open Pickup',
    capacity: '1500 kg',
    dimensions: '8ft x 5ft',
    eta: '20 min',
    basePrice: 449,
    pricePerKm: 18,
    icon: '🛻'
  },
  {
    id: '3',
    name: 'Tata 407',
    type: 'Large Truck',
    capacity: '2500 kg',
    dimensions: '14ft x 6ft',
    eta: '30 min',
    basePrice: 799,
    pricePerKm: 28,
    icon: '🚛'
  },
  {
    id: '4',
    name: '20ft Container',
    type: 'Container Truck',
    capacity: '8000 kg',
    dimensions: '20ft x 8ft',
    eta: '45 min',
    basePrice: 1999,
    pricePerKm: 45,
    icon: '🚚'
  },
];

export default function Booking() {
  const navigate = useNavigate();
  const location = useLocation();
  const { destination = '', pickup = '' } = location.state || {};

  const [selectedTruck, setSelectedTruck] = useState<string>('1');
  const [pickupLocation, setPickupLocation] = useState(pickup);
  const [deliveryLocation, setDeliveryLocation] = useState(destination);
  const [cargoWeight, setCargoWeight] = useState('');
  const [cargoType, setCargoType] = useState('');
  const [estimatedDistance] = useState(12);

  const selectedTruckData = truckTypes.find(t => t.id === selectedTruck);
  const distanceCost = estimatedDistance * (selectedTruckData?.pricePerKm || 0);
  const totalCost = (selectedTruckData?.basePrice || 0) + distanceCost;

  const handleBooking = () => {
    const bookingId = 'BK' + Date.now().toString().slice(-8);
    navigate(`/tracking/${bookingId}`, {
      state: {
        truck: selectedTruckData,
        pickup: pickupLocation,
        destination: deliveryLocation,
        distance: estimatedDistance,
        totalCost,
      }
    });
  };

  return (
    <div className="size-full flex flex-col bg-gray-50 overflow-auto">
      {/* Header */}
      <header className="bg-white p-4 flex items-center gap-4 shadow-sm sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="p-2">
          <ArrowLeft size={24} className="text-gray-800" />
        </button>
        <h1 className="text-xl font-semibold text-gray-900">Book Truck</h1>
      </header>

      <div className="flex-1 p-4 space-y-4 pb-24">
        {/* Location Details */}
        <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3">
          <h3 className="font-semibold text-gray-900 mb-3">Trip Details</h3>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
            <MapPin className="text-green-600" size={20} />
            <input
              type="text"
              placeholder="Pickup warehouse/location"
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              className="flex-1 bg-transparent outline-none text-gray-900 placeholder-gray-400"
            />
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
            <MapPin className="text-red-600" size={20} />
            <input
              type="text"
              placeholder="Delivery destination"
              value={deliveryLocation}
              onChange={(e) => setDeliveryLocation(e.target.value)}
              className="flex-1 bg-transparent outline-none text-gray-900 placeholder-gray-400"
            />
          </div>

          <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-lg">
            <Ruler className="text-blue-600" size={16} />
            <span className="text-sm text-gray-700">Estimated Distance: {estimatedDistance} km</span>
          </div>
        </div>

        {/* Cargo Details */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="flex items-center gap-2 font-semibold text-gray-900 mb-3">
            <Package size={18} className="text-gray-600" />
            Cargo Details
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Weight (kg)"
              value={cargoWeight}
              onChange={(e) => setCargoWeight(e.target.value)}
              className="p-3 border border-gray-200 rounded-lg outline-none focus:border-green-500 bg-gray-50"
            />
            <input
              type="text"
              placeholder="Cargo type"
              value={cargoType}
              onChange={(e) => setCargoType(e.target.value)}
              className="p-3 border border-gray-200 rounded-lg outline-none focus:border-green-500 bg-gray-50"
            />
          </div>
        </div>

        {/* Truck Selection */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-3">Select Vehicle Type</h3>
          <div className="space-y-3">
            {truckTypes.map((truck) => (
              <div
                key={truck.id}
                onClick={() => setSelectedTruck(truck.id)}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedTruck === truck.id
                    ? 'border-green-600 bg-green-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">{truck.icon}</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">{truck.name}</h4>
                      <p className="text-sm text-gray-500 mb-2">{truck.type}</p>
                      <div className="flex flex-wrap gap-2">
                        <div className="flex items-center gap-1 text-xs bg-gray-100 px-2 py-1 rounded">
                          <Weight size={12} />
                          <span>{truck.capacity}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs bg-gray-100 px-2 py-1 rounded">
                          <Ruler size={12} />
                          <span>{truck.dimensions}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg text-gray-900">₹{truck.basePrice}</p>
                    <p className="text-xs text-gray-500 mb-1">₹{truck.pricePerKm}/km</p>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Clock size={14} />
                      <span>{truck.eta}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-3">Payment Method</h3>
          <button
            onClick={() => navigate('/payment-methods')}
            className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-xl">💳</span>
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900">Corporate Wallet</p>
                <p className="text-xs text-gray-500">₹15,240 available</p>
              </div>
            </div>
            <ChevronRight className="text-gray-400" size={20} />
          </button>
        </div>

        {/* Price Summary */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-4 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-3">Price Breakdown</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Base Fare</span>
              <span className="text-sm font-semibold">₹{selectedTruckData?.basePrice}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Distance ({estimatedDistance} km)</span>
              <span className="text-sm font-semibold">₹{distanceCost}</span>
            </div>
            <div className="border-t border-green-300 pt-2 mt-2 flex justify-between">
              <span className="font-semibold text-gray-900">Total Amount</span>
              <span className="font-bold text-xl text-green-700">₹{totalCost}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-20 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
        <button
          onClick={handleBooking}
          className="w-full bg-green-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-green-700 transition-colors shadow-lg"
        >
          Confirm Booking - ₹{totalCost}
        </button>
      </div>
    </div>
  );
}
