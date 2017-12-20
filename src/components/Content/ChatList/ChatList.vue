<template>
    <div>
        <div class="chat-list-box ww-box">

            <ww-header title="Chats"></ww-header>

            <transition-group class="chat-list" mode="out-in" name="item" tag="div" >
                <chat-list-item
                        v-for="(chat, index) in availableChats"
                        :chat="chat"
                        :key="index"
                        class="chat-list-item">
                </chat-list-item>
            </transition-group>

            <div class="add-chat-btn-wrapper">
                <div class="text-center">
                    <router-link class="btn btn-info text-center add-chat-btn" tag="button" to="/chats/create">
                        Add new chat
                    </router-link>
                </div>
            </div>

        </div>
    </div>

</template>

<script>
    //IMPORTED COMPONENTS
    import ChatListItem from './ChatListItem.vue';
    //IMPORTED MAPPERS
    import { mapActions } from 'vuex';
    import { mapGetters } from 'vuex';

    export default {
        name: 'ChatList',
        computed: {
            ...mapGetters({
                appState: 'APP_G_GET_APP_STATE',
                availableChats: 'CHATLIST_G_GET_AVAILABLE_CHATS',
            })
        },
        components: {
            ChatListItem
        },
        watch: {
            appState(newState) {
                if(newState){
                    this.getChatList();
                }
            }
        },
        methods: {
            ...mapActions({
                getChatList: 'CHATLIST_A_FETCH_AVAILABLE_CHATS'
            })
        },
        created() {
            if(this.appState){
                this.getChatList();
            }
        }
    }
</script>

<style lang="scss" scoped>
    $box-border-color: rgba(210, 210, 210, 1);

    .chat-list-box {
        position: relative;

        height: 500px;

        .chat-list {
            padding: 20px 20px 60px 20px;

            overflow: auto;
            max-height: 438px;
        }

        .add-chat-btn-wrapper {
            position: absolute;
            bottom: 5px;

            width: 100%;

            div {
                position: static;
            }

            .add-chat-btn {
                background: rgba(23, 162, 184, 0.4);

                font-weight: 500;
            }

            .add-chat-btn:hover {
                background: rgba(23, 162, 184, 0.9);
            }
        }
    }

    //ANIMATIONS
    .item-enter {
        opacity: 0;
    }

    .item-enter-active {
        animation: item-in .5s ease-out forwards;
        transition: opacity .5s;
    }

    .item-leave {
        opacity: 0;
    }

    .item-leave-active {
        animation: item-out .5s ease-out forwards;
        transition: opacity 1s;
        opacity: 0;

    }

    .item-move {
        transition: transform 1s;
    }

    @keyframes item-in {
        from {
            transform: translateY(20px)
        }
        to {
            transform: translateY(0);
        }
    }

    @keyframes item-out {
        from {
            transform: translateY(0)
        }
        to {
            transform: translateY(20px);
        }
    }
</style>