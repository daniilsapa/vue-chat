<template>

    <div class="form-group">
        <label class="form-control-label" for="name">Username</label>
        <input id="name"
               name="name"
               maxlength="16"
               class="form-control"
               v-model="form.email"
               type="text"
        >
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
    }
</style>