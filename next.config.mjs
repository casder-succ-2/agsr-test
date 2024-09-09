/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	swcMinify: true,
    webpack: (config, { webpack }) => {
		config.plugins.push(new webpack.NormalModuleReplacementPlugin(
			/^node:/, 
			(resource) => { 
				resource.request = resource.request.replace(/^node:/, ''); 
			}
		))
		
		return {
			module: {
				rules: [
					{
					    test: /\.svg$/i,
						use: ['@svgr/webpack'],
					},
				],
			},
			...config,  
		};
	}
}

export default nextConfig
