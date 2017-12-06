<template>
    <div>
        <h1>Welcome to WEREWOLF</h1>
        <hr>
        <h3>Dear <span v-if="!user.username" >guest!</span> <span v-else>{{ user.username }}</span> </h3>
    </div>
</template>

<script>

    import { mapGetters } from 'vuex';

    export default {
        computed:{
            ...mapGetters({
                user: 'SESSION_G_GET_CURRENT_USER'
            })
        }
    }

</script>

<style>

</style>