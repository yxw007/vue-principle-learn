<template>
  <div id="app">
    My Father Age: {{$store.getters.getParentAge}}
    <hello-world></hello-world>
    <br>
    getModuleName： {{$store.getters.getModuleName}}
    <br>
    getSubModuleAName: {{$store.getters.getSubModuleAName}}
    <br>
    {{$store.state.a.x}}
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  mounted(){
    console.log("mounted");
    let self = this;
    setTimeout(()=>{
      self.$store.state.age = 10000;
    },1000);
  }
}
</script>

<style>
</style>
