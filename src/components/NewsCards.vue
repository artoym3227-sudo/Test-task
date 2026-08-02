<template>
    <section class="news">
        <div class="news__header">
            <h2 class="news__title">Новости</h2>
            <div class="news__nav">
                <button
                    class="news__nav-btn"
                    ref="prevRef"
                    :disabled="isBeginning"
                >
                    <arrowPrev class="news__nav-icn" alt=""/>
                </button>
                <button
                    class="news__nav-btn"
                    ref="nextRef"
                    :disabled="isEnd"
                >
                    <arrowNext class="news__nav-icn" alt=""/>
                </button>
            </div>
        </div>

        <Swiper
            :modules="[Navigation]"
            slides-per-view="auto"
            :space-between="24"
            :slides-offset-before="20"
            :slides-offset-after="20"
            :navigation="{
                prevEl: prevRef,
                nextEl: nextRef,
            }"
            :breakpoints="{
                320: { spaceBetween: 12, slidesOffsetBefore: 20, slidesOffsetAfter: 20 },
                768: { spaceBetween: 16, slidesOffsetBefore: 30, slidesOffsetAfter: 24 },
                1024: { spaceBetween: 20, slidesOffsetBefore: 30, slidesOffsetAfter: 24 },
                1440: { spaceBetween: 24, slidesOffsetBefore: 30, slidesOffsetAfter: 24 },
            }"
            @swiper="onSwiper"
            @slideChange="onSlideChange"
            @reachEnd="onReachEnd"
            class="news__slider"
        >
            <SwiperSlide
                v-for="(item, key) in newsItems"
                :key="key"
                class="news-card"
            >
                <router-link :to="item.path" class="news-card__link">
                    <img
                        :src="item.image"
                        :alt="item.title"
                        class="news-card__img"
                        loading="lazy"
                    >
                    <p class="news-card__title">{{ item.title }}</p>
                    <span class="news-card__date">{{ item.date }}</span>
                </router-link>
            </SwiperSlide>
        </Swiper>
    </section>
</template>

<script setup>
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

import arrowPrev from '@/assets/images/arrow-prev.svg'
import arrowNext from '@/assets/images/arrow-next.svg'
import exhibition from '@/assets/images/exhibition.png'
import excavator from '@/assets/images/excavator.png'
import exhibitionExpo from '@/assets/images/exhibition-expo.png'
import barrels from '@/assets/images/barrels.png'
import people from '@/assets/images/people.png'


const prevRef = ref(null)
const nextRef = ref(null)
const isBeginning = ref(true)
const isEnd = ref(false)

const onSwiper = (swiper) => {
    isBeginning.value = swiper.isBeginning
    isEnd.value = swiper.isEnd
}

const onSlideChange = (swiper) => {
    isBeginning.value = swiper.isBeginning
    isEnd.value = swiper.isEnd
}

const onReachEnd = (swiper) => {
    isEnd.value = true
}

const newsItems = [
    {
        title: '25-27 апреля с большим успехом прошла 21-я международная выставка машин и оборудования для добычи, обогащения и транспортировки полезных ископаемых.',
        date: '14.06.2023',
        image: exhibition, 
        path: '/news/1',
    },
    {
        title: 'Строительная техника и технологии. Москва, 2023',
        date: '27.05.2023',
        image: excavator,
        path: '/news/2',
    },
    {
        title: 'Международная выставка «Аналитика ЭКСПО 2022» в Крокус ЭКСПО',
        date: '12.02.2023',
        image: exhibitionExpo,
        path: '/news/2',
    },
    {
        title: '«ТехСтройКонтракт»: закрываем потребность в спецтехнике и моторных маслах',
        date: '10.01.2023',
        image: barrels,
        path: '/news/2',
    },
    {
        title: 'Компания «Техстройконтракт» провела крупнейшее региональное обучение сервисных специалистов со всех филиалов страны',
        date: '28.04.2023',
        image: people,
        path: '/news/2',
    },

]
</script>

<style lang="scss" scoped>
.news {
    width: 100%;
    overflow: hidden;

    @include respond-to('mobile') {
        margin-top: 4rem;
    }

    &__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 4.2rem;
        margin-left: 3rem;
        margin-right: 3rem;

        @include respond-to('mobile') {
            margin-bottom: 2rem;
            margin-left: 2rem;
            margin-right: 2rem;
        }
    }

    &__title {
        @include font(4rem, 1.1, 600, $color-dark);

        @include respond-to('mobile') {
            @include font(1.8rem, 1.1, 600, $color-dark);
        }
    }

    &__nav {
        display: flex;
        gap: 1rem;
    }

    &__nav-btn {
        width: 4.8rem;
        height: 4.8rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 0.6rem;
        background: $color-very-gray-light;
        border: none;
        overflow: visible;
        cursor: pointer;
        flex-shrink: 0;
        @include hover {
            color: rgba($color-primary, 1);
        }
        &:disabled {
            opacity: 0.4;
            cursor: default;
        }

        @include respond-to('mobile') {
            width: 2.4rem;
            height: 2.4rem;
        }
    }

    &__nav-icn{
        width: 3.2rem;
        height: 3.2rem;
        overflow: visible;

        @include respond-to('mobile') {
            width: 1.4rem;
            height: 1.4rem;
        }
    }

    &__slider {
        width: 100%;
    }
}

.news-card {
    width: 37rem;
    height: 39.8rem;
    padding-top: 0.2rem;
    max-height: 100%;
    margin-bottom: 8rem;
    flex-shrink: 0;
    
    @include hover {
            transform: translateY(-0.2rem);
            box-shadow: 0 0.4rem 1.2rem rgba($color-black, 0.1);
        }

    @include respond-to('mobile') {
        width: 29.5rem;
        max-width: 29.5rem;
        height: 32.4rem;
        max-height: 32.4rem;
        overflow: hidden;
    }

    &__link {
        display: flex;
        flex-direction: column;
        height: 100%;
        text-decoration: none;
        cursor: pointer;
    }

    &__img {
        width: 100%;
        height: 23rem;
        object-fit: cover;
        border-radius: 1.2rem;
        margin-bottom: 2rem;
        flex-shrink: 0;

        @include respond-to('mobile') {
            height: 19rem;
            margin-bottom: 1.2rem;
        }
    }

    &__title {
        width: 100%;
        max-width: 100%;
        display: -webkit-box;
        overflow: hidden;
        @include font(1.5rem, 1.4, 600, $color-dark);

        @include respond-to('mobile') {
            @include font(1.4rem, 1.35, 600, $color-dark);

        }
    }

    &__date {
        margin-top: auto;
        @include font(1.5rem, 1, 600, $color-dark);
        opacity: 0.3;
        flex-shrink: 0;
    }
}
</style>