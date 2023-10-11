<template>
    <div class="swiper" :class="name">
        <div class="swiper-wrapper">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import Swiper from 'swiper/bundle'
import 'swiper/css/bundle'
export default {
  props: {
    configPerview: {
      type: String,
      default: '1'
    },
    name: {
      type: String,
      default: 'swiper'
    }
  },
  mounted () {
    new Swiper('.' + this.name, {
      slidesPerView: this.configPerview,
      spaceBetween: 10,
      freeMode: true
    })
  }
}

</script>