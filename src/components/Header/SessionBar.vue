<template>
    <div class="container-fluid session-bar ">
        <div class="row">

            <div class="col-lg-12 text-right">

                <div class="loggedAs" v-if="userType === 'user' || userType === 'admin'">
                    Logged in as <span>{{ currentUser.username }}</span> | <a class="logout" @click="logOut">log out</a>
                </div>

                <div v-else class="sign">
                    <a href="#" data-toggle="modal" data-target="#LogInModal">log in</a>
                    |
                    <a href="#" data-toggle="modal" data-target="#SignUpModal">sign up</a>
                </div>

            </div>

            <sign-up-modal></sign-up-modal>
            <log-in-modal></log-in-modal>
        </div>
    </div>
</template>

<script>

    //IMPORTED COMPONENTS
    import SignUpModal from './SessionBar/SignUpModal/SignUpModal.vue'
    import LogInModal from './SessionBar/LogInModal/LogInModal.vue'

    //IMPORTED MAPPERS
    import { mapGetters } from 'vuex';

    export default {
        computed: {
            ...mapGetters({
                currentUser: 'SESSION_G_GET_CURRENT_USER',
                userType: 'SESSION_G_GET_USER_TYPE'
            })
        },
        methods: {
          logOut() {
              this.$store.dispatch('SESSION_LOG_OUT');
              this.$router.push({path: '/'});
          }
        },
        components: {
            SignUpModal,
            LogInModal
        }
    }

</script>

<style lang="scss" scoped>
    .session-bar {
        height: 30px;
        border-bottom: 1px solid rgba(27,146,98, 1);

        .logout{
            color: rgba(160, 160, 160, 1);
        }

        .loggedAs{
            color: rgba(120, 120, 120, 1);
            font-weight: 500;

            span{
                text-decoration: underline;
            }
        }

        .sign {
            margin: 3px 0 0 0;
            padding: 0 50px 0 0;

            color: white;

            a {
                color: rgba(160, 160, 160, 1);
            }
        }
    }
</style>