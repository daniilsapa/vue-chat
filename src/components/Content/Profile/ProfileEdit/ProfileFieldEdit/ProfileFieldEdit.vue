<template>
    <div>
        <div class="form-group">

            <label class="field-label" :for="">{{ field.name }}</label>

            <div class="input-group">

                <input type="text" class="form-control" :id="id" :placeholder="field.value" aria-label="Search for...">

                <span class="input-group-btn">
                    <button class="btn btn-secondary" type="button">Save</button>
                </span>

            </div>

        </div>
    </div>
</template>

<script>
    export default {
        props: ['field'],
        data() {
            return {
                id: Date.now()
            }
        }
    }
</script>

<style lang="scss" scoped>
    .field-label {

        font-weight: 500;
        color: rgba(180, 180, 180, 1)

    }
</style>