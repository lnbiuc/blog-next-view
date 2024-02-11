# 使用Node.js作为基础镜像
ARG NODE_VERSION=18.14.2

FROM node:${NODE_VERSION}-slim as base

ADD .output /.output

EXPOSE 3000

WORKDIR /.output

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

CMD ["node", "/.output/server/index.mjs"]
