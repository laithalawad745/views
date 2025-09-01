'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function HomePage() {
  const { data: session } = useSession();

  return (
    <div className="min-h-[calc(100vh-72px)] bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            منصة التحليل الفني المتقدمة
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            احصل على تحليلات احترافية للأسواق المالية مع مؤشرات فنية متقدمة وتوصيات دقيقة
          </p>
          
          <div className="flex gap-4 justify-center">
            {session ? (
              <Link
                href="/dashboard"
                className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition transform hover:scale-105"
              >
                الذهاب للتحليلات 📊
              </Link>
            ) : (
              <Link
                href="/login"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition transform hover:scale-105"
              >
                ابدأ الآن - مجاناً
              </Link>
            )}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-yellow-600 transition">
            <div className="text-4xl mb-4">📈</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              تحليلات مباشرة
            </h3>
            <p className="text-gray-400">
              شارتات TradingView مباشرة مع التحليلات والمؤشرات المخصصة
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-yellow-600 transition">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              توصيات دقيقة
            </h3>
            <p className="text-gray-400">
              نقاط دخول وخروج محددة مع أهداف واضحة ووقف خسارة
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-yellow-600 transition">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              آمن ومجاني
            </h3>
            <p className="text-gray-400">
              تسجيل دخول آمن عبر Google بدون أي رسوم
            </p>
          </div>
        </div>

        {/* Markets Section */}
        <div className="bg-gray-900 rounded-xl p-8 border border-gray-800">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            الأسواق المتاحة للتحليل
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {[
              { icon: '🥇', name: 'الذهب' },
              { icon: '🥈', name: 'الفضة' },
              { icon: '💱', name: 'العملات' },
              { icon: '₿', name: 'العملات الرقمية' },
              { icon: '📊', name: 'الأسهم' },
              { icon: '🛢️', name: 'النفط' },
            ].map((market, index) => (
              <div
                key={index}
                className="bg-gray-800 p-4 rounded-lg text-center hover:bg-gray-700 transition"
              >
                <div className="text-3xl mb-2">{market.icon}</div>
                <div className="text-white font-medium">{market.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        {!session && (
          <div className="text-center mt-16 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-xl p-8 border border-blue-800">
            <h2 className="text-3xl font-bold text-white mb-4">
              جاهز للبدء؟
            </h2>
            <p className="text-gray-300 mb-6">
              انضم الآن واحصل على وصول كامل لجميع التحليلات
            </p>
            <Link
              href="/login"
              className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition transform hover:scale-105"
            >
              سجل مجاناً الآن
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}