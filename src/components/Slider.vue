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
          <img :src="wavePattern" alt="" class="slider__pattern" />

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
      <img :src="arrowPrev" class="slider__arrow-icon" alt=""/>
    </button>
    
    <button 
      v-if="slides.length > 1"
      type="button" 
      class="slider__arrow slider__arrow--next" 
      aria-label="Следующий слайд"
    >
      <img :src="arrowNext" class="slider__arrow-icon" alt=""/>
    </button>

    <div v-if="slides.length > 1" class="slider__dots"></div>
  </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import engineImage from '@/assets/images/engine-parts.png'
import wavePattern from '@/assets/images/wave-pattern.svg'
import arrowPrev from '@/assets/images/arrow-prev.svg'
import arrowNext from '@/assets/images/arrow-next.svg'

const slides = [
  {
    image: engineImage,
    titleNormal: 'Распродажа запчастей',
    titleAccent: 'по специальным ценам',
    text: 'Распродажа складских остатков оригинальных запасных частей на технику hitachi, new holland, case, kobelco, cat, komatsu'
  },
  {
    image: engineImage,
    titleNormal: 'Распродажа запчастей',
    titleAccent: 'по специальным ценам',
    text: 'Распродажа складских остатков оригинальных запасных частей на технику hitachi, new holland, case, kobelco, cat, komatsu'
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

  &__swiper {
    width: 100%;
    height: 51rem;
  }

  &__slide {
    display: flex;
    position: relative;
    width: 100%;
    height: 100%;
    align-items: center;
    overflow: hidden;
  }

  &__bg {
    position: absolute;
    width: 55%;
    right: 0;
    height: 100%;
    object-fit: cover;
    z-index: 0;
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
    z-index: 3;
    margin-left: 13rem;
    max-width: 59rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: $color-white;
  }

  &__title {
    display: flex;
    flex-direction: column;
    max-width: 100%;
    @include font(4rem, 1.1, 800);
    text-transform: uppercase;
    margin-bottom: 1rem;
  }

  &__title-accent {
    color: $color-primary;
  }

  &__text {
    @include font(2.4rem, 1.1, 600, $color-gray);
    opacity: 0.85;
    margin: 0 0 1.5rem;
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
    transition: background 0.2s ease;
    @include font(1.3rem, 1, 700, $color-white);
    text-decoration: none;
    white-space: nowrap;

    @include hover {
      background: rgba($color-primary, 0.7);
    }

    @include focus-visible {
      outline-color: $color-primary;
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
    transition: background 0.2s ease, opacity 0.2s ease;

    &--prev {
      left: 1rem;
    }

    &--next {
      right: 1rem;
    }

    @include hover {
      background: $color-primary;
    }

    @include focus-visible;

    &.swiper-button-disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  }

  &__arrow-icon {
    width: 1.6rem;
    height: 1.6rem;
    pointer-events: none;
  }

  &__dots {
    position: absolute;
    bottom: 5rem;
    left: 13rem;
    z-index: 4;
    display: flex;
    gap: 0.2rem;
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