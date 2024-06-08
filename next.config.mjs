/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	swcMinify: true,
	webpack: {
		module: {
			rules: [
				{
					test: /\.svg$/,
					use: ['@svgr/webpack']
				}
			]
		}
	}
}

export default nextConfig
