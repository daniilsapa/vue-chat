<template>
    <div>
        <div class="media">

            <img v-if="src" class="mr-3" :src="src" alt="Generic placeholder image">

            <div class="media-body">
                <h5 class="ml-3 mt-2">{{ header }}</h5>
                <p class="ml-3 mb-2">{{ content }}</p>
                <hr/>
                <div class="notification-footer">
                    <div class="text-right ">
                        <button class="btn btn-outline-success btn-sm">accept</button>
                        <button class="btn btn-outline-danger btn-sm m">reject</button>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>

    export default {
        props: {
            src: {
                type: String,
                default: null
            },
            shortcut: {
                type: Boolean,
                default: false
            },
            header: {
                type: String,
                default: 'Notice header'
            },
            content: {
                type: String,
                default: 'notice content'
            }
        },

    }

</script>

<style lang="scss" scoped>

    .media {

        hr {
            margin: 0;
        }

        .notification-footer {
            padding: 5px 20px 5px 0;
            background: rgba(240, 240, 240, 1);

            button {
                font-weight: 500;
            }
        }
    }



</style>