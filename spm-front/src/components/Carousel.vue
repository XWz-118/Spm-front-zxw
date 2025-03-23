<template>
  <div class="carousel">
    <swiper :modules="modules" :pagination="{ clickable: true }" :autoplay="{ delay: 2000, disableOnInteraction: false }">
      <swiper-slide>
        <img src="../assets/swiperpc/1.png" alt="">
      </swiper-slide>
      <swiper-slide>
        <img src="../assets/swiperpc/2.png" alt="">
      </swiper-slide>
      <swiper-slide>
        <img src="../assets/swiperpc/3.png" alt="">
      </swiper-slide>
      <swiper-slide>
        <img src="../assets/swiperpc/n.png" alt="">
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { ref, defineProps } from 'vue';
import { Pagination,Autoplay } from'swiper/modules';
import { Swiper, SwiperSlide } from'swiper/vue';
import'swiper/css';
import'swiper/css/pagination';

export default {
  name: 'HelloWorld',
  components: {
    Swiper,
    SwiperSlide
  },
  setup() {
    const modules = ref([Pagination,Autoplay]);
    return {
      modules
    };
  }
};
</script>

<style scoped>
.carousel {
  width: 1400px;
  height: 420px;
  margin: 0 auto;
}
.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.carousel img {
  width:900px;
  height: 420px;
  /* object-fit: cover; */
}
</style>