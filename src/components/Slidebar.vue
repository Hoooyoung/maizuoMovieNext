<template>
    <!-- <ul>
        <li v-for="item in datalist" :key="item.id">
            {{item.nm}}
        </li>
    </ul> -->
    <div>

    </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      datalist: []       
    }
  },
  mounted () {
    // fetch('http://127.0.0.1:8081/user')
    //   .then(res => res.json())
    //   .then(res => {
    //     console.log(res.data)
    //     this.datalist = res.data.films
    //   })
    axios.get('/api/mmdb/movie/v3/list/hot.json?ct=%E6%B5%8E%E5%8D%97&ci=96&channelId=4')
      .then(res => {
        // console.log(res.data)
        this.datalist = res.data.data.hot
      })
  }
}
</script>

<style>
    ul li {
        /* background: pink; */
    }
</style>
