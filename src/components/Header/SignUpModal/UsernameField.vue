<template>
    <div class="form-group">

        <label class="form-control-label" for="name">Username</label>

        <input id="name"
               name="name"
               maxlength="16"
               class="form-control"
               :class="{ 'is-invalid': !isValid && !isTouched }"
               v-model="username"
               @input="validateField"
               type="text" >
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
                username: ''
            }
        },
        watch: {
            serverResponse () {
                console.log(this.serverResponse);
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

                if (!this.signalNoticed && this.serverResponse.errmsg.indexOf('username') !== -1) {
                    this.signalNoticed = true;
                    this.isValid = false;
                    this.errorMessage = 'This username already exists!';
                }
                else if (this.username.length === 0) {
                    this.isValid = false;
                    this.errorMessage = 'Field mustn\'t be empty!';

                    this.setField({
                        field: 'username',
                        state: false
                    });
                }
                else if (!this.username.match("^[A-Za-z0-9_.]+$")) {
                    this.isValid = false;
                    this.errorMessage = 'Entered username is not valid!';

                    this.setField({
                        field: 'username',
                        state: false
                    });
                }
                else {
                    this.isValid = true;

                    this.setField({
                        field: 'username',
                        state: true,
                        value: this.username
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