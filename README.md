## 项目简介

&emsp;&emsp;vue-backend 是一个后端权限管理系统，它基于 vue 和 element-ui 实现。

&emsp;&emsp;项目采用了 [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin) 的动态路由方案。

&emsp;&emsp;本项目分为用户管理、角色管理、菜单管理三大模块，同一个用户可以拥有多个角色，不同的角色拥有不同的权限，权限可以进行动态分配。

- 用户管理：具有导入/导出 Excel、增删改查用户操作、更改角色等功能（不仅角色看到的用户列表不同）
- 角色管理：增删改查角色、为角色分配权限等功能
- 菜单管理：修改菜单的图标、名称、权限标识等功能

&emsp;&emsp;其他一些小的功能不做介绍。

## Mock.js

&emsp;&emsp;项目的 API 接口全部为 mock 生成，采用的是 [mock-server 方案](https://panjiachen.gitee.io/vue-element-admin-site/zh/guide/essentials/mock-api.html#%E6%96%B0%E6%96%B9%E6%A1%88)。

&emsp;&emsp;如何在项目中引入 mock-server，具体使用可以参考我文章： [mockjs 与项目开发/mock-server](https://note-taking.cn/notes-library/frontend/computer_Basics/2%E3%80%81%E5%89%8D%E5%90%8E%E7%AB%AF%E5%88%86%E7%A6%BB/mockjs%E4%B8%8E%E9%A1%B9%E7%9B%AE%E5%BC%80%E5%8F%91.html#%E4%BA%8C%E3%80%81mock-server%E2%9C%A8)

&emsp;&emsp;项目中默认集成了 5 中角色：

```sh
# super-admin 超级管理员
账号：11111111@qq.com
密码：随便写

# root 普通管理员（可以进行菜单管理：模管）
账号：22222222@qq.com
密码：随便写

# oj-admin oj管理员（负责oj相关模块）
账号：33333333@qq.com
密码：随便写

# teacher 教师用户（负责教学相关模块）
账号：44444444@qq.com
密码：随便写

# user 普通用户
账号：随便写
密码：随便写
```

## 项目使用

- 安装 npm 包

> 个人使用的 node.js 版本为 v16

```sh
npm install
```

- 启动项目

```sh
npm run dev
```

## 项目部分展示

[![pPUyWs1.png](https://s1.ax1x.com/2023/08/27/pPUyWs1.png)](https://imgse.com/i/pPUyWs1)

[![pPUyIIO.png](https://s1.ax1x.com/2023/08/27/pPUyIIO.png)](https://imgse.com/i/pPUyIIO)

[![pPUyTiD.png](https://s1.ax1x.com/2023/08/27/pPUyTiD.png)](https://imgse.com/i/pPUyTiD)

[![pPUyHRH.png](https://s1.ax1x.com/2023/08/27/pPUyHRH.png)](https://imgse.com/i/pPUyHRH)
