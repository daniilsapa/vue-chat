<template>
    <transition name="modal">
        <div class="modal-mask" v-show="show">
            <div class="modal-container">
                <div class="modal-header">
                    <h3>New Post</h3>
                </div>
                <div class="modal-body">

                    <label class="form-label">
                        <username-field></username-field>
                        <password-field></password-field>
                    </label>
                </div>
                <div class="modal-footer text-right">
                    <button class="modal-default-button" @click="submit">
                        Save
                    </button>
                </div>
            </div>
        </div>
    </transition>
</template>


<script>
    //IMPORTED COMPONENTS
    import UsernameField from './UsernameField.vue';
    import PasswordField from './PasswordField.vue';
    //IMPORTED MAPPERS-->
    import { mapActions } from 'vuex';

    export default {
        props: ['show'],
        data () {
            return {
                time: 0,
                duration: 5000
            }
        },
        components: {
            UsernameField,
            PasswordField
        },
        methods: {
            ...mapActions({
                submit: 'LOGIN_SEND_A_LOGIN_REQUEST'
            }),
            beforeOpen (event) {
                console.log(event)
                // Set the opening time of the modal
                this.time = Date.now()
            },
            beforeClose (event) {
                console.log(event)
                // If modal was open less then 5000 ms - prevent closing it
                if (this.time + this.duration < Date.now()) {
                    event.stop()
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
        transition: opacity .3s ease;
    }

    .modal-container {
        width: 300px;
        margin: 40px auto 0;
        padding: 20px 30px;
        background-color: #fff;
        border-radius: 2px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
        transition: all .3s ease;
        font-family: Helvetica, Arial, sans-serif;
    }

    .modal-header h3 {
        margin-top: 0;
        color: #42b983;
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

    /*
     * The following styles are auto-applied to elements with
     * transition="modal" when their visibility is toggled
     * by Vue.js.
     *
     * You can easily play with the modal transition by editing
     * these styles.
     */

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