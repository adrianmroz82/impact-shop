/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["fakestoreapi.com"],
  },
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/category",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
