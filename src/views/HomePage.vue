<template>
    <main class="main">
        <Slider @details-click="handleDetailsClick" />
        <MainBrands/>
        <MainPromo/>
        <NewsCards/>
    </main>
</template> 

<script setup>
import Slider from '@/components/Slider.vue'
import MainPromo from '@/components/MainPromo.vue'
import MainBrands from '@/components/MainBrands.vue'
import NewsCards from '@/components/NewsCards.vue'

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