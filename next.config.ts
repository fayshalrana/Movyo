import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  cacheComponents: true,
  bundlePagesRouterDependencies: true,
  turbopack: {},
  experimental: {
    turbopackClientSideNestedAsyncChunking: false,
    inlineCss: true,
    optimizePackageImports: [
      "@tanstack/react-query",
      "lucide-react",
      "clsx",
      "tailwind-merge",
      "zustand",
      "react-hook-form",
      "axios",
    ],
    scrollRestoration: true,
    optimizeCss: true,
    cssChunking: false,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2678400,
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos", pathname: "/**" },
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  /**
   webpack(config, { isServer }) {
   if (!isServer) {
   config.optimization.splitChunks = {
   chunks: "all",
   maxInitialRequests: 25,
   minSize: 20000,
   cacheGroups: {
   vendors: {
   test: /[\\/]node_modules[\\/]/,
   name: "vendors",
   priority: -10,
   reuseExistingChunk: true,
   },
   default: {
   minChunks: 2,
   priority: -20,
   reuseExistingChunk: true,
   },
   },
   };
   }
   return config;
   },
   **/

  // Webpack optimizations - Aggressive consolidation to reduce script requests
  webpack: (config, { dev, isServer, webpack }) => {
    // In dev mode, use minimal webpack config to avoid module resolution issues
    if (dev) {
      // Keep default webpack config for dev mode - don't modify resolve or optimization
      return config;
    }

    // Target modern browsers to avoid unnecessary polyfills
    // Use ES2022 for modern browsers (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
    if (!isServer) {
      config.target = ["web", "es2022"];
      config.resolve.alias.buffer = false;
      // Disable automatic polyfill injection for modern browsers
      // Next.js will not include polyfills for ES2022 features
      if (config.resolve) {
        config.resolve.alias = {
          ...config.resolve.alias,
          // Prevent polyfill injection
        };
      }
    }

    // Production optimizations - Bundle all scripts into one
    if (!dev && !isServer) {
      // Modify entry to exclude polyfills for modern browsers
      if (config.entry && typeof config.entry === "object") {
        // Remove polyfill entries from webpack entry
        Object.keys(config.entry).forEach((key) => {
          if (Array.isArray(config.entry[key])) {
            config.entry[key] = config.entry[key].filter(
              (entry) => !entry.includes("polyfills"),
            );
          }
        });
      }

      // Ensure all output files are hashed for cache busting
      // Output ES2022 (modern JavaScript) to reduce legacy polyfills
      config.output = {
        ...config.output,
        filename: "static/chunks/[name].[contenthash:8].js",
        chunkFilename: "static/chunks/[name].[contenthash:8].js",
        assetModuleFilename: "static/media/[name].[contenthash:8][ext]",
        // Specify modern JavaScript features - no polyfills needed
        environment: {
          arrowFunction: true,
          const: true,
          destructuring: true,
          forOf: true,
          dynamicImport: true,
          module: true,
          bigIntLiteral: true,
          optionalChaining: true,
          // nullishCoalescing is not a valid property - removed
        },
      };

      config.optimization = {
        ...config.optimization,
        moduleIds: "deterministic",
        chunkIds: "deterministic",
        // Disable runtime chunk to bundle everything together
        runtimeChunk: false,
        // Disable code splitting - bundle everything into one script
        // Exclude polyfills chunk for modern browsers (saves ~110KB)
        // Disable code splitting - bundle everything into one script
        splitChunks: false,
        // Maximize optimization and tree shaking
        minimize: true,
        mangleExports: true,
        concatenateModules: true,
        // Force aggressive module merging
        mergeDuplicateChunks: true,
        removeAvailableModules: true,
        removeEmptyChunks: true,
        providedExports: true,
        usedExports: true,
        sideEffects: true,
        // Additional optimizations for smaller bundle
        realContentHash: true, // Use real content hash for better caching
        innerGraph: true, // Enable inner graph analysis for better tree shaking
        // Output modern JavaScript (ES2022) to reduce legacy polyfills (~13KB savings)
        minimizer: [...(config.optimization?.minimizer || [])],
      };
    }

    // Optimize module resolution for better tree shaking (production only)
    config.resolve = config.resolve || {};
    config.resolve.mainFields = ["module", "main"];
    config.resolve.extensions = [".mjs", ".js", ".jsx", ".ts", ".tsx", ".json"];

    // Alias to reduce bundle size - use lighter alternatives where possible
    config.resolve.alias = {
      ...config.resolve.alias,
      // Prefer ES modules for better tree shaking
    };

    // Reduce polyfills - exclude unnecessary Node.js polyfills
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      crypto: false,
      stream: false,
      url: false,
      zlib: false,
      http: false,
      https: false,
      assert: false,
      os: false,
      path: false,
    };

    // Ignore unnecessary modules to reduce bundle size
    if (!isServer && webpack) {
      config.plugins = config.plugins || [];
      // Ignore server-only modules in client bundle
      config.plugins.push(
        new webpack.IgnorePlugin({
          resourceRegExp: /^\.\/locale$/,
          contextRegExp: /moment$/,
        }),
      );

      // Limit chunk count to 1 to aggressively merge everything
      // Also exclude polyfills for modern browsers
      if (!dev) {
        config.plugins.push(
          new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1,
          }),
        );

        // // Completely ignore and replace polyfills for modern browsers
        // // Modern browsers (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+) support ES2022 natively
        try {
          // eslint-disable-next-line @typescript-eslint/no-require-imports
          const path = require("path");
          const stubPath = path.join(__dirname, "src", "lib", "polyfill-stub.js");

          // Replace polyfill imports with empty stub - catch all polyfill module paths
          // This handles the error: Cannot find module '../build/polyfills/polyfill-module'
          // Use function form to replace any polyfill module path
          config.plugins.push(
            new webpack.NormalModuleReplacementPlugin(
              /polyfill-module|polyfills(\.js)?$/,
              (resource: any) => {
                // Check if this is a polyfill module request
                if (
                  resource.request &&
                  (resource.request.includes("polyfill-module") ||
                    resource.request.includes("polyfills") ||
                    resource.request.includes("build/polyfills"))
                ) {
                  // Replace with our stub
                  resource.request = stubPath;
                }
              },
            ),
          );

          // Also use IgnorePlugin to prevent polyfill modules from being resolved
          config.plugins.push(
            new webpack.IgnorePlugin({
              resourceRegExp: /polyfill-module|build\/polyfills/,
            }),
          );
        } catch (e) {
          // If stub file doesn't exist, continue without it
          console.warn("Polyfill stub configuration failed:", e);
        }
      }
    }

    return config;
  },
  async redirects() {
    return [
      {
        source: "/get-started",
        destination: "/test-intake-form",
        permanent: false,
      },
    ];
  },
  async headers() {
    const securityHeaders = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "DENY" },
      { key: "Referrer-Policy", value: "origin-when-cross-origin" },
    ];

    const oneYearSeconds = 60 * 60 * 24 * 365;
    const expiresAt = new Date(Date.now() + oneYearSeconds * 1000).toUTCString();
    const longLivedAssetHeaders = [
      {
        key: "Cache-Control",
        value: `public, max-age=${oneYearSeconds}, immutable`,
      },
      { key: "Expires", value: expiresAt },
      { key: "Vary", value: "Accept-Encoding" },
    ];

    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        source: "/_next/static/:path*",
        headers: longLivedAssetHeaders,
      },
      {
        source: "/assets/:path*",
        headers: longLivedAssetHeaders,
      },
      {
        source:
          "/:path*\\.(svg|jpg|jpeg|png|webp|avif|gif|ico|css|js|woff|woff2|ttf|eot)",
        headers: longLivedAssetHeaders,
      },
      {
        source: "/",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
        ],
      },
    ];
  },
};

// eslint-disable-next-line @typescript-eslint/no-require-imports
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: false,
});

module.exports = withBundleAnalyzer(nextConfig);
