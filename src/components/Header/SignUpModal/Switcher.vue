<template>
    <div>

        <div id="on"
             @click="switcher('male')"
             :class="{'active': form.gender.value === 'male'}"
        >
            Male
        </div>

        <div id="off"
             @click="switcher('female')"
             :class="{'active': form.gender.value === 'female'}"
        >
            Female
        </div>

    </div>

</template>

<script>

    //IMPORTED MAPPERS
    import { mapMutations } from 'vuex';
    import { mapGetters } from 'vuex';

    export default {
        computed: {
            ...mapGetters({
                form: 'SIGN_UP_G_GET_FORM'
            })
        },
        methods: {
            ...mapMutations({
                setField: 'SIGN_UP_M_SET_FIELD'
            }),
            switcher (value) {
                this.setField({field: 'gender', state: true, value: value});
            }
        }
    }

</script>

<style lang="scss" scoped>

    #on, #off {
        width: 68px;
        height: 20px;
        background-color: lightgray;
        padding: 2px 2px 5px 2px;
        display: inline-block;
        margin: 10px -2px;
        box-sizing: content-box;
        cursor: pointer;
        text-align: center;
    }

    #on:hover, #on.active {
        background: lightblue;
    }

    #off:hover, #off.active {
        background: lightcoral;
    }

</style>