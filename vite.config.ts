import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { Plugin as importToCDN } from 'vite-plugin-cdn-import'
const pathSrc = resolve(__dirname, 'src')
export default defineConfig({
  base: './',
  plugins: [vue(),
        // 配置 CDN
    importToCDN({
      modules: [
        {
          name: 'vue',
          var: 'Vue',
          path: 'https://cdn.jsdelivr.net/npm/vue@3.5.10/dist/vue.global.min.js'
        },
        {
          name: 'element-plus', // 依赖名称,
          var: 'ElementPlus', // 全局变量名
          path: 'https://cdn.jsdelivr.net/npm/element-plus@2.8.4/dist/index.full.min.js', // CDN 链接
          css: 'https://cdn.jsdelivr.net/npm/element-plus@2.8.4/dist/index.min.css' // 依赖有css就填，没有就去掉这个
        },
        {
          name: 'axios',
          var: 'axios',
          path: 'https://cdn.jsdelivr.net/npm/axios@1.7.7/dist/axios.min.js'
        },
        {
          name: 'echarts',
          var: 'echarts',
          path: 'https://cdn.jsdelivr.net/npm/echarts@5.5.1/dist/echarts.min.js'
        }
        
      ]
    }),
    {
      name: 'inline-js-css',
      apply: 'build', // 仅在构建阶段生效
      enforce: 'post', // 在其他插件之后执行
      generateBundle(outputOptions, bundle) {
        for (const fileName in bundle) {
          const asset = bundle[fileName]
          // 获取HTML文件
          const htmlFile = bundle['index.html']
          if (!htmlFile) return
          // 删除原始JS/CSS文件代码
          if (fileName.endsWith('.html')) {
            // console.log(asset)
            // 删除原始JS/CSS文件引入
            htmlFile.source = htmlFile.source.replace(
              /<script type="module".*<\/script>/g,
              ''
            )
            htmlFile.source = htmlFile.source.replace(
              /<link rel="stylesheet".*\.css">/g,
              ''
            )
          } else if (fileName.endsWith('.js')) {
            // 将JS内联到HTML文件中
            htmlFile.source += `\n<script>\n${asset.code}\n</script>\n`
            // 删除原始JS文件
            delete bundle[fileName]
          } else if (fileName.endsWith('.css')) {
            // 将CSS内联到HTML文件中
            htmlFile.source += `\n<style>\n${asset.source}\n</style>\n`
            // 删除原始CSS文件
            delete bundle[fileName]
          }
        }
      }
    }
  ],
  
})

