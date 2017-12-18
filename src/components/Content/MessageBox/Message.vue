<template>
    <div v-if="(isPrivate && privateTarget) || isAuthor || !isPrivate">
        <div class="col-lg-12" v-if="message.type === 'system'">

            <div class="row bg-secondary text-light" >
                <div class="col-lg-12 text-center">
                    {{ message.content }} ({{ message.target }})
                </div>
            </div>

        </div>

        <div v-else="" class="col-lg-5">
            <div class="row">
                <div v-if="!message.sameUser" class="col-lg-12 image-wrapper">
                    <img :src="message.author.avatarUrl" class="rounded-circle" height="30px">
                </div>

                <div v-if="!message.sameUser" class="col-lg-12"></div>

                <div v-if="!message.sameUser"  class="user-info col-lg-12">
                    {{ message.author.username }}
                </div>

                <div class="col-lg-12 divider"></div>

                <div class="message col-lg-12"
                     :class="{'current-user-message': isAuthor && !isPrivate, 'private-message': isPrivate}"
                >
                    <span v-if="isPrivate && isAuthor">
                        to <span class="target"> {{ message.target.username }}</span> <br>
                    </span>

                    {{ message.content }}

                    <div :style="{color: 'rgba(160, 160, 160, 1)'}">
                        {{ message.timestamp | timestamp }}
                    </div>
                </div>

            </div>

        </div>

    </div>
</template>

<script>

    export default {
        props: ['message', 'isOwner', 'privateTarget', 'isPrivate', 'isAuthor']
    }
</script>

<style lang="scss" scoped>
    .user-info {
        padding: 0 0 0 70px;

        border-radius: 20px;
        border: 1px solid rgba(23,162,184, 1);
        box-shadow: 1px 1px 8px 1px rgba(180, 180, 180, 1);



        font-weight: 600;

        background: rgba(240, 240, 240, 1);
        color: rgba(140, 140, 140, 1);
    }

    .image-wrapper {
        position: relative;
        top: 29px;
        z-index: 25;
    }
    

    .divider {
        height: 10px;
    }

    .message {
        background: rgba(240, 240, 240, 1);
        box-shadow: 1px 1px 8px 1px rgba(180, 180, 180, 1);
        color: rgba(180, 180, 180, 1);
        font-weight: 500;

        border-radius: 4px;

        span {
            font-weight: 600;
            color: rgba(140, 140, 140, 1);


            .target {
                text-decoration: underline;
            }
        }

    }

    .current-user-message {
        background: rgba(197, 255, 247, 1) !important;
        color: rgba(121, 179, 171 , 1) !important;

    }

    .private-message {
        background: rgba(252, 252, 180, 1) !important;
        color: rgba(190, 190, 118, 1) !important;

    }
</style>