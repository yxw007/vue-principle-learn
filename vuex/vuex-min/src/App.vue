<template>
  <div id="app">
    {{$store.getters.getAge}}
    <hello-world></hello-world>
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
    let self = this;
    setTimeout(()=>{
      self.$store.state.age = 10000;
    },1000);
  }
}
</script>

<style>
</style>
