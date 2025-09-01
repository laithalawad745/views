/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'lh3.googleusercontent.com', // صور Google Profile
      's3.tradingview.com',        // TradingView assets
    ],
  },
  // دعم اللغة العربية
  i18n: {
    locales: ['ar', 'en'],
    defaultLocale: 'ar',
  },
};

module.exports = nextConfig;