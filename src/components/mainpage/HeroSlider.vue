<template>
  <section class="slider">
    <Swiper
      :modules="[Navigation, Pagination, Autoplay]"
      :navigation="{
        prevEl: '.slider__arrow--prev',
        nextEl: '.slider__arrow--next'
      }"
      :pagination="{
        el: '.slider__dots',
        clickable: true,
        bulletClass: 'slider__dot',
        bulletActiveClass: 'slider__dot--active'
      }"
      :autoplay="{ delay: 5000, disableOnInteraction: false }"
      :loop="slides.length > 1"
      class="slider__swiper"
    >
      <SwiperSlide v-for="(slide, index) in slides" :key="index">
        <div class="slider__slide">
          <img :src="slide.image" alt="" class="slider__bg" loading="lazy" />
          <div class="slider__gradient"></div>
          <wavePattern alt="" class="slider__pattern" />

          <div class="slider__content">
            <h2 class="slider__title">
              {{ slide.titleNormal }}
              <span v-if="slide.titleAccent" class="slider__title-accent">{{ slide.titleAccent }}</span>
            </h2>
            <p class="slider__text">{{ slide.text }}</p>
            <button type="button" class="slider__btn" @click="handleDetailsClick(slide)">Подробнее</button>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>

    <button 
      v-if="slides.length > 1"
      type="button" 
      class="slider__arrow slider__arrow--prev" 
      aria-label="Предыдущий слайд"
    >
      <arrowPrev class="slider__arrow-icon" alt=""/>
    </button>
    
    <button 
      v-if="slides.length > 1"
      type="button" 
      class="slider__arrow slider__arrow--next" 
      aria-label="Следующий слайд"
    >
      <arrowNext class="slider__arrow-icon" alt=""/>
    </button>

    <div v-if="slides.length > 1" class="slider__dots"></div>

    <Swiper
      :modules="[Pagination, Autoplay]"
      :pagination="{
        el: '.slider__dots-mobile',
        clickable: true,
        bulletClass: 'slider__dot',
        bulletActiveClass: 'slider__dot--active'
      }"
      :autoplay="{ delay: 5000, disableOnInteraction: false }"
      :loop="slidesMobile.length > 1"
      class="slider__swiper-mobile"
    >
      <SwiperSlide v-for="(slide, index) in slidesMobile" :key="index">
        <div class="slider__slide">
          <img :src="slide.image" alt="" class="slider__bg" loading="lazy" />
          <div class="slider__gradient"></div>

          <div class="slider__content">
            <h2 class="slider__title slider__title--mobile">
              <span class="slider__title-text">{{ slide.titleNormal }}</span>
              <span class="slider__title-line"></span>
            </h2>
            <p class="slider__text">{{ slide.text }}</p>
            <p v-if="slide.subtext" class="slider__subtext">{{ slide.subtext }}</p>
            <button type="button" class="slider__btn" @click="handleDetailsClick(slide)">Подробнее</button>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>

    <div v-if="slidesMobile.length > 1" class="slider__dots-mobile"></div>
  </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'


import engineImageSlider from '@/assets/images/engine-parts-slider.png'
import wavePattern from '@/assets/images/wave-pattern.svg'
import arrowPrev from '@/assets/images/arrow-prev.svg'
import arrowNext from '@/assets/images/arrow-next.svg'

const slides = [
  {
    image: engineImageSlider,
    titleNormal: 'Распродажа запчастей',
    titleAccent: 'по специальным ценам',
    text: 'Распродажа складских остатков оригинальных запасных частей на технику hitachi, new holland, case, kobelco, cat, komatsu'
  },
  {
    image: engineImageSlider,
    titleNormal: 'Распродажа запчастей',
    titleAccent: 'по специальным ценам',
    text: 'Распродажа складских остатков оригинальных запасных частей на технику hitachi, new holland, case, kobelco, cat, komatsu'
  },
]

const slidesMobile = [
  {
    image: engineImageSlider,
    titleNormal: 'Техстройконтракт',
    text: 'строительно-дорожная техника и запчасти от ведущих мировых производителей',
    subtext: 'Широкая линейка двигателей на спецтехники'
  },
  {
    image: engineImageSlider,
    titleNormal: 'Техстройконтракт',
    text: 'строительно-дорожная техника и запчасти от ведущих мировых производителей',
    subtext: 'Широкая линейка двигателей на спецтехники'
  },
]

const emit = defineEmits(['details-click'])

const handleDetailsClick = (slide) => {
  emit('details-click', slide)
}
</script>

<style lang="scss" scoped>
.slider {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  overflow: hidden;

  @include respond-to('mobile') {
    height: 34rem;
  }
  
  &__swiper {
    width: 100%;
    height: 51rem;

    @include respond-to('mobile') {
      display: none;
    }
  }

  &__swiper-mobile {
    display: none;
    width: 100%;
    height: 34rem;

    @include respond-to('mobile') {
      display: block;
    }
  }

  &__slide {
    display: flex;
    position: relative;
    width: 100%;
    height: 100%;
    align-items: flex-start;
    justify-content: flex-start;
    overflow: hidden;
  }

  &__bg {
    position: absolute;
    width: 68%;
    right: 0;
    height: 100%;
    object-fit: cover;
    z-index: 0;

    @include respond-to('mobile') {
      width: 100%;
      height: 100%
    }
  }

  &__gradient {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to right,
      $color-dark 0%,
      $color-dark 45%,
      rgba($color-dark, 0) 100%
    );
    z-index: 0;

    @include respond-to('mobile') {
      background: linear-gradient(
        180deg,
        $color-dark 0%,
        $color-dark 0%,
        rgba($color-dark, 40%) 100%
      );
    }
  }

  &__pattern { 
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.15;
    z-index: 2;
    pointer-events: none;
  }

  &__content {
    position: relative;
    margin: 12.7rem 0 0 13rem;
    max-width: 59rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: $color-white;
    z-index: 3;

    @include respond-to('mobile') {
      margin: 6.1rem 4.5rem 0 2rem;
      max-width: 100%;
      padding: 0 5rem 0 0;
      gap: 1.5rem;
    }
  }

  &__title {
    display: flex;
    flex-direction: column;
    max-width: 100%;
    margin: 0 0 2rem 0;
    @include font(4rem, 1.1, 800);
    text-transform: uppercase;

    @include respond-to('mobile') {
      @include font(2.5rem, 1.1, 800, $color-white);
    }
  }

  &__title-accent {
    color: $color-primary;
  }

  &__title--mobile {
    width: 31rem;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    gap: 1.3rem;
  }

  &__title-text {
    white-space: nowrap;
  }

  &__title-line {
    display: inline-block;
    width: 3rem;
    height: 0.4rem;
    background: $color-primary;
    border-radius: 0.2rem;
    flex-shrink: 0;
  }

  &__text {
    @include font(2.4rem, 1.1, 600, $color-gray);
    opacity: 0.85;
    margin: 0 0 3rem 0;

    @include respond-to('mobile') {
      @include font(1.6rem, 1.1, 500, $color-white);
      width: 30.09rem;
      margin: 0;
    }
  }

  &__subtext {
    display: none;

    @include respond-to('mobile') {
      display: block;
      width: 19.9rem;
      max-width: 100%;
      @include font(1.3rem, 1.31, 500, $color-white);
      margin: 0 0 1.6rem 0;
    }
  }

  &__btn {
    display: inline-flex;
    max-width: 12.4rem;
    max-height: 4rem;
    padding: 1.2rem 2.5rem;
    align-self: flex-start;
    align-items: center;
    justify-content: center;
    border: 0.1rem solid $color-primary;
    background: transparent;
    border-radius: 0.6rem;
    cursor: pointer;
    transition: background 0.4s ease;
    @include font(1.3rem, 1, 700, $color-white);
    text-decoration: none;
    white-space: nowrap;

    @include hover {
      background: rgba($color-primary, 0.7);
    }

    @include focus-visible {
      outline-color: $color-primary;
    }

    @include respond-to('mobile') {
      display:none;
    }
  }

  &__arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 4;
    width: 4.8rem;
    height: 4.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: $color-white;
    border: none;
    border-radius: 0.6rem;
    cursor: pointer;
    box-shadow: 0 0.1rem 0.5rem rgba($color-black, 0.15);
    transition: background 0.4s ease, color 0.4s ease, opacity 0.2s ease;

    @include hover {
      color: $color-white;
      background: $color-primary;
    }

    @include respond-to('mobile') {
      display: none;
    }

    &--prev {
      left: 1rem;
     
    }

    &--next {
      right: 1rem;
    }

    

    @include focus-visible;

    &.swiper-button-disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  }

  &__arrow-icon {
    width: 3.2rem;
    height: 3.2rem;
    overflow: visible;
  }

  &__dots {
    position: absolute;
    bottom: 5rem;
    left: 13rem;
    z-index: 4;
    display: flex;
    gap: 0.2rem;

    @include respond-to('mobile') {
      display: none;
    }
  }

  &__dots-mobile {
    display: none;
    position: absolute;
    left: 2.5rem;
    bottom: 2.4rem;
    z-index: 4;
    gap: 0.2rem;

    @include respond-to('mobile') {
      display: flex;
    }
  }

  :deep(.slider__dot) {
    width: 1.5rem;
    height: 0.5rem;
    border-radius: 0.2rem;
    background: rgba($color-white, 0.3);
    cursor: pointer;
    transition: background 0.2s ease, width 0.2s ease;
    display: inline-block;
  }

  :deep(.slider__dot--active) {
    background: $color-primary;
    width: 1.5rem;
  }
}
</style>
