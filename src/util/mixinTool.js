const obj = {
  created () {
    this.$store.commit('hideTab')
  },
  destroyed () {
    this.$store.commit('showTab')
  }
}
export default obj