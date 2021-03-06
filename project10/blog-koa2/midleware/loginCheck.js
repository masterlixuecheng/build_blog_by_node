
// 这算是自己写的一个登陆验证的中间件。暂时不用
const { ErrorModel } = require('../model/resModel')

module.exports = async (ctx, next) => {
    if (ctx.session.username) {
        await next()
        return
    }
    ctx.body = new ErrorModel('未登录')
}

// 引入 errorModel 
// 判断req.session.username 是否存在，
// 存在就 next() 继续向下寻找函数执行
// 不存在 直接 res.json(errorModel)