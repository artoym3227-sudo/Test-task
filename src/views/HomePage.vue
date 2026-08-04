<template>
    <main class="main">
        <Slider @details-click="handleDetailsClick" />
        <MainBrands/>
        <MainPromo/>
        <NewsCards/>
    </main>
</template> 

<script setup>
import Slider from '@/components/mainpage/HeroSlider.vue'
import MainPromo from '@/components/mainpage/MainPromo.vue'
import MainBrands from '@/components/mainpage/MainBrands.vue'
import NewsCards from '@/components/mainpage/NewsCards.vue'

const handleDetailsClick = (slide) => {
    console.log('Details clicked:', slide)
}

</script>

<style lang="scss" scoped>
.main {
    display: flex;
    flex-direction: column;
}
</style>