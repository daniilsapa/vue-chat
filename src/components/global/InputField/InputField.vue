<template>
    <div>
        <div class="form-group">

            <label class="field-label" :for="">{{ field.name }}</label>

            <div class="input-group">

                <input type="text" class="form-control"
                       :class="{ 'is-invalid': !isValid && !isTouched }"
                       :id="id"
                       :placeholder="field.value" v-model="newValue"
                       @input="validate"
                >

                <span class="input-group-btn">
                    <button class="btn btn-secondary" type="button">Save</button>
                </span>

            </div>
            <div class="invalid-feedback" v-if="!isValid && !isTouched">{{ errorMessage }}</div>
        </div>
    </div>
</template>

<script>
    //IMPORTED MIXINS
    import { ValidationMixin } from '../../../Mixins/Validation';

    export default {
        props: {
            fieldName: {
                type: String
            },
            fieldValue: {
                type: String
            },
            validationRules: {
                type: Number
            }
        },
        data() {
            return {
                id: Date.now() + Math.random()
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