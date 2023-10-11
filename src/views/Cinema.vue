<template>

  <div>
    <van-nav-bar title="影院" ref="navbar" @click-left="handleLeft" @click-right="handleRight">
      <template #left>
        {{$store.state.cityName}}
        <van-icon name="arrow-down" size="12" color="#191A1B"/>
      </template>
      <template #right>
        <van-icon name="search" size="22" color="#191A1B"/>
      </template>
    </van-nav-bar>
    <div class="box" :style="{height:height}">
        <ul>
            <li v-for="item in $store.state.cinemaList" :key="item.cinemaId">
                <div class="left">
                    <div>{{item.name}}</div>
                    <div class="config-text">{{item.address}}</div>
                </div>
                <div class="right">
                    <span>¥</span>
                    <span style="font-size:15px;">{{item.lowPrice/100}}</span>
                    <span>起</span>
                </div>
            </li>
        </ul>
    </div>
  </div>
  
</template>

<script>
import http from '@/util/http.js'
import BetterScroll from 'better-scroll'

export default {
  mounted () {
    // 也可以通过ref实现
    this.height = document.documentElement.clientHeight - this.$refs.navbar.$el.offsetHeight - document.querySelector('footer').offsetHeight + 'px'
    // http({
    //   url: `gateway?cityId=${this.$store.state.cityId}&ticketFlag=1&k=371055`,
    //   headers: {
    //     'X-Host': 'mall.film-ticket.cinema.list'
    //   }
    // }).then(res => {
    //   console.log(res.data.data)
    //   this.datalist = res.data.data.cinemas
      
    //   this.$nextTick(() => {
    //     new BetterScroll('.box', {
    //       scrollbar: {
    //         fade: false
    //       }
    //     })
    //   })
    // })
    if (this.$store.state.cinemaList.length === 0) {
      this.$store.dispatch('getCinemaData').then(res => {
        new BetterScroll('.box', {
          scrollbar: {
            fade: false
          }
        })
      })
    } else {
      this.$nextTick(() => {
        new BetterScroll('.box', {
          scrollbar: {
            fade: false
          }
        })
      })
    }
  },
  data () {
    return {
      datalist: [],
      height: ''
    }
  },
  methods: {
    handleLeft () {
      console.log('lefgggggg')
      this.$router.push('/city')
      this.$store.commit('removeCache')
    },
    handleRight () {
      this.$router.push('/cinema/search')
    }
  }
}
</script>

<style lang="scss" scoped>
  .box {
    height: 400px;
    overflow: hidden;
    position: relative;
  }
  
  li {
    padding: 15px;
    display: flex;
    justify-content: space-between;
    border-bottom: 0.5px solid lightgray;
    .left {
      width: 240px;
      div {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        
      }
    }
    .right {
        display: flex;
        align-items: baseline;
        color: #ff5f16;
        line-height: 47px;
        
    }
    .right span:nth-child(odd) {
        font-size: 12px;
        padding-right: 2px;
    }
  }
  .config-text {
    color: #797d82;
    font-size: 12px;
    margin-top: 8px;
  }
</style>