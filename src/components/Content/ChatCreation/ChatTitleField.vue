<template>

    <div class="form-group">
        <label class="form-control-label" for="name">Chat title</label>
        <input id="name"
               name="name"
               maxlength="16"
               class="form-control"
               :class="{ 'is-invalid': !isValid && isTouched }"
               v-model="chatTitle"
               @input="validateField"
               type="text" >
        <div class="invalid-feedback" v-if="!isValid && isTouched">{{ errorMessage }}</div>
    </div>

</template>

<script>



    export default {
        props: ['serverSignal', 'setTitle', 'titleIsValid'],
        data () {
            return{
                isValid: false,
                isTouched: false,
                signalNoticed: false,
                errorMessage: '',
                chatTitle: ''
            }
        },
        watch: {
            serverSignal () {
                this.validateField();
            }
        },
        methods: {
            validateField () {

                if (!this.isTouched) {
                    this.isTouched = true
                }

                if (!this.signalNoticed && this.serverSignal.errmsg.indexOf('title') !== -1) {
                    this.signalNoticed = true;
                    this.isValid = false;
                    this.setTitle('', false);
                    this.errorMessage = 'This title already exists!';
                }
                else if (this.chatTitle.length === 0) {
                    this.setTitle('', false);
                    this.isValid = false;
                    this.errorMessage = 'Field mustn\'t be empty!';
                }
                else if (!this.chatTitle.match(/^[A-Za-z0-9_.]+$/)) {
                    this.setTitle('', false);
                    this.isValid = false;
                    this.errorMessage = 'Entered username is not valid!';
                }
                else {
                    this.isValid = true;
                    this.setTitle(this.chatTitle, true);
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