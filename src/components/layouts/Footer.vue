<template>
    <footer class="footer">
        <div class="footer__container">
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
                    <button
                        class="footer__feedback-btn footer__feedback-btn--mobile"
                        type="button"
                        @click="openFeedback"
                    >
                        Обратная связь
                    </button>
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
                <button
                    class="footer__feedback-btn footer__feedback-btn--desktop"
                    type="button"
                    @click="openFeedback"
                >
                    Обратная связь
                </button>
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
        </div>
    </footer>

    <Teleport to="body">
        <Transition name="feedback-fade">
            <div
                v-if="isFeedbackOpen"
                class="feedback-modal"
                @click.self="closeFeedback"
            >
                <div class="feedback-modal__window" role="dialog" aria-modal="true">
                    <button
                        class="feedback-modal__close"
                        type="button"
                        aria-label="Закрыть"
                        @click="closeFeedback"
                    >
                        <closeIcon/>
                    </button>

                    <h3 class="feedback-modal__title">Обратная связь</h3>
                    <p class="feedback-modal__subtitle">Оставьте заявку, и мы свяжемся с вами в ближайшее время</p>

                    <form class="feedback-modal__form" novalidate @submit="onSubmit">

                        <div class="feedback-modal__field">
                            <input
                                v-model="fullName"
                                class="feedback-modal__input"
                                :class="{ 'feedback-modal__input--error': errors.fullName }"
                                type="text"
                                name="fullName"
                                placeholder="ФИО"
                            />
                            <span v-if="errors.fullName" class="feedback-modal__error">{{ errors.fullName }}</span>
                        </div>
                        <div class="feedback-modal__field">
                            <input
                                v-model="phone"
                                class="feedback-modal__input"
                                :class="{ 'feedback-modal__input--error': errors.phone }"
                                type="tel"
                                name="phone"
                                placeholder="+7 (___) ___-__-__"
                            />
                            <span v-if="errors.phone" class="feedback-modal__error">{{ errors.phone }}</span>
                        </div>

                        <div class="feedback-modal__field">
                            <input
                                v-model="email"
                                class="feedback-modal__input"
                                :class="{ 'feedback-modal__input--error': errors.email }"
                                type="email"
                                name="email"
                                placeholder="Email"
                            />
                            <span v-if="errors.email" class="feedback-modal__error">{{ errors.email }}</span>
                        </div>

                        <div class="feedback-modal__field">
                            <div
                                class="feedback-modal__dropzone"
                                :class="{
                                    'feedback-modal__dropzone--active': isDragOver,
                                    'feedback-modal__dropzone--error': errors.file,
                                    'feedback-modal__dropzone--filled': fileValue,
                                }"
                                @dragover.prevent="isDragOver = true"
                                @dragleave.prevent="isDragOver = false"
                                @drop.prevent="handleDrop"
                                @click="fileInputRef.click()"
                            >
                                <input
                                    ref="fileInputRef"
                                    class="feedback-modal__file-input"
                                    type="file"
                                    name="file"
                                    @change="handleFileChange"
                                />

                                <template v-if="!fileValue">
                                    <span class="feedback-modal__dropzone-text">
                                        Перетащите файл сюда или <span class="feedback-modal__dropzone-link">выберите</span>
                                    </span>
                                    <span class="feedback-modal__dropzone-hint">Один файл, до 5 МБ</span>
                                </template>

                                <template v-else>
                                    <div class="feedback-modal__file-info">
                                        
                                        <div class="feedback-modal__file-meta">
                                            <span class="feedback-modal__file-name">{{ fileValue.name }}</span>
                                            <span class="feedback-modal__file-size">{{ formatFileSize(fileValue.size) }}</span>
                                        </div>
                                        <button
                                            type="button"
                                            class="feedback-modal__file-remove"
                                            aria-label="Удалить файл"
                                            @click.stop="removeFile"
                                        >
                                        <closeIcon/>
                                        </button>
                                    </div>
                                </template>
                            </div>
                            <span v-if="errors.file" class="feedback-modal__error">{{ errors.file }}</span>
                        </div>

                        <div class="feedback-modal__field">
                            <label class="feedback-modal__checkbox-label">
                                <input
                                    v-model="agree"
                                    type="checkbox"
                                    name="agree"
                                    class="feedback-modal__checkbox"
                                    :class="{ 'feedback-modal__checkbox--error': errors.agree }"
                                />
                                <span class="feedback-modal__checkbox-text">
                                    Согласен(-на) на обработку персональных данных
                                </span>
                            </label>
                            <span v-if="errors.agree" class="feedback-modal__error">{{ errors.agree }}</span>
                        </div>

                        <button class="feedback-modal__submit" type="submit" :disabled="isSubmitting">
                            {{ isSubmitting ? 'Отправка...' : 'Отправить' }}
                        </button>

                        <p v-if="submitSuccess" class="feedback-modal__success">
                            Заявка отправлена.
                        </p>
                    </form>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup>
import { ref, onBeforeUnmount } from 'vue'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import vkLogo from '@/assets/images/vk-logo.svg'
import youtubeLogo from '@/assets/images/youtube-logo.svg'
import odnoclassLogo from '@/assets/images/odnoclass-logo.svg'
import closeIcon from '@/assets/images/close-icon.svg'
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


const isFeedbackOpen = ref(false)

function openFeedback() {
    isFeedbackOpen.value = true
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleEsc)
}

function closeFeedback() {
    isFeedbackOpen.value = false
    document.body.style.overflow = ''
    window.removeEventListener('keydown', handleEsc)
    resetForm()
    submitSuccess.value = false
}

function handleEsc(e) {
    if (e.key === 'Escape') closeFeedback()
}

onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleEsc)
    document.body.style.overflow = ''
})


const MAX_FILE_SIZE = 5 * 1024 * 1024
const phoneRegex = /^(?:\+7|8|7)[\s-]?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/

const validationSchema = yup.object({
    fullName: yup
        .string()
        .trim()
        .required('Введите ФИО')
        .min(2, 'Слишком короткое имя')
        .matches(/^[а-яёА-ЯЁa-zA-Z\s-]+$/, 'Допустимы только буквы'),
    phone: yup
        .string()
        .trim()
        .required('Введите телефон')
        .matches(phoneRegex, 'Формат: +7 (999) 999-99-99'),
    email: yup
        .string()
        .trim()
        .required('Введите email')
        .email('Некорректный email'),
    file: yup
        .mixed()
        .required('Прикрепите файл')
        .test('fileSize', 'Файл больше 5 МБ', (value) => !value || value.size <= MAX_FILE_SIZE),
    agree: yup
        .boolean()
        .oneOf([true], 'Необходимо согласие на обработку персональных данных'),
})

const { errors, handleSubmit, resetForm, isSubmitting, setFieldValue } = useForm({
    validationSchema,
    initialValues: {
        fullName: '',
        phone: '',
        email: '',
        file: null,
        agree: false,
    },
})

const { value: fullName } = useField('fullName')
const { value: phone } = useField('phone')
const { value: email } = useField('email')
const { value: agree } = useField('agree')
const { value: fileValue } = useField('file')


const isDragOver = ref(false)
const fileInputRef = ref(null)

function setFile(file) {
    if (!file) return
    setFieldValue('file', file)
}

function handleFileChange(e) {
    const file = e.target.files?.[0]
    setFile(file)
    e.target.value = ''
}

function handleDrop(e) {
    isDragOver.value = false
    const file = e.dataTransfer.files?.[0]
    setFile(file)
}

function removeFile() {
    setFieldValue('file', null)
}

function formatFileSize(bytes) {
    if (bytes < 1024) return `${bytes} Б`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} КБ`
    return `${(bytes / (1024 * 1024)).toFixed(1)} МБ`
}


const submitSuccess = ref(false)

const onSubmit = handleSubmit(async (values) => {
    const formData = new FormData()
    formData.append('fullName', values.fullName)
    formData.append('phone', values.phone)
    formData.append('email', values.email)
    formData.append('file', values.file)
    formData.append('agree', values.agree)


    await fetch('', { method: 'POST', body: formData })
    console.log('feedback submit', Object.fromEntries(formData))

    submitSuccess.value = true
    resetForm()
    setTimeout(() => {
        closeFeedback()
    }, 1200)
})
</script>

<style lang="scss" scoped>
    .footer {
        display: flex;
        flex-direction: column;
        height: 33rem;
        justify-content: center;
        align-items: center;
        padding-left: 3rem;
        padding-right: 3rem;
        padding-top: 3rem;
        background-color: $color-dark;
        overflow-x: hidden;
        @include respond-to('mobile') {
            padding-left: 0rem;
            padding-right: 0rem;
            align-items: normal;
            width: 100%;
                }


        &__container{
            max-width: 1920px;
            
            
        }
        &__top {
            display: flex;
            width: 100%;
            height: 55%;
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
                padding-left: 3rem;
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
                transition: color 0.4s ease;
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
                    transition: transform 0.4s ease;
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
                transition: transform 0.4s ease;
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
                transition: color 0.4s ease;
            }

            @include focus-visible;
        }

        &__bottom-link {
            color: $color-white;
            @include hover {
                color: $color-primary;
                transition: color 0.4s ease;
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
                padding-left: 3rem;
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
                pointer-events: none;
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

<style lang="scss">
.feedback-modal {
    position: fixed;
    inset: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.6);
    padding: 2rem;
    box-sizing: border-box;

    &__window {
        position: relative;
        width: 100%;
        max-width: 46rem;
        max-height: 90vh;
        overflow-y: auto;
        background-color: $color-dark;
        border-radius: 1.2rem;
        padding: 4rem 3.2rem 3.2rem;
        box-sizing: border-box;
    }

    &__close {
        position: absolute;
        top: 1.6rem;
        right: 1.6rem;
        width: 3.2rem;
        height: 3.2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        background: rgba($color-white, 0.08);
        border-radius: 50%;
        color: $color-white;
        cursor: pointer;
        transition: background-color 0.3s ease;

        &:hover {
            background-color: $color-primary;
        }
    }

    &__title {
        @include font(2.2rem, 1.2, 600, $color-white);
        margin: 0 0 0.8rem;
    }

    &__subtitle {
        @include font(1.4rem, 1.4, 400, $color-gray-light);
        margin: 0 0 2.4rem;
    }

    &__form {
        display: flex;
        flex-direction: column;
        gap: 1.6rem;
    }

    &__field {
        display: flex;
        flex-direction: column;
        gap: 0.6rem;
    }

    &__input {
        width: 100%;
        box-sizing: border-box;
        background-color: rgba($color-white, 0.06);
        border: 0.1rem solid rgba($color-white, 0.12);
        border-radius: 0.6rem;
        padding: 1.2rem 1.4rem;
        @include font(1.4rem, 1.2, 400, $color-white);
        outline: none;
        transition: border-color 0.3s ease;

        &::placeholder {
            color: $color-gray-light;
        }

        &:focus {
            border-color: $color-primary;
        }

        &--error {
            border-color: #e6584f;
        }
    }

    &__error {
        @include font(1.2rem, 1.3, 400, #e6584f);
    }

    &__dropzone {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.6rem;
        min-height: 5rem;
        border: 0.1rem dashed rgba($color-white, 0.24);
        border-radius: 0.8rem;
        padding: 1.6rem;
        box-sizing: border-box;
        cursor: pointer;
        color: $color-gray-light;
        transition: border-color 0.3s ease, background-color 0.3s ease;

        &:hover {
            border-color: $color-primary;
        }

        &--active {
            border-color: $color-primary;
            background-color: rgba($color-primary, 0.08);
        }

        &--error {
            border-color: #e6584f;
        }

        &--filled {
            cursor: default;
            align-items: stretch;
            justify-content: center;
            padding: 1.2rem 1.4rem;
        }
    }

    &__file-input {
        position: absolute;
        inset: 0;
        opacity: 0;
        pointer-events: none;
    }

    &__dropzone-icon {
        color: $color-gray-light;
    }

    &__dropzone-text {
        @include font(1.3rem, 1.3, 400, $color-gray-light);
        text-align: center;
    }

    &__dropzone-link {
        color: $color-primary;
        text-decoration: underline;
    }

    &__dropzone-hint {
        @include font(1.1rem, 1, 400, rgba($color-gray-light, 0.7));
    }

    &__file-info {
        display: flex;
        align-items: center;
        gap: 1.2rem;
        color: $color-white;
    }

    &__file-meta {
        display: flex;
        flex-direction: column;
        gap: 0.2rem;
        min-width: 0;
        flex: 1;
    }

    &__file-name {
        @include font(1.3rem, 1.2, 500, $color-white);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    &__file-size {
        @include font(1.1rem, 1, 400, $color-gray-light);
    }

    &__file-remove {
        flex-shrink: 0;
        width: 2.6rem;
        height: 2.6rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        border-radius: 50%;
        background: rgba($color-white, 0.08);
        color: $color-white;
        cursor: pointer;
        transition: background-color 0.3s ease;

        &:hover {
            background-color: #e6584f;
        }
    }


    &__checkbox-label {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        cursor: pointer;
    }

    &__checkbox {
        flex-shrink: 0;
        width: 1.8rem;
        height: 1.8rem;
        margin-top: 0.1rem;
        accent-color: $color-primary;
        cursor: pointer;

        &--error {
            outline: 0.1rem solid #e6584f;
            outline-offset: 0.2rem;
        }
    }

    &__checkbox-text {
        @include font(1.3rem, 1.4, 400, $color-gray-light);
    }

    &__submit {
        margin-top: 0.8rem;
        height: 4.4rem;
        border: none;
        border-radius: 0.6rem;
        background-color: $color-primary;
        cursor: pointer;
        @include font(1.4rem, 1, 600, $color-white);
        transition: transform 0.3s ease, opacity 0.3s ease;

        &:hover {
            transform: translateY(-0.2rem);
        }

        &:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
        }
    }

    &__success {
        margin: 0;
        text-align: center;
        @include font(1.3rem, 1.3, 500, #4caf50);
    }

    @include respond-to('mobile') {
        padding: 0;
        align-items: flex-end;

        &__window {
            max-width: 100%;
            max-height: 92vh;
            max-height: 92dvh;
            border-radius: 1.2rem 1.2rem 0 0;
            padding: 2.4rem 1.6rem 1.6rem;
        }

        &__close {
            top: 1.2rem;
            right: 1.2rem;
            width: 2.8rem;
            height: 2.8rem;
        }

        &__title {
            @include font(1.8rem, 1.2, 600, $color-white);
            margin: 0 0 0.4rem;
        }

        &__subtitle {
            @include font(1.2rem, 1.3, 400, $color-gray-light);
            margin: 0 0 1.6rem;
        }

        &__form {
            gap: 1rem;
        }

        &__field {
            gap: 0.4rem;
        }

        &__input {
            padding: 1rem 1.2rem;
            @include font(1.3rem, 1.2, 400, $color-white);
        }

        &__error {
            @include font(1.1rem, 1.2, 400, #e6584f);
        }

        &__dropzone {
            min-height: 4rem;
            padding: 1.2rem;
            gap: 0.4rem;

            &--filled {
                padding: 1rem 1.2rem;
            }
        }

        &__dropzone-text {
            @include font(1.2rem, 1.2, 400, $color-gray-light);
        }

        &__dropzone-hint {
            @include font(1rem, 1, 400, rgba($color-gray-light, 0.7));
        }

        &__file-name {
            @include font(1.2rem, 1.2, 500, $color-white);
        }

        &__file-remove {
            width: 2.2rem;
            height: 2.2rem;
        }

        &__checkbox-text {
            @include font(1.2rem, 1.3, 400, $color-gray-light);
        }

        &__submit {
            height: 4rem;
            margin-top: 0.4rem;
            @include font(1.3rem, 1, 600, $color-white);
        }
    }
}

.feedback-fade-enter-active,
.feedback-fade-leave-active {
    transition: opacity 0.25s ease;
}
.feedback-fade-enter-from,
.feedback-fade-leave-to {
    opacity: 0;
}
</style>
