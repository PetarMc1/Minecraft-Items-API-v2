export default {
  async rewrites() {
    return [
      {
        source: '/v2/:path*',
        destination: '/api/:path*',
      },
    ];
  },
};
