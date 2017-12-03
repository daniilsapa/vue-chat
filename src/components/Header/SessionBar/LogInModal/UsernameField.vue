<template>

    <div class="form-group">
        <label class="form-control-label" for="name">Username</label>
        <input id="name"
               name="name"
               maxlength="16"
               class="form-control"
               v-model="form.email"
               type="text"
               @input="validate"
        >
        <div class="invalid-feedback" v-if="!isValid && !isTouched">{{ errorMessage }}</div>
    </div>

</template>

<script>

    //IMPORTED MAPPERS
    import { mapGetters } from 'vuex';

    export default {
        props: ['serverSignal'],
        data () {
            return{
                signalNoticed: false,
                errorMessage: '',

            }
        },
        computed: {
            ...mapGetters({
                form: 'LOGIN_G_GET_FORM'
            }),
        },
        watch: {
            serverSignal () {
                console.log(this.serverSignal);
                this.validateField();
            }
        },
        methods: {

        }
    }

</script>

<style lang="scss" scoped>

    label {
        font-weight: 600;
    }

</style>