<template>

    <div class="row addressee-list-item" @click="addAddressee(user._id, user.username)">
        <div class="col-lg-1">
            <img class="addressee-avatar rounded-circle" :src="user.avatarUrl"/>
        </div>
        <div class="col-lg-11">
            <div class="addressee-username">{{ user.username }}</div>
            <div class="addressee-id">{{ user._id }}</div>
        </div>

    </div>

</template>

<script>

    export default {
        props: ['user', 'addAddressee'],
        data() {

            return {}

        },
        methods: {

        }
    }

</script>

<style scoped lang="scss">

    .addressee-list-item {
        padding: 5px 10px 5px 10px;

        cursor: pointer;
    }



    .addressee-list-item:hover {
        background: rgba(200, 200, 200, 1);
    }

    .addressee-avatar {
        height: 20px;
    }

    .addressee-username {
        font-weight: 600;
        font-size: 12px;
    }

    .addressee-id {
        font-size: 12px;
    }

</style>