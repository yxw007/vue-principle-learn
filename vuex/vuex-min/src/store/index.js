import Vue from 'vue'
// import Vuex from 'vuex'
import Vuex from './vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    age:10,
    count:0,
  },
  getters:{
    getParentAge: (state)=>state.age + 20,
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
  }
});
