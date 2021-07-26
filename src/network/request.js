import axios from 'axios'

export function request(config){

        // 1.创建对应的axios的实例
        const instance = axios.create({
            baseURL: 'http://123.207.32.32:8000',
            timeout: 5000
        })

        // 2.axios的拦截器
        // axios.interceptors: 全局拦截
        // 2.1请求拦截
        instance.interceptors.request.use(config => {  // config是自己命名的
            return config   // PS:必须返回
        }, err => {
            // console.log(err)
        })

        // 2.2响应拦截
        instance.interceptors.response.use(res => {
            // console.log(res)
            return res.data   // PS:必须返回,同时对返回的数据过滤
        }, err => {
            // console.log(err)
        })

        // 发送真正的网络请求
        return instance(config)

}

