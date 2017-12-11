<template>
    <div class="container-fluid session-bar ">
        <div class="row">

            <div class="col-lg-12 text-right">



            </div>

            <sign-up-modal></sign-up-modal>
            <log-in-modal></log-in-modal>
        </div>
    </div>
</template>

<script>

    //IMPORTED COMPONENTS
    import SignUpModal from './SignUpModal/SignUpModal.vue'
    import LogInModal from './LogInModal/LogInModal.vue'

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
              this.$router.push({ path: '/' });
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


    }
</style>