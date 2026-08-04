<template>
    <div class="brands-info">
        <div class="brands-info__list">
            <h2 class="brands-info__title">Производители техники</h2>

            <div class="brands-info__brands">
                <div class="brands-info__track">
                    <ul class="brands-info__brands-group">
                        <li v-for="(item, key) in brandsList" :key="`a-${key}`" class="brands-info__item">
                            <router-link :to="item.path" class="brands-info__link">
                                <img :src="item.image" :alt="item.title" class="brands-info__img" loading="lazy">
                            </router-link>
                        </li>
                    </ul>

                    <ul class="brands-info__brands-group brands-info__brands-group--duplicate" aria-hidden="true">
                        <li v-for="(item, key) in brandsList" :key="`b-${key}`" class="brands-info__item">
                            <router-link :to="item.path" class="brands-info__link" tabindex="-1">
                                <img :src="item.image" :alt="item.title" class="brands-info__img" loading="lazy">
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="brands-info__offers">
            <router-link to="#" class="brands-info__offer brands-info__offer--parts">
                <p class="brands-info__offer-text">Запасные части</p>
                <gears alt="" class="brands-info__offer-logo"/>
                <arrowMoreDeatails alt="" class="brands-info__offer-arrow"/>
            </router-link> 

            <router-link to="#" class="brands-info__offer brands-info__offer--machinery">
                <p class="brands-info__offer-text">Техника</p>
                <machinery alt="" class="brands-info__offer-logo"/>
                <arrowMoreDeatails alt="" class="brands-info__offer-arrow"/>
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

    &__list {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin: 2.4rem 6rem 3rem 3rem;
        flex-shrink: 0;

        @include respond-to('mobile') {
            flex-direction: column;
            align-items: center;
            margin: 2.5rem 0 2.5rem 0;
            gap: 1rem;
        }
    }

    &__title {
        width: 10.1rem;
        max-width: 100%;
        text-transform: uppercase;
        @include font(1.1rem, 1.2, 600, $color-gray-light);
        white-space: wrap;
        pointer-events: none;
        flex-shrink: 0;
        @include respond-to('mobile') {
            width: 15.6rem;
            max-width: 100%;
        }
    }

    
    &__brands {
        max-width: 100%;
        width: 100%;
        min-width: 0;
        overflow: hidden;
        -webkit-mask-image: linear-gradient(
            to right,
            transparent 0,
            $color-black 3%,
            $color-black 97%,
            transparent 100%
        );
        mask-image: linear-gradient(
            to right,
            transparent 0,
            $color-black 3%,
            $color-black 97%,
            transparent 100%
        );
    }


    &__track {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        width: max-content;
        animation: brands-marquee 22s linear infinite;
    }

    &__brands-group {
        display: flex;
        align-items: center;
        flex-direction: row;
        gap: 5rem;
        margin-right: 5rem;
        flex-shrink: 0;
        flex-wrap: nowrap;
        justify-content: flex-start;

        @include respond-to('mobile') {
            margin-right: 2rem;
            gap: 1rem;
        }

        &--duplicate {
            display: flex;
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

        @include respond-to('mobile') {
            width: 11rem;
        }
    }

    &__offers {
        display: flex;
        margin: 0 3rem;
        gap: 2rem;
        @include respond-to('mobile') {
            flex-direction: column;
            margin: 0 2rem 0 2rem;
            gap: 1rem;
        }
    }

    &__offer {
        display: flex;
        justify-content: space-between;
        position: relative;
        padding: 3.1rem 3rem 3rem 3rem;
        width: 50%;
        height: 20.8rem;
        text-decoration: none;
        color: inherit;
        box-sizing: border-box;
        overflow: visible;
        cursor: pointer;
        transition: transform 0.2s ease;
        background-color: #f8f9fd;

        @include hover {
            transform: translateY(-0.2rem);
            background: $color-very-gray-light;
            border-radius: 0.6rem;
            .brands-info__offer-text,
            .brands-info__offer-arrow {
                color: rgba($color-primary, 0.7);
            }
        }

        @include focus-visible;

        @include respond-to('mobile') {
            width: 100%;
            padding: 2.5rem 2.5rem 2rem 2em;
        }

        &--parts {
            @include respond-to('mobile') {
                margin: 0;
            }
        }

        &--machinery {
            @include respond-to('mobile') {
                margin: 0;
            }
        }
    }

    &__offer-text {
        align-self: flex-end;
        margin: 0 auto 0 0;
        padding: 0;
        z-index: 1;
        @include font(2.4rem, 1, 600, $color-dark);
        transition: color 0.4s ease;

        @include respond-to('mobile') {
                @include font(1.6rem, 1, 500, $color-dark);
            }
        
    }

    &__offer-logo {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        object-fit: contain;
    }

    

    &__offer--parts &__offer-logo {
        width: 14.9rem;
        height: 10.9rem;
        @include respond-to('mobile') {
                width: 11.4rem;
                height: 8.5rem;
            }
        
    }

    &__offer--machinery &__offer-logo {
        width: 13.2rem;
        height: 12rem;
    }

    &__offer-arrow {
        width: 1.9rem;
        height: 1.9rem;
        overflow: visible;
        color: $color-dark;
        transition: color 0.4s ease;

        @include respond-to('mobile') {
                width: 1.4rem;
                height: 1.4rem;
            }

    }
    }

@keyframes brands-marquee {
    from {
        transform: translateX(0);
    }
    to {
        transform: translateX(-50%);
    }
}
</style>