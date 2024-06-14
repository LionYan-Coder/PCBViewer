/** @type {import('next').NextConfig} */
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  output: "export",
  webpack: (config) => {
    const rootDir = path.join(__dirname);
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
