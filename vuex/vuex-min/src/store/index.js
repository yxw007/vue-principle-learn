import Vue from 'vue'
// import Vuex from 'vuex'

//说明：vuex-0.x为最初级版本（支持：state、getters、mutations、actions）
// import Vuex from './vuex-0.x'

//说明：vuex-1.x为vue-0.x版本基础上，新增：支持模块嵌套、模块数据隔离等
import Vuex from './vuex-1.x'
Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    age:10,
    count:0,
  },
  getters:{
    getParentAge: (state)=>state.age + 20,
    getModuleName:(state)=>"Module Root"
  },
  mutations:{
    increaseAge(state,params){
      state.age +=params;
    },
    decreaseAge(state,params){
      state.age -=params;
    },
    increaseCount(state,params){
      state.count +=params;
    },
    decreaseCount(state,params){
      state.count -=params;
    },
    sayHello(state,params){
      console.log("Root Module : say Hello");
    }
  },
  actions:{
    asychrIncreaseAge({commit},params){
      setTimeout(()=>{
        commit("increaseAge",params);
      },2000);
    },
    asychrDecreaseAge({commit},params){
      setTimeout(()=>{
        commit("decreaseAge",params);
      },1000);
    },
    asychrDecreaseCount({commit},params){
      setTimeout(()=>{
        commit("decreaseCount",params);
      },1000);
    },
    asychrIncreaseCount({commit,dispatch},params){
      commit("increaseCount",100);
      dispatch("asychrDecreaseCount",params);
    }
  },
  modules:{
    a:{
      state:{
        x:'xxxx'
      },
      getters:{
        getModuleName:(state)=>"Module A",
        getSubModuleAName:(state)=>"Sub Module A"
      },
      mutations:{
        sayHello(state,params){
          console.log("A Module : say Hello");
        }
      }
    }
  }
});
