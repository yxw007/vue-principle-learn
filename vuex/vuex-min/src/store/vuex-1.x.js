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

class ModuleCollection{
    constructor(options){
        this.register([],options);
    }

    register(path,rootModule){
        let newModule = {
            _raw:rootModule,
            _children:{},
            state:rootModule.state
        }
        if(path.length ===0){
            this.root = newModule;
        }else{
            let parent = path.slice(0,-1).reduce((root,current)=>{
                return root._children[current];
            },this.root);
            parent._children[path[path.length-1]] = newModule;
        }

        if(rootModule.modules){
            let keys = Object.keys(rootModule.modules);
            keys.forEach(key=>{
                let module = rootModule.modules[key];
                this.register(path.concat(key),module);
            });
        }
    }
}

function installModule(store,state,path,module){ 
    //将子模块state 挂在到父模块state上
    if(path.length > 0){
        let parent = path.slice(0,-1).reduce((pre,current)=>{
            return pre[current]
        },state);
        Vue.set(parent,path[path.length-1],module.state);
    }

    let getters = module._raw.getters;
    if(getters){
        Foreach(getters,(key,fn)=>{
            if(!store.getters.hasOwnProperty(key)){
                Object.defineProperty(store.getters,key,{
                    get(){
                        return fn(module.state);
                    }
                });
            }else{
                console.warn("mudule getters has exist same getter's name !");
            }
        });
    }

    let mutations = module._raw.mutations;
    if(mutations){
        Foreach(mutations,(key,fn)=>{
            if(!store.mutations[key]){
                store.mutations[key] = [];
            }
            let mutation = (params)=>{
                fn.call(store,module.state,params);
            };
            store.mutations[key].push(mutation);
        })
    }

    let actions = module._raw.actions;
    if(actions){
        Foreach(actions,(key,fn)=>{
            if(!store.actions[key]){
                store.actions[key] = [];
            }
            let action = (store,params)=>{
                fn.call(store,store,params);
            };
            store.actions[key].push(action);
        })
    }

    if(module._children){
        Foreach(module._children,(subModuleName,subModule)=>{
            installModule(store,state,path.concat(subModuleName),subModule);
        });
    }
}

class Store {
    constructor(options){
        this.vm = new Vue({
            data: {
                state:options.state
            }
        });
        this.getters = {};
        this.mutations = {};
        this.actions = {};

        //1. 格式化 数据结构
        this.mc = new ModuleCollection(options);

        //2. 递归遍历 所有getters、mutations、actions 全部挂在到store上
        installModule(this,this.state,[],this.mc.root);
        
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
        this.mutations[methodName].forEach(fn=>{
            fn(params);
        });
    }

    dispatch(methodName,params){
         this.actions[methodName].forEach(fn=>{
            fn(this,params)
         });
    }

    get state(){
        //0. 获取响应式数据  更多说明：取值也可使用this.vm.$data.state 因为：this.vm.state 与 this.vm.$data.state 为同一个对象
        return this.vm.state;
    }
}

export default {
    install,
    Store
}