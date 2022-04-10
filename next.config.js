/* eslint-disable import/no-extraneous-dependencies */
const withImages = require('next-images')
const withPWA = require('next-pwa')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
})
const config = {
	pwa: {
		dest: 'public',
		disable: process.env.NODE_ENV === 'development',
	},
	webpack(config) {
		config.module.rules.push({
			test: /\.(png|jpeg|jpg|gif|svg)$/,
			use: {
				loader: 'url-loader',
				options: {
					limit: 100000,
				},
			},
		})
		return config
	},
}

module.exports = withPWA(withBundleAnalyzer(withImages(config)))
