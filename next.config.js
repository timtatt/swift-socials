/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
	async redirects() {
		return [
			{
				source: '/',
				destination: '/templates',
				permanent: true,
			},
		]
	},
}

module.exports = nextConfig
