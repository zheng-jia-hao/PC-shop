module.exports = {
	lintOnSave: "warning",
	devServer: {
		proxy: {
			"/api": {
				target: "http://39.98.123.211",
				changeOrigin: true,
			},
		},
	},
}
