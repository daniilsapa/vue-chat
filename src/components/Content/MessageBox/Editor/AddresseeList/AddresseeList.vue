<template>

    <ul class="addressee-list" v-prevent-parent-scroll>

        <addressee-list-item
                class="addressee-list-item"
                v-for="user in members"
                :user="user"
                :addAddressee="addAddressee"
        >

        </addressee-list-item>

        <hr>

    </ul>

</template>

<script>

    import AddresseeListItem from './AddresseeListItem.vue';

    export default {
        props: ['members', 'addAddressee'],
        data() {

            return {

            }

        },
        methods: {
            scrollList(e) {
                console.log('23423423')
            }
        },
        components: {
            AddresseeListItem
        }
    }

</script>

<style scoped lang="scss">

    .addressee-list {
        background: rgba(255, 255, 255, 1);

        max-height: 150px;

        overflow: scroll;
        overflow-x: hidden;

        border-radius: 20px;
        border: 1px solid rgba(180, 180, 180, 1);

    }


</style>