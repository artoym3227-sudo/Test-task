<template>
  <div class="container">
    <header><Header/></header>
    <main><Slider/>
    <MainBrands/>
    <MainPromo/>
    <NewsCards/></main>
    <footer><Footer/></footer>
  </div>
</template>

<style scoped>
  .container{
    width: 100%;
    max-width: 192rem;
    margin-right: auto;
    margin-left: auto;
  }
</style>


<script setup>

  import Header from '@components/Header.vue';
  import Slider from '@components/Slider.vue';
  import MainBrands from '@components/MainBrands.vue'
  import MainPromo from '@/components/MainPromo.vue';
  import NewsCards from '@/components/NewsCards.vue';
  import Footer from '@/components/Footer.vue';
</script>