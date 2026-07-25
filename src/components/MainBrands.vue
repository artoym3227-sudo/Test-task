<template>
    <div class="brands-info">
        <div class="brands-info__list">
            <h2 class="brands-info__title">Производители техники</h2>
            <ul class="brands-info__brands">
                <li v-for="item in brandsList" :key="item.path" class="brands-info__item">
                    <router-link :to="item.path" class="brands-info__link">
                        <img :src="item.image" :alt="item.title" class="brands-info__img">
                    </router-link>
                </li>
            </ul>
        </div>

        <div class="brands-offers">
            <router-link to="/parts" class="brands-offers__parts">
                <p class="brands-offers__text">Запасные части</p>
                <img :src="gears" alt="" class="brands-offers__logo">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="brands-offers__arrow">
                    <path d="M19 20V1H0M19 1L2 18" stroke="#252536" stroke-width="2"/>
                </svg>
            </router-link>

            <router-link to="/machinery" class="brands-offers__machinery">
                <p class="brands-offers__text">Техника</p>
                <img :src="machinery" alt="" class="brands-offers__logo">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="brands-offers__arrow">
                    <path d="M19 20V1H0M19 1L2 18" stroke="#252536" stroke-width="2"/>
                </svg>
            </router-link>
        </div>
    </div>
</template>

<script setup>
    import brandHyudai from '@/assets/images/brands-hyundai.png'
    import brandShantui from '@/assets/images/brands-shantui.png'
    import brandSitrak from '@/assets/images/brands-sitrak.png'
    import brandAirman from '@/assets/images/brands-airman.png'
    import brandTsurumi from '@/assets/images/brands-tsurumi.png'
    import brandFrd from '@/assets/images/brands-frd.png'
    import brandTonly from '@/assets/images/brands-tonly.png'
    import machinery from  '@/assets/images/machinery.svg'
    import gears from '@/assets/images/gears.svg'
    
    const brandsList = [
        { title: 'Hyundai', image: brandHyudai, path: '/' },
        { title: 'Shantui', image: brandShantui, path: '/' },
        { title: 'Sitrak', image: brandSitrak, path: '/' },
        { title: 'Airman', image: brandAirman, path: '/' },
        { title: 'Tsurumi', image: brandTsurumi, path: '/' },
        { title: 'FRD', image: brandFrd, path: '/' },
        { title: 'Tonly', image: brandTonly, path: '/' },
    ]
</script>

<style lang="scss" scoped>
    .brands-info{
        &__list{
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            margin-top: 1.5rem;
            margin-left: 1.875rem;
            margin-right: 5.625rem;
            margin-bottom: 1.875rem;
            flex-shrink: 0;
            min-width: 1000px;
        }

        &__title{
            display: flex;
            width: 40px;
            font-size: 11px;
            font-weight: 600;
            line-height: 120%;
            color: #616175;
            white-space: wrap; 
        }

        &__brands{
            display: flex;
            flex-direction: row;
            gap: 3.125rem;
            flex-shrink: 0;
        }

        &__item {
            width: 8.75rem;
            flex-shrink: 0;
        }

        &__img{
            width: 8.75rem;
            height: 1.875rem;
            flex-shrink: 0;
            object-fit: contain;
        }
    }

    .brands-offers {
        display: flex;
        margin-left: 30px;
        margin-right: 30px;

        &__parts,
        &__machinery {
            display: flex;
            position: relative;
            width: 50%;
            height: 208px;
            text-decoration: none;
            color: inherit;
            box-sizing: border-box;
        }

        &__parts {
            margin-right: 20px;
        }

        &__text {
            align-self: flex-end;
            margin-right: auto;
            padding: 0;
            margin-bottom: 15px;
            margin-left: 15px;
        }

        &__logo {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            max-width: 80%;
            max-height: 80%;
            object-fit: contain;
        }

        &__arrow {
            position: absolute;
            top: 15px;
            right: 15px;
            width: 20px;
            height: 20px;
        }
    }
</style>