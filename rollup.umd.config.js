// 将CommonJS模块转换为ES6
import commonjs from '@rollup/plugin-commonjs'
// 在node_模块中查找并绑定第三方依赖项
import nodeResolve from '@rollup/plugin-node-resolve'
// 开发服务器
import serve from 'rollup-plugin-serve'
// 热更新服务
import livereload from 'rollup-plugin-livereload'

import esbuild from 'rollup-plugin-esbuild'
import typescript from '@rollup/plugin-typescript';

import RemoveGlobalNamePlugin from "./build/RemoveGlobalNamePlugin";


function isProd(){
  return process.env.NODE_ENV === 'production';
}

export default {
  input: 'src/index.ts',
  output: [
    {
      file: './dist/index.js',
      format: 'umd',
      sourcemap: true,
      name: 'AMap',
      plugins: [RemoveGlobalNamePlugin()],
      globals: {
      }
      //当入口文件有export时，'umd'格式必须指定name
      //这样，在通过<script>标签引入时，才能通过name访问到export的内容。
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
    }),
    // 热更新
    !isProd() && livereload({
      watch: ['dist', 'test'],
      verbose: false
    }),
    // 开发模式开启静态服务器
    !isProd() && serve({
      open: true,
      contentBase: ['dist', 'test'],
      openPage: '/index.html'
    })
  ]
}
