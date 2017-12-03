<template>

    <div class="component-app">

        <div class="container app-header-container">
            <app-header></app-header>
        </div>

        <div class="header-divider">

        </div>

        <div class="container">

            <transition name="slide" mode="out-in">
                <router-view></router-view>
            </transition>

        </div>

        <div class="error-box-wraper">

            <div class="container">
                <error-box class="errbox"></error-box>
            </div>

        </div>

    </div>

</template>

<script>

    //IMPORTED COMPONENTS
    import ErrorBox from './components/ErrorBox/ErrorBox.vue';
    import AppHeader from './components/Header/Header.vue';



    export default {
        data() {
            return {
                message: ''
            }
        },
        created() {
            this.$store.dispatch('APP_A_INIT_APP')
        },
        components: {
            ErrorBox,
            AppHeader
        }
    }
</script>

<style lang="scss">

    .header-divider {
        margin: 0 0 50px 0;
    }

    body {
        background: rgba(225, 225, 225, 1);
    }

    .slide-enter-active {
        animation: slide-in 200ms ease-out forwards;
    }

    .slide-leave-active {
        animation: slide-out 200ms ease-out forwards;
    }
    
    @keyframes slide-in {
        from {
            transform: translateY(-30px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }

    @keyframes slide-out {
        from {
            transform: translateY(0);
            opacity: 1;
        }
        to {

            transform: translateY(-30px);
            opacity: 0;
        }
    }

    .error-box-wraper {
        width: 100%;

        position: fixed;
        bottom: 10px;

        .container {

            position: relative;

        }

    }

</style>
