<template>
    <div>
        <div class="editor-wrapper row no-gutters justify-content-center">

            <addressee-list  v-if="showUsersList"
                             :itemClickFunc="addAddressee"
                             :users="chat.members"
                             class="addressee-list col-lg-10">
            </addressee-list>

            <typing-users :typingUsers="chat.typingUsers" class="typing-users col-lg-10"></typing-users>

            <div class="col-lg-9">

                <textarea v-model="message"
                          class="form-control editor ww-box"
                          id="messageEditor"
                          rows="3"
                          @change="isTyping = false"
                          @input="inputHandler"
                          @keydown="isTyping = true"
                          @leavefocus="isTyping = false">
                </textarea>

            </div>

            <div class="send-button-wrapper col-lg-1">
                <button class="btn btn-outline-info send-button" @click="sendMessageWrapper">
                    <i class="fa fa-paper-plane" aria-hidden="true"></i>
                </button>
            </div>

        </div>
    </div>
</template>

<script>
    //IMPORTED COMPONENTS
    import TypingUsers from './TypingUsers/TypingUsers.vue';
    //IMPORTED MAPPERS
    import { mapMutations } from 'vuex'
    import { mapActions } from 'vuex'

    export default {
        name: 'MessageEditor',
        props: ['chat'],
        data () {
            return {
                isTyping: false,
                showUsersList: false
            }
        },
        computed: {
            message: {
                get () {
                    return this.$store.getters['CHAT_G_GET_NEW_MESSAGE'];
                },
                set (value) {
                    return this.$store._mutations['CHAT_M_SET_NEW_MESSAGE'][0](value);
                }
            }
        },
        components: {
            TypingUsers
        },
        watch: {
            isTyping(newValue){
                this.changeTypingState(newValue);
            }
        },
        methods: {
            ...mapActions({
                changeTypingState: 'CHAT_A_CHANGE_TYPING_STATE',
                sendMessage: 'CHAT_A_SEND_MESSAGE'
            }),
            addAddressee(index) {
                this.message = `@${this.chat.members[index]._id}(${this.chat.members[index].    username}):`;
                this.inputHandler();
            },
            inputHandler() {
                this.showUsersList = this.message === '@';
            },
            sendMessageWrapper () {
                let dividerPos = this.message.indexOf(':'),
                    addressee = this.message.slice(0, dividerPos);

                if(addressee.match(/^@[a-zA-Z0-9]{24}\([a-zA-Z0-9_]{1,16}\)$/)){
                    this.sendMessage({
                        content: this.message.slice(dividerPos + 1),
                        target: addressee.slice(1, 25),
                        type: 'private'
                    });
                }
                else {
                    this.sendMessage({content: this.message, type: 'public'});
                }

                this.isTyping = false;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .editor-wrapper{
        position: relative;
        top: 0;

        padding: 0 0 50px 0;
    }
    
    .addressee-list {
        position: absolute;
        top: -200px;

        z-index: 100;
    }

    .typing-users{
        position: absolute;
        top: -45px;

        z-index: 1000;
    }

    .editor {
        position: relative;
        top: 0;

        resize: none;

        color: rgba(170, 170, 170, 1);
        font-weight: 500;
    }

    .editor:focus {
        border: 1px solid rgba(23,162,184, 1) !important;
    }

    .send-button-wrapper {
        padding: 0 0 0 5px;

        .send-button {
            padding-left: 15px;
            padding-right: 17px;
            width: 100%;
            height: 100%;

            background: rgba(255, 255, 255, 1);

            i {
                color: rgba(23,162,184, 1);
            }
        }
    }

    .send-button:hover {
        background: rgba(23,162,184, 1);

        i {
            color: rgba(255, 255, 255, 1);
        }
    }
</style>