# 使用 Node.js 官方基础镜像
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json /app/
COPY package-lock.json /app/

# 安装 pnpm
RUN npm install -g pnpm

# 安装项目依赖
RUN pnpm install

# 复制项目文件
ADD . /app

# 运行构建命令
RUN pnpm run build

# 安装 pm2
RUN npm install -g pm2

# 暴露应用端口
EXPOSE 3000

# 设置环境变量
ENV AWS_ACCESS_KEY_ID=
ENV AWS_SECRET_ACCESS_KEY=
ENV IMAGE_PREVIEW_URI=
ENV JWT_SECRET_KEY=
ENV MY_MONGODB_URI=
ENV ORAMA_API_KEY=
ENV ORAMA_API_URL=
ENV UMAMI_ADDRESS=
ENV UMAMI_AUTH_TOKEN=
ENV UMAMI_WEBSITE_ID=
ENV MINIO_ENDPOINT=
ENV MINIO_ACCESS_KEY=
ENV MINIO_SECRET_KEY=
ENV MINIO_BUCKET_NAME=

# 启动命令
CMD ["pm2-runtime", "dist/index.js"]
