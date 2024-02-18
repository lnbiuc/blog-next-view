## 预览

首页
![index](./doc/index.png)

Blog
![blog](./doc/blog.png)

Short
![short](./doc/short.png)

Project
![project](./doc/project.png)

Friend
![friend](./doc/friend.png)

About
![about](./doc/about.png)

Article
![article](./doc/article.png)

Admin
![admin](./doc/admin.png)

Editor
![editor](./doc/editor.png)

## 前言

> 我的上个网站使用的技术栈是 Vue + SpringBoot，使用了一年多的时间，后来由于 SPA 前端对于 SEO 的效果不是很好，于是我决定开发第二代。

> 相比于最初的版本，数据库使用了 MySQL，新项目，我想尝试不同的技术栈，于是便使用了 MongoDB，但是就开发上来说，两者并没有什么差别。前端则是在很早之前就决定使用 Nuxtjs。

> **为什么后期又改称了 Nuxt 全栈项目？**
>
> 主要是服务器成本问题，此次项目的部署方式是 Paas，所有服务均以容器化的形式部署在 Zeabur，一个按量计费的 Paas 平台，如果使用前后端分离的模式，需要部署 5 个容器，分别是：MongoDB，SpringBoot，Nuxt，ScreenShot（一个给网页截图的工具，具体可以看[这篇介绍](https://vio.vin/article/use-puppeteer)）,Redis（用了一段时间之后去掉了，Redis 主要用来做接口限流和数据缓存，由于数据缓存这块内容，没有使用任何框架，纯手动操作 Redis，导致有很多缓存和实际数据不同步的情况，又需要通过定时任务来同步数据，最主要的是，网站数据量不大，加不加缓存接口响应时间相差不大，所以后期去掉了 Redis）。按照每 GB 内存没分钟 0.00023 刀来计算，每个月超不多会产生 10 刀的服务器成本，于是便有了精简结构，改成 Nuxt 全栈项目的想法。

> 从开始改造到结束总共花了 5-6 天时间，其中接口方面几乎没遇到什么困难，唯一遇到的问题出在文件上传上，我对于 Node 环境下的文件操作不熟悉，起初文件以二进制的格式传到后端，之后需要调用 Cloudflare Works 上传到 Clouflare R2 存储桶，我一直不不知道为啥，上传之后的文件格式仍然是二进制，请求返回的内容是一堆数字。折麽了一天之后，改成使用 Amazon S3 的上传 API 上传，问题得以解决。

## 技术栈

主要：

-   Nuxt：主框架
-   MongoDB：数据存储
-   Cloudflare R2：图片存储
-   Giscus：评论系统
-   NuxtUI：UI 框架

其他

-   vditor：Makrdown 编辑器
-   Markdown-It：Markdown 文本转 HTML
-   Tocbot：文章目录生成
-   vue-use-fixed-header：网站 Header
-   pinia/nuxt：前端数据缓存
-   unocss：CSS 框架
-   async-validator：数据校验
-   nuxt-mongoose：数据库连接
-   nuxt-scheduler：定时任务
-   shikiji：代码高亮
-   @nuxtseo/module：SEO 优化
-   @nuxtjs/color-mode：主题切换

## 功能

除了你所能看到的页面之外，还有以下小功能：

-   全文搜索

![image](https://static.vio.vin/blog/2024/02/2183ab9bfce23f50dd39994b521a44f5ea408fcab6d5fe525b2124527a7ea58e.gif)

-   复制选中的文字

![image](https://static.vio.vin/blog/2024/02/ac7f1ae9cb91cbc854b3fd1f546a77a6aab9b81125b052129314a7d95075d97e.gif)

-   集成管理功能

![image](https://static.vio.vin/blog/2024/02/778bcda66ce1cd8fc5353f664ad7db688fa5ccaaeea0e8f83480531ca26e4133.gif)

-   生成友链网站截图

![image](https://static.vio.vin/blog/2024/02/795217bb78e0e06735174c020e0ad71c84c57184980c963c1de4ae0690fdc633.gif)

-   所见即所得的在线编辑器

![image](https://static.vio.vin/blog/2024/02/d413820eee0bb39b9df6732629ce9e757e84097658d6d8ad67a8ac8ffb2896c0.png)

## 本地运行

-   你需要 Fork 这个仓库的**zeabur-mongo**分支

```
https://github.com/lnbiuc/blog-next-view
```

-   clone 你 Fork 的仓库
-   添加环境变量

复制一份`.env`文件，重命名为`.env.local`

```
# 数据库连接URI
MONGODB_URI=${MY_MONGODB_URI}
# 图片浏览地址，最后不要加/
IMAGE_PREVIEW_URI=${IMAGE_PREVIEW_URI}
# 网页截图地址，最后不要加/
SCREEN_URL=${SCREEN_URL}

# Cloudflare文件上传地址
R2_UPLOAD_ENDPOINT=${R2_UPLOAD_ENDPOINT}
# ACCESS_ID
AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
# SECRET_KEY
AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}
# 存储桶名称
R2_BUCKET_NAME=${R2_BUCKET_NAME}

```

-   安装依赖运行

```shell
pnpm i
pnpm dev
```

## 如何部署

-   在 Zeabur 创建 Project
-   创建数据库实例

![image](https://static.vio.vin/blog/2024/02/0b25696f98d61cefa0788a772080235ae1d37fb284ac667562501176e93f18eb.png)

![image](https://static.vio.vin/blog/2024/02/4cdf4cbefbf6a99ebdeb580379384da535c3e5e2e9ed97720cbd9a644909b841.png)

-   新建服务，使用 Git 仓库，选择刚才 Fork 的仓库
-   设置环境变量

![image](https://static.vio.vin/blog/2024/02/5fe2a384723b41a53a165f836cf986df877758ed0e1f277321ffff0ba3ce2abf.png)

-   设置域名

![image](https://static.vio.vin/blog/2024/02/4406c7cd4c0afaab718ce5fae741ca06d7cbf1f04616679b17fdd668ee6e67a1.png)

-   CDN

设置回源地址到你上一步设置的域名即可，推荐设置缓存时间为 2 小时

## Changlog

-   2024-02-18：
    -   登陆生成 token，数据库更新校验 token
    -   更新依赖

## 其他问题请评论
