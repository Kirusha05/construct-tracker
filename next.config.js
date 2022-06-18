/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  pwa: {
    dest: "public",
    runtimeCaching,
  },
  i18n: {
    locales: ["ro"],
    defaultLocale: "ro",
  },
};

module.exports = nextConfig;
// module.exports = withPWA(nextConfig);
