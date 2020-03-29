# meri-design：
- 基于vue的ui库，github地址 `ssh://git@101.254.183.198:5522/xiongshuang/meri-design.git`

## config
- 开发预览 `webpack.config.js`
- 开发预览文档 `webpack.dev.config.js`
- 文档打包 `webpack.prod.config.js`
- 所有组件打包 `webpack.components.config.js`
- 单组件打包 `webpack.single.config.js`


## 安装
- `npm install -S meri-design`

## 全局引入
```
    import Pui from 'meri-design';
    import 'meri-design/dist/index.css'；
    
    Vue.use(Pui);
```
- 安装依赖包   `npm i -D babel-plugin-component`
- 在 .babelrc中的plugins里添加
```json
    [
          "component",
          {
            "libraryName": "meri-design",
            "camel2Dash": false,
            "libDir": "dist",
            "style": false
          }
    ]
```

## 按需引入
- 引入组件 `import { Button } from 'meri-design''`
- 安装依赖包   `npm i -D babel-plugin-component`
- 在 .babelrc中的plugins里添加
```json
    [
          "component",
          {
            "libraryName": "meri-design",
            "camel2Dash": false,
            "libDir": "dist",
            "styleLibrary": { "name": "theme", "base": true }
          }
    ]
```

## 启动说明
- npm run dev ` 启动开发预览 `
- npm run prod ` 打包成静态 `
- npm run components ` 打包所有组件 `
- npm run single ` 打包单个组件 `
- npm run styleguide ` 启动开发文档预览 `
- npm run styleguide:build ` 打包文档 `
    
