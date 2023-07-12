module.exports = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      if (!options.defaultLoaders) {
        throw new Error(
          'This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade'
        );
      }

      const { dir, dev, isServer } = options;

      //TODO: We need this because all.js includes conditional `require`
      //commands for these modules; even though it does not use them in
      //practice, webpack wants to find them statically.  Instead, we should
      //deal with this in haskell-loader, e.g. by asking GHCJS not to produce
      //these `require` invocations.
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        child_process: false
      };
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
