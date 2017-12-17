

<template>
    <transition name="modal">
        <div class="modal-mask" v-show="show">
            <div class="container">

                <div class="text-right close-modal">
                    <i class="fa fa-times" aria-hidden="true" @click="$emit('close')"></i>
                </div>

                <div class="modal-header">
                    <h2 class="modal-title" id="exampleModalLabel">Sign up on <span class="logo">Werewolf</span></h2>
                </div>

                <div class="modal-body">

                    <form>
                        <div class="row">
                            <div class="col">
                                <username-field :serverResponse="serverResponse"></username-field>
                            </div>
                            <div class="col">
                                <email-field :serverResponse="serverResponse"></email-field>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col">
                                <password-field></password-field>
                            </div>
                            <div class="col">
                                <password-confirmation-field></password-confirmation-field>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col">
                                <phone-field></phone-field>
                            </div>
                            <div class="col">
                                <age-field></age-field>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="label">Choose your gender</label>
                            <switcher></switcher>
                        </div>
                    </form>

                    <hr class="modal-divider">

                </div>

                <div class="modal-footer text-right">

                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" :disabled="!formIsValid" @click="submit">Submit</button>

                </div>

            </div>
        </div>
    </transition>
</template>


<script>
    //IMPORTED COMPONENTS
    import AgeField from './AgeField.vue';
    import EmailField from './EmailField.vue';
    import PasswordConfirmationField from './PasswordConfirmationField.vue';
    import PasswordField from './PasswordField.vue';
    import PhoneField from './PhoneField.vue';
    import Switcher from './Switcher.vue';
    import UsernameField from './UsernameField.vue';
    //IMPORTED MAPPERS
    import { mapActions } from 'vuex';
    import { mapGetters } from 'vuex';
    import { mapMutations } from 'vuex';

    export default {
        props: ['show'],
        data () {
            return {
                duration: 5000,
                pass: false,
                time: 0
            }
        },
        computed: {
            ...mapGetters({
                form: 'SIGN_UP_G_GET_FORM',
                formIsValid: 'SIGN_UP_G_GET_IS_VALID',
                serverResponse: 'SIGN_UP_G_GET_SERVER_RESPONSE'
            })
        },
        components: {
            AgeField,
            EmailField,
            PasswordConfirmationField,
            PasswordField,
            PhoneField,
            Switcher,
            UsernameField
        },
        watch: {
            form: {
                handler() {
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
            }),
            beforeOpen (event) {
                this.time = Date.now()
            },
            beforeClose (event) {
                if (this.time + this.duration < Date.now()) {
                    event.stop()
                }
            }
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

    .modal-mask {
        position: fixed;
        z-index: 9900;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
        transition: opacity .3s ease;
    }

    .close-modal {
        color: rgba(160, 160, 160, 1);
    }

    .close-modal:hover {
        color: rgba(180, 180, 180, 1);
    }

    .container {
        margin: 40px auto 0 ;
        padding: 10px 15px;
        background-color: #fff;
        border-radius: 2px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
        transition: all .3s ease;
        font-family: Helvetica, Arial, sans-serif;
    }

    .modal-header h3 {
        margin-top: 0;
    }

    .modal-body {
        margin: 20px 0;
    }

    .text-right {
        text-align: right;
    }

    .form-label {
        display: block;
        margin-bottom: 1em;
    }

    .form-label > .form-control {
        margin-top: 0.5em;
    }

    .form-control {
        display: block;
        width: 100%;
        padding: 0.5em 1em;
        line-height: 1.5;
        border: 1px solid #ddd;
    }

    .modal-enter {
        opacity: 0;
    }

    .modal-leave-active {
        opacity: 0;
    }

    .modal-enter .modal-container,
    .modal-leave-active .modal-container {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
</style>