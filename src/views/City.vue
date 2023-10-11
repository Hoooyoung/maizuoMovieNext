<template>
  <div>
    <div class="hotcity">
      <div style="color:#797d82; font-size:13px; padding-bottom:13px">热门城市</div>
      <div>
        <ul>
          <li v-for="item in hotCityList" :key="item.cityId">
            {{item.name}}
          </li>
        </ul>
      </div>
    </div>
    <van-index-bar :index-list="computedIndex" @change="handleSlideAction">
      <div v-for="item in cityList" :key="item.type">
        <van-index-anchor :index="item.type" style="background:#f4f4f4"/>
        <van-cell v-for="sub in item.list" :key="sub.cityId" :title="sub.name"  @click="selectCity(sub)"/>
        
      </div>
    </van-index-bar>
  </div>
</template>

<script>
import http from '@/util/http'
import mixobj from '@/util/mixinTool'
export default {
  mixins: [mixobj],
  data () {
    return {
      cityList: [],
      hotCityList: []
    }
  },
  computed: {
    computedIndex () {
      return this.cityList.map(item => item.type)
    }
  },
  mounted () {
    http({
      url: 'gateway?k=1221251',
      headers: {
        'X-Host': 'mall.film-ticket.city.list'
      }
    }).then((res) => {
      console.log(res.data.data)
      this.cityList = this.renderCitys(res.data.data.cities)
      this.hotCityList = res.data.data.cities.filter(item => item.isHot === 1)
    })
  },
  methods: {
    renderCitys (list) {
      const letterList = []
      const clist = []
      for (let i = 65; i < 91; i++) {
        letterList.push(String.fromCharCode(i))
      }
      letterList.forEach((letter) => {
        const newList = list.filter(
          (item) => item.pinyin.substring(0, 1).toUpperCase() === letter
        )
        newList.length > 0 &&
          clist.push({
            type: letter,
            list: newList
          })
      })
      return clist
    },
    handleSlideAction (data) {
      console.log(data)
    },
    selectCity (item) {
      // console.log(item.name, item.cityId)
      console.log(item.cityId)
      this.$store.commit('changeCity', item.name)
      this.$store.commit('changeCityId', item.cityId)
      this.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped>
 .hotcity {
  padding: 15px;
  padding-bottom: 0;
 }
  .hotcity ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    li {
      text-align: center;
      width: calc(33% - 11px);
      background: #f4f4f4;
      height: 30px;
      line-height: 30px;
      margin-bottom: 10px; 
      border-radius: 3px;
    }
  }
  .van-index-anchor {
    background: #f4f4f4;
  }
</style>