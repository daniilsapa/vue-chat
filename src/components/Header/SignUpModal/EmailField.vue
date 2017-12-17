<template>

    <div class="form-group">

        <label class="form-control-label" for="signUpEmail">Email</label>

        <input id="signUpEmail"
               name="name"
               maxlength="100"
               class="form-control"
               :class="{ 'is-invalid': !isValid && !isTouched }"
               v-model="email"
               @input="validateField"
               type="text"
        >

        <div class="invalid-feedback" v-if="!isValid && !isTouched">{{ errorMessage }}</div>

    </div>

</template>

<script>

    //IMPORTED MAPPERS
    import { mapMutations } from 'vuex';
    import { mapGetters } from 'vuex';

    export default {
        props: ['serverResponse'],
        data () {
            return{
                isValid: false,
                isTouched: true,
                signalNoticed: false,
                errorMessage: '',
                pattern:  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                email: ''
            }
        },
        watch: {
            serverResponse () {
              this.validateField();
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

                if (!this.signalNoticed && this.serverResponse.errmsg.indexOf('email') !== -1) {
                    this.signalNoticed = true;
                    this.isValid = false;
                    this.errorMessage = 'User with this email already exists!';
                }
                else if (this.email.length === 0) {
                    this.isValid = false;
                    this.errorMessage = 'Field mustn\'t be empty!';

                    this.setField({
                        field:'email',
                        state: false
                    });
                }
                else if (!this.email.match(this.pattern)) {
                    this.isValid = false;
                    this.errorMessage = 'Entered email is not valid!';

                    this.setField({
                        field:'email',
                        state: false
                    });

                }
                else {
                    this.isValid = true;

                    this.setField({
                        field:'email',
                        state: true,
                        value: this.email
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


