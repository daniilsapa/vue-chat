<template>
    <div class="modal fade" id="LogInModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">

            <div class="modal-content">

                <div class="modal-header">
                    <h2 class="modal-title" id="exampleModalLabel">Log in<span class="logo">Werewolf</span></h2>

                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <div class="modal-body">

                    <form>

                        <hr class="modal-divider">

                        <username-field :serverSignal="serverSignal"></username-field>

                        <password-field></password-field>

                    </form>

                    <hr class="modal-divider">

                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary"  @click="submit">Submit</button>
                </div>

            </div>

        </div>
    </div>
</template>

<script>
    //IMPORTED COMPONENTS
    import UsernameField from './UsernameField.vue';
    import PasswordField from './PasswordField.vue';
    //IMPORTED MAPPERS
    import { mapActions } from 'vuex';

    export default {
        data () {
            return {
                serverSignal: {errmsg: ''}
            }
        },
        components: {
            UsernameField,
            PasswordField
        },
        methods: {
            ...mapActions({
                submit: 'LOGIN_SEND_A_LOGIN_REQUEST'
            })
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