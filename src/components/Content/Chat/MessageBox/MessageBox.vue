<template>

    <div>
        <div class="chat-header"><h5 v-if="chat">{{ chat.title }}</h5></div>
            <div class="chat-box">

                <ul v-if="chat" class="message-list" id="messageList" v-prevent-parent-scroll>

                    <message class="row message-list-item" v-for="message in chat.messages"
                        :id="message._id"
                        :message="message"
                        :privateM="message.type === 'private'"
                        :class="{'justify-content-end': message.author._id === currentUser._id}"
                        :privateTarget="message.target && (message.target._id === currentUser._id)"
                        :isOwner="message.author._id === currentUser._id"
                    >

                    </message>

                    <div class="placeholder"></div>

                </ul>

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
                    const messageList = this.$el.querySelector("#messageList"),
                        lastMessage = messageList.lastElementChild.previousElementSibling;

                    let scrollHeight = messageList.scrollHeight;

                    let needScroll =
                        messageList.scrollTop +
                        lastMessage.offsetHeight +
                        lastMessage.previousElementSibling.offsetHeight +
                        messageList.clientHeight >=
                        scrollHeight;

                    console.log('scrollHeight', scrollHeight);
                    console.log('height', lastMessage);
                    console.log('needScroll', needScroll);

                    if(needScroll) {
                        messageList.scrollTop = messageList.scrollHeight;
                    }
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

    .chat-header {
        background: rgba(205, 205, 205, 1);
        padding:15px 0 15px 15px;
        margin:0 0 20px 0;
        box-shadow: 5px 5px 8px 2px rgba(180, 180, 180, 1);
    }

    .chat-box {
        background: rgba(255, 255, 255, 1);
    }

    .message-list {
        height: 650px;

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

    .textarea {
        position: relative;
        top: -100px;

        z-index: 550;

    }


</style>