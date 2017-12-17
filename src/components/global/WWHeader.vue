<template>
    <div class="ww-box-header">
        <h5>{{ title }}</h5>
        <hr>
    </div>
</template>

<script>

    export default {
        props: {
            title: {
                type: String,
                default: 'Title sample'
            }
        }
    }

</script>

<style lang="scss" scoped>

    .ww-box-header {
        padding: 15px 0 0 0;

        border-radius: 4px 4px 0 0;

        background: rgba(255, 255, 255, 0.8);
        color: rgba(180, 180, 180, 1);

        h5 {
            padding: 0 0 15px 20px;
            margin: 0;
        }

        hr {
            margin: 0;
        }
    }



</style>