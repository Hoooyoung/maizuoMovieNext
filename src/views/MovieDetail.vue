<template>
    <div v-if="filmInfo">
       <detail-header v-scroll="100">{{filmInfo.name}}</detail-header>
        <div class="poster" :style="{backgroundImage:'url('+filmInfo.poster+')'}"></div>
        <div class="content">
          <div class="title">
            <span class="name">{{filmInfo.name}}</span>
            <span class="item">{{filmInfo.item.name}}</span>
          </div>
          <div>
            <div class="detailtext">{{filmInfo.category | spaceFilter}}</div>
            <div class="detailtext">{{filmInfo.premiereAt | timeFilter}}上映</div>
            <div class="detailtext">{{filmInfo.nation}} | {{filmInfo.runtime}}分钟</div>
            <div class="detailtext synopsisro" :class="isHidden?'hidden':''">{{filmInfo.synopsis}}</div>
            <div class="arrow" @click="isHidden=!isHidden" :class="isHidden?'iconfont icon-xiala':'iconfont icon-shouqi'"></div>
          </div>
        </div>
        <div class="actors">
            <div>演职人员</div>
            <detail-swiper class="actor-swiper" name="actorpic" configPerview="4">
              <detail-swiper-item v-for="item in filmInfo.actors" :key="item.role">
                <!-- <img :src="item.avatarAddress" alt=""> -->
                <div class="actorPhoto" :style="{backgroundImage:'url('+item.avatarAddress+')'}"></div>
                <div class="actor-name" style="text-align:center;font-size:12px;padding-top:10px;padding-bottom:3px;">{{item.name}}</div>
                <div style="text-align:center;color:#797d82;font-size:12px;">{{item.role}}</div>
              </detail-swiper-item>
            </detail-swiper>
        </div>
        <div class="actors">
            <div>
              <span>剧照</span>
              <span class="allPic">全部({{filmInfo.photos.length}}) &gt;</span>
            </div>
            <detail-swiper class="actor-swiper" name="photos" configPerview="2.5">
              <detail-swiper-item v-for="(item,index) in filmInfo.photos" :key="index">
                <!-- <img :src="item.avatarAddress" alt=""> -->
                <div class="actorPhoto" :style="{backgroundImage:'url('+item+')'}" @click="handleBigPhoto(index)"></div>
                <div class="actor-name" style="text-align:center;font-size:12px;padding-top:10px;padding-bottom:3px;">{{item.name}}</div>
                <div style="text-align:center;color:#797d82;font-size:12px;">{{item.role}}</div>
              </detail-swiper-item>
            </detail-swiper>
        </div>
         
    </div>
</template>

<script>
// import axios from 'axios'
import http from '@/util/http.js'
import Vue from 'vue'
import moment from 'moment'
import '../assets/font_arrow/iconfont.css'
import detailSwiper from '@/components/detail/DetailSwiper.vue'
import detailSwiperItem from '../components/detail/DetailSwiperItem.vue'
import detailHeader from '../components/detail/DetailHeader.vue'
import { ImagePreview } from 'vant'
import mixobj from '@/util/mixinTool'

Vue.filter('spaceFilter', (str) => {
  return str.replaceAll('|', ' | ')
})

Vue.filter('timeFilter', (str) => {
  return moment(str * 1000).format('YYYY-MM-DD')
})

Vue.directive('scroll', {
  
  inserted (el, binding) {
    console.log(el)
    el.style.display = 'none'
    window.onscroll = () => {
      if ((document.documentElement.scrollTop || document.body.scrollTop) > binding.value) {
        el.style.display = 'block'
      } else {
        el.style.display = 'none'
      }
    }
  },
  unbind () {
    window.onscroll = null
  }
})
export default {
  mixins: [mixobj],
  data () {
    return {
      filmInfo: null,
      isHidden: true,
      moviePicNum: 0
    }
  },
  mounted () {
    console.log(this.$route.params.myid)
    // axios({
    //   url: `https://m.maizuo.com/gateway?filmId=${this.$route.params.myid}&k=8920131'`,
    //   headers: {
    //     'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"16934613236293973924577281","bc":"310100"}',
    //     'X-Host': 'mall.film-ticket.film.info'
    //   }
    // }).then(res => {
    //   console.log(res.data)
    // })
    http({
      url: `gateway?filmId=${this.$route.params.myid}&k=8920131`,
      headers: {
        'X-Host': 'mall.film-ticket.film.info'
      }
    }).then(res => {
      console.log(res.data)
      this.filmInfo = res.data.data.film
    })
  },
  components: {
    detailSwiper,
    detailSwiperItem,
    detailHeader
  },
  methods: {
    handleBigPhoto (index) {
      ImagePreview({
        images: this.filmInfo.photos,
        startPosition: index,
        closeable: true
      })
    }
  }
}
</script>
// https://m.maizuo.com/gateway?filmId=6529&k=8920131   加k 为了防止走本地缓存
<style lang="scss" scoped>
  body {
    background: #f4f4f4;
  }
  .poster {
    width: 100%;
    height: 230px;
    background-position: center;
    background-size: cover;
  }
  .content {
    padding: 15px;
    .title {
      span {
        vertical-align: middle;
      }
      .name {
        margin-right: 5px;
      }
      .item {
      color: #fff;
      background: #d2d6dc;
      padding: 0 3px;
      border-radius: 2px;
      font-size: 12px;
      display: inline-block;
      height: 14px;
      line-height: 14px;
      }
    }
    .detailtext {
      font-size: 13px;
      color: #797d82;
      margin-top: 4px;
    }
    .synopsisro {
      padding-top: 4px;
    }
    .arrow {
      text-align: center;
      color: #797d82;
    }
    .hidden {
      overflow: hidden;
      height: 38px;
    }
    
  }
  .actors {
    overflow: hidden;
    span {
      // display: inline-block;
      line-height: 32px;
    }
    .allPic {
      float: right;
      color: #797d82;
      font-size: 13px;      
    }
    .actor-swiper {
      padding: 0 15px;
      .actorPhoto {
        width: 100%;
        height: 85px;
        background-position: center;
        background-size: cover;
      }
      .actor-name {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }
    
  }
  .actors>div:first-child {
    border-top: 10px solid #f4f4f4;
    padding: 15px;
  }
</style>