<template>
    <div class="promo-info">
        <ul class="promo-info__list">
            <li class="promo-info__item">
                <router-link to="#" class="promo-info__banner">
                    <arrowMoreDeatails alt="" class="promo-info__banner__arrow"/>
                    <span class="promo-info__banner__text">
                        Все акции <span class="promo-info__banner__count">{{ promoCount }}</span>
                    </span>
                </router-link>
            </li>

            <li
                v-for="(item, key) in promoItems"
                :key="key"
                class="promo-info__item"
            >
                <div class="promo-info__card">
                    <img
                        :src="item.image"
                        :alt="item.title"
                        class="promo-info__img"
                        loading="lazy"
                    >
                    <div class="promo-info__content">
                        <h3 class="promo-info__title">{{ item.title }}</h3>
                        <p class="promo-info__desc">{{ item.description }}</p>
                        <router-link :to="item.path" class="promo-info__btn">
                            Подробнее
                        </router-link>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup>
import engines from '@/assets/images/engines.png'
import machineryQuarry from '@/assets/images/machinery-quarry.png'
import engineImage from '@/assets/images/engine-parts.png'
import machineryService from '@/assets/images/machinery-service.png'
import loader from '@/assets/images/loader.png'
import arrowMoreDeatails from '@/assets/images/arrow-more-details.svg'
const promoCount = 37

const promoItems = [
    {
        title: 'Широкая линейка двигателей на спецтехнику',
        description: 'Строительно-дорожная техника и запчасти от ведущих мировых производителей',
        image: engines,
        path: '/brands/shantui',
    },
    {
        title: 'Продажи Сверхкрупногабаритных шин (СКГШ)',
        description: 'Индивидуальный подход к подбору шин с учетом условий эксплуатации.',
        image: machineryQuarry,
        path: '/brands/sitrak',
    },
    {
        title: 'Распродажа запчастей по специальным ценам',
        description: 'Распродажа складских остатков оригинальных запасных частей на технику hitachi, new holland, case, kobelco, cat, komatsu',
        image: engineImage,
        path: '/brands/airman',
    },
    {
        title: 'Техническая и сервисная послепродажная поддержка',
        description: 'Профессиональный штат сотрудников, имеющих опыт сопровождения шин на горнорудных предприятиях',
        image: machineryService,
        path: '/brands/tsurumi',
    },
    {
        title: 'Техника по специальным ценам',
        description: 'Строительно-дорожная техника',
        image: loader,
        path: '/brands/frd',
    },
]
</script>

<style lang="scss" scoped>
.promo-info {
    margin-left: 3rem;
    margin-right: 3rem;
    margin-bottom: 3.2rem;
    margin-top: 4.1rem;

    @include respond-to('mobile') {
        margin-left: 2rem;
        margin-right: 2rem;
        margin-bottom: 2rem;
    }

    &__list {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1.5rem;
        list-style: none;
        margin: 0;
        padding: 0;

        @include respond-to('mobile') {
            grid-template-columns: 1fr;
            gap: 2rem;
        }
    }

    &__item {
        max-width: 100%;
        cursor: pointer;
        @include hover {
            transform: translateY(-0.2rem);
            box-shadow: 0 0.4rem 1.2rem rgba($color-black, 0.1);
        }

        @include respond-to('mobile') {
            height: auto;

            &:not(:first-child) {
                margin-bottom: 1rem;
            }
        }
    }

    &__banner {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        padding: 3rem 3rem 2.4rem 3.2rem;
        border-radius: 1.2rem;
        background: $color-primary;
        @include font(2.4rem, 1, 600, $color-white);
        @include hover {
            transform: translateY(-0.2rem);
            box-shadow: 0 0.4rem 1.2rem rgba($color-black, 0.1);
            color: rgba($color-black, 0.7);
        }

        @include respond-to('mobile') {
            height: 22rem;
            max-height: 100%;
            padding: 2.4rem 2.4rem 2rem 2.4rem;
        }

        &__arrow {
            width: 1.9rem;
            height: 1.9rem;
            align-self: flex-end;
            overflow: visible;
            @include hover {
                color: rgba($color-black, 0.7);
            }
        }

        &__text {
            display: flex;
            gap: 0.7rem;
            align-items: baseline;
        }

        &__count {
            width: 2.8rem;
            height: 2.8rem;
            line-height: 1;
            opacity: 0.5;
            @include hover {
                color: rgba($color-black, 0.7);
            }
        }
    }

    &__card {
        display: flex;
        align-items: center;
        gap: 2rem;
        height: 100%;
        padding: 0.5rem;
        background: $color-white;

        @include respond-to('mobile') {
            flex-direction: column;
            align-items: stretch;
            gap:0rem;
            padding: 0;
        }
    }

    &__img {
        max-width: 31.5rem;
        height: auto;
        border-radius: 0.6rem;
        object-fit: cover;
        flex-shrink: 0;

        @include respond-to('mobile') {
            max-width: 100%;
            width: 100%;
            height: 18rem;
            margin-bottom: 1rem;
        }
    }

    &__content {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        @include respond-to('mobile') {
            gap:0;
        }
    }

    &__title {
        @include font(1.8rem, 1.1, 700, $color-dark);
        width: 32rem;
        max-width: 100%;

        @include respond-to('mobile') {
            width: 100%;
            margin-bottom: 1rem;
        }
    }

    &__desc {
        @include font(1.4rem, 1.25, 500, $color-gray-light);
        width: 37rem;
        max-width: 100%;

        @include respond-to('mobile') {
            width: 100%;
            margin-bottom: 1.5rem;
        }
    }

    &__btn {
        display: inline-block;
        align-self: flex-start;
        margin-top: 0.8rem;
        padding: 0.8rem 1.3rem;
        border-radius: 0.6rem;
        background: $color-primary;
        @include font(1.3rem, 1, 700, $color-white);
        @include button-primary-interactive;
        @include respond-to('mobile') {
            margin-top: 0;
        }
    }
}
</style>