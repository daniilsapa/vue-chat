<template>
    <div class="row addressee-list-item" @click="itemClickFunc(index)">

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
        name: 'AddresseeListItem',
        props: {
            index: {
                type: Number
            },
            itemClickFunc: {
                type: Function,
                default() {}
            },
            user: {
                type: Object,
                default: () => { {} }
            }
        },
    }
</script>

<style scoped lang="scss">
    .addressee-list-item {
        padding: 5px 10px 5px 10px;

        cursor: pointer;
    }

    .addressee-list-item:hover {
        background: rgba(200, 200, 200, 1);

        .addressee-id {
            color: rgba(255, 255, 255, 1);
        }
    }

    .addressee-avatar {
        height: 20px;
    }

    .addressee-username {
        font-weight: 600;
        font-size: 12px;
    }

    .addressee-id {
        color: rgba(180, 180, 180, 1);
        font-size: 12px;
    }
</style>