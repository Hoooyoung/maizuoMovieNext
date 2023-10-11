<template>
    <div class="contain">
        <!-- <ul v-if="datalist.length">
            <li v-for="item in datalist" :key="item.filmId" @click="handlePushDetail(item.filmId)">
              <img :src="item.poster" alt="">
              <div class="title">{{item.name}}</div>
              <div class="content">
                <div>观众评分 <span style="color:orange;">{{item.grade}}</span></div> 
                <div class="actor">主演：{{item.actors | namefilter}}</div>
                <div>{{item.nation}} | {{item.runtime}}分钟</div>
              </div>
              <div class="btn">
                购票
              </div>
              
            </li>
            
        </ul> -->
        <van-list v-if="datalist.length" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :immediate-check="false">
          <van-cell v-for="item in datalist" :key="item.filmId" @click="handlePushDetail(item.filmId)">
            <img :src="item.poster" alt="">
              <div class="title">{{item.name}}</div>
              <div class="content">
                <div>观众评分 <span style="color:orange;">{{item.grade}}</span></div> 
                <div class="actor">主演：{{item.actors | namefilter}}</div>
                <div>{{item.nation}} | {{item.runtime}}分钟</div>
              </div>
              <div class="btn">
                购票
              </div>
          </van-cell>
        </van-list>
    </div>
</template>

<script>
// import axios from 'axios'
import Vue from 'vue'
import http from '@/util/http.js'
import { List } from 'vant'

Vue.use(List)
Vue.filter('namefilter', (data) => {
  // console.log(data.map(item => item.name).join(' '))
  if (data === undefined) return '暂无主演'
  return data.map(item => item.name).join(' ')
  // console.log(data instanceof Array)
})
export default {
  data () {
    return {
      datalist: [],
      loading: false,
      finished: false,
      currentPage: 1,
      total: 0
    }
  },
  mounted () {
    http({
      url: `gateway?cityId=${this.$store.state.cityId}&pageNum=1&pageSize=10&type=1&k=499555`,
      headers: {
        'X-Host': 'mall.film-ticket.film.list'
      }
    }).then(res => {
      this.datalist = res.data.data.films
      this.total = res.data.data.total
      console.log(res.data.data)
    })
    // axios({
    //   url: 'https://m.maizuo.com/gateway?cityId=110100&pageNum=1&pageSize=20&type=1&k=499555',
    //   headers: {
    //     'X-Host': 'mall.film-ticket.film.list',
    //     'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"16934613236293973924577281","bc":"110100"}'
    //   }
    // }).then(res => {
    //   this.datalist = res.data.data.films
    // })
  },
  methods: {
    handlePushDetail (id) {
    //  如果使用命名路由 需要传对象 this.$router.push({name: 'dddd', params: {myid: id}})
      this.$router.push(`/detail/${id}`)
    },
    onLoad () {
      console.log('到底了')
      this.currentPage++
      http({
        url: `gateway?cityId=${this.$store.state.cityId}&pageNum=${this.currentPage}&pageSize=10&type=1&k=499555`,
        headers: {
          'X-Host': 'mall.film-ticket.film.list'
        }
      }).then(res => {
        // this.datalist = [...this.datalist, ...res.data.data.films]
        this.datalist = this.datalist.concat(res.data.data.films)
        
        this.loading = false
        this.finished = this.datalist.length === this.total

        console.log(res.data.data)
      })
    }
  }
}
</script>

<style lang="scss" scoped>

  .van-list {
    //  padding-bottom: 49px;
    .van-cell {
      // padding: 10px 10px 10px 0;
      // margin-left: 10px;
      overflow: hidden;
      // border-bottom: 0.5px solid lightgray;
      position: relative;
      img {
        float: left;
        width: 66px;
        margin-right: 10px;
      }
      .title {
        font-size: 16px;
        height: 24px;
        padding-top: 3px;
      }
      .content {
        font-size: 13px;
        color: gray;
        line-height: 22px;
        width: 83%;
        .actor {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      
      }
      .btn {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          font-size: 12px;
          color: orange;
          border: 0.5px solid orange;
          border-radius: 2px;
          width: 50px;
          height: 25px;
          text-align: center;
          line-height: 25px;
      }
      
    }
  
  }

</style>