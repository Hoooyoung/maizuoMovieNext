<template>
  <div>
    <!-- 路由容器router-view -->
    <router-view></router-view>
    <tabbar v-show="$store.state.isShowTab"></tabbar>
    <!-- <input type="text" v-model="mytext">
    <button @click="handleAdd">Add</button>
    <ul>
      <li v-for="data in datalist" :key="data">
        {{data}}
      </li>
    </ul>

    <ggg @event="handleclick"></ggg>
    <slidebar v-show="isshow"></slidebar> -->
  </div>
</template>

<script>
// @ 别名 指向src的绝对路径 ，configWebpack
import navbar from './components/Navbar.vue'
import slidebar from './components/Slidebar.vue'
import tabbar from '@/components/Tabbar.vue'
import Vue from 'vue'
import Vant from 'vant'
import 'vant/lib/index.css'
// import Tabbar from './components/Tabbar.vue'
// import Vue from 'vue'
Vue.use(Vant)
// Vue.component('navbar', navbar) //全局组件
export default {
  methods: {
    handleAdd () {
      this.datalist.push(this.mytext)
    },
    handleclick () {
      this.isshow = !this.isshow
    }
  },
  components: {
    // ggg: navbar, // 局部注册方案
    // slidebar,
    tabbar
  }
}
</script>
 
<style>
/* scoped 防止父组件影响到子组件 用法如下*/
 /* <style scoped> */
  * {
    margin: 0;
    padding: 0;
    
  }
  html, body {
    height: 100%;
    width: 100%;
  }
  ul {
    list-style: none;
  }
  
</style>
