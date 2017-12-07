<template>
    <div
         class="chat-list-item"
         :class="{'active-chat': chat._id === currentChat._id}"
         @click="changeChat"
    >
        <div class="media">

            <img class="mr-3 rounded" :src="chat.coverUrl" alt="Generic placeholder image">

            <div class="media-body">
                <h5 class="mt-0">{{ chat.title }} <span v-if="chat.notifications !== 0" class="badge badge-secondary">{{ chat.notifications }}</span></h5>
                <h6>Creator: {{ chat.creator.username }}</h6>
            </div>

            <div class="icons">

                <button class="btn btn-outline-info btn-sm" >
                    <i class="fa fa-sign-out" aria-hidden="true"></i>
                </button>

                <button class="btn btn-outline-info btn-sm" @click.stop="goToChatSettings">
                    <i class="fa fa-bars" aria-hidden="true"></i>
                </button>

            </div>

        </div>
    </div>
</template>

<script>
    //IMPORTED MAPPERS
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
            },
            goToChatSettings() {
                this.$router.push(`/chats/${this.chat._id}/settings/members`);
            }
        }
    }
</script>

<style lang="scss" scoped>

    .chat-list-item {
        margin-top:10px;
        padding: 4px 6px 6px 6px;

        height: 70px;

        border: 1px solid rgba(210, 210, 210, 1);
        border-radius: 4px;

        box-shadow: 0 0 7px 1px rgba(0, 0, 0, .15);

        cursor: pointer;

        img {
            height: 60px;
            width: 60px;
        }

        .media {
            padding-bottom: 5px;
        }

        transition: background .5s;
    }

    .chat-list-item:hover {
        background: rgba(230, 230, 230, 1);

        h5 {
            color: rgba(130, 130, 130, 1)
        }

        h6 {
            color: rgba(150, 150, 150, 1)
        }
    }

    .media-body {
        h5 {
            color: rgba(150, 150, 150, 1)
        }

        h6 {
            color: rgba(170, 170, 170, 1)
        }
    }
</style>