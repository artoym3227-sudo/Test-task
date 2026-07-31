<template>
    <div class="header">
        <div class="header__top">
            <nav class="header__nav">
                <ul class="header__nav-list">
                    <li v-for="(item, key) in navItems" :key="key" class="header__nav-item">
                        <router-link :to="item.path" class="header__nav-link">{{ item.title }}</router-link>
                    </li>
                    <li class="header__nav-item">
                        <a href="/" class="header__promo">
                            <img :src="promo" alt="" class="header__promo-icon">
                            Акции
                        </a>
                    </li>
                </ul>
            </nav>
            <div class="header__contacts">
                <a href="tel:+7-800-700-03-30" class="header__contacts-phone">8-800-700-03-30</a>
                <a href="mailto:tsk@gmail.com" class="header__contacts-email">tsk@gmail.com</a>
            </div>
        </div>
        <div class="header__bottom">
            <img :src="logoHeader" class="header__logo" alt="logo-of-company">
            <div class="header__us-interaction">
                <div class="header__toolbar">
                    <button type="button" class="header__catalog-btn" @click="handleCatalogClick">
                        <img :src="catalogIcon" alt="" class="header__catalog-icon" />
                        Каталог
                    </button>
                    <div class="header__search">
                        <input 
                            type="text" 
                            placeholder="Поиск" 
                            class="header__search-input"
                            v-model="searchQuery"
                            @keyup.enter="handleSearch"
                        />
                        <img :src="searchIcon" alt="" class="header__search-icon" @click="handleSearch">
                    </div>
                </div>
                
                <div class="header__user-actions">
                    <button type="button" class="header__basket-btn" @click="handleBasketClick">
                        <img :src="basketIcon" alt="" class="header__basket-icon"/>
                        Корзина
                        <span class="header__basket-count">{{ cartCount }}</span>
                    </button>
                    
                    <button type="button" class="header__authorization-btn" @click="handleAuthClick">
                        Войти
                    </button>
                </div>
            </div>    
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import logoHeader from '@/assets/images/logo-header.svg'
import promo from '@/assets/images/promo.svg'
import searchIcon from '@/assets/images/search-icon.svg'
import catalogIcon from '@/assets/images/catalog-icon.svg'
import basketIcon from '@/assets/images/basket-icon.svg'

const navItems = [
    {title:'О компании', path: '/about'},
    {title:'Возвраты', path: '/returns'},
    {title:'Филиалы', path: '/branches'},
    {title:'Доставка', path: '/delivery'},
    {title:'Оплата', path: '/payment'},
    {title:'Финансирование', path: '/financing'},
    {title:'Новости', path: '/news'},
    {title:'Контакты', path: '/contacts'}
]

const cartCount = ref(12)
const searchQuery = ref('')

const emit = defineEmits(['catalog-click', 'search', 'basket-click', 'auth-click'])

const handleCatalogClick = () => {
    emit('catalog-click')
}

const handleSearch = () => {
    if (searchQuery.value.trim()) {
        emit('search', searchQuery.value)
    }
}

const handleBasketClick = () => {
    emit('basket-click')
}

const handleAuthClick = () => {
    emit('auth-click')
}
</script>

<style lang="scss" scoped>
.header {
    border-bottom: 0.1rem solid $color-black;
    margin-top: 1.7rem;
    @include font(1.3rem, 1, 500);
    
    &__top {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1.8rem;
        margin-left: 1.7rem; 
        margin-right: 1.7rem;
    }

    &__nav-list {
        display: flex;
        flex-direction: row;
        gap: 1.5rem;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }

    &__nav-link {
        color: inherit;
        text-decoration: none;
        transition: color 0.2s ease;

        @include hover {
            color: $color-primary;
        }

        @include focus-visible;
    }

    &__promo {
        display: flex;
        border: 0.1rem solid $color-very-gray-light;
        border-style: none solid;
        padding-right: 2.1rem;
        align-items: center;
        justify-content: center;
        margin-left: 2.5rem;
        transition: color 0.2s ease;

        @include hover {
            color: $color-primary;
            border: $color-primary; 
        }

        @include focus-visible;
    }

    &__promo-icon {
        display: block;
        width: 1.2rem;
        height: 1.2rem;
        flex-shrink: 0;
        padding: 0.15rem;
        margin-right: 0.5rem;
        margin-left: 2.3rem;
    }

    &__contacts {
        display: flex;
        gap: 1.5rem;
    }

    &__contacts-phone,
    &__contacts-email {
        color: inherit;
        text-decoration: none;
        transition: color 0.2s ease;

        @include hover {
            color: $color-primary;
        }

        @include focus-visible;
    }

    &__bottom {
        display: flex;
        align-items: center;
        padding-bottom: 1.4rem;
        margin-left: 1.7rem; 
        margin-right: 1.7rem;
    }

    &__us-interaction {
        display: flex;
        justify-content: space-between;
        width: 100%;
        align-items: center;
    }

    &__toolbar {
        display: flex;
        margin-left: 2.1rem;
        gap: 1rem;
        align-items: center;
    }

    &__catalog-btn {
        display: flex;
        position: relative;
        align-items: center;
        justify-content: center;
        max-height: 4rem;
        height: fit-content;
        padding: 1.2rem 2.4rem;
        gap: 0.8rem;
        border: none;
        border-radius: 0.6rem;
        background-color: $color-primary;
        color: $color-white;
        @include font(1.3rem, 1, 700);
        @include button-primary-interactive;
    }
 
    &__catalog-icon {
        width: 1.6rem;
        height: 1.6rem;
    }

    &__search {
        display: flex;
        max-height: 100%;
        position: relative;
    }

    &__search-input {
        display: flex;
        padding: 1.15rem 1.5rem;
        width: 26.2rem;
        max-width: 100%;
        max-height: 4rem;
        height: fit-content;
        border-radius: 0.6rem;
        border: 0.1rem solid $color-very-gray-light;
        transition: background 0.2s ease;

        @include button-primary-interactive;

        @include focus-visible;
    }

    &__search-icon {
        position: absolute;
        width: 1.6rem;
        height: 1.6rem;
        right: 1.2rem;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
    }

    &__user-actions {
        display: flex;
        gap: 1rem;
        align-items: center;
        justify-content: center;
        @include font(1.3rem, 1, 700);
    }

    &__basket-btn {
        display: flex;
        width: 13.8rem;
        max-height: 4rem;
        padding: 1rem;
        height: fit-content;
        align-items: center;
        justify-content: center;
        gap: 0.4rem;
        border: 0.2rem solid $color-primary;
        border-radius: 0.6rem;
        transition: background 0.2s ease;
        @include button-primary-interactive;
    }

    &__basket-icon {
        display: flex;
        margin-right: 0.4rem;
        width: 1.6rem;
        height: 1.6rem;
    }   

    &__basket-count {
        display: flex;    
        align-items: center;
        justify-content: center;
        text-align: center;
        background: $color-primary;
        color: $color-white;
        border-radius: 0.25rem;
        @include font(1.1rem, 1, 700);
        width: 2.7rem;
        height: 1.8rem;
    }

    &__authorization-btn {
        display: flex;
        max-width: 10rem;
        max-height: 4rem;
        padding: 1.25rem 3rem;
        height: 100%;
        align-items: center;
        justify-content: center;
        border: 0.2rem solid $color-primary;
        border-radius: 0.6rem;
        transition: background 0.2s ease;
        @include button-primary-interactive;
    }
}
</style>