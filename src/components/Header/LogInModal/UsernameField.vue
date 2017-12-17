<template>

    <div class="form-group">
        <label class="form-control-label" for="logInUsername">Username</label>
        <input v-model="form.email"
               class="form-control"
               id="logInUsername"
               maxlength="16"
               name="name"
               placeholder="Enter your email or username here"
               type="text">
    </div>

</template>

<script>
    //IMPORTED MAPPERS
    import { mapGetters } from 'vuex';

    export default {
        computed: {
            ...mapGetters({
                form: 'LOGIN_G_GET_FORM'
            }),
        }
    }
</script>

<style lang="scss" scoped>
    label {
        font-weight: 600;
        color: rgba(160, 160, 160, 1);
    }
</style>