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
      :loop="true"
      class="slider__swiper"
    >
      <SwiperSlide v-for="(slide, index) in slides" :key="index">
        <div class="slider__slide">
          <img :src="slide.image" alt="" class="slider__bg" />
          <div class="slider__gradient"></div>
          <img :src="wavePattern" alt="" class="slider__pattern" />

          <div class="slider__content">
            <h2 class="slider__title">
              {{ slide.titleLine1 }}<br />
              <span class="slider__title-accent">{{ slide.titleLine2 }}</span>
            </h2>
            <p class="slider__text">{{ slide.text }}</p>
            <button type="button" class="slider__btn">Подробнее</button>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>

    <button type="button" class="slider__arrow slider__arrow--prev" aria-label="Предыдущий слайд">
      <svg width="0.5rem" height="0.875rem" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 1L1 7L7 13" stroke="#252536" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    <button type="button" class="slider__arrow slider__arrow--next" aria-label="Следующий слайд">
      <svg width="0.5rem" height="0.875rem" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1L7 7L1 13" stroke="#252536" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>

    <div class="slider__dots"></div>
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

const slides = [
  {
    image: engineImage,
    titleLine1: 'Распродажа запчастей',
    titleLine2: 'по специальным ценам',
    text: 'Распродажа складских остатков оригинальных запасных частей на технику hitachi, new holland, case, kobelco, cat, komatsu'
  },
  {
    image: engineImage,
    titleLine1: 'Распродажа запчастей',
    titleLine2: 'по специальным ценам',
    text: 'Распродажа складских остатков оригинальных запасных частей на технику hitachi, new holland, case, kobelco, cat, komatsu'
  }
]
</script>

<style lang="scss" scoped>
.slider {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 31.875rem;
  min-width: 100%;
  overflow: hidden;

  &__swiper {
    width: 100%;
    height: 31.875rem;
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
      #252536 0%,
      #252536 45%,
      rgba(37, 37, 54, 0) 100%
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
    margin-left: 8.125rem;
    max-width: 36.875rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: white;
  }

  &__title {
    display: flex;
    flex-direction: column;
    max-width: 100%;
    font-size: 2.5rem;
    font-weight: 800;
    text-transform: uppercase;
    line-height: 1.2;
    margin: 0 0 1rem;
  }

  &__title-accent {
    color: #F66E1F;
  }

  &__text {
    font-size: 1.5rem;
    font-weight: 600;
    line-height: 1.5;
    opacity: 0.85;
    margin: 0 0 1.5rem;
    color: #9D9DAD;
  }

  &__btn {
    display: inline-flex;
    min-height: 2.5rem;
    padding: 0.8125rem 1.5625rem;
    align-self: flex-start;
    align-items: center;
    justify-content: center;
    border: 0.0625rem solid #F66E1F;
    background: transparent;
    color: white;
    border-radius: 0.375rem;
    cursor: pointer;
    transition: background 0.2s ease;
    font-weight: 700;
    font-size: 0.8125rem;
    text-decoration: none;
    white-space: nowrap;

    &:hover {
      background: rgba(246, 110, 31, 0.1);
    }

    &:focus-visible {
      outline: 0.125rem solid #F66E1F;
      outline-offset: 0.125rem;
    }
  }

  &__arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 4;
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    border: none;
    border-radius: 0.375rem;
    cursor: pointer;
    box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.15);
    transition: background 0.2s ease, opacity 0.2s ease;

    &--prev {
      left: 1rem;
    }

    &--next {
      right: 1rem;
    }

    &:hover {
      background: #f5f5f5;
    }

    &:focus-visible {
      outline: 0.125rem solid #252536;
      outline-offset: 0.125rem;
    }

    &.swiper-button-disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  }

  &__dots {
    position: absolute;
    bottom: 3rem;
    left: 8.125rem;
    z-index: 4;
    display: flex;
    gap: 0.125rem;
  }

  :deep(.slider__dot) {
    width: 0.9375rem;
    height: 0.3125rem;
    border-radius: 0.125rem;
    background: rgba(255, 255, 255, 0.3);
    cursor: pointer;
    transition: background 0.2s ease, width 0.2s ease;
    display: inline-block;
  }

  :deep(.slider__dot--active) {
    background: #F66E1F;
    width: 1.5625rem;
  }
}

@media (max-width: 1024px) {
  .slider {
    max-height: 25rem;

    &__swiper {
      height: 25rem;
    }

    &__content {
      margin-left: 3rem;
      max-width: 28rem;
    }

    &__title {
      font-size: 2rem;
    }

    &__text {
      font-size: 1.125rem;
    }

    &__dots {
      left: 3rem;
      bottom: 2rem;
    }
  }
}

@media (max-width: 768px) {
  .slider {
    max-height: 31.25rem;

    &__swiper {
      height: 31.25rem;
    }

    &__bg {
      width: 100%;
    }

    &__gradient {
      background: linear-gradient(
        to top,
        #252536 0%,
        #252536 40%,
        rgba(37, 37, 54, 0.7) 100%
      );
    }

    &__content {
      margin-left: 1.5rem;
      margin-right: 1.5rem;
      max-width: 100%;
      align-items: center;
      text-align: center;
    }

    &__title {
      font-size: 1.75rem;
      align-items: center;
    }

    &__text {
      font-size: 1rem;
    }

    &__btn {
      align-self: center;
    }

    &__arrow {
      width: 2.5rem;
      height: 2.5rem;

      &--prev {
        left: 0.75rem;
      }

      &--next {
        right: 0.75rem;
      }
    }

    &__dots {
      left: 50%;
      transform: translateX(-50%);
      bottom: 1.5rem;
    }
  }
}

@media (max-width: 480px) {
  .slider {
    &__title {
      font-size: 1.5rem;
    }

    &__text {
      font-size: 0.875rem;
    }

    &__btn {
      min-height: 2.25rem;
      padding: 0.625rem 1.25rem;
      font-size: 0.75rem;
    }
  }
}
</style>