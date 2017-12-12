<template>
    <div>
        <div class="form-group">

            <label :class="{ 'text-danger': errors.has('field') }"
                   :for="id"
                   class="field-label">
                {{ fieldTitle }}
            </label>

            <div class="input-group">

                <input :class="{ 'is-invalid': errors.has('field') }"
                       :data-vv-rules="validationRules"
                       :placeholder="fieldValue"
                       class="form-control in"
                       type="email"
                       v-model="field"
                       v-validate.initial="field">

                <span class="input-group-btn">
                    <button class="btn btn-secondary" :disabled="isValid" @click="sendChanges">Save</button>
                </span>

            </div>

            <transition name="danger-box">
                <p class="text-danger" v-if="errors.has('field')" key="1">{{ errors.first('field') }}</p>
                <p class="text-success" v-if="showSign" key="2">Successfully changed!</p>
            </transition>

        </div>
    </div>
</template>

<script>
    //IMPORTED MODULES
    import axios from 'axios';
    //IMPORTED SERVICES
    import { ErrorHandler } from '../../../services/ErrorHandler.secvice';

    export default {
        props: {
            fieldTitle: {
                type: String,
                default: 'The title of the field'
            },
            fieldValue: {
                type: String,
                default: 'The current value of the field'
            },
            titleInData: {
                type: String
            },
            url: {
                type: String,
                required: true
            },
            validationRules: {
                type: String,
                required: true
            },
            setter: {
                type: Function
            }
        },
        data() {
            return {
                field: '',
                id: Date.now() + Math.random(),
                showSign: false
            }
        },
        computed: {
            isValid() {
                return this.errors.has('field') || this.field === '';
            }
        },
        methods: {
            sendChanges() {
                axios.post(this.url, { field: this.field })
                    .then(({ data }) => {
                    console.log('data', this.fieldTitle);
                        this.setter({ field: this.titleInData, value: data[this.titleInData] });
                        this.field = '';
                        this.showSuccessSign();
                    })
                    .catch(error => ErrorHandler.pushError({ message: 'Cannot change field try again later!' }));
            },
            showSuccessSign() {
                this.showSign = true;
                setTimeout(() => {
                    this.showSign = false;
                }, 2000)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .field-label {
        font-weight: 500;
        color: rgba(180, 180, 180, 1)
    }

    /*ANIMATIONS*/
    .danger-box-enter {
        opacity: 0;
    }

    .danger-box-enter-to {
        animation: danger-box-in 1s ease-out forwards;
        transition: opacity .5s;
    }

    .danger-box-leave-to {
        animation: danger-box-out 1s ease-out forwards;
        transition: opacity 1s;
        opacity: 0;
    }

    .danger-box-move {
        transition: transform 1s;
    }

    @keyframes danger-box-in {
        from {
            transform: translateY(-20px)
        }
        to {
            transform: translateY(0);
        }
    }

    @keyframes danger-box-out {
        from {
            transform: translateY(0)
        }
        to {
            transform: translateY(-20px);
        }
    }
</style>