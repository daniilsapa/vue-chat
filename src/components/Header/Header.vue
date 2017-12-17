<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light">

            <router-link tag="div" to="/" exact class="navbar-brand text-info" href="#">Werewolf</router-link>

            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent"></div>

            <ul class="nav navbar-nav navbar-right">

                <li>
                    <a href="#">

                        <div v-if="userType === 'user' || userType === 'admin'" class="loggedAs">
                            Logged in as <span>{{ currentUser.username }}</span>
                        </div>

                        <div v-else class="sign">
                            <a href="#" data-toggle="modal" @click="showLogInModal = true">log in</a>
                            |
                            <a href="#" data-toggle="modal"  @click="showSignUpModal = true">sign up</a>
                        </div>

                    </a>
                </li>

                <li>
                    <a href="#" v-if="userType === 'user' || userType === 'admin'" class="logout" @click="logOutWrapper">
                        log out
                    </a>
                </li>

            </ul>

        </nav>

        <sign-up-modal :show="showSignUpModal && !currentUser.username" @close="showSignUpModal = false"></sign-up-modal>
        <log-in-modal :show="showLogInModal && !currentUser.username" @close="showLogInModal = false"></log-in-modal>

    </div>
</template>

<script>
    //IMPORTED COMPONENTS
    import LogInModal from './LogInModal/LogInModal.vue';
    import SignUpModal from './SignUpModal/SignUpModal.vue';
    //IMPORTED MAPPERS
    import { mapGetters } from 'vuex';
    import { mapActions } from 'vuex';

    export default {
        data() {
            return {
                showLogInModal: false,
                showSignUpModal: false
            }
        },
        computed: {
            ...mapGetters({
                currentUser: 'SESSION_G_GET_CURRENT_USER',
                userType: 'SESSION_G_GET_USER_TYPE'
            })
        },
        components: {
            LogInModal,
            SignUpModal
        },
        methods: {
            ...mapActions({
                logOut: 'SESSION_LOG_OUT'
            }),
            logOutWrapper() {
                this.$router.push('/');
                this.logOut();
            }
        }
    }
</script>

<style lang="scss" scoped>

    .navbar-brand, .nav-item {
        cursor: pointer;
    }

    .navbar-right li a {
        text-decoration: none;
    }

    .logout {
        color: rgba(160, 160, 160, 1);
        font-weight: 500;
    }

    .loggedAs {
        color: rgba(120, 120, 120, 1);
        font-weight: 500;

        span {
            text-decoration: underline;
        }
    }

    .sign {
        margin: 3px 0 0 0;
        padding: 0 50px 0 0;

        a {
            color: rgba(160, 160, 160, 1);
        }
    }

</style>