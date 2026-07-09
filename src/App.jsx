import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import ScrollToTop from './components/ScrollToTop';
import { CartProvider } from '@/lib/CartContext';
import Layout from '@/components/Layout';

// Public pages
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import ForgotPassword from '@/pages/ForgotPassword';
import ResetPassword from '@/pages/ResetPassword';

// Customer pages
import ShopMenu from '@/pages/ShopMenu';
import Cart from '@/pages/Cart';
import CustomerDashboard from '@/pages/CustomerDashboard';
import Membership from '@/pages/Membership';

// Owner pages
import OwnerDashboard from '@/pages/owner/OwnerDashboard';
import OwnerMenu from '@/pages/owner/OwnerMenu';
import OwnerOrders from '@/pages/owner/OwnerOrders';
import OwnerCoupons from '@/pages/owner/OwnerCoupons';
import OwnerSubscriptions from '@/pages/owner/OwnerSubscriptions';

const AppRoutes = () => {
  const { isLoadingAuth } = useAuth();

  if (isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#F9F7F2]">
        <div className="w-8 h-8 border-4 border-[#C5A059]/20 border-t-[#C5A059] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <CartProvider>
      <Routes>
        <Route element={<Layout />}>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Customer */}
          <Route path="/shop/:shopName" element={<ShopMenu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/dashboard" element={<CustomerDashboard />} />
          <Route path="/membership" element={<Membership />} />

          {/* Owner */}
          <Route path="/owner" element={<OwnerDashboard />} />
          <Route path="/owner/menu" element={<OwnerMenu />} />
          <Route path="/owner/orders" element={<OwnerOrders />} />
          <Route path="/owner/coupons" element={<OwnerCoupons />} />
          <Route path="/owner/subscriptions" element={<OwnerSubscriptions />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </CartProvider>
  );
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <AppRoutes />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App