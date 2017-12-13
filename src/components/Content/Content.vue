<template>
    <div class="row">

        <div class="col-lg-2 col-md-3">
            <side-bar></side-bar>
        </div>

        <transition name="slide" mode="out-in">
            <router-view class="col-lg-10 col-md-9"></router-view>
        </transition>

    </div>
</template>

<script>
    //IMPORTED COMPONENTS
    import SideBar from './SideBar/SideBar.vue'

    import { mapGetters } from 'vuex'

    export default {
        components: {
            SideBar
        }
    }
</script>

<style lang="scss" scoped>

    /*ANIMATIONS*/
    .slide-enter {
        opacity: 0;
    }

    .slide-enter-to {
        animation: slide-in 250ms ease-out forwards;
        transition: opacity .5s;
        opacity: 1;
    }

    .slade-leave {
        opacity: 0;
        transform: translateX(0);
    }

    .slide-leave-to {
        transition: opacity .5s ease;
        opacity: 0;
        animation: slide-out 250ms ease-out forwards;
    }

    @keyframes slide-in {
        from {
            transform: translateX(-30px);
        }
        to {
            transform: translateX(0);
        }
    }

    @keyframes slide-out {
        from {
            transform: translateX(0);
        }
        to {
            transform: translateX(-30px);
        }
    }
</style>