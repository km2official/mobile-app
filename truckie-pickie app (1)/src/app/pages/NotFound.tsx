import { useNavigate } from 'react-router';
import { Home } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="size-full flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="text-center">
        <div className="text-8xl mb-4">🚛</div>
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Page Not Found</h2>
        <p className="text-gray-500 mb-8 max-w-md">
          Looks like this route doesn't exist. Let's get you back on track!
        </p>
        <button
          onClick={() => navigate('/')}
          className="bg-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-green-700 transition-colors flex items-center gap-2 mx-auto shadow-lg"
        >
          <Home size={20} />
          Go to Home
        </button>
      </div>
    </div>
  );
}
