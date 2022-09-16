// 将CommonJS模块转换为ES6
import commonjs from '@rollup/plugin-commonjs'
// 在node_模块中查找并绑定第三方依赖项
import nodeResolve from '@rollup/plugin-node-resolve'

import esbuild from 'rollup-plugin-esbuild'
import typescript from '@rollup/plugin-typescript';


function isProd(){
  return process.env.NODE_ENV === 'production';
}

export default {
  external: [/^html2canvas/],
  input: 'src/index.ts',
  output: [
    {
      file: './dist/index-es.js',
      format: 'es',
      sourcemap: true
    },
    {
      file: './dist/index-cjs.js',
      format: 'cjs',
      sourcemap: true
    }
  ],
  // 监听的文件
  watch: {
    exclude: 'node_modules/**'
  },
  // 不参与打包
  plugins: [
    typescript({
      tsconfig: 'tsconfig.json'
    }),
    nodeResolve({
      extensions: ['.mjs', '.js', '.json', '.ts'],
    }),
    commonjs(),
    esbuild({
      // All options are optional
      include: /\.[jt]sx?$/, // default, inferred from `loaders` option
      exclude: /node_modules/, // default
      sourceMap: true, // default
      minify: isProd(),
      target: 'es2017', // default, or 'es20XX', 'esnext'
      jsx: 'transform', // default, or 'preserve'
      // Like @rollup/plugin-replace
      tsconfig: 'tsconfig.json', // default
      // Add extra loaders
      loaders: {
        // Add .json files support
        // require @rollup/plugin-commonjs
        '.json': 'json',
      },
    })
  ]
}
