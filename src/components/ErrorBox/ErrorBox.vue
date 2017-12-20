<template>
    <div class="row error-box alert-danger bg-danger text-center"
         v-if="currentError"
    >
        <div  class="col-lg-12">
            {{ currentError.message }}
        </div>
    </div>
</template>

<script>
    //IMPORTED SERVICES
    import {ErrorHandler} from '../../services/ErrorHandler.secvice';

    export default {
        data() {
            return {
                currentError: null
            }
        },
        watch: {
            errors(newErrors) {
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
        position: relative;
        top: 0;
        left: 0;

        padding: 10px;

        color: white;

        border-radius: 10px;



        z-index: 9999;
    }
</style>