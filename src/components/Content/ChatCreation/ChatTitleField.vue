<template>
    <div class="form-group">

        <label :class="{ 'text-danger': errors.has('field') }"
               :for="id"
               class="field-label">
            {{ fieldTitle }}
        </label>

        <div class="input-group">

            <input v-model="field"
                   v-validate.initial="field"
                   :class="{ 'is-invalid': errors.has('field') }"
                   :data-vv-rules="validationRules"
                   :placeholder="fieldValue"
                   class="form-control in"
                   type="email">

            <span class="input-group-btn">
                <button :disabled="isValid"
                        class="btn btn-secondary"
                        @click="createChatWrapper">
                    Create
                </button>
            </span>

        </div>

        <transition name="danger-box">
            <p class="text-danger"
               v-if="errors.has('field')">
                {{ errors.first('field') }}
            </p>
        </transition>

    </div>
</template>

<script>
    //IMPORTED MODULES
    import axios from 'axios';
    //IMPORTED MAPPERS
    import { mapGetters } from 'vuex';
    import { mapMutations } from 'vuex';
    import { mapActions } from 'vuex';

    export default {
        name: 'ChatTitleField',
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
            ...mapGetters({
                user: 'SESSION_G_GET_CURRENT_USER'
            }),
            isValid() {
                return this.errors.has('field') || this.field === '';
            }
        },
        methods: {
            ...mapActions({
                createChat: 'SESSION_A_CREATE_CHAT'
            }),
            createChatWrapper() {
                this.createChat({
                    data: {
                        creator: this.user._id,
                        title: this.field,
                        type: 'public'
                    },
                    cb: () => {
                        this.$router.push('/chats');
                    }
                });
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