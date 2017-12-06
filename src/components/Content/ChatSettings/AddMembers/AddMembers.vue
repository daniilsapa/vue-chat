<template>
    <div>
        <div class="row">

            <div class="col-lg-6">
                <addressee-list class="addressee-list" :users="members"></addressee-list>
            </div>

            <div class="col-lg-6">
                <addressee-list class="addressee-list" :users="members"></addressee-list>
            </div>

        </div>
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

    .addressee-list {
        padding: 0;
    }

</style>