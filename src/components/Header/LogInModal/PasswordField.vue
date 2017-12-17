<template>
    <div class="form-group">

        <label class="form-control-label" for="logInPassword">Password</label>

        <input v-model="form.password"
               class="form-control"
               id="logInPassword"
               maxlength="100"
               name="name"
               placeholder="Enter your password"
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
        color: rgba(160, 160, 160, 1);
    }
</style>

