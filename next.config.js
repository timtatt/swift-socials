/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
	experimental: {
		appDir: true,
		serverComponentsExternalPackages: ['mongoose']
	},
	webpack(config) {
		config.experiments = { ...config.experiments, topLevelAwait: true };
		return config;
	},
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
