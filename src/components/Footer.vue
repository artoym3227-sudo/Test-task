<template>
    <div class="footer">
        <div class="footer__top">
                <div class="footer__links">
                    <ul class="footer__nav-list">
                        <li v-for="item in serviceList" :key="item.title" class="footer__nav-item">
                            <router-link :to="item.path" class="footer__nav-link">{{ item.title }}</router-link>
                        </li>
                    </ul>
                    <ul class="footer__nav-list">
                        <li v-for="item in companyInfoList" :key="item.title" class="footer__nav-item">
                            <router-link :to="item.path" class="footer__nav-link">{{ item.title }}</router-link>
                        </li>
                    </ul>
                    <ul class="footer__nav-list">
                        <li v-for="item in infoList" :key="item.title" class="footer__nav-item">
                            <router-link :to="item.path" class="footer__nav-link">{{ item.title }}</router-link>
                        </li>
                    </ul>
                </div>
            <div class="footer__social-links">
                <div class="footer__contacts">
                    <ul class="footer__nav-list footer__nav-list--contacts">
                        <li v-for="item in socialContacts" :key="item.title" class="footer__nav-item">
                            <router-link :to="item.path" class="footer__nav-link">{{ item.title }}</router-link>
                        </li>
                    </ul>
                </div>
                <div class="footer__contacts-media">
                    <ul class="footer__nav-list footer__nav-list--media">
                        <li v-for="item in socialMediaLinks" :key="item.title" class="footer__nav-item footer__nav-item--media">
                            <router-link :to="item.path" class="footer__nav-link footer__nav-link--media">
                                <img :src="item.icon" :alt="item.title">
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="footer__top-feedback">
                <button class="footer__top-feedback-btn" type="button">Обратная связь</button>
            </div>
        </div>
        <div class="footer__bottom">
            <div class="footer__bottom-left">
                <span class="footer__copyright">© ООО «Техстройконтракт»</span>
                <router-link to="" class="footer__bottom-link">Политика конфиденциальности</router-link>
            </div>

            <router-link to="" class="footer__bottom-manager-link">Обратиться к менеджеру</router-link>

            <span class="footer__bottom-text">
                Разработка сайта — компания
                <a href="" target="_blank" class="footer__bottom-link">«Факт»</a>
            </span>
        </div>
    </div>
</template>

<script setup>
import vkLogo from '@/assets/images/vk-logo.svg'
import youtubeLogo from '@/assets/images/youtube-logo.svg'
import odnoclassLogo from '@/assets/images/odnoclass-logo.svg'
    const serviceList = [
        {title:'Запчасти', path: ''},
        {title:'Доп. оборудование', path: ''},
        {title:'Расходные материалы', path: ''},
        {title:'Ручное оборудование и насосы', path: ''},
        {title:'Техника', path: ''}
    ]
    const companyInfoList = [
        {title:'О компании', path: '/about'},
        {title:'Возвраты', path: '/returns'},
        {title:'Филиалы', path: '/branches'},
        {title:'Доставка', path: '/delivery'},
        {title:'Оплата', path: '/payment'},
        {title:'Финансирование', path: '/financing'},
    ]
    const infoList = [
        {title:'Новости', path: '/news'},
        {title:'Акции', path: '/promotions'},
        {title:'Контакты', path: '/contacts'},
    ]

    const socialContacts = [
        {title:'8-800-700-03-30', path: ''},
        {title:'+7 (495) 662-66-23', path: ''},
        {title:'tsk@gmail.com', path: ''},
    ]

    const socialMediaLinks = [
        {title:'VK', path: '', icon: vkLogo},
        {title:'Telegram', path: '', icon: youtubeLogo},
        {title:'WhatsApp', path: '', icon: odnoclassLogo},
    ]
</script>

<style lang="scss" scoped>
    .footer {
        display: flex;
        flex-direction: column;
        height: 33rem;
        justify-content: center;
        padding-top: 3rem;
        background-color: $color-dark;

        &__top{
            display: flex;
            width: 100%;
            height: 55%;
            margin-left: 3rem;
            margin-right: 3rem;
            
        }

        &__links{
            display: flex;
            flex-direction: row;
            gap:16.2rem;
            @include font(1.3rem, 1, 500, $color-white);
        }
        &__nav-list{
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            flex-wrap: nowrap;
        }

        &__nav-list--contacts{
            display: grid;
            grid-template-rows: repeat(2, auto);
            grid-auto-flow: column;
            column-gap: 5rem;
            row-gap: 1.5rem;
        }

        &__contacts{
            display: flex;
            flex-direction: row;
            @include font(1.3rem, 1.15, 500, $color-white);
            max-height: 100rem;
        }

        &__social-links{
            margin-left:21.5rem;
            margin-right:15.7rem;
            width: 31.2rem;
            max-width: 100%;

        }
        &__nav-link{
            @include hover {
            color: $color-primary;
            }

            @include focus-visible;
        }

        &__nav-link--media {
            display: block;
        }

        &__nav-list--media{
            display: flex;
            flex-direction: row;
            margin-top: 6rem;
        }
        &__nav-item--media{
            width: 4rem;
            height: 4rem;
            @include hover {
            transform: translateY(-0.2rem);
            box-shadow: 0 0.4rem 1.2rem rgba($color-black, 0.1);
        }
        }

        

        &__top-feedback-btn{
            display: flex;
            align-items: center;
            justify-content: center;
            height: 4rem;
            width: 16rem;
            flex-shrink: 0;

            background-color: $color-primary;
            border-radius: 0.6rem;
            border: none;
            outline: none;
            cursor: pointer;
            @include font(1.3rem, 1, 500, $color-white);
            @include hover {
            transform: translateY(-0.2rem);
            box-shadow: 0 0.4rem 1.2rem rgba($color-black, 0.1);
        }
           
        }

        &__bottom{
            display: flex;
            align-items: end;
            justify-content: space-between;

            margin-top: 10rem;
            margin-left: 3rem;
            margin-right: 3rem;
            padding-bottom: 2rem;
            flex-wrap: nowrap;
            @include font(1.3rem, 1, 500, $color-white);
        }

        &__bottom-left{
            display: flex;
            align-items: center;
            gap: 2rem;
        }

        &__copyright{
            @include font(1.3rem, 1.14, 500, $color-gray-light)
        }

        &__bottom-manager-link{
            color: $color-white;
            @include hover {
            color: $color-primary;
            }

            @include focus-visible;
        }

        &__bottom-link{
            color: $color-white;
            @include hover {
            color: $color-primary;
            }

            @include focus-visible;
        }
        
    }

</style>