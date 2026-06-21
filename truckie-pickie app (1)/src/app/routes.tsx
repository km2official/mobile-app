import { createBrowserRouter } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import LiveTracking from "./pages/LiveTracking";
import Wallet from "./pages/Wallet";
import PaymentMethods from "./pages/PaymentMethods";
import BookingsHistory from "./pages/BookingsHistory";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "booking", Component: Booking },
      { path: "tracking/:bookingId", Component: LiveTracking },
      { path: "wallet", Component: Wallet },
      { path: "payment-methods", Component: PaymentMethods },
      { path: "bookings", Component: BookingsHistory },
      { path: "profile", Component: Profile },
      { path: "*", Component: NotFound },
    ],
  },
]);
