'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// تحميل TradingView Widget بشكل ديناميكي لتجنب مشاكل SSR
const TradingViewWidget = dynamic(
  () => import('@/components/TradingViewWidget'),
  { ssr: false }
);

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [selectedSymbol, setSelectedSymbol] = useState('GOLD');

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/login');
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">جاري التحميل...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  // قائمة الأصول المتاحة
  const symbols = [
    { id: 'GOLD', name: 'الذهب', symbol: 'GOLD' },
    { id: 'XAUUSD', name: 'الذهب/دولار', symbol: 'XAUUSD' },
    { id: 'EURUSD', name: 'يورو/دولار', symbol: 'EURUSD' },
    { id: 'BTCUSD', name: 'بيتكوين', symbol: 'BTCUSD' },
    { id: 'AAPL', name: 'آبل', symbol: 'NASDAQ:AAPL' },
    { id: 'TSLA', name: 'تسلا', symbol: 'NASDAQ:TSLA' },
  ];

  return (
    <div className="min-h-[calc(100vh-72px)] bg-gray-950 p-4">
      <div className="container mx-auto">
        {/* رأس الصفحة مع اختيار الرمز */}
        <div className="bg-gray-900 rounded-lg p-4 mb-4 border border-gray-800">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white mb-2">
                تحليلاتي الفنية المباشرة
              </h1>
              <p className="text-gray-400 text-sm">
                شاهد التحليلات والمؤشرات الفنية المخصصة
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {symbols.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedSymbol(item.symbol)}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    selectedSymbol === item.symbol
                      ? 'bg-yellow-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* منطقة التنبيهات */}
        <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-4 mb-4">
          <div className="flex items-center gap-2 text-blue-400">
            <span className="text-xl">📊</span>
            <span className="font-semibold">تحليل اليوم:</span>
            <span className="text-blue-300">
              الذهب في منطقة دعم قوية - فرصة شراء محتملة عند 2020$
            </span>
          </div>
        </div>

        {/* شارت TradingView */}
        <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800" style={{ height: 'calc(100vh - 280px)' }}>
          <TradingViewWidget symbol={selectedSymbol} />
        </div>

        {/* معلومات إضافية */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
            <h3 className="text-yellow-500 font-semibold mb-2">🎯 الأهداف</h3>
            <ul className="text-gray-300 space-y-1 text-sm">
              <li>الهدف الأول: 2050$</li>
              <li>الهدف الثاني: 2080$</li>
              <li>الهدف الثالث: 2120$</li>
            </ul>
          </div>
          
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
            <h3 className="text-green-500 font-semibold mb-2">📈 نقاط الدخول</h3>
            <ul className="text-gray-300 space-y-1 text-sm">
              <li>دخول أول: 2020$</li>
              <li>دخول ثاني: 2000$</li>
              <li>دخول ثالث: 1980$</li>
            </ul>
          </div>
          
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
            <h3 className="text-red-500 font-semibold mb-2">🛑 إدارة المخاطر</h3>
            <ul className="text-gray-300 space-y-1 text-sm">
              <li>وقف الخسارة: 1960$</li>
              <li>نسبة المخاطرة: 2%</li>
              <li>Risk/Reward: 1:3</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}