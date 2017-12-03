<template>

    <div class="row">

        <chat-list class="col-lg-3"
                   :availableChats="availableChats"
        >

        </chat-list>
        <router-view class="col-lg-9"


        >

        </router-view>

    </div>

</template>

<script>
    import ChatList from './ChatList/ChatList.vue';
    import ChatBox from './MessageBox/MessageBox.vue';
    import ChatCreation from './ChatCreation/ChatCreation.vue';

    export default {
        data() {
            return {
                chat: {},
                availableChats: [],
            }
        },
        methods: {

        },
        components: {
            ChatList,
            ChatBox,
            ChatCreation
        },
        created () {


        }
    }

</script>

<style>

</style>