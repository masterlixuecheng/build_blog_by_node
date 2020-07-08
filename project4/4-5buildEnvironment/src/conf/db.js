// const env = process.env.NODE_ENV // 环境参数  开发环境。。。
// const env = 'dev' // 环境参数  开发环境。。。

// 配置

const MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: '3306',
    database: 'myblog'
}
const REDIS_CONF = {
    host: '127.0.0.1',
    port: 6379,
}

// if (env === 'dev') {
//     MYSQL_CONF = {
//         host: '127.0.0.1',
//         user: 'root',
//         password: 'root',
//         port: '3306',
//         database: 'myblog'
//     }
// }

// if (env === 'production') {
//     MYSQL_CONF = {
//         host: 'localhost',
//         user: 'root',
//         password: 'root',
//         port: '3306',
//         database: 'myblog'
//     }

// }

module.exports = {
    MYSQL_CONF,
    REDIS_CONF
}