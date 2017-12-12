<template>
    <div>
        <div class="row no-gutters">
            <addressee-list class="col-lg-12" :users="members" ></addressee-list>
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
                default() { return [] }
            }
        }
    }
</script>

<style lang="scss" scoped></style>