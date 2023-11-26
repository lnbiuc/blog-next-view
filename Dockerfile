# 使用Node.js作为基础镜像
FROM node:16

# 设置工作目录
WORKDIR /app

# 将项目文件复制到工作目录
COPY . .

# 安装依赖
RUN npm install

# 构建项目
RUN npm run build

# 删除不需要的文件
RUN rm -rf node_modules
RUN rm -rf src

# 暴露Nuxt应用程序的端口
EXPOSE 3000

# 运行Nuxt应用程序
CMD [ "npm", "start" ]
