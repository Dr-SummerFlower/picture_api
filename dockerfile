 # 使用官方 Node.js 20 版本的镜像作为基础镜像
FROM node:20

# 设置工作目录,容器内所有后续命令都在这个目录中进行
WORKDIR /usr/src/app

# 将项目中的所有文件复制到工作目录中, 第一个"."表示当前目录, 第二个"."表示工作目录
COPY . .

# 安装项目依赖
RUN npm install --production

# 编译项目
RUN npm run build

# 暴露端口，容器内应用监听的端口
EXPOSE 25551

# 容器启动时执行的命令，npm run start:prod 表示执行 npm 脚本启动生产环境的服务
CMD [ "npm", "run", "start:prod" ]
