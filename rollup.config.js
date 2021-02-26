/*
 * @Descripttion: 
 * @version: 
 * @Author: Guo Kainan
 * @Date: 2021-02-23 12:07:44
 * @LastEditors: Guo Kainan
 * @LastEditTime: 2021-02-26 19:10:53
 */
const path = require('path')
const fs = require('fs')

import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from "rollup-plugin-babel"
import { terser } from 'rollup-plugin-terser'
import livereload from 'rollup-plugin-livereload'
import vue from 'rollup-plugin-vue'
// 引入拓扑排序方法
import { Graph } from '@cmjs/algor-graph'

const IS_DEV = process.env.NODE_ENV !== 'production'

// 基础配置
const BASE = {
  input: 'src/index.js',
  plugins: [
    vue({
      css: true,
      compileTemplate: true
    }),
    resolve(),
    commonjs(),
    babel({
      // 防止打包node_modules下的文件
      exclude: 'node_modules/**',
      // 使plugin-transform-runtime生效
      runtimeHelpers: true
    }),
  ]
}

// 获取所有包的package.json
async function getPkgs () {
  const pkgFolderPath = path.join(__dirname, 'packages')
  const folders = await fs.promises.readdir(pkgFolderPath)
  // 循环读取每一个package.json
  let result = []
  for (let i = 0; i < folders.length; i++) {
    const folderName = folders[i]
    const pkgPath = path.join(pkgFolderPath, `${folderName}/package.json`)
    const pkgBuffer = await fs.promises.readFile(pkgPath)
    let pkgData = JSON.parse(pkgBuffer)
    pkgData.dir = path.join(pkgFolderPath, folderName)
    pkgData.dependencies = pkgData.dependencies ? Object.keys(pkgData.dependencies) : []
    result.push(pkgData)
  }
  return result
}

// 对所有包按照依赖关系进行拓扑排序
function sortPkgs (pkgs) {
  const graph = Graph.createByObjectList(pkgs, 'dependencies', 'name')
  return graph.toposort(true)
}

/**
 * 根据不同的打包类型，获取打包配置
 * @param {Object} pkg 每一个包的信息
 * @param {String} format 打包格式
 * @param {Boolean} isMin 是否压缩代码
 * @param {Boolean} createServer 是否启动热更新服务器
 * @return {Array} 该包的打包配置
 */
function getRollupConfig (pkg) {
  if (!pkg || typeof pkg !== 'object') { return }

  let result = []

  const { 
    name,
    version,
    dir,
    main,
    module,
    bundle,
    bundleExternal,
    dependencies
  } = pkg

  // 初始化基础配置
  function getBaseConfig () {
    let config = {
      input: path.join(dir, BASE.input),
      output: [],
      plugins: [...BASE.plugins]
    }
    // 开发环境下开启热更新
    if (IS_DEV) {
      config.plugins.push(livereload())
    }
    return config
  }

  // 顶部banner
  const banner = [
    `/*!`,
    ` * ${name} - v${version}`,
    ` *`,
    ` * ${name} is licensed under the MIT License.`,
    ` * http://www.opensource.org/licenses/mit-license`,
    ` */`,
  ].join('\n')

  // 开发环境开启sourcemap
  const sourcemap = IS_DEV

  // 获取external依赖项
  let external = dependencies

  // 初始化模块化配置，用于cjs和es环境，需要用到external排除外部依赖
  let moduleConfig = { ...getBaseConfig(), external }

  // cjs环境输出
  if (main) {
    moduleConfig.output.push({
      file: path.join(dir, main),
      format: 'cjs',
      banner, sourcemap
    })
  }
  // es环境输出
  if (module) {
    moduleConfig.output.push({
      file: path.join(dir, module),
      format: 'esm',
      banner, sourcemap
    })
  }
  // 模块打包尽量靠前，确保bundle打包时依赖不为空
  result.push(moduleConfig)

  // bundle非空时输出直接通过<script>标签全量引入浏览器的文件，只有合集包utils会如此输出
  if (bundle) {
    // 初始化bundle的output输出
    let bundleOutput = {
      file: path.join(dir, bundle),
      name: getNameSpace(name),
      format: 'iife',
      // 执行脚本的外部依赖文件，定义全局变量名称
      globals: bundleExternal ? bundleExternal : null,
      banner, sourcemap
    }

    // 直接执行的JS文件配置
    let bundleConfig = {
      ...getBaseConfig(),
      output: {
        ...bundleOutput
      },
      // 执行脚本的外部依赖文件
      external: bundleExternal ? Object.keys(bundleExternal) : null
    }

    // .min.js压缩文件
    const minFileName = bundleOutput.file.replace(/\.js$/, '.min.js')
    let bundleMinConfig = {
      ...getBaseConfig(),
      output: {
        ...bundleOutput,
        file: minFileName
      },
      external: bundleExternal ? Object.keys(bundleExternal) : null
    }
    bundleMinConfig.plugins.push(terser())

    // bundle打包尽量靠后
    result.push(bundleMinConfig, bundleConfig)
  }

  // console.log(results)
  return result
}

// 将包名转换为全局变量名，驼峰形式
function getNameSpace (name) {
  // 去最后一个/符号后面的字符串作为变量名
  const nameSplitArr = name.split('/')
  let tempName = nameSplitArr[nameSplitArr.length - 1]
  // 将所有非字母符号转换为下划线
  tempName = tempName.replace(/[^a-z]+/g, '_')
  // 每一段首字母大写，转为大驼峰
  let tempSplitArr = tempName.split('_')
  return tempSplitArr.map((item) => {
    if (item.length > 0) {
      return item.slice(0, 1).toUpperCase() + item.slice(1)
    }
    return ''
  }).join('')
}

// 打包操作的方法
async function main () {
  let results = []
  let pkgs = await getPkgs()
  pkgs = sortPkgs(pkgs)
  // console.log(pkgs)
  pkgs.forEach((pkg) => {
    results = results.concat(getRollupConfig(pkg))
  })
  return results
}

export default main()