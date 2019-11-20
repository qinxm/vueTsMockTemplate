# 后台管理平台
包括登录，修改密码，用户查询，角色权限，字典管理等相关功能。

## 技术栈 
vue + elementUI + typescript

## 安装依赖包
```
npm install
```

### 本地运行脚本
```
npm run serve
```
### 测试环境部署
```
npm run test
```
### 线上部署脚本
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### 目录结构
config 和 configNew 按照实际情况保留一个即可
```
├── public            // 资源目录
│   └── lib           // 外链文件目录
├── src                // 主程序
│   ├── config          // 接口请求1--后端接口没有规定时使用，比如restful风格的接口，参数直接拼接在路径里
│   │   └── api         // 接口定义
│   │   └── service     // 服务定义
│   ├── configNew       // 接口请求2--后端接口规定时使用Post(参数放在body里)，Get(参数放在params)
│   │   └── api         // 接口定义
│   │   └── service     // 服务定义
│   ├── assets          // 项目中使用的图片资源
│   ├── components      // 组件
│   │   └── layout      // 布局组件
│   ├── filters         // 过滤器
│   ├── mixin           // 混合
│   ├── mock            // 模拟数据
│   ├── router          // 路由
│   ├── service         // 请求方法
│   ├── store           // vuex store
│   │   ├── index.ts    // vuex store 入口
│   │   └── modules     // 子模块
│   ├── styles          // 样式
│   ├── types           // 类型定义
│   ├── utils           // 工具方法
│   └── views           // views页面
│   ├── App.vue         // 视图入口
│   ├── main.ts         // 项目入口
├── .editorconfig       // 编辑器配置
├── .env                // 默认配置
├── .env.pre            // 预发环境配置
├── .env.production     // 生产环境配置
├── .env.staging        // 测试环境配置
├── .eslintignore       // 忽略语法检查
├── .eslintrc.js        // eslint配置文件
├── .gitignore          // git忽略特殊文件
├── babel.config.js     // babel默认配置
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.json       // typescript配置
└── vue.config.js       // vue-cli3打包配置
```
