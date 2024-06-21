/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
      return [
        {
          source: '/login',
          destination: '/todo',
          permanent: true,  // Define se o redirecionamento é permanente (HTTP 301) ou temporário (HTTP 302)
        },
      ];
    },
  };
  
  export default nextConfig;
  