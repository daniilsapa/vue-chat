<template>

    <div
         class="item"
         :class="{'active-chat': chat._id === currentChat._id}"
         @click="changeChat"
    >

        <div>

            <div class="float-left active-bar" :class="{'chat-extended': chat.notifications !== 0}">

            </div>

            <h6 class="chat-title">
                {{ chat.title }}
                <span v-if="chat.notifications !== 0" class="badge badge-secondary">{{ chat.notifications }}</span>
            </h6>

        </div>

    </div>

</template>

<script>

    import { mapGetters } from 'vuex'

    export default {
        props: ['chat'],
        computed: {
            ...mapGetters({
                currentChat: 'CHAT_G_GET_CHAT'
            })
        },
        methods: {
            changeChat() {

                this.$router.push(`/chats/${this.chat._id}`);

            }
        }
    }

</script>

<style lang="scss" scoped>

    .item {
        cursor: pointer;

        .chat-title {
            padding: 2px 0 0 0;
            color: rgba(180, 180, 180, 1);

            margin:0 0 5px 0;
        }

        .active-bar {
            min-height: 24px;
            width: 5px;
            background: rgba(180, 180, 180, 1);

            margin: 0 10px 0 0;
        }
    }

    .active-chat {

        .active-bar  {
            background: rgba(0, 119, 71, 1);
        }

        h6 {
            color: rgba(0, 119, 71, 1) !important;
        }
    }

    .chat-extended {
        min-height: 26px !important;
    }

</style>