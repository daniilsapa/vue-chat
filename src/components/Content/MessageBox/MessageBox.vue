<template>
    <div>
        <div class="chat-box ww-box">
            <ww-header v-if="chat._id" :title="chat.title"></ww-header>

            <div v-if="chat" class="message-list" id="messageList" v-prevent-parent-scroll>

                <transition-group name="message" tag="div" class="transition-group-message">
                    <message class="row message-list-item" v-for="message in chat.messages"
                             :class="{ 'justify-content-end': message.author._id === currentUser._id }"
                             :id="message._id"
                             :isAuthor="message.author._id === currentUser._id"
                             :isPrivate="message.type === 'private'"
                             :key="message._id"
                             :message="message"
                             :privateTarget="message.target && (message.target._id === currentUser._id)">
                    </message>
                </transition-group>

                <div class="placeholder">

                </div>

            </div>

            <hr>

            <editor v-if="chat" :chat="chat" :online="chat.online" class="textarea"></editor>

            <div v-if="chat.onlineUsers.length !== 0">online: {{ chat.onlineUsers.length }} / {{ chat.members.length }}</div>

            <div> online: <span v-for="u in chat.onlineUsers">{{ u.username }} | </span></div>
            <div> members: <span v-for="u in chat.members"> {{ u.username }} | </span></div>


        </div>
    </div>
</template>

<script>
    //IMPORTED COMPONENTS
    import Editor from './Editor/Editor.vue';
    import Message from './Message.vue';
    //IMPORTED MAPPERS
    import { mapActions } from 'vuex';
    import { mapGetters } from 'vuex';
    import { mapMutations } from 'vuex';

    export default {
        name: 'MessageBox',
        computed: {
            ...mapGetters({
                appState: 'APP_G_GET_APP_STATE',
                chat: 'CHAT_G_GET_CHAT',
                currentUser: 'SESSION_G_GET_CURRENT_USER',
                scrollEvent: 'CHAT_G_GET_SCROLL_EVENT'
            })
        },
        watch: {
            $route(to, from) {
                this.beforeLeaveChat();
                this.getChat(to.params.id);
            },
            appState(newState) {
                if(newState) {
                    this.getChat(this.$route.params.id);
                }
            },
            scrollEvent(newValue) {
                if(newValue){
                    setTimeout(() => {
                        const messageList = this.$el.querySelector("#messageList"),
                            lastMessage = messageList
                                            .lastElementChild
                                            .previousElementSibling
                                            .lastElementChild,
                            needScroll = messageList.scrollTop +
                                lastMessage.offsetHeight +
                                lastMessage.previousElementSibling.offsetHeight +
                                messageList.clientHeight >=
                                messageList.scrollHeight;

                        let count = 0;

                        if(needScroll){
                            const interval = setInterval(() => {
                                if(messageList.scrollHeight - messageList.clientHeight === messageList.scrollTop){
                                    clearInterval(interval);
                                }

                                ++count;
                                messageList.scrollTop = messageList.scrollTop + 10;
                            }, 30);
                        }
                    }, 100)
                }
            }
        },
        methods: {
            ...mapActions({
                beforeLeaveChat: 'CHAT_A_BEFORE_LEAVE_CHAT',
                getChat: 'CHAT_A_FETCH_CHAT'
            })
        },
        components: {
            Editor,
            Message
        },
        beforeRouteLeave(to, from, next) {
            this.beforeLeaveChat();
            next();
        },
        created () {
            if(this.appState) {
                this.getChat(this.$route.params.id);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .chat-box {
        max-height: 100%;

        background: rgba(240, 240, 240, 1);

        .chat-header {
            padding:15px 0 15px 15px;

            background: rgba(240, 240, 240, 1);

            border-radius: 4px 4px 0 0;

            color: rgba(190, 190, 190, 1);

            h5 {
                margin: 0;
            }
        }

        hr {
            margin: 0;
        }

        .textarea {
            margin: 10px 0 0 0;
        }
    }

    .message-list {
        height: 505px;

        overflow: scroll;
        overflow-x: hidden;

        background: rgba(255, 255, 255, 1);

        .placeholder {
            height: 100px;
        }

        .last-messages-mark {
            background: rgba(180, 180, 180, 1);
            height: 100px;
        }
    }

    .message-list-item {
        margin: 10px;
    }

    /*ANIMATIONS*/
    .message-enter {
        opacity: 0;
    }

    .message-enter-to {
        animation: message-in 1s ease-out forwards;
        transition: opacity .5s;
    }

    .message-leave-to {
        animation: message-out 1s ease-out forwards;
        transition: opacity 1s;
        opacity: 0;
    }

    .message-move {
        transition: transform 1s;
    }

    @keyframes message-in {
        from {
            transform: translateY(20px)
        }
        to {
            transform: translateY(0);
        }
    }

    @keyframes message-out {
        from {
            transform: translateY(0)
        }
        to {
            transform: translateY(20px);
        }
    }
</style>