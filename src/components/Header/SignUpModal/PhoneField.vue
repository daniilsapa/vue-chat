<template>

    <div class="form-group">
        <label class="form-control-label" for="name">Phone number</label>
        <input id="name"
               name="name"
               maxlength="100"
               class="form-control"
               :class="{ 'is-invalid': !isValid && !isTouched }"
               v-model="phone"
               @input="validateField"
               type="number" >
        <div class="invalid-feedback" v-if="!isValid && !isTouched">{{ errorMessage }}</div>
    </div>

</template>

<script>

    //IMPORTED MAPPERS
    import { mapMutations } from 'vuex';

    export default {
        data () {
            return{
                isValid: false,
                isTouched: true,
                errorMessage: '',
                phone: ''
            }
        },
        methods: {
            ...mapMutations({
                setField: 'SIGN_UP_M_SET_FIELD'
            }),
            validateField () {

                if (this.isTouched) {
                    this.isTouched = false
                }

                if (this.phone.length === 0) {
                    this.isValid = false;
                    this.errorMessage = 'Field mustn\'t be empty!';

                    this.setField({field: 'phone', state: false});
                }
                else {
                    this.isValid = true;

                    this.setField({field: 'phone', state: true, value: this.phone});

                }

            }
        }
    }

</script>

<style lang="scss" scoped>

    label {
        font-weight: 600;
    }

</style>