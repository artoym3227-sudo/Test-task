<template>
    <header class="header">
        <div class="header__top">
            <nav class="header__nav">
                <ul class="header__nav-list">
                    <li v-for="item in navItems" :key="item.path" class="header__nav-item">
                        <router-link :to="item.path" class="header__nav-link">{{ item.title }}</router-link>
                    </li>
                    <li class="header__nav-item">
                        <a href="/" class="header__promo">
                            <svg class="header__promo-icon" width="0.5625rem" height="0.5625rem" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M8.78039 1.28039L1.28039 8.78039L0.219727 7.71973L7.71973 0.219727L8.78039 1.28039Z" fill="#F66E1F"/>
                                <path d="M3.75 1.875C3.75 2.91053 2.91053 3.75 1.875 3.75C0.839466 3.75 0 2.91053 0 1.875C0 0.839466 0.839466 0 1.875 0C2.91053 0 3.75 0.839466 3.75 1.875Z" fill="#F66E1F"/>
                                <path d="M9 7.125C9 8.16053 8.16053 9 7.125 9C6.08947 9 5.25 8.16053 5.25 7.125C5.25 6.08947 6.08947 5.25 7.125 5.25C8.16053 5.25 9 6.08947 9 7.125Z" fill="#F66E1F"/>
                            </svg>
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
            <img  :src="logoHeader" class="header__logo" alt="logo-of-company"></img>
            <div class="header__us-interaction">
                <div class="header__toolbar">
                    <button type="button" class="header__catalog-btn">
                        <svg class="header__catalog-icon" width="0.75rem" height="0.625rem" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="12" height="2" fill="white"/>
                            <rect y="4" width="12" height="2" fill="white"/>
                            <rect y="8" width="12" height="2" fill="white"/>
                        </svg>
                        Каталог
                    </button>
                    <div class="header__search">
                        <input type="text" placeholder="Поиск" class="header__search-input"/>
                        <svg class="header__search-icon" width="1rem" height="1rem" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.5 12C9.98528 12 12 9.98528 12 7.5C12 5.01472 9.98528 3 7.5 3C5.01472 3 3 5.01472 3 7.5C3 9.98528 5.01472 12 7.5 12Z" stroke="#9D9DAD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M13 13L11 11" stroke="#9D9DAD" stroke-width="2" stroke-linejoin="round"/>
                        </svg>
                    </div>
                </div>
                
                <div class="header__user-actions">
                    <button type="button" class="header__basket-btn" >
                        <svg class="header__basket-icon" width="0.8125rem" height="0.8125rem" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.23621 1.23624L3.1326 7.8739C3.19392 8.08856 3.39012 8.23655 3.61336 8.23655H9.23621" stroke="#252536" stroke-width="2" stroke-linecap="square"/>
                            <path d="M2.23621 2.23624H11.2362" stroke="#252536" stroke-width="2" stroke-linecap="square"/>
                            <circle cx="3.23621" cy="11.2362" r="1" fill="#252536"/>
                            <circle cx="9.23621" cy="11.2362" r="1" fill="#252536"/>
                            <path d="M3.23621 5.23624H10.2362" stroke="#252536" stroke-width="2" stroke-linecap="square"/>
                        </svg>
                        Корзина
                        <span class="header__basket-count">{{ cartCount }}</span>
                    </button>
                    
                    <button type='button' class="header__authorization-btn">
                        Войти
                    </button>
                </div>
            </div>    
        </div>
        
    </header>

</template>

<script setup>
    import logoHeader from '@/assets/images/logo-header.png'
    const navItems = [
        {title:'О компании', path: '/'},
        {title:'Возвраты', path: '/'},
        {title:'Филиалы', path: '/'},
        {title:'Доставка', path: '/'},
        {title:'Оплата', path: '/'},
        {title:'Финансирование', path: '/'},
        {title:'Новости', path: '/'},
        {title:'Контакты', path: '/'}
    ]

    let cartCount = 12
</script>

<style lang="scss" scoped>
    .header {
        border-bottom: 0.0625rem solid black;
        
        &__top {
            display: flex;
            margin-top: 1.0625rem;
            justify-content: space-between;
            margin-right: 1.875rem;
            margin-left: 1.875rem;
            font-size: 0.8125rem;
            font-weight: 500;
            line-height: 1;
            margin-bottom: 1.125rem;
            
        }

        &__nav-list {
            display: flex;
            flex-direction: row;
            gap: 0.9375rem;
            align-items: center;
            justify-content: center;
        }

        &__promo {
            display: flex;
            border: 0.0625rem solid red;
            border-style: none solid;
            padding-right: 1.25rem;
            height: 0.875rem;
            align-items: center;
            justify-content: center;
            margin-left: 3rem;
        }

        &__promo-icon {
            display: block;
            width: 0.5625rem;
            height: 0.5625rem;
            flex-shrink: 0;
            margin-right: 0.4375rem;
            margin-left: 1.375rem;
        }

        &__contacts {
            display: flex;
            gap: 0.9375rem;
            
        }




        &__bottom{
            display: flex;
            align-items: center;
            margin-left: 1.875rem;
            margin-right: 1.875rem;
            padding-bottom: 0.875rem;
            
            
        }

        &__us-interaction{
            display: flex;
            justify-content: space-between;
            width: 100%;
               
        }


        &__toolbar{
            display: flex;
            margin-left: 1.3125rem;
            gap: 0.625rem;
          
            
        }

        &__catalog-btn{
            width: 7.75rem;
            height: 2.5rem;
            border: none;
            border-radius: 0.375rem;
            background-color: #F66E1F;
            color: white;
            font-weight: 700;
            font-size: 0.8125rem;
        }

        &__catalog-icon{
            margin-right: 0.5rem;
        }

        &__search{
            position: relative;
        }

        &__search-input{
            width: 16.375rem;
            height: 2.5rem;
            padding-left: 0.9375rem;
            padding-right: 1.75rem;
            border-radius: 0.375rem;
            border: 0.0625rem solid black;
        }


        
        &__search-icon{
            position: absolute;
            right: 0.75rem;
            top: 50%;
            transform: translateY(-50%);
            pointer-events: none;
           
        }

        &__user-actions{
            display: flex;
            gap: 0.625rem;
            align-items: center;
            font-size: 0.8125rem;
            font-weight: 700;
            line-height: 100%;
        }

        &__basket-btn{
            display: flex;
            margin-left: 0.9375rem;
            width: 8.625rem;
            height: 2.5rem;
            align-items: center;
            gap: 0.25rem;
            padding-right: 0.875rem;
            padding-left: 0.875rem;
            border: 0.125rem solid #F66E1F;
            border-radius: 0.375rem;
        }

        &__basket-icon{
            display: flex;
            margin-right:0.125rem;
        }

        &__basket-count {
        background: #F66E1F;
        color: white;
        border-radius: 0.25rem;
        padding: 0.125rem 0.375rem;
        font-size: 0.6875rem;
        font-weight: 700;
        width: 1.6875rem;
        height: 1.125rem;
    }

        &__authorization-btn{
            display: flex;
            margin-left: 0.9375rem;
            width: 6.25rem;
            height: 2.5rem;
            align-items: center;
            justify-content: center;
            border: 0.125rem solid #F66E1F;
            border-radius: 0.375rem;
        }
        

    }
</style>