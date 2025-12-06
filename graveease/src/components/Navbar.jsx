import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Globe } from 'lucide-react';
import { Button } from './ui/button';
import { useAuthStore, useCartStore } from '../store';
import { useLanguageStore, translations } from '../store/language';
import { cn } from '../lib/utils';

export function Navbar() {
  const { user, logout } = useAuthStore();
  const { items } = useCartStore();
  const { language, toggleLanguage } = useLanguageStore();
  const t = translations[language];
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
            <Link to="/" className="mr-6 flex items-center space-x-2">
                <span className="text-xl font-bold text-primary">GraveEase</span>
            </Link>
             <div className="hidden md:flex gap-4">
                <Link to="/products" className={cn("text-sm font-medium transition-colors hover:text-primary", location.pathname === '/products' ? 'text-foreground' : 'text-muted-foreground')}>
                    {t.browseCoffins}
                </Link>
                {user?.role === 'seller' && (
                    <Link to="/seller" className={cn("text-sm font-medium transition-colors hover:text-primary", location.pathname.startsWith('/seller') ? 'text-foreground' : 'text-muted-foreground')}>
                        {t.sellerDashboard}
                    </Link>
                )}
                 {user?.role === 'admin' && (
                    <Link to="/admin" className={cn("text-sm font-medium transition-colors hover:text-primary", location.pathname.startsWith('/admin') ? 'text-foreground' : 'text-muted-foreground')}>
                        {t.admin}
                    </Link>
                )}
            </div>
        </div>

        <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={toggleLanguage} className="flex items-center gap-1">
                <Globe className="h-4 w-4" />
                <span>{language === 'en' ? 'EN' : 'TW'}</span>
            </Button>

            <Link to="/cart">
                <Button variant="ghost" size="icon" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    {cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                            {cartCount}
                        </span>
                    )}
                </Button>
            </Link>

            {user ? (
                <div className="flex items-center gap-2">
                    <Link to="/profile">
                        <Button variant="ghost" size="icon">
                             <User className="h-5 w-5" />
                        </Button>
                    </Link>
                    <Button variant="ghost" size="sm" onClick={logout}>
                        {t.logout}
                    </Button>
                </div>
            ) : (
                <div className="hidden md:flex items-center gap-2">
                    <Link to="/seller/login">
                        <Button variant="ghost" size="sm">{t.sellerLogin}</Button>
                    </Link>
                     <Link to="/login">
                        <Button size="sm">{t.login}</Button>
                    </Link>
                </div>
            )}

             <div className="md:hidden">
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X className="h-5 w-5"/> : <Menu className="h-5 w-5" />}
                </Button>
            </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t p-4 space-y-4 bg-background">
             <Link to="/products" className="block text-sm font-medium" onClick={() => setIsOpen(false)}>
                {t.browseCoffins}
            </Link>
             {user?.role === 'seller' && (
                <Link to="/seller" className="block text-sm font-medium" onClick={() => setIsOpen(false)}>
                    {t.sellerDashboard}
                </Link>
            )}
             {user?.role === 'admin' && (
                <Link to="/admin" className="block text-sm font-medium" onClick={() => setIsOpen(false)}>
                    {t.admin}
                </Link>
            )}
             {!user && (
                 <>
                    <Link to="/seller/login" className="block text-sm font-medium" onClick={() => setIsOpen(false)}>{t.sellerLogin}</Link>
                    <Link to="/login" className="block text-sm font-medium" onClick={() => setIsOpen(false)}>{t.login}</Link>
                 </>
             )}
        </div>
      )}
    </nav>
  );
}
