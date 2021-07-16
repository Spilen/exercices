<template>
  <div>
    <carousel>
      <carousel-slide>
        1
      </carousel-slide>
      <carousel-slide>
        2
      </carousel-slide>
    </carousel>
  </div>
</template>

<script>

  import carousel from './components/carousel/carousel.vue'
  import carouselSlide from './components/carousel/carouselSlide.vue'

  export default {
    components: {
      carousel,
      carouselSlide
    }

  }
  
</script>
