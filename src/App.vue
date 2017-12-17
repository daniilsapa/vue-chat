<template>
    <div class="component-app">

        <div class="container app-header-container">
            <app-header></app-header>
        </div>

        <div class="header-divider"></div>

        <div class="container">
            <app-content></app-content>
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
    import AppHeader from './components/Header/Header.vue';
    import AppContent from './components/Content/Content.vue'
    import ErrorBox from './components/ErrorBox/ErrorBox.vue';

    export default {
        created() {
            this.$store.dispatch('APP_A_INIT_APP')
        },
        components: {
            AppHeader,
            AppContent,
            ErrorBox,
        }
    }
</script>

<style lang="scss">
    .header-divider {
        margin: 0 0 10px 0;
    }

    body {
        background: rgba(245, 245, 245, 1);
    }

    .error-box-wraper {
        width: 100%;

        position: fixed;
        bottom: 10px;
        z-index: 9999;

        .container {
            position: relative;
        }
    }
</style>
