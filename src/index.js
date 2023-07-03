module.exports = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      if (!options.defaultLoaders) {
        throw new Error(
          'This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade'
        );
      }

      const { dir, defaultLoaders, dev, isServer } = options;

      config.module.rules.push({
        test: /\.(cabal)$/,
        include: [dir],
        exclude: /dist-newstyle/,
        use: [
          {
            loader: 'haskell-loader',
            options: { dev: false, isServer },
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
