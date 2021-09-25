<template>
  <div class="hello">
    <br>
    <span @click="increaseAge">increaseAge</span>
    <span @click="decreaseAge">decreaseAge</span>
    <span @click="asychrIncreaseAge">asychrIncreaseAge</span>
    <span @click="asychrDecreaseAge">asychrDecreaseAge</span>
    <br>
     My Age: {{$store.state.age}}
    <br>
    <br>
    <span @click="asychrAddCount">asychrAddCount</span>
    <br>
    Count: {{$store.state.count}}
    <br>
    <br>
    <span @click="callMultiSameMutation">Call Root and Sub 's Same mutation</span>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  mounted(){
  },
  methods:{
    increaseAge(){
      this.$store.commit('increaseAge',1);
    },
    decreaseAge(){
       this.$store.commit('decreaseAge',1);
    },
    asychrIncreaseAge(){
      this.$store.dispatch('asychrIncreaseAge',10);
    },
    asychrDecreaseAge(){
      this.$store.dispatch('asychrDecreaseAge',100);
    },
    asychrAddCount(){
      this.$store.dispatch('asychrIncreaseCount',1000);
    },
    callMultiSameMutation(){
      this.$store.commit("sayHello");
    }
  }
}
</script>

<style scoped>
span{
  border: 1px solid #00ff00;
  margin: 20px 20px 20px 0;
}
</style>
