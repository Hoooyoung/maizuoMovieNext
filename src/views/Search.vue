<template>
  <div>
    <van-search
      v-model="value"
      show-action
      placeholder="请输入影城名称"
      @search="onSearch"
      @cancel="onCancel"
    />
    <ul v-if="value">
      <li v-for="item in computedList" :key="item.cinemaId">
        <div class="left">
          <div>{{ item.name }}</div>
          <div class="config-text">{{ item.address }}</div>
        </div>
        <div class="right">
          <span>¥</span>
          <span style="font-size: 15px">{{ item.lowPrice / 100 }}</span>
          <span>起</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import mixobj from '@/util/mixinTool'
export default {
  mixins: [mixobj],
  data () {
    return {
      value: ''
    }
  },
  mounted () {
    if (this.$store.state.cinemaList.length === 0) {
      this.$store.dispatch('getCinemaData')
    }
  },
  methods: {
    onSearch () {
      
    },
    onCancel () {
      this.$router.back()
    }
  },
  computed: {
    computedList () {
      return this.$store.state.cinemaList.filter(item => item.name.toUpperCase().includes(this.value.toUpperCase()) || item.address.toUpperCase().includes(this.value.toUpperCase()))
    }
  }
}
</script>

<style lang="scss" scoped>
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