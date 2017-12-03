<template>

    <div
            class="row error-box alert-danger bg-danger text-center"
            v-if="currentError"
    >

        <div  class="col-lg-12">
            {{ currentError.message }}
        </div>

    </div>

</template>

<script>

    import {ErrorHandler} from '../../services/ErrorHandler.secvice';

    export default {
        data() {
            return {
                currentError: null

            }
        },

        watch: {

            errors(newErrors) {

                console.log('errors errors errors', newErrors);


            }
        },
        created() {
            ErrorHandler.$on('error', newError => {
                this.currentError = newError;
            })
        }
    }

</script>

<style lang="scss" scoped>

    .error-box {

        color: white;

        padding: 10px;

        border-radius: 10px;

    }

</style>