'use client';

import { useState, useEffect } from 'react';

// مكون لعرض TradingView Ideas المنشورة (بدون مكتبات خارجية)
export default function TradingViewIdea({ 
  ideaId = null,
  username = null,
  symbol = null 
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    // محاكاة التحميل
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [ideaId]);

  // طريقة 1: عرض Idea محددة بواسطة ID
  if (ideaId) {
    return (
      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-10">
            <div className="text-white">جاري تحميل التحليل...</div>
          </div>
        )}
        <iframe
          src={`https://www.tradingview.com/embed/${ideaId}/?locale=ar`}
          width="100%"
          height="600"
          frameBorder="0"
          allowTransparency="true"
          scrolling="no"
          onLoad={() => setIsLoading(false)}
          className="rounded-lg"
        />
      </div>
    );
  }

  // طريقة 2: عرض آخر Ideas من مستخدم معين
  if (username) {
    return (
      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-10">
            <div className="text-white">جاري تحميل التحليلات...</div>
          </div>
        )}
        <iframe
          src={`https://www.tradingview.com/embed/user-ideas-stream/?username=${username}&locale=ar`}
          width="100%"
          height="600"
          frameBorder="0"
          allowTransparency="true"
          scrolling="no"
          onLoad={() => setIsLoading(false)}
          className="rounded-lg"
        />
      </div>
    );
  }

  // طريقة 3: عرض Ideas لرمز معين
  if (symbol) {
    return (
      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-10">
            <div className="text-white">جاري تحميل تحليلات {symbol}...</div>
          </div>
        )}
        <iframe
          src={`https://www.tradingview.com/embed/symbol-ideas-stream/?symbol=${symbol}&locale=ar`}
          width="100%"
          height="600"
          frameBorder="0"
          allowTransparency="true"
          scrolling="no"
          onLoad={() => setIsLoading(false)}
          className="rounded-lg"
        />
      </div>
    );
  }

  return (
    <div className="text-center text-gray-400 p-8">
      <p>لا توجد معلومات كافية لعرض التحليل</p>
    </div>
  );
}

// مثال على الاستخدام:
/*

// لعرض Idea محددة:
<TradingViewIdea ideaId="YOUR_IDEA_ID" />

// لعرض آخر تحليلات من حسابك:
<TradingViewIdea username="YOUR_TRADINGVIEW_USERNAME" />

// لعرض تحليلات للذهب:
<TradingViewIdea symbol="GOLD" />

// كيفية الحصول على Idea ID:
// 1. انشر تحليلك كـ Idea على TradingView
// 2. افتح التحليل المنشور
// 3. الرابط سيكون مثل: https://www.tradingview.com/chart/GOLD/ABC123XYZ-title/
// 4. الـ ID هو: ABC123XYZ

*/