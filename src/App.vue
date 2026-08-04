<template>
    <div class="container">
        <Header/>
        <router-view/>
    </div>
        <Footer/>
    
</template>

<script setup>
import Header from '@/components/layouts/Header.vue'
import Footer from '@/components/layouts/Footer.vue'
</script>

<style lang="scss" scoped>
.container {
    @include container;
}
</style>