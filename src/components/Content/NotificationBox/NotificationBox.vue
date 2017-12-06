<template>
    <div>
        <div class="notification-box ww-box">

            <ww-header title="Notifications"></ww-header>

            <div class="notifications">

                <ww-notification class="ww-box ww-notification" v-for="notice in [1, 2,4,54,2]"></ww-notification>

            </div>

        </div>
    </div>
</template>

<script>

    export default {


    }

</script>

<style lang="scss" scoped>

    .notifications {
        padding: 20px;

        min-height: 505px;

        .ww-notification {
            margin: 10px 0 0 0;
        }
    }

</style>