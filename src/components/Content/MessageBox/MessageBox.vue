<template>
    <div>
        <div class="chat-box">

            <div class="chat-header"><h5 v-if="chat">{{ chat.title }}</h5></div>

            <hr>

            <div v-if="chat" class="message-list" id="messageList" v-prevent-parent-scroll>
                <transition-group name="message" tag="div" class="transition-group-message">

                    <message class="row message-list-item" v-for="message in chat.messages"
                             :id="message._id"
                             :message="message"
                             :privateM="message.type === 'private'"
                             :class="{'justify-content-end': message.author._id === currentUser._id}"
                             :privateTarget="message.target && (message.target._id === currentUser._id)"
                             :isOwner="message.author._id === currentUser._id"
                             :key="message._id"
                    >

                    </message>

                </transition-group>

                <div class="placeholder"></div>

            </div>

            <h5 v-if="false">Typing users <span v-for="user in typingUsers"> {{ user }} </span></h5>

            <editor v-if="chat" :online="chat.online" :chat="chat" class="textarea"></editor>

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
            chat(newChat) {
                if(newChat){
                    this.$store._mutations['CHATLIST_M_RESET_NOTIFICATIONS'][0](newChat._id);
                }
            },
            scrollEvent(newValue) {
                console.log('scroll');
                if(newValue){
                    setTimeout(() => {


                        const messageList = this.$el.querySelector("#messageList"),
                            lastMessage = messageList.lastElementChild.previousElementSibling.lastElementChild,
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
        created () {
            if(this.appState) {
                this.getChat(this.$route.params.id);
            }
        },
        beforeRouteLeave(to, from, next) {
            this.beforeLeaveChat();
            next();
        }
    }

</script>

<style lang="scss" scoped>

    .chat-box {
        max-height: 100%;

        background: rgba(255, 255, 255, 1);

        border-radius: 4px 4px 4px 4px;
        border: 1px solid rgba(190, 190, 190, 1);

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
    }

    .message-list {
        height: 505px;

        overflow: scroll;
        overflow-x: hidden;

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