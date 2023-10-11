<template>
  <footer>
    <ul>
      <!-- 默认是router-link-active，可以通过 active-class自定义名字  tag可以指定为任何标签（tag在vue-router4.0版本中不可用）-->
      <!-- <router-link v-for="item in modoullist" :key="item.name" :to="item.path" tag="li">{{item.name}}</router-link> -->
      <router-link
        v-for="item in modoullist"
        :key="item.name"
        :to="item.path"
        custom
        v-slot="{ navigate, isActive }"
      >
        <li @click="navigate" :class="isActive ? 'router-link-active' : ''">
          <i :class="item.img"></i>
          <span>{{ item.name }}</span>
        </li>
      </router-link>
    </ul>
  </footer>
</template>

<script>
import '../assets/font_movie/iconfont.css'
export default {
  data () {
    return {
      myname: '你好啊',
      datalist: [],
      mytext: '',
      isshow: true,
      modoullist: [
        {
          name: '电影',
          path: '/films',
          img: 'iconfont icon-canyin'
        },
        {
          name: '影院',
          path: '/cinema',
          img: 'iconfont icon-jingdian'
        },
        {
          name: '我的',
          path: '/center',
          img: 'iconfont icon-geren'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
footer {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 49px;
  width: 100%;
  background: wheat;
  ul {
    display: flex;
    list-style: none;
    li {
      flex: 1;
      // line-height: 25px;
      text-align: center;
      display: flex;
      flex-direction: column;
      i.iconfont {
        height: 30px;
        font-size: 22px;
      }
      span {
        font-size: 13px;
        height: 19px;
      }
    }
  }
}
.router-link-active {
  color: orange;
}
</style>