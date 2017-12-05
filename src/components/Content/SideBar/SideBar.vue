<template>

    <ul class="nav flex-column">
        <li class="nav-item">
            <router-link tag="div" class="nav-link" active-class="text-info" to="/" exact>Home</router-link>
        </li>
        <li class="nav-item">
            <router-link tag="div" class="nav-link" active-class="text-info" to="/profile">Profile</router-link>
        </li>
        <li class="nav-item">
            <router-link tag="div" class="nav-link" active-class="text-info" to="/chats">Chats</router-link>
        </li>
        <li class="nav-item">
            <router-link tag="div" class="nav-link" active-class="text-info" to="/notifications">Notifications</router-link>
        </li>
    </ul>

</template>

<script>

    import { mapGetters } from 'vuex'

    export default {

    }

</script>

<style lang="scss" scoped>

    .nav-link {
        font-weight: 500;

        cursor: pointer;
    }

</style>