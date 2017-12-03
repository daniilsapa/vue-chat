<template>

    <div class="form-group">

        <label class="form-control-label" for="name">Password</label>

        <input id="name"
               name="name"
               maxlength="100"
               class="form-control"
               :class="{ 'is-invalid': !isValid && !isTouched }"
               v-model="password"
               @input="validateField"
               type="password"
        >

        <div class="invalid-feedback" v-if="!isValid && !isTouched">{{ errorMessage }}</div>

    </div>

</template>

<script>

    //IMPORTED MAPPERS
    import { mapMutations } from 'vuex';

    export default {
        data () {
            return{
                isValid: false,
                isTouched: true,
                errorMessage: '',
                password: ''
            }
        },
        methods: {
            ...mapMutations({
                setField: 'SIGN_UP_M_SET_FIELD'
            }),
            validateField () {

                if (this.isTouched) {
                    this.isTouched = false
                }

                if (this.password.length === 0) {
                    this.isValid = false;
                    this.errorMessage = 'Field mustn\'t be empty!';

                    this.setField({
                        field: 'password',
                        state: false
                    });
                }
                else if (this.password.length < 8) {
                    this.isValid = false;
                    this.errorMessage = 'Entered password is too short!';

                    this.setField({
                        field: 'password',
                        state: false
                    });
                }
                else if (!this.password.match("^[A-Za-z0-9]+$")) {
                    this.isValid = false;
                    this.errorMessage = 'Entered password is not valid!';

                    this.setField({
                        field: 'password',
                        state: false
                    });
                }
                else {
                    this.isValid = true;

                    this.setField({
                        field: 'password',
                        state: true,
                        value: this.password
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

