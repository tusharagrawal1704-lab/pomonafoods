import { useLocation, Link } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';

export default function PageNotFound() {
  const location = useLocation();
  const pageName = location.pathname.substring(1);
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#F9F7F2]">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-7xl font-light text-[#1A1A1B]/20">404</h1>
          <div className="h-0.5 w-16 bg-[#1A1A1B]/10 mx-auto"></div>
        </div>
        <div className="space-y-3">
          <h2 className="font-heading text-2xl font-bold text-[#1A1A1B]">Page Not Found</h2>
          <p className="font-body text-[#1A1A1B]/50 leading-relaxed">
            The page <span className="font-medium text-[#1A1A1B]">"{pageName}"</span> could not be found.
          </p>
        </div>
        <div className="pt-4">
          <Link to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#1A1A1B] text-[#F9F7F2] rounded-full font-display text-sm font-semibold hover:bg-[#1A1A1B]/90 transition-colors">
            ← Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}