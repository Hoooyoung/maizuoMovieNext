<template>
    <div class="swiper">
        <div class="swiper-wrapper">
            <slot></slot>
        </div>
        <div class="swiper-pagination"></div>
    </div>
    
</template>

<script>
import Swiper from 'swiper/bundle'
import 'swiper/css/bundle' 
// const tswiper = 
function configSwiper () {
  new Swiper('.swiper', { 
    loop: true,
    pagination: {
      el: '.swiper-pagination'
    },
    autoplay: {
      delay: 2000,
      disableOnInteraction: false
    }
  })
}
export default {
  mounted () {
    configSwiper()
  }
  
}
</script>