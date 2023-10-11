<template>
    <div>
        <button @click="handleleft">left</button>
        navbar
    </div>
</template>

<script>
export default {
  methods: {
    handleleft () {
      this.$emit('event')
    }
  }
}
</script>
