<template>
    <div>
        <div class="chat-create row ww-box">

            <ww-header class="col-lg-12" title="Create a new chat"></ww-header>

            <div class="chat-title col-lg-12 mt-3">
                <chat-title-field validationRules="alpha_dash|chatExists"
                                  fieldValue="Enter the title of the chat"
                                  fieldTitle="Title of the chat">
                </chat-title-field>
            </div>

        </div>
    </div>
</template>

<script>
    //IMPORTED COMPONENTS
    import ChatTitleField from './ChatTitleField.vue';

    export default {
        name: 'ChatCreation',
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