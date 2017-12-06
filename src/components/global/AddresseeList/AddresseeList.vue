<template>

    <ul class="addressee-list ww-box" v-prevent-parent-scroll>

        <addressee-list-item
                class="addressee-list-item"
                v-for="user in users"
                :user="user"
                :itemClickFunc="itemClickFunc"
        >

        </addressee-list-item>

        <hr>

    </ul>

</template>

<script>

    import AddresseeListItem from './AddresseeListItem.vue';

    export default {
        props: ['users', 'itemClickFunc'],
        components: {
            AddresseeListItem
        }
    }

</script>

<style scoped lang="scss">

    .addressee-list {
        max-height: 150px;

        overflow: scroll;
        overflow-x: hidden;
    }

</style>