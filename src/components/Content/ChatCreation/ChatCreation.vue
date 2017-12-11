<template>
    <div>
        <div class="chat-create row ww-box">

            <ww-header class="col-lg-12" title="Create a new chat"></ww-header>

            <div class="chat-title col-lg-12 mt-3">
                <chat-title-field :serverSignal="serverSignal" :setTitle="setTitle"></chat-title-field>

                <button class="btn btn-default"
                        :disabled="!titleIsValid"
                        :titleIsValid="titleIsValid"
                        @click="createChat"
                >
                    Create
                </button>

            </div>

        </div>
    </div>
</template>

<script>
    //IMPORTED COMPONENTS
    import ChatTitleField from './ChatTitleField.vue';
    //IMPORTED MAPPERS
    import { mapGetters } from 'vuex';
    //IMPORTED SERVICES
    import { ErrorHandler } from '../../../services/ErrorHandler.secvice';

    import axios from 'axios';

    export default {

        data () {

            return {
                title: '',
                titleIsValid: false,
                serverSignal: {errmsg: ''}
            }

        },
        computed: {
            ...mapGetters({
                user: 'SESSION_G_GET_CURRENT_USER'
            })
        },
        methods: {
            createChat() {
                axios.post('/private/chats', {
                    creator: this.user._id,
                    title: this.title,
                    type: 'public'
                })
                    .then(result => console.log(result))
                    .catch(error => this.serverSignal = error.body);
            },
            setTitle(title, status) {
                this.title = title;
                this.titleIsValid = status;
            }
        },
        components: {
            ChatTitleField
        }
    }

</script>

<style lang="scss" scoped>

    .chat-create {
        padding: 0 0 50px 0;
    }


</style>