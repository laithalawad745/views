'use client';

import { useEffect, useRef, useState } from 'react';

export default function TradingViewWidget({ 
  symbol = "GOLD",
  chartId = null,  // معرف الشارت المحفوظ
  useSharedChart = false  // استخدام شارت مشترك
}) {
  const container = useRef();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    
    // تنظيف الحاوية
    if (container.current) {
      container.current.innerHTML = '';
    }

    // إذا كان هناك شارت مشترك، استخدم iframe
    if (useSharedChart && chartId) {
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.tradingview.com/chart/${chartId}/?symbol=${symbol}`;
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.style.border = 'none';
      iframe.onload = () => setIsLoading(false);
      
      if (container.current) {
        container.current.appendChild(iframe);
      }
      
      return () => {
        if (container.current) {
          container.current.innerHTML = '';
        }
      };
    }

    // Widget TradingView المجاني
    const widgetContainer = document.createElement('div');
    widgetContainer.className = 'tradingview-widget-container__widget';
    widgetContainer.style.height = 'calc(100% - 32px)';
    widgetContainer.style.width = '100%';
    
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      "autosize": true,
      "symbol": symbol,
      "interval": "D",
      "timezone": "Asia/Riyadh",
      "theme": "dark",
      "style": "1",
      "locale": "ar_AE",
      "enable_publishing": false,
      "allow_symbol_change": false,
      "save_image": false,
      "calendar": false,
      "hide_side_toolbar": false,
      "studies": [
        "STD;EMA",
        "STD;MACD", 
        "STD;RSI",
        "STD;Stochastic"
      ],
      "container_id": "tradingview_advanced_chart"
    });

    script.onload = () => setIsLoading(false);
    
    if (container.current) {
      widgetContainer.id = 'tradingview_advanced_chart';
      container.current.appendChild(widgetContainer);
      container.current.appendChild(script);
      
      // إضافة copyright
      const copyright = document.createElement('div');
      copyright.className = 'tradingview-widget-copyright';
      copyright.innerHTML = '<a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank"><span class="blue-text">Track all markets on TradingView</span></a>';
      container.current.appendChild(copyright);
    }

    return () => {
      if (container.current) {
        container.current.innerHTML = '';
      }
    };
  }, [symbol, chartId, useSharedChart]);

  return (
    <div className="relative h-full w-full">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-10">
          <div className="text-white">جاري تحميل الشارت...</div>
        </div>
      )}
      <div 
        ref={container} 
        className="tradingview-widget-container" 
        style={{ height: "100%", width: "100%" }}
      />
    </div>
  );
}