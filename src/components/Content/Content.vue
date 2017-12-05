<template>
    <div class="row">

        <div class="col-lg-2 col-md-3">
            <side-bar></side-bar>
        </div>

        <router-view class="col-lg-10 col-md-9"></router-view>

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

<style lang="scss" scoped></style>