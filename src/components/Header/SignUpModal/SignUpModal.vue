<template>
    <div class="modal fade" id="SignUpModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">

            <div class="modal-content">

                <div class="modal-header">
                    <h2 class="modal-title" id="exampleModalLabel">Sign up on <span class="logo">Werewolf</span></h2>

                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <div class="modal-body">

                    <form>

                        <hr class="modal-divider">

                        <username-field :serverResponse="serverResponse"></username-field>

                        <email-field :serverResponse="serverResponse"></email-field>

                        <password-field></password-field>

                        <password-confirmation-field></password-confirmation-field>

                        <phone-field></phone-field>

                        <age-field></age-field>

                        <div class="form-group">
                            <label class="label">Choose your gender</label>
                            <switcher></switcher>
                        </div>

                    </form>

                    <hr class="modal-divider">

                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" :disabled="!formIsValid" @click="submit">Submit</button>
                </div>

            </div>

        </div>
    </div>
</template>

<script>

    //IMPORTED COMPONENTS
    import UsernameField from './UsernameField.vue';
    import EmailField from './EmailField.vue';
    import PasswordField from './PasswordField.vue';
    import PasswordConfirmationField from './PasswordConfirmationField.vue';
    import PhoneField from './PhoneField.vue';

    import AgeField from './AgeField.vue';
    import Switcher from './Switcher.vue';

    //IMPORTED MAPPERS
    import { mapActions } from 'vuex';
    import { mapGetters } from 'vuex';
    import { mapMutations } from 'vuex';

    export default {
        data () {
            return {
                pass: false,

            }
        },
        computed: {
            ...mapGetters({
                form: 'SIGN_UP_G_GET_FORM',
                formIsValid: 'SIGN_UP_G_GET_IS_VALID',
                serverResponse: 'SIGN_UP_G_GET_SERVER_RESPONSE'
            })
        },
        watch: {
            form: {
                handler() {
                    console.log('SignUP form was changed');
                    this.validateForm();
                },
                deep: true
            }
        },
        methods: {
            ...mapActions({
                submit: 'LOGIN_SEND_A_SIGN_UP_REQUEST'
            }),
            ...mapMutations({
                validateForm: 'SIGN_UP_M_VALIDATE_FORM'
            })
        },
        components: {
            UsernameField,
            EmailField,
            PasswordField,
            PasswordConfirmationField,
            PhoneField,
            AgeField,
            Switcher
        },
        created() {
            console.log(' FORM FORM FORM',this.form)
//            SignUp.$on('serverSignal', serverSignal => {
//
//                this.serverSignal = serverSignal;
//
//            });

        }
    }

</script>

<style lang="scss" scoped>

    $primaryColor: rgba(0, 123, 255, 1);

    .logo {
        color: $primaryColor;
    }

    .modal-divider {
        background: rgba(220, 220, 220, 1);
    }

    .label {
        font-weight: 600;
    }

</style>