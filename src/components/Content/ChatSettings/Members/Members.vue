<template>
    <div>
        <div class="row no-gutters">

            <div class="col-lg-6">
                <addressee-list :users="members" class="list"></addressee-list>
            </div>

            <div class="col-lg-6">
                <addressee-list :users="invited" class="list"></addressee-list>
            </div>

        </div>
    </div>
</template>

<script>
    //IMPORTED MAPPERS
    import { mapGetters } from 'vuex';

    export default {
        name: 'ChatMembers',
        props: {
            members: {
                type: Array,
                default() { return [] }
            }
        },
        computed: {
            ...mapGetters({
                invited: 'CHAT_SETTINGS_G_INVITED'
            })
        }
    }
</script>

<style lang="scss" scoped>
    .list {
        margin: 0 5px 0 5px;
    }
</style>