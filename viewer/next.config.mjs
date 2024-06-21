/** @type {import('next').NextConfig} */
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { fileURLToPath } from 'url';
import path from 'path';


const isProd = process.env.NODE_ENV === 'production';

let internalHost = null;

if (!isProd) {
  const { internalIpV4 } = await import('internal-ip');
  internalHost = await internalIpV4();
}


const nextConfig = {
  // reactStrictMode: false,
  images: {
    unoptimized: true,
  },
  output: "export",
  assetPrefix: isProd ? null : `http://${internalHost}:3000`,
  webpack: (config,{ webpack }) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const rootDir = path.join(__dirname);
    console.log("rootDir",rootDir);
    // config.resolve.alias['react'] = path.join(rootDir, 'node_modules/react');
    // const tsLoader = {
    //   test: /\.ts(x?)$/,
    //   include: [path.join(rootDir, 'packages')],
    //   exclude: /node_modules/,
    //   use: ['ts-loader'],
    // };
    // config.module.rules.push(tsLoader);
    // const mapPlugin = new webpack.NormalModuleReplacementPlugin(
    //       // The pattern covers the package and its CSS
    //       // @react-pdf-viewer/core
    //       // @react-pdf-viewer/core/lib/styles/index.css
    //       /^@react-pdf-viewer\/[a-z-]+[\/lib\/styles]*[\/index.(css)]*$/,
    //       (resource) => {
    //           const request = resource.request;
    //           const pkgName = request.split('/')[1];

    //           switch (true) {
    //               case request.endsWith('.css'):
    //                   resource.request = path.join(rootDir, `packages/${pkgName}/src/styles/index.scss`);
    //                   break;

    //               default:
    //                   resource.request = path.join(rootDir, `packages/${pkgName}/src`);
    //                   break;
    //           }
    //       },
    // );
    config.externals.push({
        canvas: 'canvas',
    });
    // config.plugins.push(mapPlugin);
    config.plugins.push(
      new CopyWebpackPlugin({
          patterns: [
              {
                  from: path.join(rootDir, 'node_modules/pdfjs-dist/build/pdf.worker.min.js'),
                  to: path.join(__dirname, 'public'),
              },
          ],
      }),
    );
    return config;
  }
};

export default nextConfig;
