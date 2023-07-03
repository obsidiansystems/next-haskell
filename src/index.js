module.exports = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      if (!options.defaultLoaders) {
        throw new Error(
          'This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade'
        );
      }

      const { dir, dev, isServer } = options;

      config.module.rules.push({
        test: /\.(cabal)$/,
        use: [
          {
            loader: 'haskell-loader',
            options: { dev, isServer },
          },
        ],
      });

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      } else {
        return config;
      }
    },
  })
}
