<div style="text-align: center;">
    <h1>nestJS-Picture_API</h1>
    <a href="https://nestjs.com/" style="display: inline-block; margin: 0 5px;"><img src="https://img.shields.io/badge/NestJS-10.0.0-ea2845" alt="NestJS Version"></a>
    <a href="https://sequelize.org/" style="display: inline-block; margin: 0 5px;"><img src="https://img.shields.io/badge/Sequelize-6.37.1-02afef" alt="Sequelize Version"></a>
    <a href="https://github.com/mapbox/node-sqlite3" style="display: inline-block; margin: 0 5px;"><img src="https://img.shields.io/badge/SQLite3-5.1.7-044a64" alt="SQLite3 Version"></a>
    <a href="https://www.typescriptlang.org/" style="display: inline-block; margin: 0 5px;"><img src="https://img.shields.io/badge/TypeScript-5.1.3-337ab7" alt="TypeScript Version"></a>
</div>

## 说明

- 本项目使用 nestJS 构建
- 使用到的技术：nestJS + sqlite + sequelize + jwt
- 本项目中的图片均来自网络，如有侵权请联系我删除，如果你想使用自己的图片，请自行导入/替换数据库
- 本项目用来学习nestJS的开发方式，如有不正确的地方，欢迎提出issue

## 运行

- 安装依赖
- 运行`npm install`安装依赖
- 运行`npm run start:dev`启动项目

<p><span style="color: red">！</span>请注意，因为本项目依赖sqlite，在windows环境下请自行安装VS、python以及node-gyp，否则会出现安装失败</p>

## 接口说明

### 随机图片

- #### 用户模块

    ###### 注册

    > POST /user

    Body:
    ```json
    {
        "name": "admin",
        "email": "admin@qq.com",
        "password": "123456",
        "role": "admin"
    }
    ```
    - 参数解释：
        - name: 用户名
        - email: 邮箱
        - password: 密码
        - role: 用户角色（admin、user、guest）
    - 返回值：`创建成功`

    ###### 登录

    > POST /user/login

    Body:
    ```json
    {
        "email": "admin@qq.com",
        "password": "123456"
    }
    ```

    - 参数解释：
      - email: 邮箱
      - password: 密码
    - 返回值：`{"access_token": "******"}`

    ###### 获取所有用户

    > GET /user

    Header:

    | key | value |
    | --- | --- |
    | Authorization | Bearer {access_token} |

    - 返回值：`[{******},{******},{******}]`

    ###### 获取单个用户

    > GET /user/:id

    Header:

    | key | value |
    | --- | --- |
    | Authorization | Bearer {access_token} |

    - 返回值：`{******}`

    ###### 其他遵循restful api的接口请自行探索

    `********`

- #### 图片模块

    > GET /image

    返回数据：

    **type：Buffer**

    ![本地图片](./demo.jpg)

    ### 指定图片

    > GET /image/:id

    返回数据：

    **type：Buffer**

    ![本地图片](./demo.jpg)
