<template>
    <div class="form-group">

        <label class="form-control-label" for="name">Password</label>

        <input id="name"
               name="name"
               maxlength="100"
               class="form-control"
               v-model="form.password"
               type="password"
        >

    </div>
</template>

<script>
    //IMPORTED MAPPERS
    import { mapGetters } from 'vuex';

    export default {
        data () {
            return{
                errorMessage: '',
                password: '',
            }
        },
        computed: {
            ...mapGetters({
                form: 'LOGIN_G_GET_FORM'
            })
        }
    }
</script>

<style lang="scss" scoped>
    label {
        font-weight: 600;
    }
</style>

