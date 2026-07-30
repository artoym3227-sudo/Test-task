<template>
    <div class="brands-info">
        <div class="brands-info__list">
            <h2 class="brands-info__title">Производители техники</h2>
            <ul class="brands-info__brands">
                <li v-for="(item, key) in brandsList" :key="key" class="brands-info__item">
                    <router-link :to="item.path" class="brands-info__link">
                        <img :src="item.image" :alt="item.title" class="brands-info__img" loading="lazy">
                    </router-link>
                </li>
            </ul> 
        </div>

        <div class="brands-info__offers">
            <router-link to="/parts" class="brands-info__offer brands-info__offer--parts">
                <p class="brands-info__offer-text">Запасные части</p>
                <img :src="gears" alt="" class="brands-info__offer-logo">
                <img :src="arrowMoreDeatails" alt="" class="brands-info__offer-arrow">
                
            </router-link> 

            <router-link to="/machinery" class="brands-info__offer brands-info__offer--machinery">
                <p class="brands-info__offer-text">Техника</p>
                <img :src="machinery" alt="" class="brands-info__offer-logo">
                <img :src="arrowMoreDeatails" alt="" class="brands-info__offer-arrow">
            </router-link>
        </div>
    </div>
</template>

<script setup>
import brandHyudai from '@/assets/images/brands-hyundai.png'
import brandShantui from '@/assets/images/brands-shantui.png'
import brandSitrak from '@/assets/images/brands-sitrak.png'
import brandAirman from '@/assets/images/brands-airman.png'
import brandTsurumi from '@/assets/images/brands-tsurumi.png'
import brandFrd from '@/assets/images/brands-frd.png'
import brandTonly from '@/assets/images/brands-tonly.png'
import machinery from '@/assets/images/machinery.svg'
import gears from '@/assets/images/gears.svg'
import arrowMoreDeatails from '@/assets/images/arrow-more-details.svg'

const brandsList = [
    { title: 'Hyundai', image: brandHyudai, path: '/brands/hyundai' },
    { title: 'Shantui', image: brandShantui, path: '/brands/shantui' },
    { title: 'Sitrak', image: brandSitrak, path: '/brands/sitrak' },
    { title: 'Airman', image: brandAirman, path: '/brands/airman' },
    { title: 'Tsurumi', image: brandTsurumi, path: '/brands/tsurumi' },
    { title: 'FRD', image: brandFrd, path: '/brands/frd' },
    { title: 'Tonly', image: brandTonly, path: '/brands/tonly' },
]
</script>

<style lang="scss" scoped>
.brands-info {
    margin: 2.4rem 3rem 4.1rem 3rem ; 
    &__list {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin-right: 6rem;
        margin-bottom: 3rem;
        flex-shrink: 0;
        
        @include respond-to('mobile') {
            flex-direction: column;
            align-items: flex-start;
            gap: 2rem;
        }
    }

    &__title {
        width: 10.1rem;
        max-width: 100%;
        text-transform: uppercase;
        @include font(1.1rem, 1.2, 600, $color-gray-light);
        white-space: wrap; 
        pointer-events: none;
        
    }

    &__brands {
        display: flex;
        width: 128rem;
        max-width: 100%;
        align-items: center;
        justify-content: end;
        flex-direction: row;
        gap: 5rem;
        flex-shrink: 0;
        flex-wrap: wrap;
        
        @include respond-to('mobile') {
            gap: 2rem;
        }
    }

    &__item {
        flex-shrink: 0;
    }

    &__link {
        @include hover {
            opacity: 0.8;
        }
        
        @include focus-visible;
    }

    &__img {
        width: 14rem;
        max-width: 100%;
        flex-shrink: 0;
        object-fit: contain;
        transition: transform 0.2s ease;
        
        @include hover {
            transform: scale(1.05);
        }
    }

    &__offers {
        display: flex;
        margin: 0 3rem;
        gap: 2rem;
        
        @include respond-to('mobile') {
            flex-direction: column;
            gap: 1rem;
        }
    }

    &__offer {
        display: flex;
        justify-content: space-between;
        position: relative;
        padding: 3.1rem 3rem 3rem 3em;
        width: 50%;
        height: 20.8rem;
        text-decoration: none;
        color: inherit;
        box-sizing: border-box;
        cursor: pointer;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        
        
        @include hover {
            transform: translateY(-0.2rem);
            box-shadow: 0 0.4rem 1.2rem rgba($color-black, 0.1);
        }
        
        @include focus-visible;
        
        @include respond-to('mobile') {
            width: 100%;
        }
 
        &--parts {
            
            @include respond-to('mobile') {
                margin-right: 0;
            }
        }

        &--machinery {

            @include respond-to('mobile') {
                margin-left: 0;
            }
        }
    }

    &__offer-text {
        align-self: flex-end;
        margin-right: auto;
        padding: 0;
        
        @include font(2.4rem, 1, 600);
    }

    &__offer-logo {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        max-width: 80%;
        max-height: 80%;
        object-fit: contain;
    }

    &__offer-arrow {
        top: 3.1rem;
        right: 3rem;
        width: 1.9rem;
        height: 1.9rem;
    }
}
</style>