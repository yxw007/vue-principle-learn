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

function Foreach(obj,callback){
    Object.keys(obj).forEach(key=>{
        callback(key,obj[key]);
    });
}

class Store {
    constructor(options){
        this.vm = new Vue({
            data: {
                state:options.state
            }
        });
        this.state = this.vm.state;
        let getters = options.getters;
        this.getters = {};
        Foreach(getters,(key,fn)=>{
            Object.defineProperty(this.getters,key,{
                get:()=>{
                    return fn(this.state);
                },
            });
        });
        
        let mutations = options.mutations;
        this.mutations = {};
        Foreach(mutations,(methodName,fn)=>{
            this.mutations[methodName] = (params)=>{
                fn.call(this,this.state,params);
            }
        });
        
        let actions = options.actions;
        this.actions = {};
        Foreach(actions,(methodName,fn)=>{
            this.actions[methodName] = (store,params)=>{
                fn.call(this,store,params);
            }
        });
        
        //说明：先解构对象原型方法，再重新创建实例方法(实例方法将覆盖原型方法)
        let {commit,dispatch} = this;
        this.commit = (methodName,params)=>{
            commit.call(this,methodName,params);
        }
        this.dispatch = (methodName,params)=>{
            dispatch.call(this,methodName,params);
        }
    }

    commit(methodName,params){
        this.mutations[methodName](params);
    }

    dispatch(methodName,params){
         this.actions[methodName](this,params);
    }
}

export default {
    install,
    Store
}