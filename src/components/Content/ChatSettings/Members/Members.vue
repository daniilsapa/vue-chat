<template>
    <div>
        <div class="row no-gutters">

            <div class="col-lg-6">
                <addressee-list class="list" :users="members" ></addressee-list>
            </div>

            <div class="col-lg-6">
                <addressee-list class="list" :users="invited" ></addressee-list>
            </div>

        </div>
    </div>
</template>

<script>
    //IMPORTED MAPPERS
    import { mapGetters } from 'vuex';

    export default {
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