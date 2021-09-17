/**
* 创建日期: 2021-09-17
* 文件名称：vuex.js
* 创建作者：Potter
* 开发版本：1.0.0
* 相关说明：
*/

let Vue;

const install = (vm)=>{
    Vue = vm;
    //1.需要给每个组件都能访问$store
     Vue.mixin({
        beforeCreate() {
            console.log(this.$options.name);
            if(this.$options && this.$options.store){
                this.$store = this.$options.store;
            }else{
                this.$store = this.$parent && this.$parent.$store;
            }
            console.log(this.$store);
        }
    });
}

class Store {
    constructor(options){

        let state = options.state;
        this.state = {};
        
        Object.keys(state).forEach(key=>{
            let value = state[key];
            Object.defineProperty(this.state,key,{
                get(){
                    return value;
                },
                set(nv){
                    value = nv;
                }
            });
        });

        let getters = options.getters;
        this.getters = {};

        let mState = this.state;
        Object.keys(getters).forEach(key=>{
            let fn = getters[key];
            Object.defineProperty(this.getters,key,{
                get(){
                    return fn(mState);
                },
            });
        });
    }
}

export default {
    install,
    Store
}