import React, { useState, useEffect } from 'react';
import { Sun, Moon, ArrowRight, Package, X, Maximize2, MapPin, Phone, Globe, Instagram } from 'lucide-react';
import { Product } from './types';
import { products } from './data';

const DATA = products;

// ============================================================================
// 👇👇👇 آدرس لینک عکس لوگوی خود را در خط زیر داخل کوتیشن '' قرار دهید 👇👇👇
// مثال: const LOGO_URL = 'https://example.com/my-logo.png';
const LOGO_URL = 'https://cdn.imgurl.ir/uploads/g946978_logo_hekmat_ara_latin_copy.jpg'; 
// ============================================================================

// Custom Logo Component (Fallback if no image URL is provided)
const HekmatLogo = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 200 120" 
    className={className} 
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
  >
    {/* Stylized Pipe/Valve Background */}
    <path 
      d="M40 80 H20 V40 H40" 
      stroke="#fbbf24" 
      strokeWidth="8" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M160 80 H180 V40 H160" 
      stroke="#fbbf24" 
      strokeWidth="8" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M20 60 H180" 
      stroke="#fbbf24" 
      strokeWidth="4" 
      strokeDasharray="10 5"
    />
    
    {/* Main Drop/Triangle Shape */}
    <path 
      d="M100 20 L130 70 H70 L100 20Z" 
      stroke="#1e3a8a" 
      strokeWidth="8" 
      fill="white"
      className="dark:fill-slate-800"
    />
    
    {/* Valve Handwheel */}
    <rect x="90" y="15" width="20" height="6" rx="2" fill="#fbbf24" />
    <path d="M100 20 V35" stroke="#fbbf24" strokeWidth="4" />
    
    {/* Text simulation or decorative lines */}
    <path d="M70 90 Q100 110 130 90" stroke="#1e3a8a" strokeWidth="6" strokeLinecap="round" />
  </svg>
);

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Theme Handling
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="min-h-screen flex flex-col text-slate-900 dark:text-slate-100 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md shadow-md border-b border-slate-200 dark:border-slate-700 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2 md:gap-4">
            {/* Logo Section - Switches between Image and SVG based on LOGO_URL */}
            <div className="shrink-0 hover:scale-105 transition-transform duration-300">
              {LOGO_URL ? (
                <img 
                  src={LOGO_URL} 
                  alt="بازرگانی حکمت آرا" 
                  className="h-14 md:h-16 w-auto object-contain"
                  onError={(e) => {
                    // If the image fails to load, hide it so the SVG fallback can be shown (requires state logic, 
                    // but for simplicity we just hide this img and the user sees blank or we can keep it simple)
                    e.currentTarget.style.display = 'none';
                    // We can't easily switch to the SVG component here without state, 
                    // so please ensure the URL is correct.
                  }}
                />
              ) : (
                <HekmatLogo className="h-14 md:h-16 w-auto" />
              )}
            </div>
            
            <div className="flex flex-col">
              <h1 className="text-xl md:text-2xl font-bold text-hekmat-blue dark:text-hekmat-gold tracking-tight">
                بازرگانی حکمت آرا
              </h1>
              <span className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-medium hidden xs:block">
                تامین کننده انواع شیرآلات صنعتی و اتصالات
              </span>
            </div>
          </div>
          
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? <Moon size={24} className="text-slate-600" /> : <Sun size={24} className="text-yellow-400" />}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto w-full p-4 md:p-6">
        {selectedProduct ? (
          <DetailView product={selectedProduct} onBack={() => setSelectedProduct(null)} />
        ) : (
          <GridView onSelect={setSelectedProduct} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 mt-8 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Address & Phone */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-hekmat-blue dark:text-hekmat-gold mb-4 border-b border-slate-200 dark:border-slate-700 pb-2 w-fit">
                اطلاعات تماس
              </h3>
              
              <div className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                <MapPin className="w-5 h-5 mt-1 shrink-0 text-hekmat-blue dark:text-hekmat-gold" />
                <p className="leading-relaxed">
                  تهران، خیابان خیام شمالی، روبه‌روی پارک شهر، کوچه افخمی، پاساژ 110، طبقه همکف، پلاک 8
                </p>
              </div>

              <div className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                <Phone className="w-5 h-5 mt-1 shrink-0 text-hekmat-blue dark:text-hekmat-gold" />
                <p className="font-mono text-sm md:text-base dir-ltr text-right w-full">
                  09121882404 - 34917 - 33113333 - 33993333
                </p>
              </div>
            </div>

            {/* Social & Web */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-hekmat-blue dark:text-hekmat-gold mb-4 border-b border-slate-200 dark:border-slate-700 pb-2 w-fit">
                فضای مجازی
              </h3>

              <a 
                href="https://www.Hekmatara.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-slate-600 dark:text-slate-300 hover:text-hekmat-blue dark:hover:text-hekmat-gold transition-colors p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50"
              >
                <Globe className="w-5 h-5 shrink-0" />
                <span className="font-mono">www.Hekmatara.org</span>
              </a>

              <a 
                href="https://instagram.com/valve_hekmatara" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-slate-600 dark:text-slate-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50"
              >
                <Instagram className="w-5 h-5 shrink-0" />
                <span className="font-mono">@valve_hekmatara</span>
              </a>
            </div>
          </div>

          <div className="text-center pt-6 border-t border-slate-200 dark:border-slate-700 text-slate-400 text-sm">
            <p>© {new Date().getFullYear()} بازرگانی حکمت آرا. تمامی حقوق محفوظ است.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Sub-components

const GridView = ({ onSelect }: { onSelect: (p: Product) => void }) => {
  return (
    <div className="animate-fade-in-up">
      <div className="mb-6 text-center">
        <h2 className="text-lg text-slate-600 dark:text-slate-300">محصولات ما</h2>
        <div className="w-24 h-1 bg-hekmat-gold mx-auto mt-2 rounded-full"></div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {DATA.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item)}
            className="group relative flex flex-col items-center justify-center p-6 md:p-8 rounded-2xl bg-white dark:bg-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 border border-slate-200 dark:border-slate-700 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-hekmat-blue/5 dark:to-hekmat-gold/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="w-16 h-16 mb-4 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
               <Package className="w-8 h-8 text-hekmat-blue dark:text-hekmat-gold" />
            </div>
            <span className="text-lg font-bold text-center text-slate-800 dark:text-slate-100 group-hover:text-hekmat-blue dark:group-hover:text-hekmat-gold transition-colors">
              {item.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

const DetailView = ({ product, onBack }: { product: Product; onBack: () => void }) => {
  const [fullScreenImage, setFullScreenImage] = useState<string | null>(null);

  // Scroll to top when mounted
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Simple Image component with error handling fallback
  const ImageWithFallback = ({ src, alt, className }: { src: string, alt: string, className?: string }) => {
    const [error, setError] = useState(false);
    
    if (error) {
       return (
         <div className={`flex flex-col items-center justify-center bg-slate-200 dark:bg-slate-800 text-slate-400 ${className}`}>
           <Package size={48} />
           <span className="text-xs mt-2 px-4 text-center">تصویر یافت نشد</span>
         </div>
       )
    }

    return (
      <img 
        src={src} 
        alt={alt} 
        className={className}
        onError={() => setError(true)}
      />
    );
  };

  return (
    <div className="animate-fade-in-right">
      <button
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-hekmat-blue dark:text-hekmat-gold hover:opacity-80 transition-opacity font-medium px-4 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 w-fit"
      >
        <ArrowRight size={20} />
        <span>بازگشت به لیست محصولات</span>
      </button>

      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 shadow-xl border border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-slate-900 dark:text-white border-b pb-4 dark:border-slate-700">
          {product.title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {product.images.map((img, index) => (
            <div key={index} className="flex flex-col gap-2">
               <div 
                 className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 shadow-inner border border-slate-200 dark:border-slate-600 group cursor-pointer"
                 onClick={() => setFullScreenImage(img)}
               >
                  <ImageWithFallback 
                    src={img} 
                    alt={`${product.title} ${index + 1}`} 
                    className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Hover Overlay for Zoom Indication */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white">
                      <Maximize2 size={32} />
                    </div>
                  </div>
               </div>
               <div className="text-center text-lg font-medium text-slate-700 dark:text-slate-300 mt-2">
                 {product.id === 'gas' 
                   ? (index === 0 ? 'فولادی' : 'استیل')
                   : (index === 0 ? 'کلاس 150 و 300' : 'کلاس 800')
                 }
               </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full Screen Modal */}
      {fullScreenImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setFullScreenImage(null)}
        >
          <button 
            className="absolute top-4 left-4 z-[110] p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-sm"
            onClick={(e) => {
              e.stopPropagation();
              setFullScreenImage(null);
            }}
          >
            <X size={28} />
          </button>
          
          <img 
            src={fullScreenImage} 
            alt="Full screen view" 
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-scale-up"
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}
    </div>
  );
}