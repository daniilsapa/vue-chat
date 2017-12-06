<template>
    <div>
        <div class="editor-wrapper row no-gutters justify-content-center">

            <addressee-list class="addressee-list col-lg-10"
                            v-if="showUsersList"
                            :users="chat.members"
                            :itemClickFunc="addAddressee"
            >

            </addressee-list>

            <typing-users class="typing-users col-lg-10" :typingUsers="chat.typingUsers" ></typing-users>

            <div class="col-lg-9">

                <textarea class="form-control align-left editor ww-box"
                      id="messageEditor"
                      rows="3"
                      v-model="message"
                      @keydown="isTyping = true"
                      @leavefocus="isTyping = false"
                      @change="isTyping = false"
                      @input="inputHandler"
                >
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
        watch: {
            isTyping(newValue){
                this.$store.dispatch('CHAT_A_CHANGE_TYPING_STATE', newValue);
            }
        },
        methods: {
            ...mapActions({
                sendMessage: 'CHAT_A_SEND_MESSAGE'
            }),
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
            },
            inputHandler() { this.showUsersList = this.message === '@'; },
            addAddressee(id, username) {
                this.message = `@${id}(${username}):`;
                this.inputHandler();
            }
        },
        components: {
            TypingUsers
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
        top: -184px;

        z-index: 100;
    }

    .typing-users{
        position: absolute;
        top: -30px;
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