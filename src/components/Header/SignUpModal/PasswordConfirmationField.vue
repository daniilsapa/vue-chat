<template>

    <div class="form-group">
        <label class="form-control-label" for="signUpPasswordConfirmation">Repeat your password</label>
        <input id="signUpPasswordConfirmation"
               name="name"
               maxlength="100"
               class="form-control"
               :class="{ 'is-invalid': !isValid && !isTouched }"
               v-model="passwordConfirmation"
               @input="validateField"
               type="password" >
        <div class="invalid-feedback" v-if="!isValid && !isTouched">{{ errorMessage }}</div>
    </div>

</template>

<script>

    //IMPORTED MAPPERS
    import { mapMutations } from 'vuex';
    import { mapGetters } from 'vuex';

    export default {
        data () {
            return{
                isValid: false,
                isTouched: true,
                errorMessage: '',
                passwordConfirmation: ''
            }
        },
        computed: {
            ...mapGetters({
                form: 'SIGN_UP_G_GET_FORM'
            })
        },
        methods: {
            ...mapMutations({
                setField: 'SIGN_UP_M_SET_FIELD'
            }),
            validateField () {

                if (this.isTouched) {
                    this.isTouched = false
                }

                if (this.passwordConfirmation !== this.form.password.value) {
                    this.isValid = false;
                    this.errorMessage = 'Passwords do not match!';

                    this.setField({
                        field: 'passwordConf',
                        state: false
                    });

                }
                else {
                    this.isValid = true;

                    this.setField({
                        field: 'passwordConf',
                        state: true,
                        value: this.passwordConfirmation
                    });
                }

            }
        }
    }

</script>

<style lang="scss" scoped>

    label {
        font-weight: 600;
    }

</style>