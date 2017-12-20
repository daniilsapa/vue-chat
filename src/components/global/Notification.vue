<template>
    <div>
        <div class="media">

            <img v-if="src" :src="src" alt="Generic placeholder image" class="mr-3">

            <div class="media-body">

                <h5 class="ml-3 mt-2">{{ title }}</h5>

                <p class="ml-3 mb-2">{{ content }}</p>

                <hr/>

                <div :class="{'bg-danger': state === 'rejected', 'bg-success': state === 'accepted'}" class="notification-footer" >

                    <div class="buttons text-right" v-if="state === 'pending'">

                        <button class="btn btn-outline-success btn-sm"
                                @click="$emit('accept',  index)">
                            accept
                        </button>

                        <button class="btn btn-outline-danger btn-sm"
                                @click="$emit('reject', index)">
                            reject
                        </button>

                    </div>

                    <div class="text-right notification-sign" v-if="state === 'rejected'">
                        You rejected this invite
                    </div>

                    <div class="text-right notification-sign" v-if="state === 'accepted'">
                        You accepted this invite
                    </div>

                </div>

            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: 'Notification',
        props: {
            content: {
                type: String,
                default: 'notice content'
            },
            index: {
                type: Number
            },
            title: {
                type: String,
                default: 'Notice title'
            },
            shortcut: {
                type: Boolean,
                default: false
            },
            src: {
                type: String,
                default: null
            },
            state: {
                type: String,
            }
        }
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

        .notification-sign {
            color: rgba(255, 255, 255, 1);
            font-weight: 500;
        }
    }
</style>