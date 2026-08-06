<template>
    <header class="header">
        <div class="header__top">
            <nav class="header__nav">
                <ul class="header__nav-list">
                    <li v-for="(item, key) in navItems" :key="key" class="header__nav-item">
                        <router-link :to="item.path" class="header__nav-link">{{ item.title }}</router-link>
                    </li>
                    <li class="header__nav-item">
                        <a href="/" class="header__promo">
                            <promo class="header__promo-icon"/>
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
            <router-link to="#" class="header__logo">
             <logoHeader class="header__logo" alt="logo-of-company"/>
            </router-link>
            <div class="header__us-interaction">
                <div class="header__toolbar">
                    <button type="button" class="header__catalog-btn" @click="handleCatalogClick">
                        <catalogIcon class="header__catalog-icon" alt=""/>
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
                        <searchIcon alt="" class="header__search-icon" @click="handleSearch"/>
                    </div>
                </div>
                
                <div class="header__user-actions">
                    <button type="button" class="header__basket-btn" @click="handleBasketClick">
                        <basketIcon alt="" class="header__basket-icon"/>
                        Корзина
                        <span class="header__basket-count">{{ cartCount }}</span>
                    </button>
                    
                    <button type="button" class="header__authorization-btn" @click="handleAuthClick">
                        Войти
                    </button>
                </div>
            </div>    
        </div>

        <div class="header__mobile-bar">
            <div class="header__mobile-left">
                <button type="button" class="header__burger-btn" @click="toggleMobileMenu" aria-label="Меню">
                    <burgerIcon class="header__burger-icon" alt=""/>
                </button>

                <router-link to="#" class="header__mobile-logo">
                    <logoHeaderMobile alt="logo-of-company" class="header__mobile-logo-icon"/>
                </router-link>
            </div>

            <div class="header__mobile-right">
                <button type="button" class="header__mobile-action-btn" @click="handleSearch" aria-label="Поиск">
                    <searchIconMobile alt="" class="header__mobile-search-icon"/>
                </button>
                <button type="button" class="header__mobile-action-btn header__mobile-action-btn--bell" aria-label="Уведомления">
                    <bellIcon alt="" class="header__mobile-bell-icon"/>
                    <span v-if="hasNotifications" class="header__notification-dot"></span>
                </button>
                <button type="button" class="header__mobile-action-btn header__mobile-action-btn--cart" @click="handleBasketClick" aria-label="Корзина">
                    <basketIconMobile alt="" class="header__mobile-basket-icon"/>
                    <span v-if="cartCount" class="header__basket-count header__basket-count--mobile">{{ cartCount }}</span>
                </button>
                <button type="button" class="header__mobile-action-btn" @click="handleAuthClick" aria-label="Профиль">
                    <userIcon alt="" class="header__mobile-user-icon"/>
                </button>
            </div>
        </div>

        <transition name="mobile-menu">
            <div class="mobile-menu" v-if="isMobileMenuOpen">
                <div class="header__mobile-bar mobile-menu__topbar">
                    <div class="header__mobile-left">
                        <button type="button" class="header__burger-btn" @click="closeMobileMenu" aria-label="Закрыть меню">
                            <closeIcon class="mobile-menu__close-icon" />
                        </button>

                        <router-link to="#" class="header__mobile-logo" @click="closeMobileMenu">
                            <logoHeaderMobile alt="logo-of-company" class="header__mobile-logo-icon"/>
                        </router-link>
                    </div>

                    <div class="header__mobile-right">
                        <button type="button" class="header__mobile-action-btn" @click="handleSearch" aria-label="Поиск">
                            <searchIconMobile alt="" class="header__mobile-search-icon"/>
                        </button>
                        <button type="button" class="header__mobile-action-btn header__mobile-action-btn--bell" aria-label="Уведомления">
                            <bellIcon alt="" class="header__mobile-bell-icon"/>
                            <span v-if="hasNotifications" class="header__notification-dot"></span>
                        </button>
                        <button type="button" class="header__mobile-action-btn header__mobile-action-btn--cart" @click="handleBasketClick" aria-label="Корзина">
                            <basketIconMobile alt="" class="header__mobile-basket-icon"/>
                            <span v-if="cartCount" class="header__basket-count header__basket-count--mobile">{{ cartCount }}</span>
                        </button>
                        <button type="button" class="header__mobile-action-btn" @click="handleAuthClick" aria-label="Профиль">
                            <userIcon alt="" class="header__mobile-user-icon"/>
                        </button>
                    </div>
                </div>

                <div class="mobile-menu__login">
                    <p class="mobile-menu__login-text">Войти в личный кабинет</p>
                    <button type="button" class="mobile-menu__login-btn" @click="handleAuthClick">Войти</button>
                </div>

                <div class="mobile-menu__tabs">
                    <button
                        type="button"
                        class="mobile-menu__tab"
                        :class="{ 'mobile-menu__tab--active': activeTab === 'catalog' }"
                        @click="activeTab = 'catalog'"
                    >
                        <catalogIcon class="mobile-menu__tab-icon" alt=""/>
                        Каталог
                    </button>
                    <button
                        type="button"
                        class="mobile-menu__tab"
                        :class="{ 'mobile-menu__tab--active': activeTab === 'promo' }"
                        @click="activeTab = 'promo'"
                    >
                        <promo class="mobile-menu__tab-icon" alt=""/>
                        Акции
                    </button>
                </div>

                <ul class="mobile-menu__list">
                    <li v-for="(item, key) in mobileMenuItems" :key="key" class="mobile-menu__item">
                        <router-link :to="item.path" @click="closeMobileMenu" class="mobile-menu__link">
                            {{ item.title }}
                            <arrowMoreInfo class="mobile-menu__chevron" />
                        </router-link>
                    </li>
                </ul>

                <div class="mobile-menu__footer">
                    <div class="mobile-menu__footer-contacts">
                        <a href="tel:+7-800-700-03-30" class="mobile-menu__footer-phone">8-800-700-03-30</a>
                        <span class="mobile-menu__footer-note">Звонок бесплатный</span>
                    </div>
                    <div class="mobile-menu__footer-actions">
                        <a href="tel:+7-800-700-03-30" class="mobile-menu__footer-action-btn" aria-label="Позвонить">
                            <contactTelIcon/>
                        </a>
                        <a href="mailto:tsk@gmail.com" class="mobile-menu__footer-action-btn" aria-label="Написать письмо">
                            <contactEmailIcon />
                        </a>
                    </div>
                </div>
            </div>
        </transition>

        <transition name="mobile-menu-backdrop">
            <div v-if="isMobileMenuOpen" class="mobile-menu-backdrop" @click="closeMobileMenu"></div>
        </transition>
    </header>
</template>

<script setup>
import { ref, watch, onBeforeUnmount } from 'vue'

import burgerIcon from '@/assets/images/burger-icon.svg'
import logoHeaderMobile from '@/assets/images/logo-header-mobile.svg'
import bellIcon from '@/assets/images/bell-icon.svg'
import userIcon from '@/assets/images/user-icon.svg'
import basketIconMobile from '@/assets/images/basket-icon-mobile.svg'
import searchIconMobile from '@/assets/images/search-icon-mobile.svg'
import closeIcon from '@/assets/images/close-icon.svg'
import arrowMoreInfo from '@/assets/images/arrow-more-info.svg'
import contactTelIcon from '@/assets/images/contact-tel-icon.svg'
import contactEmailIcon from '@/assets/images/contact-email-icon.svg'


import logoHeader from '@/assets/images/logo-header.svg'
import promo from '@/assets/images/promo.svg'
import searchIcon from '@/assets/images/search-icon.svg'
import catalogIcon from '@/assets/images/catalog-icon.svg'
import basketIcon from '@/assets/images/basket-icon.svg'

const isMobileMenuOpen = ref(false)
const activeTab = ref('catalog')
const searchQuery = ref('')

const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
    isMobileMenuOpen.value = false
}

const handleCatalogClick = () => {}
const handleSearch = () => {}
const handleBasketClick = () => {}
const handleAuthClick = () => {}

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

const mobileMenuItems = [
    {title:'Личный кабинет', path: '/account'},
    ...navItems
]

const cartCount = ref(12)
const hasNotifications = ref(true)

watch(isMobileMenuOpen, (isOpen) => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
})


</script>

<style lang="scss" scoped>
.header {
    border-bottom: 0.1rem solid $color-black;
    margin: 1.7rem 0 0 0;
    @include font(1.3rem, 1, 500);
    @include respond-to('mobile') {
            margin: 0;
            border: none;
        }

    &__mobile-bar {
        display: none;
        @include respond-to('mobile') {
            display: flex;
            align-items: center;
            justify-content: space-between;
            
        }
    }

    &__mobile-left {
        display: flex;
        align-items: center;
        gap: 0.6rem;
    }

    &__mobile-right {
        display: flex;
        align-items: center;
        gap: 2.5rem;
        margin: 0 2rem 0 0;
    }

    &__burger-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 6rem;
        height: 6rem;
        border: none;
        background: none;
        cursor: pointer;
        flex-shrink: 0;
        &:active {
        border: 0.2rem solid $color-primary;
        border-radius: 0.6rem;
    }
    }

    &__burger-icon {
        width: 1.8rem;
        height: 1.4rem;
    }

    &__mobile-logo {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;

    }

    &__mobile-logo-icon {
        display: block;
        width: 4.9rem;
        height: 3.4rem;
        overflow: visible;
        &:active {
        border: 0.2rem solid $color-primary;
        border-radius: 0.6rem;
    }
    }

    &__mobile-action-btn {
        display: flex;
        position: relative;
        align-items: center;
        justify-content: center;
        width: 2.2rem;
        height: 2.2rem;
        border: none;
        background: none;
        cursor: pointer;
        flex-shrink: 0;
        color: $color-black;
        &:active {
        border: 0.2rem solid $color-primary;
        border-radius: 0.6rem;
    }
    }

    &__mobile-basket-icon,
    &__mobile-search-icon,
    &__mobile-bell-icon,
    &__mobile-user-icon {
        display: block;
        width: 2rem;
        height: 2rem;
        color: $color-black;
    }

     

    &__notification-dot {
        position: absolute;
        top: -0.2rem;
        right: -0.2rem;
        width: 0.4rem;
        height: 0.4rem;
        border-radius: 50%;
        background: #ff3b30;
        border: 0.1rem solid $color-white;
    }

    &__top {
        display: flex;
        justify-content: space-between;
        margin: 0 1.7rem 1.8rem 1.7rem;

        @include respond-to('mobile') {
            display: none;
        }
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
        

        @include hover {
            color: $color-primary;
            transition: color 0.4s ease;

        }

        @include focus-visible;
    }

    &__promo {
        display: flex;
        border: 0.1rem solid $color-very-gray-light;
        border-style: none solid;
        padding: 0 2.1rem 0 0;
        align-items: center;
        justify-content: center;
        margin: 0 0 0 2.5rem;
       

        @include hover {
            color: $color-primary;
            border: $color-primary; 
            transition: color 0.4s ease;
        }

        @include focus-visible;
    }

    &__promo-icon {
        display: block; 
        width: 1.2rem;
        height: 1.2rem;
        flex-shrink: 0;
        padding: 0.15rem;
        margin: 0 0.5rem 0 2.3rem;
    }

    &__contacts {
        display: flex;
        gap: 1.5rem;
    }

    &__contacts-phone,
    &__contacts-email {
        color: inherit;
        text-decoration: none;
        

        @include hover {
            color: $color-primary;
            transition: color 0.4s ease;
        }

        @include focus-visible;
    }

    &__bottom {
        display: flex;
        align-items: center;
        padding: 0 0 1.4rem 0;
        margin: 0 1.7rem 0 1.7rem;

        @include respond-to('mobile') {
            display: none;
        }
    }

    &__us-interaction {
        display: flex;
        justify-content: space-between;
        width: 100%;
        align-items: center;
    }

    &__toolbar {
        display: flex;
        margin: 0 0 0 2.1rem;
        gap: 1rem;
        align-items: center;
    }

    &__logo {
        width: 28.7rem;
        height: 3.8rem;
        max-width: 100%;
        @include hover{
            transform: translateY(-0.2rem);
            transition: transform 0.4s ease;
        }
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
        @include hover {
            background: rgba($color-primary, 0.7);
            color: $color-dark;
            transition: color 0.4s ease, background 0.4s ease;
            
            
        }
    }
 
    &__catalog-icon {
        width: 1.6rem;
        height: 1.6rem;
    }

    &__search {
        display: flex;
        max-height: 100%;
        position: relative;

        @include hover {
            .header__search-icon {
                color: $color-primary;
                transition: color 0.4s ease;
            }
        }
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

        &::placeholder {
            color: $color-gray;
            transition: color 0.4s ease;
        }

        @include hover {
            border-color: $color-primary;

            &::placeholder {
                color: $color-primary;
            }
        };

        @include focus-visible;
    }

    &__search-icon {
        position: absolute;
        width: 1.6rem;
        height: 1.6rem;
        right: 1.2rem;
        top: 50%;
        transform: translateY(-50%);
        pointer-events: none;
        color: $color-gray;
        transition: color 0.4s ease;
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
        margin: 0 0.4rem 0 0;
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

        &--mobile {
            position: absolute;
            top: -0.2rem;
            right: -0.9rem;
            width: 1.8rem;
            height: 1.1rem;
            border-radius: 0.4rem;
            border: 0.1rem solid $color-white;
            @include font(0.7rem, 1, 700);
            white-space: nowrap;
        }
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


.mobile-menu-backdrop {
    display: none;

    @include respond-to('mobile') {
        display: block;
        position: fixed;
        inset: 0;
        z-index: 999;
        background: rgba($color-black, 0.4);
    }
}

.mobile-menu {
    display: none;

    @include respond-to('mobile') {
        display: flex;
        flex-direction: column;
        position: fixed;
        inset: 0;
        z-index: 1000;
        width: 100%;
        height: 100dvh;
        background: $color-white;
        overflow-y: auto;
        color: $color-black;
        @include font(1.3rem, 1, 500);
    }


    &__topbar {
        display: flex;
        border-bottom: 0.1rem solid $color-very-gray-light;
        flex-shrink: 0;
    }

    &__close-icon {
        width: 2rem;
        height: 2rem;
        color: $color-black;
        
    }

    &__login {
        display: flex;
        flex-direction: column;
        gap: 1.4rem;
        padding: 2.5rem 2rem;
        background: $color-very-gray-light;
        flex-shrink: 0;
    }

    &__login-text {
        @include font(1.8rem, 1, 600, $color-black);
    }

    &__login-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 4rem;
        border: none;
        border-radius: 0.6rem;
        background-color: $color-primary;
        color: $color-white;
        cursor: pointer;
        @include font(1.3rem, 1, 700);
        @include hover {
            background: rgba($color-primary, 0.7);
            transition: color 0.4s ease;
        }
    }

    &__tab:first-of-type{
        border-right: 0.1rem solid $color-very-gray-light;
    }
    &__tabs {
        display: flex;
        height: 5.6rem;
        padding: 1rem 0 1rem 0;
        flex-shrink: 0;
        border-bottom: 0.1rem solid $color-very-gray-light;
    }

    &__tab {
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: center;
        gap: 0.65rem;
        padding: 0.6rem 0;
        border: none;
        border-bottom: 0.2rem solid transparent;
        background: none;
        color: $color-gray;
        cursor: pointer;
        @include font(1.5rem, 1, 600, $color-dark);

        &--active {
            color: $color-primary;
        }
    }

    &__tab-icon {
        width: 1.2rem;
        height: 1.2rem;
    }

    &__list {
        display: flex;
        flex-direction: column;
        flex: 1;
        padding: 0 2rem 0 2rem;
    }

    &__item {
        border-bottom: 0.1rem solid $color-very-gray-light;

        &:last-child {
            border-bottom: none;
        }
    }

    &__link {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1.8rem 0;
        color: $color-black;
        text-decoration: none;
        @include font(1.5rem, 1, 500, $color-dark);

        @include hover {
            color: $color-primary;
            transition: color 0.4s ease;
        }
    }

    &__chevron {
        width: 2rem;
        height: 2rem;
        color: $color-gray;
        flex-shrink: 0;
    }

    &__footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1.6rem;
        background: $color-very-gray-light;
        flex-shrink: 0;
    }

    &__footer-contacts {
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
    }

    &__footer-phone {
        color: $color-black;
        text-decoration: none;
        @include font(1.5rem, 1, 600);

        @include hover {
            color: $color-primary;
            transition: color 0.4s ease;
        }
    }

    &__footer-note {
        @include font(1.2rem, 1, 500, $color-gray-light);
    }

    &__footer-actions {
        display: flex;
        gap: 1rem;
        flex-shrink: 0;
    }

    &__footer-action-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 3.3rem;
        height: 3.3rem;
        color: $color-primary;
        flex-shrink: 0;

        svg {
            width:100%;
            height:100%
        }

        @include hover {
            background-color: $color-primary;
            color: $color-white;
            transition: color 0.4s ease;
        }
    }
}


.mobile-menu-enter-active,
.mobile-menu-leave-active {
    transition: transform 0.3s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
    transform: translateX(-100%);
}

.mobile-menu-backdrop-enter-active,
.mobile-menu-backdrop-leave-active {
    transition: opacity 0.3s ease;
}

.mobile-menu-backdrop-enter-from,
.mobile-menu-backdrop-leave-to {
    opacity: 0;
}
</style>
