module.exports = function (api) {
	api.cache(true);
	return {
		presets: ["babel-preset-expo"],
		plugins: [
			"react-native-reanimated/plugin",
			[
				"module:react-native-dotenv",
				{
					envName: "APP_ENV",
					moduleName: "@env",
					path: ".env",
					blocklist: null,
					allowlist: null,
					blacklist: null, // DEPRECATED
					whitelist: null, // DEPRECATED
					safe: false,
					allowUndefined: false,
					verbose: false,
				},
			],
		], // 👈 MUST be last
	};
};
