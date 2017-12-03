<template>
    <div>

        <div class="editor-wrapper row justify-content-center">

            <addressee-list class="addressee-list col-lg-10"
                            v-if="showUsersList"
                            :members="chat.members"
                            :addAddressee="addAddressee"
            >

            </addressee-list>

            <typing-users class="typing-users col-lg-10" :typingUsers="chat.typingUsers" ></typing-users>

            <textarea class="form-control editor col-lg-10"
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

        <div class="row justify-content-end">

            <div class="col-lg-2 send-button">

                <button class="btn btn-default" @click="sendMessage">
                    <i class="fa fa-paper-plane" aria-hidden="true"></i>
                </button>

            </div>

        </div>

    </div>
</template>

<script>

    //IMPORTED COMPONENTS
    import AddresseeList from './AddresseeList/AddresseeList.vue';
    import TypingUsers from './TypingUsers/TypingUsers.vue';

    //IMPORTED MAPPERS
    import { mapMutations } from 'vuex'

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
            ...mapMutations({
                restoreStorage: 'LOCAL_STORAGE_M_STORE_DATA'
            }),
            sendMessage () {
                const pattern = new RegExp(/^@[a-zA-Z0-9]{24}\([a-zA-Z0-9]{1,16}\)$/);

                if(this.message[0] === '@'){
                    let dividerPos = this.message.indexOf(':'),
                        addressee = this.message.slice(0, dividerPos);

                    if(addressee.match(pattern)){
                        this.$store.dispatch('CHAT_A_SEND_MESSAGE', {
                            content: this.message.slice(dividerPos + 1),
                            target: addressee.slice(1, 25),
                            type: 'private'
                        });

                        this.message = '';
                    }
                }
                else {
                    this.$store.dispatch('CHAT_A_SEND_MESSAGE', {content: this.message, type: 'public'});
                    this.message = '';
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
            AddresseeList,
            TypingUsers
        }

    }

</script>

<style lang="scss" scoped>
    
    .editor-wrapper{
        position: relative;
        top: 0;
    }
    
    .addressee-list {
        position: absolute;
        top: -184px;
    }

    .typing-users{
        position: absolute;
        top: -30px;
    }

    .editor {
        position: relative;
        top: 0;
        background: rgba(255, 255, 255, 1);

        border-radius: 20px;

        resize: none;

        border: 1px solid rgba(180, 180, 180, 1);
    }


    .editor:focus {
        border:none;
        border: 1px solid rgba(27,146,98, 1) !important;
    }

    .send-button {
        position: relative;
        top:-50px;

        button {
            border-radius: 50px;

            /*padding: 15px 15px 15px 15px;*/

            background: rgba(0, 119, 71, 1);

            i {
                color: rgba(255, 255, 255, 1);
            }
        }
    }

</style>