<template>
    <div>
        <div class="row">

            <div class="col-lg-6 list">
                <h6 class="ml-2 mb-3">Users:</h6>
                <addressee-list class="addressee-list" :users="users" :itemClickFunc="addInviteReceiver"></addressee-list>
                <p class="ml-2">Click on an item to add user in opposite chat</p>
            </div>

            <div class="col-lg-6 list">
                <h6 class="ml-2 mb-3">These users will receive an invite to your chat:</h6>
                <addressee-list class="addressee-list" :users="inviteReceivers" :itemClickFunc="deleteInviteReceiver"></addressee-list>
                <p class="ml-2">Click on an item removes it from list</p>
            </div>

            <div class="col-lg-12 text-right">
                <button class="btn btn-outline-info mr-2" @click="resetInviteReceivers">
                    Send invites
                </button>
            </div>

        </div>
    </div>
</template>

<script>
    //IMPORTED MAPPERS
    import { mapGetters } from 'vuex';
    import { mapActions } from 'vuex';
    import { mapMutations } from 'vuex';

    export default {
        props: {
            members: {
                type: Array,
                default() {return []}
            }
        },
        computed: {
            ...mapGetters({
                appState: 'APP_G_GET_APP_STATE',
                chat: 'CHAT_SETTINGS_G_GET_CHAT',
                inviteReceivers: 'CHAT_SETTINGS_G_INVITE_RECEIVERS',
                users: 'CHAT_SETTINGS_G_GET_USERS'
            }),
        },
        watch: {
            chat(newChat) {
                if(newChat._id){
                    this.getUsers();
                }
            }
        },
        methods: {
            ...mapActions({
                getUsers: 'CHAT_SETTINGS_A_FETCH_USERS'
            }),
            ...mapMutations({
                pushInviteReceivers: 'CHAT_SETTINGS_M_PUSH_INVITE_RECEIVERS',
                resetInviteReceivers: 'CHAT_SETTINGS_M_RESET_INVITE_RECEIVERS',
                spliceInviteReceivers: 'CHAT_SETTINGS_M_SPLICE_INVITE_RECEIVERS'

            }),
            addInviteReceiver(index) {
                this.pushInviteReceivers(this.users[index]);
            },
            deleteInviteReceiver(index) {
                this.spliceInviteReceivers(index);
            }
        },
        created() {
            if(this.appState && this.chat._id){
                this.getUsers();
            }
        },
        beforeDestroy() {
            this.resetInviteReceivers();
        }
    }
</script>

<style lang="scss" scoped>

    $grey170: rgba(170, 170, 170, 1);

    .list {
        h6 {
            color: $grey170;
        }

        p {
            color: $grey170;
            font-size: 11px;
        }
    }

    .addressee-list {
        margin: 0 5px 0 5px;
    }

</style>