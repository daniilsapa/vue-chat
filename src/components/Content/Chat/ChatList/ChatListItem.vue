<template>

    <div
         class="chat-list-item"
         :class="{'active-chat': chat._id === currentChat._id}"
         @click="changeChat"
    >
        
        <img src="images/defaults/14575489059580.jpg"/>

        <div>

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

    .chat-list-item {
        position: relative;
        margin-top: 10px;

        cursor: pointer;
        
        height: 70px;

        box-shadow: 0 0 4px 0 rgba(0,0,0,0.75);
        border-radius: 3px;

        img {
            height: 70px;
            width: 208px;
            border-radius: 3px;
        }

        .chat-title {
            position: absolute;
            top: 50px;

            padding: 1px 0 2px 5px;
            margin:0 0 5px 0;

            width: 100%;

            background: rgba(255, 255, 255, 1);
            color: rgba(180, 180, 180, 1);

            border-radius: 0 0 3px 3px;
        }

    }

    .chat-list-item:hover {


        h6 {
            background: rgba(200, 200, 200, 1);
            color: rgba(255, 255, 255, 1);
        }

    }

    .active-chat {

        h6 {
            color: rgba(0, 119, 71, 1) !important;
        }
    }

</style>