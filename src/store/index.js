import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

// 1.安装插件
Vue.use(Vuex)

const state = {cartList: []}

// 2.创建Store对象
const store = new Vuex.Store({
    // state: {// 通过文件导入 
    //     cartList: []
    // },
    state,
    mutations,
    actions,
    getters
    // mutations: {// 通过文件导入 

    //     
    //     // addCounter(state, payload){
    //     //     payload.count++
    //     // },
    //     // addToCart(state, payload) {
    //     //     state.cartList.push(payload)
    //     // }



    //     // mutations唯一的目的就是修改state中的状态
    //     // mutations中的每个方法尽可能完成的事件单一一点
    //     // 所以addCart完成了加一和添加两个操作，适合放到actions

    //     // addCart(state, payload) {

    //     //     // 第一种方式
    //     //     // let oldProduct = null;
    //     //     // for(let item of state.cartList){
    //     //     //     if(item.iid === payload.iid){
    //     //     //         oldProduct = item;
    //     //     //     }
    //     //     // }

    //     //     // if(oldProduct){
    //     //     //     oldProduct.count += 1
    //     //     // }else{
    //     //     //     payload.count = 1
    //     //     //     state.cartList.push(payload)
    //     //     // }

    //     //     // 第二种方式
    //     //     // let index = state.cartList.indexOf(payload)

    //     //     // if(index === -1){
    //     //     //     payload.count = 1
    //     //     //     state.cartList.push(payload)
    //     //     // }else{
    //     //     //     let oldProduct = state.cartList[index]
    //     //     //     oldProduct.count += 1
    //     //     // }

    //     //     // 第三种方式
    //     //     // let product = state.cartList.find(function (item) {
    //     //     //     return item.iid === payload.iid
    //     //     // })

    //     //     let product = state.cartList.find(item => item.iid === payload.iid)

    //     //     if(product){
    //     //         product.count += 1
    //     //     }else{
    //     //         payload.count = 1
    //     //         state.cartList.push(payload)
    //     //     }

    //     //     console.log(state.cartList)

            
    //     // }
    // },
    // actions: {// 通过文件导入 
    //     addCart(context, payload) {

    //         // 第一种方式
    //         // let oldProduct = null;
    //         // for(let item of state.cartList){
    //         //     if(item.iid === payload.iid){
    //         //         oldProduct = item;
    //         //     }
    //         // }

    //         // if(oldProduct){
    //         //     oldProduct.count += 1
    //         // }else{
    //         //     payload.count = 1
    //         //     state.cartList.push(payload)
    //         // }

    //         // 第二种方式
    //         // let index = state.cartList.indexOf(payload)

    //         // if(index === -1){
    //         //     payload.count = 1
    //         //     state.cartList.push(payload)
    //         // }else{
    //         //     let oldProduct = state.cartList[index]
    //         //     oldProduct.count += 1
    //         // }

    //         // 第三种方式
    //         // let product = state.cartList.find(function (item) {
    //         //     return item.iid === payload.iid
    //         // })

    //         let product = context.state.cartList.find(item => item.iid === payload.iid)

    //         if(product){
    //             // product.count += 1
    //             context.commit("addCounter", product)  //传入mutation,方便跟踪
    //         }else{
    //             payload.count = 1
    //             // context.state.cartList.push(payload)
    //             context.commit("addToCart", payload)  //传入mutation,方便跟踪

    //         }

    //         // console.log(context.state.cartList)

            
    //     }
    // }
})

// 3.挂载到Vue实例上
export default store