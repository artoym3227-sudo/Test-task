<template>
    <Teleport to="body">
        <Transition name="feedback-fade">
            <div
                v-if="modelValue"
                class="feedback-modal"
                @click.self="close"
            >
                <div class="feedback-modal__window" role="dialog" aria-modal="true">
                    <button
                        class="feedback-modal__close"
                        type="button"
                        aria-label="Закрыть"
                        @click="close"
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
                                :value="phone"
                                class="feedback-modal__input"
                                :class="{ 'feedback-modal__input--error': errors.phone }"
                                type="tel"
                                name="phone"
                                placeholder="+7 (___) ___-__-__"
                                inputmode="numeric"
                                @focus="onPhoneFocus"
                                @input="onPhoneInput"
                                @keydown="onPhoneKeydown"
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
import { ref, watch, onBeforeUnmount } from 'vue'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { useToast } from 'vue-toastification'
import closeIcon from '@/assets/images/close-icon.svg'

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false,
    },
})
const emit = defineEmits(['update:modelValue'])

const toast = useToast()

function close() {
    emit('update:modelValue', false)
}

function handleEsc(e) {
    if (e.key === 'Escape') close()
}

watch(
    () => props.modelValue,
    (isOpen) => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
            window.addEventListener('keydown', handleEsc)
        } else {
            document.body.style.overflow = ''
            window.removeEventListener('keydown', handleEsc)
            resetForm()
            submitSuccess.value = false
        }
    }
)

onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleEsc)
    document.body.style.overflow = ''
})

const MAX_FILE_SIZE = 5 * 1024 * 1024
const PHONE_PREFIX = '+7 ('
const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/

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

const { errors, handleSubmit, resetForm, isSubmitting, setFieldValue, setFieldError } = useForm({
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

function formatPhoneDigits(digits) {
    let result = '+7'
    if (digits.length > 0) result += ' (' + digits.slice(0, 3)
    if (digits.length >= 3) result += ')'
    if (digits.length > 3) result += ' ' + digits.slice(3, 6)
    if (digits.length > 6) result += '-' + digits.slice(6, 8)
    if (digits.length > 8) result += '-' + digits.slice(8, 10)
    return result
}

function extractDigits(rawValue) {
    let digits = rawValue.replace(/\D/g, '')
    if (digits.startsWith('7') || digits.startsWith('8')) {
        digits = digits.slice(1)
    }
    return digits.slice(0, 10)
}

function onPhoneFocus() {
    if (!phone.value) {
        phone.value = PHONE_PREFIX
    }
}

function onPhoneInput(e) {
    const digits = extractDigits(e.target.value)
    phone.value = digits.length ? formatPhoneDigits(digits) : PHONE_PREFIX
    e.target.value = phone.value
}

function onPhoneKeydown(e) {
    const allowed = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Home', 'End']
    if (allowed.includes(e.key) || e.ctrlKey || e.metaKey) return
    if (!/^\d$/.test(e.key)) {
        e.preventDefault()
    }
}

const isDragOver = ref(false)
const fileInputRef = ref(null)

function setFile(file) {
    if (!file) return

    if (file.size > MAX_FILE_SIZE) {
        setFieldValue('file', null)
        setFieldError('file', 'Файл больше 5 МБ')
        return
    }

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
    try {
        const formData = new FormData()
        formData.append('fullName', values.fullName)
        formData.append('phone', values.phone)
        formData.append('email', values.email)
        formData.append('file', values.file)
        formData.append('agree', values.agree)

        const response = await fetch('', { method: 'POST', body: formData })

        if (!response.ok) {
            throw new Error(`код ${response.status}`)
        }

        submitSuccess.value = true
        resetForm()
        setTimeout(() => {
            close()
        }, 1200)
    } catch (error) {
        console.error('feedback submit error', error)
        toast.error(`Ошибка отправки (${error.message || 'нет соединения'})`, {
            toastClassName: 'feedback-modal__toast',
            timeout: 4000,
            closeButton: false,
            icon: false,
            hideProgressBar: true,
        })
    }
})
</script>

<style lang="scss">
.feedback-modal__toast.Vue-Toastification__toast {
    min-height: auto;
    width: auto;
    max-width: 32rem;
    padding: 1rem 1.4rem;
    border-radius: 0.6rem;
    box-shadow: 0 0.2rem 0.8rem rgba($color-black, 0.2);

    .Vue-Toastification__toast-body {
        padding: 0;
        @include font(1.3rem, 1.3, 500, $color-white);
    }
}
</style>

<style lang="scss" scoped>
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
