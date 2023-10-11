<template>
    <div>
        <div>
             <film-siper class="cyclepic">
                <film-swiper-item>1111</film-swiper-item>
                <film-swiper-item>2222</film-swiper-item>
                <film-swiper-item>3333</film-swiper-item>
        </film-siper>
        </div>
        <film-header class="sticky"></film-header>
        <router-view></router-view>
        <!-- <ui>
            <li v-for="item in datalist" :key="item" @click="handlepush">{{item.nm}}</li>
        </ui> -->
    </div>
</template>

<script>
// import axios from 'axios'
import filmswiper from '../components/films/FilmSwiper.vue'
import filmswiperitem from '../components/films/FilmSwiperItem.vue'
import filmHeader from '@/components/films/FilmHeader.vue'
export default {
  data () {
    return {
      datalist: []
    }
  },
  methods: {
    handlepush () {
    //   location.href = '#/detail'
      this.$router.push('/detadil')
    }
  },
  components: {
    filmSiper: filmswiper,
    filmSwiperItem: filmswiperitem,
    filmHeader
  }
} 
</script>

<style>
  .cyclepic{
    width: 100%;
    height: 200px;
    background: red;
  }
  .sticky {
    position: sticky;
    top: 0px;
    z-index: 100;
    background: white;
  }
</style>