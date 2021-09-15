/**
* 创建日期: 2021-09-15
* 文件名称：01-create-module-tree.js
* 创建作者：Potter
* 开发版本：1.0.0
* 相关说明：
*/

const store = {
    state:{
        root:0,
    },
    modules:{
        a:{
            state:{a:1},
            modules:{
                c:{
                    state:{c:10},
                    modules:{
                        d:{
                            state:{
                                d:100
                            }
                        }
                    }
                }
            }
        },
        b:{
            state:{
                b:2
            }
        }
    }
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

const mc = new ModuleCollection(store);
console.log(JSON.stringify(mc));