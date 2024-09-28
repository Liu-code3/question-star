// 使用递归深拷贝
// 在这里封装了一个方法，使其可以实现多层数组或对象的深拷贝
export function deepMerge<T>(params: T): T {
    // 如果是数组
    if (Array.isArray(params)) {
        const res: any[] = []
        for (let i = 0; i < params.length; i++) {
            if (params[i] instanceof Object) {
                // 将深层拷贝的结果添加到 res 中
                res.push(deepMerge(params[i]))
            } else {
                res.push(params[i])
            }
        }
        return res as T
    }
    // 如果是对象 进行 对象的拷贝
    if (params && params.constructor === Object) {
        const resObj: Record<string, any> = {} // 声明空对象
        for (const key in params) {
            if (Object.prototype.hasOwnProperty.call(params, key)) {
                // 如果你是数组或者对象；需要再次拷贝
                if (params[key] instanceof Object) {
                    // 将深层拷贝的结果添加到 resObj 中
                    resObj[key] = deepMerge(params[key])
                } else {
                    // params[key] 为基本类型数据 直接添加到 resObj 中
                    resObj[key] = params[key]
                }
            }
        }
        return resObj as T
    }
    // 返回参数本身（如果不是对象或数组）
    return params
}
