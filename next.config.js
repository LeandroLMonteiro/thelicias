/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      POSTGRES_HOST: process.env.POSTGRES_HOST,
      POSTGRES_USER: process.env.POSTGRES_USER,
      POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
      POSTGRES_DATABASE: process.env.POSTGRES_DATABASE,
      DATABASE_PORT: process.env.DATABASE_PORT
    },
    webpack: (config) => {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false
      };
      return config;
    }
  };

  module.exports = nextConfig;