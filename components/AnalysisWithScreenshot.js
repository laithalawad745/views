'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

const TradingViewWidget = dynamic(
  () => import('@/components/TradingViewWidget'),
  { ssr: false }
);

// مكون بديل يعرض صورة التحليل مع الشارت الحي (بدون مكتبات خارجية)
export default function AnalysisWithScreenshot({ 
  symbol = "GOLD",
  analysisImage = null,  // رابط صورة التحليل
  title = "تحليل الذهب"
}) {
  const [showLiveChart, setShowLiveChart] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
      {/* شريط التبديل */}
      <div className="bg-gray-800 p-3 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <h3 className="text-white font-semibold">{title}</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setShowLiveChart(false)}
              className={`px-3 py-1 rounded text-sm transition ${
                !showLiveChart 
                  ? 'bg-yellow-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              📊 التحليل الفني
            </button>
            <button
              onClick={() => setShowLiveChart(true)}
              className={`px-3 py-1 rounded text-sm transition ${
                showLiveChart 
                  ? 'bg-yellow-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              📈 الشارت المباشر
            </button>
          </div>
        </div>
      </div>

      {/* منطقة العرض */}
      <div style={{ height: '600px' }}>
        {!showLiveChart ? (
          // عرض صورة التحليل
          <div className="relative h-full">
            {analysisImage && !imageError ? (
              <>
                <img 
                  src={analysisImage}
                  alt={title}
                  className="w-full h-full object-contain bg-gray-950"
                  onError={() => setImageError(true)}
                />
                <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded text-sm">
                  💡 انقر على "الشارت المباشر" لمشاهدة الأسعار الحية
                </div>
              </>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <p className="text-xl mb-2">📊</p>
                  <p>لا توجد صورة للتحليل</p>
                  <p className="text-sm mt-2">قم برفع صورة التحليل أو استخدم الشارت المباشر</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          // عرض الشارت المباشر
          <TradingViewWidget symbol={symbol} />
        )}
      </div>
    </div>
  );
}

// مثال على الاستخدام:
/*
// في صفحة Dashboard:

import AnalysisWithScreenshot from '@/components/AnalysisWithScreenshot';

// في حالة استخدام صور من TradingView:
// 1. خذ screenshot من تحليلك
// 2. ارفعه على خدمة استضافة صور (imgur, cloudinary, etc)
// 3. استخدم الرابط

<AnalysisWithScreenshot 
  symbol="GOLD"
  title="تحليل الذهب - نموذج مثلث صاعد"
  analysisImage="/images/gold-analysis-2024.png"
/>

// يمكن أيضاً استخدام TradingView Snapshot API:
// https://www.tradingview.com/chart-snapshot/

*/