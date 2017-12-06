<template>
    <div>
        <addressee-list :users="members"  ></addressee-list>
    </div>
</template>

<script>
    //IMPORTED MAPPERS
    import { mapGetters } from 'vuex';
    import { mapActions } from 'vuex';

    export default {
        props: {
            members: {
                type: Array,
                default: []
            }
        }
    }
</script>

<style lang="scss" scoped>


</style>