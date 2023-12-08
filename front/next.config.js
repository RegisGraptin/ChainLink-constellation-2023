/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: config => {
    config.resolve.fallback = { fs: false, net: false, tls: false, child_process: false };
    // config.node = {
    //   fs: 'empty',
    //   : 'empty',
    //   net: 'empty',
    //   dns: 'empty',
    //   tls: 'empty',
    // };
    return config;
  },
};

module.exports = nextConfig;

