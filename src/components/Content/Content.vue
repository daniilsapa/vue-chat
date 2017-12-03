<template>
    <div class="container content">

        <chat></chat>

    </div>
</template>

<script>

    import Chat from './Chat/Chat.vue'

    export default {
        components: {
            Chat
        }
    }

</script>
<style lang="scss">
    .content {
        padding: 70px 0 0 0;

        .conversation-wrapper {
            background-image: url("../../../images/001-subtle-light-pattern-background-texture-vol5.jpg");


            .conversation {
                padding: 20px 0 0 0;

                height: 900px;

                .message {
                    padding: 10px 10px 10px 12px;

                    margin: 20px 0 0 0;
                    box-shadow: 0px 0px 12px 1px rgba(140, 140, 140, 1);

                    background: rgba(255, 255, 255, 1);
                }
            }
        }

        .subproject {
            margin: 50px 0 50px 0;
        }

    }
    
</style>