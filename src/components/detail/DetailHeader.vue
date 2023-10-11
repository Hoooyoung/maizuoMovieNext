<template>
    <div class="header">
        <button @click="handleBack">&lt;</button>
        <slot></slot>
    </div>
</template>

<style lang="scss" scoped>
    .header {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 44px;
        text-align: center;
        background: #fff;
        line-height: 44px;
        vertical-align: middle;
        button {
          position: fixed;
          left: 10px;
          background: #fff;
          border: 0;
          line-height: 44px;
          width: 44px;
        }
    }
</style>

<script>
export default {
  methods: {
    handleBack () {
      this.$router.back()
    }
  }
}
</script>