<template>
    <div>
        <div class="notification-box ww-box">

            <ww-header title="Notifications"></ww-header>

            <div class="notifications">
                <transition-group name="notification" tag="div">

                    <ww-notification v-for="(notice, index) in user.notifications"
                                     :content="notice.content"
                                     :index="index"
                                     :key="index"
                                     :state="notice.state"
                                     :title="notice.title"
                                     class="ww-box ww-notification"
                                     @accept="accept"
                                     @reject="reject">
                    </ww-notification>

                </transition-group>
            </div>

        </div>
    </div>
</template>

<script>
    //IMPORTED MAPPERS
    import { mapGetters } from 'vuex';
    //IMPORTED MODULES
    import axios from 'axios';
    //IMPORTED SERVICES
    import { ErrorHandler } from '../../../services/ErrorHandler.secvice';

    export default {
        computed: {
            ...mapGetters({
                user: 'SESSION_G_GET_CURRENT_USER'
            }),
            notifications: {
                set(newValue) {
                    this.user.notifications = newValue.reverse();
                },
                get() {
                    return this.user.notifications.reverse();
                }
            }
        },
        methods: {
            accept(index) {
                this.sendAnswer(`/private/notifications/${ this.user.notifications[index]._id }/accept`, index)
            },
            reject(index) {
                this.sendAnswer(`/private/notifications/${ this.user.notifications[index]._id }/reject`, index)
            },
            sendAnswer(url, index) {
                axios.post(url, this.user.notifications[index])
                    .then(({ data }) => {
                        this.user.notifications[index].state = data.state;
                    })
                    .catch(error => {
                        ErrorHandler.pushError({ message: 'It\'s something wrong. We fucked up. Try again later' });
                    });
            }
        }
    }

</script>

<style lang="scss" scoped>
    .notification-box {


    }

    .notifications {
        padding: 20px;

        min-height: 505px;
        max-height: 505px;

        overflow: scroll;
        overflow-x: hidden;

        .ww-notification {
            margin: 10px 0 0 0;
        }
    }

    /*ANIMATION*/

    .notification-enter {
        opacity: 0;
    }

    .notification-enter-to {
        animation: notification-in 1s ease-out forwards;
        transition: opacity .5s;
    }

    .notification-leave-to {
        animation: notification-out 1s ease-out forwards;
        transition: opacity 1s;
        opacity: 0;
    }

    .notification-move {
        transition: transform 1s;
    }

    @keyframes notification-in {
        from {
            transform: translateY(20px)
        }
        to {
            transform: translateY(0);
        }
    }

    @keyframes notification-out {
        from {
            transform: translateY(0)
        }
        to {
            transform: translateY(20px);
        }
    }
</style>