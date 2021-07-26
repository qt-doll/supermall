import {
    ADD_COUNTER,
    ADD_TO_CART
} from './mutations-types'

export default {
    addCart(context, payload) {

        // 第一种方式
        // let oldProduct = null;
        // for(let item of state.cartList){
        //     if(item.iid === payload.iid){
        //         oldProduct = item;
        //     }
        // }

        // if(oldProduct){
        //     oldProduct.count += 1
        // }else{
        //     payload.count = 1
        //     state.cartList.push(payload)
        // }

        // 第二种方式
        // let index = state.cartList.indexOf(payload)

        // if(index === -1){
        //     payload.count = 1
        //     state.cartList.push(payload)
        // }else{
        //     let oldProduct = state.cartList[index]
        //     oldProduct.count += 1
        // }

        // 第三种方式
        // let product = state.cartList.find(function (item) {
        //     return item.iid === payload.iid
        // })

        // PS:actions可以返回一个Promise，即对执行结果的告知，根据结果执行下一步操作
        return new Promise((resolve, reject) => {

            let product = context.state.cartList.find(item => item.iid === payload.iid)

            if(product){
                // product.count += 1
                context.commit(ADD_COUNTER, product)  //传入mutation,方便跟踪
                resolve("当前商品数量+1")
            }else{
                payload.count = 1
                // context.state.cartList.push(payload)
                context.commit(ADD_TO_CART, payload)  //传入mutation,方便跟踪
                resolve("已加入购物车")

            }

        })

        
    }
}