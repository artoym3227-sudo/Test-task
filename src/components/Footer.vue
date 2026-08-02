<template>
    <footer class="footer">
        <div class="footer__top">
            <div class="footer__links">
                <ul
                    v-for="column in linkColumns"
                    :key="column.title"
                    class="footer__nav-list"
                >
                    <li v-for="(item, key) in column.items" :key="key" class="footer__nav-item">
                        <router-link :to="item.path" class="footer__nav-link">{{ item.title }}</router-link>
                    </li>
                </ul>
            </div>

            <div class="footer__links footer__links--mobile">
                <ul
                    v-for="(column, idx) in mobileLinkColumns"
                    :key="idx"
                    class="footer__nav-list"
                >
                    <li v-for="(item, key) in column" :key="key" class="footer__nav-item">
                        <router-link :to="item.path" class="footer__nav-link">{{ item.title }}</router-link>
                    </li>
                </ul>
            </div>

            <div class="footer__social-links">
                <div class="footer__contacts">
                    <ul class="footer__nav-list footer__nav-list--contacts">
                        <li v-for="(item, key) in socialContacts" :key="key" class="footer__nav-item">
                            <router-link :to="item.path" class="footer__nav-link">{{ item.title }}</router-link>
                        </li>
                    </ul>
                </div>
                <div class="footer__contacts-media">
                    <button class="footer__feedback-btn footer__feedback-btn--mobile" type="button">Обратная связь</button>
                    <ul class="footer__nav-list footer__nav-list--media">
                        <li v-for="(item, key) in socialMediaLinks" :key="key" class="footer__nav-item">
                            <router-link :to="item.path" class="footer__nav-link">
                                <component :is="item.icon" :alt="item.title" />
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="footer__top-feedback">
                <button class="footer__feedback-btn footer__feedback-btn--desktop" type="button">Обратная связь</button>
            </div>
        </div>

        <div class="footer__bottom">
            <div class="footer__bottom-left">
                <span class="footer__copyright">© ООО «Техстройконтракт»</span>
                <router-link to="#" class="footer__bottom-link">Политика конфиденциальности</router-link>
            </div>

            <router-link to="#" class="footer__bottom-manager-link">Обратиться к менеджеру</router-link>

            <span class="footer__bottom-text">
                Разработка сайта — компания
                <a href="" target="_blank" class="footer__bottom-link">«Факт»</a>
            </span>
        </div>
    </footer>
</template>

<script setup>
import vkLogo from '@/assets/images/vk-logo.svg'
import youtubeLogo from '@/assets/images/youtube-logo.svg'
import odnoclassLogo from '@/assets/images/odnoclass-logo.svg'

const linkColumns = [
    {
        title: 'service',
        items: [
            { title: 'Запчасти', path: '' },
            { title: 'Доп. оборудование', path: '' },
            { title: 'Расходные материалы', path: '' },
            { title: 'Ручное оборудование и насосы', path: '' },
            { title: 'Техника', path: '' },
        ],
    },
    {
        title: 'company',
        items: [
            { title: 'О компании', path: '' },
            { title: 'Возвраты', path: '' },
            { title: 'Филиалы', path: '' },
            { title: 'Доставка', path: '' },
            { title: 'Оплата', path: '' },
            { title: 'Финансирование', path: '' },
        ],
    },
    {
        title: 'info',
        items: [
            { title: 'Новости', path: '' },
            { title: 'Акции', path: '' },
            { title: 'Контакты', path: '' },
        ],
    },
]

const mobileLinkColumns = [
    [
        { title: 'Каталог', path: '/catalog' },
        { title: 'О компании', path: '' },
        { title: 'Возвраты', path: '' },
        { title: 'Филиалы', path: '' },
        { title: 'Доставка', path: '' },
    ],
    [
        { title: 'Оплата', path: '' },
        { title: 'Финансирование', path: '' },
        { title: 'Новости', path: '' },
        { title: 'Акции', path: '' },
        { title: 'Контакты', path: '' },
    ],
]

const socialContacts = [
    { title: '8-800-700-03-30', path: '' },
    { title: '+7 (495) 662-66-23', path: '' },
    { title: 'tsk@gmail.com', path: '' },
]

const socialMediaLinks = [
    { title: 'VK', path: '', icon: vkLogo },
    { title: 'Telegram', path: '', icon: youtubeLogo },
    { title: 'WhatsApp', path: '', icon: odnoclassLogo },
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
        overflow-x: hidden;

        &__top {
            display: flex;
            width: 100%;
            height: 55%;
            margin-left: 3rem;
            margin-right: 3rem;
            box-sizing: border-box;
        }

        &__links {
            display: flex;
            height: 16.5rem;
            max-height: 100%;
            flex-direction: row;
            gap: 16.2rem;
            @include font(1.3rem, 1, 500, $color-white);

            &--mobile {
                display: none;
            }
        }

        &__nav-list {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            flex-wrap: nowrap;
        }

        &__nav-list--contacts {
            display: grid;
            grid-template-rows: repeat(2, auto);
            grid-auto-flow: column;
            column-gap: 5rem;
            row-gap: 1.5rem;
        }

        &__contacts {
            display: flex;
            flex-direction: row;
            @include font(1.3rem, 1.15, 500, $color-white);
            max-height: 100rem;
        }

        &__social-links {
            margin-left: 21.5rem;
            margin-right: 15.7rem;
            width: 31.2rem;
            max-width: 100%;
        }

        &__nav-link {
            @include hover {
                color: $color-primary;
            }

            @include focus-visible;
        }

        &__nav-list--media {
            display: flex;
            flex-direction: row;
            gap: 1.5rem;
            margin-top: 6rem;
            @include respond-to('mobile') {
            gap:4.5rem;
        }

            .footer__nav-item {
                width: 4rem;
                height: 4rem;
                @include hover {
                    transform: translateY(-0.2rem);
                    box-shadow: 0 0.4rem 1.2rem rgba($color-black, 0.1);
                }
            }

            .footer__nav-link {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background-color: rgba($color-white, 0.08);
            }
        }

        &__feedback-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
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

            &--desktop {
                height: 4rem;
                width: 16rem;
                flex-shrink: 0;
            }

            &--mobile {
                display: none;
                margin-bottom: 2.5rem;
                width: 100%;
            }
        }

        &__bottom {
            display: flex;
            align-items: end;
            justify-content: space-between;

            margin-top: 10rem;
            margin-left: 3rem;
            margin-right: 3rem;
            padding-bottom: 2rem;
            flex-wrap: nowrap;
            box-sizing: border-box;
            @include font(1.3rem, 1, 500, $color-white);
        }

        &__bottom-left {
            display: flex;
            align-items: center;
            gap: 2rem;
        }

        &__copyright {
            @include font(1.3rem, 1.14, 500, $color-gray-light);
        }

        &__bottom-manager-link {
            color: $color-white;
            @include hover {
                color: $color-primary;
            }

            @include focus-visible;
        }

        &__bottom-link {
            color: $color-white;
            @include hover {
                color: $color-primary;
            }

            @include focus-visible;
        }

        @include respond-to('mobile') {
            height: auto;

            &__top {
                flex-direction: column;
                align-items: stretch;
                height: auto;
                margin-left: 0;
                margin-right: 0;
                gap: 2rem;
            }

            &__links {
                display: none;
                order: 1;
                gap: 0;
                padding-bottom: 2rem;
                border-bottom: 0.1rem solid rgba($color-white, 0.1);

                &--mobile {
                    display: grid;
                    grid-template-columns: repeat(2, max-content);
                    column-gap: 9.4rem;
                    height: auto;
                }
            }

            &__nav-list {
                gap: 1.6rem;
            }

            &__nav-item {
                @include respond-to('mobile') {
                height: auto;
                margin-left: 2rem;
            }
            }

            &__social-links {
                display: contents;
                margin: 0;
                width: auto;
            }

            &__contacts {
                order: 2;
            }

            &__nav-list--contacts {
                column-gap: 5.6rem;
                row-gap: 1.5rem;
                margin-left: 0;
            }

            &__contacts-media {
                order: 3;
                display: flex;
                flex-direction: column;
            }

            &__nav-list--media {
                justify-content: center;
                margin-top: 0;
                padding-bottom: 3rem;
                order: 2;
                border-bottom: 0.1rem solid rgba($color-white, 0.1);

            }

            &__top-feedback {
                display: none;
            }

            &__feedback-btn {
                &--desktop {
                    display: none;
                }

                &--mobile {
                    display: flex;
                    width: auto;
                    order: 1;
                    height: auto;
                    padding: 1.25rem 1.25rem;
                    margin-left: 2rem;
                    margin-right: 2rem;
                    
                }
            }

            &__bottom {
                flex-direction: column;
                align-items: flex-start;
                margin-top: 0;
                margin-left: 1.6rem;
                margin-right: 1.6rem;
                padding-top: 2rem;
                padding-bottom: 2.4rem;
                gap: 1.5rem;
                @include font(1.2rem, 1, 500, $color-white);
                
            }

            &__bottom-manager-link {
                order: 1;
            }
            &__copyright{
                @include font(1.2rem, 1, 500, $color-white);
            }
           

            &__bottom-left {
                order: 2;
                flex-direction: column;
                align-items: flex-start;
                gap: 1.2rem;

                .footer__copyright {
                    order: 2;
                }

                .footer__bottom-link {
                    order: 1;
                }
            }

            &__bottom-text {
                order: 3;
                @include font(1.2rem, 1, 500, #C8C8D2);
            }

            &__bottom-link{
                @include font(1.2rem, 1, 500, #C8C8D2);
            }
        }
    }
</style>