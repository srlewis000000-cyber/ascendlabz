import React, { useState, useEffect, useMemo } from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { 
  Bitcoin, 
  ShoppingBag, 
  ChevronRight, 
  CheckCircle2, 
  ArrowLeft,
  Truck,
  ShieldCheck,
  Package,
  Menu,
  FlaskConical,
  Beaker,
  Dna,
  TestTube2,
  Lock,
  ArrowRight,
  X,
  Star,
  Search,
  MessageSquare,
  Mail,
  Camera,
  MessageCircle,
  Clock,
  Send,
  ArrowUpRight,
  ShoppingCart,
  AlertTriangle,
  CreditCard
} from "lucide-react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import { PayPalIntegration } from "./components/PayPalIntegration";
import { BitcoinPayment } from "./components/BitcoinPayment";
import { ProductCard } from "./components/ProductCard";
import { CartDrawer } from "./components/CartDrawer";
import { VialImage } from "./components/VialImage";
import { COAPage } from "./components/COAPage";
import { AgeGate } from "./components/AgeGate";
import { FAQPage } from "./components/FAQPage";
import { LabSolutions } from "./components/LabSolutions";
import { PerformancePortal } from "./components/PerformancePortal";
import { AboutPage } from "./components/AboutPage";
import { ContactPage } from "./components/ContactPage";
import { PoliciesPage } from "./components/PoliciesPage";
import { TermsAndConditions } from "./components/TermsAndConditions";
import { PrivacyPolicy } from "./components/PrivacyPolicy";
import { SearchOverlay } from "./components/SearchOverlay";
import { ProductPage } from "./components/ProductPage";
import { CartItem, Order, PaymentMethod, ProductGroup, Product } from "./types";
import { PRODUCTS, CATEGORIES } from "./constants";
import { cn } from "./lib/utils";

const BITCOIN_ADDRESS = import.meta.env.VITE_BITCOIN_ADDRESS || "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh";

type Page = "home" | "shop" | "product" | "checkout" | "coa" | "faq" | "lab-solutions" | "admin" | "about" | "contact" | "policies" | "terms" | "privacy";

const CounterStat = ({ value, label, suffix = "" }: { value: number, label: string, suffix?: string }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center space-y-1">
      <p className="text-3xl lg:text-4xl font-black italic text-white tracking-tighter">
        {count}{suffix}
      </p>
      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</p>
    </div>
  );
};

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express' | 'overnight'>('standard');
  const [orderComplete, setOrderComplete] = useState<Order | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ProductGroup | "All">("All");
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [emailSubscribed, setEmailSubscribed] = useState(false);
  const [subscriberEmail, setSubscriberEmail] = useState('');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [promoCode, setPromoCode] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    fullName: "", email: "", phone: "", line1: "", line2: "", city: "", state: "", zip: "", country: ""
  });

  const paypalOptions = {
    clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID || "sb",
    currency: "USD",
    intent: "capture",
  };

  const cartTotal = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);
  
  React.  // Abandoned cart email - fires 30 min after cart data saved
  useEffect(() => {
    const saved = localStorage.getItem('ascend_cart_email_data');
    if (!saved) return;
    const { cartEmail, cartItems, cartTotal, savedAt } = JSON.parse(saved);
    if (!cartEmail || !cartItems) return;
    const elapsed = Date.now() - savedAt;
    const delay = Math.max(0, 30 * 60 * 1000 - elapsed);
    const timer = setTimeout(async () => {
      try {
        await fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ service_id: 'service_0kztjcw', template_id: 'template_36e7vbk', user_id: 'WSYK-Hg-ybgwidKVK', template_params: { customer_email: cartEmail, cart_items: cartItems, cart_total: cartTotal } })
        });
        localStorage.removeItem('ascend_cart_email_data');
      } catch (err) { console.error('Abandoned cart email error:', err); }
    }, delay);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [page]);

  const discountAmount = useMemo(() => {
    return promoCode.toUpperCase() === 'RESEARCH10' ? cartTotal * 0.1 : 0;
  }, [promoCode, cartTotal]);

  const shippingCost = useMemo(() => {
    if (shippingMethod === 'standard' && (cartTotal - discountAmount) >= 150) return 0;
    if (shippingMethod === 'standard') return 6.99;
    if (shippingMethod === 'express') return 16.99;
    return 28.99;
  }, [shippingMethod, cartTotal, discountAmount]);

  const finalTotal = (cartTotal - discountAmount) + shippingCost;

  const isAddressValid = useMemo(() => {
    const { fullName, email, phone, line1, city, state, zip, country } = shippingAddress;
    return !!(fullName && email && phone && line1 && city && state && zip && country);
  }, [shippingAddress]);

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, item];
    });
    setIsCartOpen(true);
  };

  const [isAgeVerified, setIsAgeVerified] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  const [showBackToTop, setShowBackToTop] = useState(false);

  React.useEffect(() => {
    const verified = localStorage.getItem('age-verified') === 'true';
    setIsAgeVerified(verified);

    const loadRecentlyViewed = () => {
      try {
        const stored = localStorage.getItem('recently_viewed');
        if (stored) setRecentlyViewed(JSON.parse(stored));
      } catch (e) {}
    };
    loadRecentlyViewed();
    window.addEventListener('recently_viewed_updated', loadRecentlyViewed);
    
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);

    // Schema Markup Injection
    const schema = {
      "@context": "https://schema.org/",
      "@type": "MedicalOrganization",
      "name": "Ascend Labz",
      "url": window.location.origin,
      "logo": "https://ascendlabz.com/logo.png",
      "description": "Premium research peptide synthesis laboratory.",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "USA"
      }
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(schema);
    document.head.appendChild(script);

    const handleNav = (e: any) => {
      if (e.detail) setPage(e.detail as Page);
    };
    window.addEventListener('navigate', handleNav);

    return () => {
      window.removeEventListener('recently_viewed_updated', loadRecentlyViewed);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('navigate', handleNav);
      if (document.head.contains(script)) document.head.removeChild(script);
    };
  }, []);

  const updateCartQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const createOrderRecord = async (method: PaymentMethod, status: Order["status"], details?: any) => {
    setIsProcessing(true);
    try {
      const orderId = `AL-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
      const orderData: Order = {
        id: orderId,
        items: cart,
        total: finalTotal,
        paymentMethod: method,
        status: status,
        createdAt: new Date().toISOString(),
        shippingAddress
      };

      await setDoc(doc(db, "orders", orderId), { ...orderData, paymentDetails: details || {} });
      localStorage.setItem('last_order', JSON.stringify(orderData));
      setOrderComplete(orderData);

        // Send order notification email to AscendLabz
        try {
          const emailParams = {
            customer_name: shippingAddress.fullName || 'Customer',
            customer_email: shippingAddress.email || '',
            customer_phone: shippingAddress.phone || '',
            shipping_address: (shippingAddress.line1 || '') + (shippingAddress.line2 ? ', ' + shippingAddress.line2 : ''),
            city: shippingAddress.city || '',
            state: shippingAddress.state || '',
            zip: shippingAddress.zip || '',
            country: shippingAddress.country || '',
            shipping_method: shippingMethod === 'standard' ? 'Standard (5-7 days) - $6.99' : shippingMethod === 'express' ? 'Express (2-3 days) - $16.99' : 'Overnight - $28.99',
            order_items: orderData.items.map((item: any) => item.name + ' x' + item.quantity + ' - $' + item.price).join(', '),
            subtotal: (orderData.total - (shippingMethod === 'standard' ? 6.99 : shippingMethod === 'express' ? 16.99 : 28.99)).toFixed(2),
            shipping_price: shippingMethod === 'standard' ? '6.99' : shippingMethod === 'express' ? '16.99' : '28.99',
            total: orderData.total.toFixed(2),
            payment_method: orderData.paymentMethod,
            order_id: orderData.id,
            orders: orderData.items.map((item: any) => ({ name: item.name, units: item.quantity, price: item.price }))
          };
          await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              service_id: 'service_0kztjcw',
              template_id: 'template_q3h417w',
              user_id: 'WSYK-Hg-ybgwidKVK',
              template_params: emailParams
            })
          });

          // Send customer confirmation email
          await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              service_id: 'service_0kztjcw',
              template_id: 'template_xkbbv54',
              user_id: 'WSYK-Hg-ybgwidKVK',
              template_params: {
                customer_name: orderData.customer.name,
                customer_email: orderData.customer.email,
                customer_phone: orderData.customer.phone,
                shipping_address: orderData.customer.shippingAddress.line1 || orderData.customer.shippingAddress.address1 || '',
                city: orderData.customer.shippingAddress.city,
                state: orderData.customer.shippingAddress.state,
                zip: orderData.customer.shippingAddress.zip,
                country: orderData.customer.shippingAddress.country || 'US',
                shipping_method: orderData.shipping.name,
                shipping_price: orderData.shipping.price,
                total: orderData.total,
                payment_method: orderData.paymentMethod,
                order_id: orderData.id,
                orders: orderData.items.map((item: any) => ({ name: item.name, units: item.quantity, price: item.price }))
              }
            })
          });
        } catch (emailErr) {
          console.error('Email notification failed:', emailErr);
        }
      setCart([]);
    } catch (error) {
      console.error("Order Creation Error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePayPalSuccess = (details: any) => {
    createOrderRecord("paypal", "Paid", details);
  };

  const handleBitcoinConfirm = () => {
    createOrderRecord("bitcoin", "Pending Bitcoin Payment");
  };

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "All") return PRODUCTS;
    return PRODUCTS.filter(p => p.group === selectedCategory);
  }, [selectedCategory]);

  const featuredProducts = PRODUCTS.slice(0, 4);

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6 text-slate-900 font-sans">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-[480px] w-full bg-white rounded-[40px] p-12 shadow-2xl border border-slate-100 text-center space-y-8 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-blue-400" />
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto border border-blue-100">
            <CheckCircle2 className="w-10 h-10 text-blue-600" />
          </div>
          <div className="space-y-3 mb-6">
             <h1 className="text-3xl font-black tracking-tighter italic lg:text-4xl">SECURE CONFIRMATION.</h1>
             <p className="text-slate-500 text-sm leading-relaxed">Your request ({orderComplete.id}) has been recorded on our secure ledger and is being processed for dispatch.</p>
             <p className="text-slate-500 text-sm leading-relaxed font-bold bg-blue-50 border border-blue-100 p-3 rounded-lg text-blue-800">
               A confirmation email with your logistics tracking details will be sent to the email address provided.
             </p>
          </div>
          
          <div className="bg-slate-50 rounded-3xl border border-slate-100 p-6 text-left space-y-4 mb-8">
             <div className="space-y-3">
               {orderComplete.items.map(item => (
                 <div key={item.id} className="flex justify-between items-center text-sm">
                   <div className="flex items-center gap-2">
                     <span className="font-bold text-slate-900 bg-white border border-slate-200 px-2 rounded">{item.quantity}x</span>
                     <span className="text-slate-600 font-medium">{item.name} <span className="text-slate-400">({item.packSize} pk)</span></span>
                   </div>
                   <span className="font-bold text-slate-900">${(item.price * item.quantity).toFixed(2)}</span>
                 </div>
               ))}
             </div>
             
             <div className="flex justify-between items-center pt-4 border-t border-slate-200">
               <span className="text-xs font-black uppercase tracking-widest text-slate-400">Total Paid</span>
               <span className="text-xl font-black text-blue-600">${orderComplete.total.toFixed(2)}</span>
             </div>

             <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200">
                <div className="space-y-1">
                   <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Tracking</p>
                   <div className="font-mono text-sm font-bold text-blue-600 truncate">{orderComplete.id}</div>
                </div>
                <div className="space-y-1">
                   <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Delivery By</p>
                   <div className="font-bold text-sm text-slate-900">{new Date(new Date().setDate(new Date().getDate() + (orderComplete.total > 150 ? 5 : 3))).toLocaleDateString()}</div>
                </div>
             </div>
          </div>
          <button 
            onClick={() => {
                setOrderComplete(null);
                setPage("home");
            }}
            className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-blue-700 transition-all active:scale-95 shadow-xl shadow-blue-600/10"
          >
            RETURN TO LAB
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <PayPalScriptProvider options={paypalOptions}>
      <AgeGate onVerified={() => setIsAgeVerified(true)} />
      
      <SearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        onSelectProduct={(productId) => {
          const product = PRODUCTS.find(p => p.id === productId);
          if (product) {
            setSelectedProduct(product);
            setPage("product");
            setIsSearchOpen(false);
            
            // Add to recently viewed
            try {
              const stored = localStorage.getItem('recently_viewed');
              let viewed = stored ? JSON.parse(stored) : [];
              viewed = viewed.filter((id: string) => id !== productId);
              viewed.unshift(productId);
              if (viewed.length > 5) viewed = viewed.slice(0, 5);
              localStorage.setItem('recently_viewed', JSON.stringify(viewed));
              window.dispatchEvent(new Event('recently_viewed_updated'));
            } catch (e) {}
          }
        }}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={updateCartQuantity}
        onRemove={removeFromCart}
        onCheckout={() => {
          setIsCartOpen(false);
          setPage("checkout");
        }}
        promoCode={promoCode}
        setPromoCode={setPromoCode}
      />
      <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] selection:bg-blue-500/10 relative">

        <AnimatePresence>
          {showBackToTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-2xl shadow-blue-600/30 hover:bg-blue-700 transition-colors"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <ArrowLeft className="w-5 h-5 rotate-90" />
            </motion.button>
          )}
        </AnimatePresence>
        
        {/* Announcement Bar & Global Navbar Header Stack */}
        <header className="fixed w-full z-50">
          <AnimatePresence>
            {showAnnouncement && (
              <motion.div 
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                className="bg-blue-600 text-white overflow-hidden"
              >
                <div className="max-w-7xl mx-auto px-6 h-10 flex items-center justify-between text-[10px] font-black uppercase tracking-widest whitespace-nowrap">
                  <div className="flex-1 flex justify-center gap-8">
                              <span>FREE SHIPPING on orders over $150</span>
                    <span className="hidden md:inline">| Use code RESEARCH10 for 10% off your first order</span>
                    <span className="hidden lg:inline">| <a href="mailto:ascendlabz@gmail.com" target="_blank" rel="noopener noreferrer" className="hover:underline">ascendlabz@gmail.com</a></span>
                  </div>
                  <button onClick={() => setShowAnnouncement(false)} className="hover:scale-110 transition-transform">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <nav className="w-full bg-white/80 backdrop-blur-xl border-b border-slate-200 px-6 lg:px-12 h-20 flex items-center justify-between transition-all">
             <div className="flex items-center gap-2 cursor-pointer group" onClick={() => setPage("home")}>
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center group-hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20">
                  <FlaskConical className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-black tracking-tighter uppercase italic group-hover:text-blue-600 transition-colors text-slate-900">ASCEND LABZ</span>
             </div>

             <div className="hidden lg:flex items-center gap-8">
                {["home", "shop", "coa", "faq", "about", "contact"].map((p) => (
                  <button 
                    key={p}
                    onClick={() => setPage(p as Page)}
                    className={cn(
                      "text-[10px] font-black uppercase tracking-[0.2em] transition-all relative py-2",
                      page === p ? "text-blue-600" : "text-slate-400 hover:text-slate-900"
                    )}
                  >
                    {p === "coa" ? "COA / LAB DATA" : 
                     p === "shop" ? "SHOP ALL" : 
                     p === "faq" ? "FAQ" : 
                     p === "about" ? "ABOUT US" : 
                     p === "contact" ? "CONTACT" : 
                     p.toUpperCase()}
                    {page === p && (
                      <motion.div layoutId="nav-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                    )}
                  </button>
                ))}
             </div>

             <div className="flex items-center gap-6">
                <button 
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 text-slate-400 hover:text-slate-900 transition-colors group"
                  aria-label="Search research chemicals"
                >
                  <Search className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </button>
                <button 
                  onClick={() => setIsCartOpen(true)}
                  className="relative p-2 text-slate-400 hover:text-slate-900 transition-colors"
                >
                  <ShoppingBag className="w-6 h-6" />
                  {cart.length > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-blue-600 text-white text-[10px] font-black flex items-center justify-center rounded-full border-2 border-white animate-in zoom-in duration-300">
                      {cart.reduce((sum, i) => sum + i.quantity, 0)}
                    </span>
                  )}
                </button>
                 <button onClick={() => setShowMobileMenu(!showMobileMenu)} className="lg:hidden p-2 text-slate-400 hover:text-slate-900 transition-colors">
                  {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
             </div>
          </nav>
        </header>

        {/* Mobile Menu Dropdown */}
        {showMobileMenu && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={cn("lg:hidden fixed left-0 right-0 bg-white border-b border-slate-200 shadow-xl z-40", showAnnouncement ? "top-[120px]" : "top-[80px]")}
          >
            <nav className="max-w-7xl mx-auto px-6 py-4 space-y-1">
              <button
                onClick={() => { setIsSearchOpen(true); setShowMobileMenu(false); }}
                className="flex items-center gap-3 w-full text-left px-4 py-3 text-sm font-black uppercase tracking-[0.15em] rounded-lg text-blue-600 bg-blue-50 mb-2"
              >
                <Search className="w-4 h-4" /> SEARCH CATALOG
              </button>
              {["home", "shop", "coa", "faq", "about", "contact"].map((p) => (
                <button
                  key={p}
                  onClick={() => { setPage(p as Page); setShowMobileMenu(false); }}
                  className={cn(
                    "block w-full text-left px-4 py-3 text-sm font-black uppercase tracking-[0.15em] rounded-lg transition-all",
                    page === p ? "bg-blue-600 text-white" : "text-slate-700 hover:bg-slate-100"
                  )}
                >
                  {p === "coa" ? "COA / LAB DATA" : p === "shop" ? "SHOP ALL" : p === "faq" ? "FAQ" : p.toUpperCase()}
                </button>
              ))}
            </nav>
          </motion.div>
        )}


        <div className={cn("transition-all", showAnnouncement ? "pt-[120px]" : "pt-[80px]")}>
          <AnimatePresence mode="wait">
            {page === "home" && (
              <motion.div
                key="home"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="space-y-4 pb-0"
              >
                {/* Hero Section */}
                <section className="relative min-h-[55vh] flex items-center justify-center p-4 lg:p-8 overflow-hidden bg-white">
                  <div className="absolute inset-0 z-0">
                    {/* Grid Background */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
                    
                    {/* Atmospheric Glows */}
                    <div className="absolute top-[20%] left-[15%] w-[45vw] h-[45vw] bg-blue-600/5 blur-[140px] rounded-full animate-pulse" />
                    <div className="absolute bottom-[20%] right-[15%] w-[35vw] h-[35vw] bg-cyan-400/5 blur-[120px] rounded-full delay-700 animate-pulse" />
                  </div>

                  <div className="relative z-10 max-w-5xl text-center space-y-5">
                    <motion.div 
                       initial={{ opacity: 0, scale: 0.9 }}
                       animate={{ opacity: 1, scale: 1 }}
                       className="mx-auto w-fit px-4 py-2 rounded-full border border-blue-100 bg-blue-50/50 backdrop-blur-md"
                    >
                      <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-2">
                         <Dna className="w-3 h-3" />
                         Next-Generation Bio-Enhancement
                      </span>
                    </motion.div>

                    <motion.h1 
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-4xl md:text-6xl lg:text-8xl font-black tracking-[-0.04em] leading-[0.85] italic text-slate-900"
                    >
                      ELEVATE YOUR <br className="hidden md:block" /> 
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-blue-500 to-blue-800 drop-shadow-sm">BIOLOGY.</span>
                    </motion.h1>

                    <motion.p 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="text-slate-500 text-lg lg:text-xl max-w-2xl mx-auto font-medium"
                    >
                      Most affordable research peptides online â buy Retatrutide, Tirzepatide & more. 99%+ pharma-grade purity, third-party lab verified, fast discreet US shipping.
                    </motion.p>

                    <motion.div 
                       initial={{ opacity: 0, y: 20 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ delay: 0.2 }}
                       className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                      <button 
                        onClick={() => setPage("shop")}
                        className="w-full sm:w-auto px-10 py-5 bg-blue-600 text-white rounded-2xl font-black text-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-blue-600/10"
                      >
                        EXPLORE CATALOG <ArrowRight className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => setPage("coa")}
                        className="w-full sm:w-auto px-10 py-5 bg-slate-50 hover:bg-slate-100 text-slate-900 rounded-2xl font-black text-lg transition-all border border-slate-200 flex items-center justify-center gap-3"
                      >
                        CERTIFICATES <Beaker className="w-5 h-5" />
                      </button>
                    </motion.div>

                    {/* Trust Badges */}
                    <motion.div 
                       initial={{ opacity: 0, y: 20 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ delay: 0.3 }}
                       className="pt-3 flex flex-wrap items-center justify-center gap-4 lg:gap-8 text-slate-400 font-bold text-xs uppercase tracking-widest"
                    >
                       <span className="flex items-center gap-2"><FlaskConical className="w-4 h-4 text-blue-600"/> Lab Tested</span>
                       <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-green-500"/> Third-Party Verified</span>
                       <span className="flex items-center gap-2"><Package className="w-4 h-4 text-slate-500"/> Discreet Shipping</span>
                       <span className="flex items-center gap-2"><Lock className="w-4 h-4 text-slate-900"/> Secure Checkout</span>
                    </motion.div>
                  </div>
                </section>

                {/* Quick Product Preview - visible above fold */}
                <section className="px-4 lg:px-8 relative z-10 bg-white border-t border-slate-100">
                  <div className="max-w-7xl mx-auto py-4">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3 text-center">Top Sellers — Click to Shop</p>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                      {[
                        { name: 'Retatrutide', price: '$53.00', badge: '30mg', rating: '4.7', reviews: 136, tag: 'Most Popular' },
                        { name: 'Tirzepatide', price: '$55.00', badge: '30mg', rating: '4.9', reviews: 142, tag: 'Top Rated' },
                        { name: 'Semaglutide', price: '$45.00', badge: '10mg', rating: '4.8', reviews: 139, tag: 'Best Value' },
                        { name: 'Cagrilintide', price: '$65.00', badge: '10mg', rating: '4.6', reviews: 98, tag: 'Premium' },
                      ].map((p) => (
                        <button
                          key={p.name}
                          onClick={() => setPage('shop')}
                          className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-left hover:border-blue-400 hover:shadow-md hover:bg-white transition-all group cursor-pointer"
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[8px] font-black bg-blue-600 text-white px-1.5 py-0.5 rounded-full uppercase tracking-widest">{p.badge}</span>
                            <span className="text-[8px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-full">{p.tag}</span>
                          </div>
                          <h3 className="text-xs font-black text-slate-900 mb-1">{p.name}</h3>
                          <div className="flex items-center gap-1 mb-1.5">
                            <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                            <span className="text-[9px] font-bold text-slate-500">{p.rating} ({p.reviews})</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-black text-slate-900">{p.price}</span>
                            <span className="text-[8px] font-black text-blue-600 group-hover:translate-x-0.5 transition-transform bg-blue-600 text-white px-2 py-0.5 rounded-full">BUY</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Trust Section Redesigned */}
                <section className="px-4 -mt-4 relative z-20">
                   <div className="max-w-7xl mx-auto bg-slate-900 rounded-2xl p-5 lg:p-8 grid grid-cols-2 lg:grid-cols-4 gap-6 shadow-2xl relative overflow-hidden">
                      <div className="absolute inset-0 bg-blue-600/5 pointer-events-none" />
                      <CounterStat value={500} suffix="+" label="Labs Served" />
                      <CounterStat value={99} suffix=".9%" label="Average Purity" />
                      <CounterStat value={48} suffix="hr" label="Dispatch Protocol" />
                      <CounterStat value={7} suffix="+" label="Peptide Categories" />
                   </div>
                </section>

                {/* Featured Products */}
                <section className="px-6 lg:px-12 max-w-7xl mx-auto space-y-12">
                   <div className="flex flex-col md:flex-row items-end justify-between gap-6 px-4">
                      <div className="space-y-4">
                         <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em]">Top Performers</p>
                         <h2 className="text-4xl lg:text-5xl font-black tracking-tighter text-slate-900">ELITE MATERIALS.</h2>
                      </div>
                      <button 
                        onClick={() => setPage("shop")}
                        className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-blue-600 transition-colors !no-underline"
                      >
                         Browse all products <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                   </div>
                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      {featuredProducts.map(p => (
                        <ProductCard key={p.id} product={p} onAddToCart={addToCart} onViewProduct={(p) => { setSelectedProduct(p); setPage("product"); }} />
                      ))}
                   </div>
                </section>

                {/* How It Works */}
                <section className="px-6 lg:px-12 max-w-7xl mx-auto py-16 space-y-12">
                   <div className="text-center space-y-4">
                      <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Protocol Streamline</p>
                      <h2 className="text-4xl lg:text-5xl font-black tracking-tighter">OUR RESEARCH PIPELINE.</h2>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                      {[
                        { step: "01", icon: <Search className="w-6 h-6" />, title: "BROWSE & SELECT", desc: "Access our extensive library of research-grade peptides with verified COA data." },
                        { step: "02", icon: <Lock className="w-6 h-6" />, title: "SECURE CHECKOUT", desc: "Automated encryption for all transactions (Card, PayPal, BTC) ensure lab privacy." },
                        { step: "03", icon: <Truck className="w-6 h-6" />, title: "FAST DISPATCH", desc: "Immediate 48-hour climate-controlled fulfillment for all research materials." },
                      ].map((item, i) => (
                        <div key={i} className="flex flex-col items-center text-center space-y-6 group">
                            <div className="relative">
                               <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-[2rem] flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all transform group-hover:scale-110">
                                  {item.icon}
                               </div>
                               <span className="absolute -top-3 -right-3 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-black italic shadow-lg">
                                  {item.step}
                               </span>
                            </div>
                            <div className="space-y-2">
                               <h3 className="text-xl font-black italic tracking-tight">{item.title}</h3>
                               <p className="text-slate-500 text-sm font-medium leading-relaxed">{item.desc}</p>
                            </div>
                        </div>
                      ))}
                   </div>
                </section>

                {/* Testimonials */}
                <section className="bg-slate-50 py-16 rounded-[3rem] mx-4 relative overflow-hidden">
                   <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-12">
                      <div className="flex flex-col items-center text-center space-y-4">
                        <p className="text-[10px] font-black text-blue-400 underline decoration-blue-600 decoration-2 underline-offset-4 uppercase tracking-[0.4em]">Researcher Feedback</p>
                        <h2 className="text-4xl lg:text-6xl font-black tracking-tighter text-slate-900">VERIFIED VALIDITY.</h2>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                          { name: "DR. M. CHEN", institution: "University Research Lab", quote: "Exceptional purity levels. The COA data matched perfectly with our independent verification for all 10ml samples." },
                          { name: "SARAH L.", institution: "Independent Biochemist", quote: "The climate-stable packaging is a game changer. Arrived at the lab in pristine condition even during extreme summer heat." },
                          { name: "RESEARCH INST.", institution: "Clinical Observations", quote: "Swift dispatch and absolute transparency. Ascend Labz is now our primary source for specialized research peptides." }
                        ].map((rev, i) => (
                          <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6 hover:shadow-xl transition-all">
                             <div className="flex gap-1 text-orange-400">
                               {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
                             </div>
                             <p className="text-slate-600 font-medium italic leading-relaxed">"{rev.quote}"</p>
                             <div className="pt-6 border-t border-slate-50">
                                <p className="text-xs font-black uppercase tracking-widest text-slate-900 italic">{rev.name}</p>
                                <p className="text-[10px] text-slate-400 font-bold uppercase">{rev.institution}</p>
                             </div>
                          </div>
                        ))}
                      </div>
                   </div>
                </section>

                {/* Newsletter & Homepage Contact */}
                <section className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-16 items-center">
                   <div className="space-y-6">
                      <div className="space-y-4">
                        <h2 className="text-4xl lg:text-5xl font-black tracking-tighter">DATA TRANSMISSION.</h2>
                        <p className="text-slate-500 font-medium max-w-md">Get exclusive discounts on Retatrutide, Tirzepatide and other research peptides. Be first to know about restocks and best price drops.</p>
                      </div>
                      
                      {emailSubscribed ? (
                         <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="flex items-center gap-4 text-green-600 p-6 bg-green-50 rounded-2xl border border-green-100">
                            <CheckCircle2 className="w-6 h-6" />
                            <span className="font-black uppercase tracking-widest text-xs">Access Granted. Batch alerts enabled.</span>
                         </motion.div>
                      ) : (
                        <form 
                          onSubmit={async (e) => { e.preventDefault(); setEmailSubscribed(true); try { await fetch('https://api.emailjs.com/api/v1.0/email/send', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ service_id: 'service_0kztjcw', template_id: 'template_rn5spsq', user_id: 'WSYK-Hg-ybgwidKVK', template_params: { subscriber_email: subscriberEmail } }) }); } catch(err) { console.error('Welcome email error:', err); } }}
                          className="flex gap-3 max-w-md"
                        >
                          <input 
                            required
                            type="email" value={subscriberEmail} onChange={(e) => setSubscriberEmail(e.target.value)} 
                            placeholder="laboratory-email@address.com" 
                            className="flex-1 bg-white border border-slate-200 px-6 py-4 rounded-xl focus:outline-none focus:border-blue-500 transition-colors font-medium text-sm"
                          />
                          <button type="submit" className="bg-blue-600 text-white px-8 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-blue-700 transition-all flex items-center gap-2">
                            Join <ArrowUpRight className="w-4 h-4" />
                          </button>
                        </form>
                      )}
                      <div className="text-[10px] text-slate-400 font-bold flex items-center gap-2">
                         <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" /> Join 500+ researchers. No spam. Unsubscribe anytime.
                      </div>
                   </div>

                   <div className="bg-slate-900 rounded-[3rem] p-12 text-white space-y-8 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600 blur-[80px] opacity-20" />
                      <div className="space-y-4">
                        <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Inquiry Protocol</p>
                        <h3 className="text-3xl font-black italic">DIRECT TECHNICAL SUPPORT.</h3>
                        <p className="text-slate-400 text-sm">Need a specific COA or bulk research quote? Our laboratory specialists are standing by.</p>
                      </div>
                      <div className="space-y-4">
                        <a href="mailto:ascendlabz@gmail.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 p-6 bg-white/5 rounded-3xl border border-white/10 hover:border-blue-500/50 transition-all group">
                           <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-2xl shadow-blue-600/20 group-hover:scale-110 transition-transform">
                              <Mail className="w-5 h-5" />
                           </div>
                           <div className="space-y-1">
                              <p className="text-[10px] text-slate-400 font-bold">EMAIL THE LAB</p>
                              <p className="text-xl font-bold tracking-tight">ascendlabz@gmail.com</p>
                           </div>
                        </a>
                      </div>
                      <div className="flex items-center gap-4 text-xs font-bold text-slate-500">
                        <Clock className="w-4 h-4" /> Response within 24 hours. Mon - Fri.
                      </div>
                   </div>
                </section>

                {/* Why Choose Ascend Labz Component */}
                <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-16">
                   <div className="text-center space-y-4 mb-12">
                      <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Premium Quality</p>
                      <h2 className="text-4xl lg:text-5xl font-black tracking-tighter">WHY CHOOSE ASCEND LABZ?</h2>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="bg-white border border-slate-200 rounded-3xl p-8 flex gap-6 hover:shadow-lg transition-all hover:border-blue-200">
                       <ShieldCheck className="w-10 h-10 text-green-500 shrink-0" />
                       <div>
                         <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase italic mb-2">Verified Purity</h3>
                         <p className="text-sm text-slate-500 leading-relaxed font-medium">Every batch comes with a Certificate of Analysis from independent third-party labs, guaranteeing 99%+ purity. Buy with confidence â best quality at the lowest price online.</p>
                       </div>
                     </div>
                     <div className="bg-white border border-slate-200 rounded-3xl p-8 flex gap-6 hover:shadow-lg transition-all hover:border-blue-200">
                       <Package className="w-10 h-10 text-blue-600 shrink-0" />
                       <div>
                         <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase italic mb-2">Discreet & Fast Shipping</h3>
                         <p className="text-sm text-slate-500 leading-relaxed font-medium">Affordable doesn't mean slow. We dispatch all orders within 48 hours in climate-controlled, discreet packaging. Buy research peptides online USA and get fast shipping.</p>
                       </div>
                     </div>
                     <div className="bg-white border border-slate-200 rounded-3xl p-8 flex gap-6 hover:shadow-lg transition-all hover:border-blue-200">
                       <TestTube2 className="w-10 h-10 text-purple-500 shrink-0" />
                       <div>
                         <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase italic mb-2">Cold Storage Protocols</h3>
                         <p className="text-sm text-slate-500 leading-relaxed font-medium">Unlike cheap overseas suppliers, we store all lyophilized peptides in strict cold-storage until dispatch â every vial arrives at full potency. The most affordable option that never cuts corners.</p>
                       </div>
                     </div>
                     <div className="bg-white border border-slate-200 rounded-3xl p-8 flex gap-6 hover:shadow-lg transition-all hover:border-blue-200">
                       <Lock className="w-10 h-10 text-slate-900 shrink-0" />
                       <div>
                         <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase italic mb-2">Secure Ecosystem</h3>
                         <p className="text-sm text-slate-500 leading-relaxed font-medium">Fully encrypted checkout accepting PayPal, debit cards, and Bitcoin. Buy research peptides online safely â zero data exposure, total privacy.</p>
                       </div>
                     </div>
                   </div>
                </section>
              </motion.div>
            )}

            {page === "shop" && (
              <motion.div
                key="shop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="max-w-7xl mx-auto p-6 lg:p-12 space-y-12"
              >
                <div className="space-y-4">
                   <div className="flex items-center gap-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                      <button onClick={() => setPage("home")} className="hover:text-blue-400">Home</button>
                      <ChevronRight className="w-3 h-3" />
                      <span className="text-blue-400">Shop Catalog</span>
                   </div>
                   <h1 className="text-5xl font-black tracking-tighter italic">RESEARCH MATERIALS.</h1>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-3">
                   <button 
                     onClick={() => setSelectedCategory("All")}
                     className={cn(
                       "px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] border-2 transition-all",
                       selectedCategory === "All" ? "border-blue-600 bg-blue-600/10 text-blue-600" : "border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:text-slate-900"
                     )}
                   >
                     Show All
                   </button>
                   {CATEGORIES.map((c) => (
                     <button
                       key={c.name}
                       onClick={() => setSelectedCategory(c.name)}
                       className={cn(
                         "px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] border-2 transition-all",
                         selectedCategory === c.name ? "border-blue-600 bg-blue-600/10 text-blue-600" : "border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:text-slate-900"
                       )}
                     >
                       {c.name}
                     </button>
                   ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                   {filteredProducts.map(p => (
                     <ProductCard key={p.id} product={p} onAddToCart={addToCart} onViewProduct={(p) => { setSelectedProduct(p); setPage("product"); }} />
                   ))}
                </div>

                {recentlyViewed.length > 0 && (
                   <div className="pt-20 border-t border-slate-200/50 mt-20">
                     <div className="flex items-center gap-2 mb-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                       <ShoppingCart className="w-4 h-4 text-slate-900" />
                       <span>Recently Viewed</span>
                     </div>
                     <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                       {recentlyViewed.map(id => {
                         const product = PRODUCTS.find(p => p.id === id);
                         if (!product) return null;
                         return (
                           <div key={id} onClick={() => { setSelectedProduct(product); setPage('product'); }} className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm flex flex-col items-center text-center gap-2 relative overflow-hidden cursor-pointer hover:border-blue-600 transition-colors">
                             <div className="w-full h-24 bg-slate-50 rounded-lg overflow-hidden flex items-center justify-center">
                               <VialImage 
                                 name={product.name} 
                                 mg={product.mg}
                                 image={product.image}
                                 className="w-full h-full object-cover"
                               />
                             </div>
                             <span className="text-[10px] font-black tracking-tighter uppercase text-slate-800 line-clamp-1">{product.name}</span>
                             <span className="text-[9px] font-bold text-slate-400">${product.prices[1].toFixed(2)}</span>
                           </div>
                         )
                       })}
                     </div>
                   </div>
                 )}
              </motion.div>
            )}

            {page === "product" && (
              <motion.div
                key="product"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex items-start justify-center pt-10"
              >
                <div className="w-full">
                  <ProductPage product={selectedProduct} onBack={() => setPage("shop")} onAddToCart={addToCart} />
                </div>
              </motion.div>
            )}

            {page === "coa" && (
              <motion.div
                key="coa"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <COAPage />
              </motion.div>
            )}

            {page === "faq" && (
              <motion.div
                key="faq"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <FAQPage />
              </motion.div>
            )}

            {page === "about" && (
              <motion.div key="about" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                <AboutPage />
              </motion.div>
            )}

            {page === "contact" && (
              <motion.div key="contact" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                <ContactPage />
              </motion.div>
            )}

            {page === "policies" && (
              <motion.div key="policies" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                <PoliciesPage />
              </motion.div>
            )}

            {page === "lab-solutions" && (
              <motion.div
                key="lab-solutions"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <LabSolutions />
              </motion.div>
            )}

            {page === "admin" && (
              <motion.div
                key="admin"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <PerformancePortal />
              </motion.div>
            )}

            {page === "checkout" && (
              <motion.div
                key="checkout"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.15 }}
                className="max-w-[1240px] mx-auto w-full grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 p-6 lg:p-12"
              >
                <div className="space-y-10">
                   <div className="flex items-center gap-4 pt-10">
                      <button onClick={() => setPage("shop")} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Shop
                      </button>
                   </div>
                   <h2 className="text-5xl font-black tracking-tighter italic">SECURE CHECKOUT.</h2>
                   
                   <div className="space-y-8 bg-white border border-slate-100 p-10 rounded-[40px] shadow-sm">
                      <div className="space-y-4 pt-2">
                        <h3 className="text-xl font-bold flex items-center gap-3 italic text-slate-900">
                           <Truck className="w-6 h-6 text-blue-600" />
                           DESTINATION ADDRESS
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <input type="text" placeholder="Full Name" value={shippingAddress.fullName} onChange={(e) => setShippingAddress({...shippingAddress, fullName: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:outline-none focus:border-blue-600 transition-colors placeholder:text-slate-300" />
                           <input type="email" placeholder="Email Address" value={shippingAddress.email} onChange={(e) => setShippingAddress({...shippingAddress, email: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:outline-none focus:border-blue-600 transition-colors placeholder:text-slate-300" />
                           <input type="tel" placeholder="Phone Number" value={shippingAddress.phone} onChange={(e) => setShippingAddress({...shippingAddress, phone: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:outline-none focus:border-blue-600 transition-colors placeholder:text-slate-300 md:col-span-2" />
                           <input type="text" placeholder="Address Line 1" value={shippingAddress.line1} onChange={(e) => setShippingAddress({...shippingAddress, line1: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:outline-none focus:border-blue-600 transition-colors placeholder:text-slate-300 md:col-span-2" />
                           <input type="text" placeholder="Address Line 2 (Optional)" value={shippingAddress.line2} onChange={(e) => setShippingAddress({...shippingAddress, line2: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:outline-none focus:border-blue-600 transition-colors placeholder:text-slate-300 md:col-span-2" />
                           <input type="text" placeholder="City" value={shippingAddress.city} onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:outline-none focus:border-blue-600 transition-colors placeholder:text-slate-300" />
                           <input type="text" placeholder="State / Province" value={shippingAddress.state} onChange={(e) => setShippingAddress({...shippingAddress, state: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:outline-none focus:border-blue-600 transition-colors placeholder:text-slate-300" />
                           <input type="text" placeholder="ZIP / Postal Code" value={shippingAddress.zip} onChange={(e) => setShippingAddress({...shippingAddress, zip: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:outline-none focus:border-blue-600 transition-colors placeholder:text-slate-300" />
                           <input type="text" placeholder="Country" value={shippingAddress.country} onChange={(e) => setShippingAddress({...shippingAddress, country: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:outline-none focus:border-blue-600 transition-colors placeholder:text-slate-300" />
                        </div>
                      </div>
                      
                      <div className="space-y-4 border-t border-slate-100 pt-6">
                        <h3 className="text-xl font-bold flex items-center gap-3 italic text-slate-900">
                           <Package className="w-6 h-6 text-blue-600" />
                           SELECT SHIPPING PROTOCOL
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {[
                            { id: "standard", name: "Standard", time: "5-7 business days", price: 6.99 },
                            { id: "express", name: "Express", time: "2-3 business days", price: 16.99 },
                            { id: "overnight", name: "Overnight", time: "Next business day", price: 28.99 }
                          ].map(method => (
                            <button
                              key={method.id}
                              onClick={() => setShippingMethod(method.id as 'standard' | 'express' | 'overnight')}
                              className={cn(
                                "flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all gap-2 relative overflow-hidden group",
                                shippingMethod === method.id ? "border-blue-600 bg-blue-50" : "border-slate-50 bg-white hover:border-slate-100"
                              )}
                            >
                               <div className="absolute top-2 right-2">
                                 <div className={cn("w-4 h-4 rounded-full border-2", shippingMethod === method.id ? "bg-blue-600 border-blue-500" : "border-slate-200")} />
                               </div>
                               <span className="text-slate-900 font-black italic text-xl">{method.name}</span>
                               <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">{method.time}</span>
                               <span className="font-bold text-blue-600 mt-2">
                                 {method.id === 'standard' && cartTotal >= 150 ? 'FREE' : `$${method.price}`}
                               </span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4 pt-6 border-t border-slate-100">
                        <div className="flex items-center justify-between">
                          <h3 className="text-xl font-bold flex items-center gap-3 italic text-slate-900">
                             <CreditCard className="w-6 h-6 text-blue-600" />
                             SELECT PAYMENT PROTOCOL
                          </h3>
                        </div>
                        
                        {(!isAddressValid || !agreedToTerms) && paymentMethod && (
                          <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-amber-800 text-sm font-medium">
                            Please complete the required destination address fields and agree to the Terms & Conditions before authorizing payment.
                          </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <button
                            onClick={() => setPaymentMethod("paypal")}
                            className={cn(
                              "flex flex-col items-center justify-center p-8 rounded-2xl border-2 transition-all gap-3 relative overflow-hidden group",
                              paymentMethod === "paypal" ? "border-blue-600 bg-blue-50" : "border-slate-50 bg-white hover:border-slate-100"
                            )}
                          >
                             <div className="absolute top-2 right-2">
                               <div className={cn("w-4 h-4 rounded-full border-2", paymentMethod === 'paypal' ? "bg-blue-600 border-blue-500" : "border-slate-200")} />
                             </div>
                            <span className="text-status-paypal font-black italic text-2xl group-hover:scale-110 transition-transform">PayPal</span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Card & Crypto Support</span>
                          </button>

                          <button
                            onClick={() => setPaymentMethod("bitcoin")}
                            className={cn(
                              "flex flex-col items-center justify-center p-8 rounded-2xl border-2 transition-all gap-3 relative overflow-hidden group",
                              paymentMethod === "bitcoin" ? "border-orange-600 bg-orange-50" : "border-slate-50 bg-white hover:border-slate-100"
                            )}
                          >
                            <div className="absolute top-2 right-2">
                               <div className={cn("w-4 h-4 rounded-full border-2", paymentMethod === 'bitcoin' ? "bg-orange-600 border-orange-500" : "border-slate-200")} />
                             </div>
                            <span className="text-status-bitcoin text-2xl font-black group-hover:scale-110 transition-transform flex items-center gap-2">
                               <Bitcoin className="w-6 h-6" /> Bitcoin
                            </span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Blockchain Network</span>
                          </button>
                        </div>
                      </div>

                      <div className="min-h-[300px]">
                        <AnimatePresence mode="wait">
                          {paymentMethod === "paypal" && (
                            <motion.div key="pp" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                              <div className="bg-blue-50 p-6 rounded-2xl flex gap-4 text-sm text-blue-600 border border-blue-100">
                                 <ShieldCheck className="w-6 h-6 shrink-0" />
                                 <p className="font-medium">Materials will be dispatched immediately upon successful payment processing.</p>
                              </div>
                              <PayPalIntegration amount={finalTotal} onSuccess={handlePayPalSuccess} onError={() => {}} disabled={!agreedToTerms || !isAddressValid} />
                            </motion.div>
                          )}
                          {paymentMethod === "bitcoin" && (
                            <motion.div key="btc" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                               <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
                                 <BitcoinPayment address={BITCOIN_ADDRESS} amount={finalTotal} onInitiate={handleBitcoinConfirm} disabled={!agreedToTerms || !isAddressValid} />
                               </div>
                            </motion.div>
                          )}
                          {!paymentMethod && (
                            <div className="h-64 flex flex-col items-center justify-center text-slate-300 border-2 border-dashed border-slate-100 rounded-3xl space-y-4">
                               <Lock className="w-10 h-10" />
                               <p className="font-bold opacity-50 uppercase tracking-widest text-xs">Payment Authorization Required</p>
                            </div>
                          )}
                        </AnimatePresence>
                      </div>
                   </div>
                </div>

                <div className="space-y-6 pt-10">
                   <div className="bg-white border border-slate-200 rounded-[40px] p-10 h-fit space-y-10 sticky top-32 shadow-sm">
                      <h3 className="text-xl font-black tracking-tighter italic border-b border-slate-100 pb-6 uppercase text-slate-900">Order Package</h3>
                      
                      <div className="space-y-6">
                         {cart.map(item => (
                           <div key={item.id} className="flex gap-4">
                              <div className="relative w-14 h-14 bg-slate-50 rounded-xl p-0.5 shrink-0 overflow-hidden border border-slate-100 flex items-center justify-center">
                                 <VialImage 
                                    name={item.name} 
                                    mg={item.mg}
                                    image={item.image}
                                    className="w-full h-full object-cover rounded-lg"
                                 />
                              </div>
                              <div className="flex-1 min-w-0">
                                 <h4 className="text-sm font-bold text-slate-900 truncate">{item.name}</h4>
                                 <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{item.packSize} VIAL PACK ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ {item.quantity}</p>
                              </div>
                              <div className="font-black text-sm text-slate-900">${(item.price * item.quantity).toFixed(2)}</div>
                           </div>
                         ))}
                      </div>

                      <div className="pt-8 border-t border-slate-100 flex gap-2">
                        <input 
                          type="text" 
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          placeholder="Promo code (e.g. RESEARCH10)" 
                          className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:outline-none focus:border-blue-600 transition-colors uppercase"
                        />
                      </div>

                      <div className="space-y-4 pt-8">
                         <div className="flex justify-between text-slate-500 text-sm font-medium">
                            <span>Subtotal</span>
                            <span className="text-slate-900">${cartTotal.toFixed(2)}</span>
                         </div>
                         {discountAmount > 0 && (
                           <div className="flex justify-between text-blue-600 text-sm font-bold">
                              <span>Promo (RESEARCH10)</span>
                              <span>-${discountAmount.toFixed(2)}</span>
                           </div>
                         )}
                         <div className="flex justify-between text-slate-500 text-sm font-medium">
                            <span>Shipping</span>
                            <span className={cn("font-bold uppercase text-[10px]", shippingCost === 0 ? "text-green-600" : "text-slate-900 text-sm")}>
                              {shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}
                            </span>
                         </div>
                         <div className="flex justify-between text-slate-900 text-3xl font-black pt-6 border-t border-slate-100">
                            <span>TOTAL</span>
                            <span className="text-blue-600 italic">${finalTotal.toFixed(2)}</span>
                         </div>
                      </div>

                      <div className="pt-4 flex items-start gap-3">
                        <input
                          type="checkbox"
                          id="termsCheck"
                          checked={agreedToTerms}
                          onChange={(e) => setAgreedToTerms(e.target.checked)}
                          className="mt-1 w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600"
                        />
                        <div className="space-y-1">
                          <label htmlFor="termsCheck" className="text-xs text-slate-500 leading-tight block">
                            I am 18+ and agree to the <button onClick={(e) => { e.preventDefault(); setPage('terms'); }} className="text-blue-600 font-bold hover:underline">Terms & Conditions</button> ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ products are for <span className="text-slate-900 font-black uppercase tracking-widest">laboratory research use only</span>.
                          </label>
                          <p className="text-[10px] text-red-600 font-black tracking-widest uppercase">
                            I understand these products are NOT for human consumption.
                          </p>
                        </div>
                      </div>

                   </div>
                </div>
              </motion.div>
            )}
            {page === "terms" && (
              <motion.div key="terms" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                <TermsAndConditions />
              </motion.div>
            )}
            {page === "privacy" && (
              <motion.div key="privacy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                <PrivacyPolicy />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {/* Global Footer Compact */}
        <footer className="bg-slate-900 text-white border-t border-white/5 mx-0 mb-0 mt-0 p-12 lg:p-16 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[120px]" />
           <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
              {/* Col 1 */}
              <div className="space-y-6">
                 <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-xl shadow-blue-600/20">
                      <FlaskConical className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-2xl font-black tracking-tighter uppercase italic">ASCEND LABZ</span>
                 </div>
                 <p className="text-slate-400 max-w-xs leading-relaxed text-xs font-medium">
                   Most affordable research peptides online â Retatrutide, Tirzepatide, Semaglutide & Cagrilintide. In stock, ships within 48 hours. Best price guaranteed.
                 </p>
              </div>

              {/* Col 2 */}
              <div className="space-y-6">
                 <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">RESEARCH HUB</h4>
                 <ul className="grid gap-3 text-[10px] font-black uppercase text-slate-400">
                    <li className="hover:text-white cursor-pointer transition-colors flex items-center gap-2 group" onClick={() => setPage("home")}>
                       <ChevronRight className="w-2 h-2 text-blue-600 group-hover:translate-x-1 transition-transform" /> Home
                    </li>
                    <li className="hover:text-white cursor-pointer transition-colors flex items-center gap-2 group" onClick={() => setPage("shop")}>
                       <ChevronRight className="w-2 h-2 text-blue-600 group-hover:translate-x-1 transition-transform" /> Shop All
                    </li>
                    <li className="hover:text-white cursor-pointer transition-colors flex items-center gap-2 group" onClick={() => setPage("about")}>
                       <ChevronRight className="w-2 h-2 text-blue-600 group-hover:translate-x-1 transition-transform" /> About Us
                    </li>
                    <li className="hover:text-white cursor-pointer transition-colors flex items-center gap-2 group" onClick={() => setPage("coa")}>
                       <ChevronRight className="w-2 h-2 text-blue-600 group-hover:translate-x-1 transition-transform" /> COA / Lab Data
                    </li>
                    <li className="hover:text-white cursor-pointer transition-colors flex items-center gap-2 group" onClick={() => setPage("faq")}>
                       <ChevronRight className="w-2 h-2 text-blue-600 group-hover:translate-x-1 transition-transform" /> FAQ
                    </li>
                    <li className="hover:text-white cursor-pointer transition-colors flex items-center gap-2 group" onClick={() => setPage("contact")}>
                       <ChevronRight className="w-2 h-2 text-blue-600 group-hover:translate-x-1 transition-transform" /> Contact
                    </li>
                 </ul>
              </div>

              {/* Col 3 */}
              <div className="space-y-6">
                 <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">LAB CONTACT</h4>
                 <div className="space-y-4">
                    <a href="mailto:ascendlabz@gmail.com" target="_blank" rel="noopener noreferrer" className="block space-y-1 group">
                       <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Support</p>
                       <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-blue-600" />
                          <span className="text-sm font-bold group-hover:text-blue-400 transition-colors">ascendlabz@gmail.com</span>
                       </div>
                    </a>
                    <div className="space-y-1">
                       <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Response Time</p>
                       <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-blue-600" />
                          <span className="text-sm font-bold">Within 24 Hours</span>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Col 4 */}
              <div className="space-y-6">
                 <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">LEGAL</h4>
                 <ul className="grid gap-3 text-[10px] font-black uppercase text-slate-400">
                    <li className="hover:text-white cursor-pointer transition-colors" onClick={() => setPage("privacy")}>Privacy Policy</li>
                    <li className="hover:text-white cursor-pointer transition-colors" onClick={() => setPage("terms")}>Terms & Conditions</li>
                    <li className="hover:text-white cursor-pointer transition-colors" onClick={() => setPage("policies")}>Refund & Shipping Policy</li>
                 </ul>
                 <div className="pt-6 border-t border-white/5 space-y-4">
                    <p className="text-[9px] uppercase font-black tracking-widest text-red-500 leading-relaxed border-l border-red-500/30 pl-3">
                      ALL PRODUCTS ARE STRICTLY FOR LABORATORY RESEARCH PURPOSES ONLY. NOT FOR HUMAN CONSUMPTION. MUST BE 18+ TO PURCHASE.
                    </p>
                    <p className="text-[9px] text-slate-500 font-black">ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ© {new Date().getFullYear()} ASCEND LABZ.</p>
                 </div>
              </div>
           </div>
        </footer>
      </div>
    </PayPalScriptProvider>
  );
}
