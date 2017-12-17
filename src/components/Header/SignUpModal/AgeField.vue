<template>

    <div class="form-group">
        <label class="form-control-label" for="signUpAge">Age</label>
        <input id="signUpAge"
               name="name"
               maxlength="100"
               class="form-control"
               :class="{ 'is-invalid': !isValid && !isTouched }"
               v-model="age"
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
                age: ''
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

                if (this.age === '') {
                    this.isValid = false;
                    this.errorMessage = 'Field mustn\'t be empty';

                    this.setField({
                        field: 'age',
                        state: false
                    });
                }
                else if (Number(this.age) > 110 || !isNumeric(this.age) || this.age[0] === '0') {
                    this.isValid = false;
                    this.errorMessage = 'Entered age is not valid!';

                    this.setField({
                        field: 'age',
                        state: false
                    });
                }
                else {
                    this.isValid = true;

                    this.setField({
                        field: 'age',
                        state: true,
                        value: this.age
                    });
                }

                function isNumeric(n) { return !isNaN(parseFloat(n)) && isFinite(n); }

            }
        }
    }

</script>

<style lang="scss" scoped>

    label {
        font-weight: 600;
    }

</style>