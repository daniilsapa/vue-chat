import Vue from 'vue';

export const ErrorHandler = new Vue({
    data() {

        return {
            queueState: 'noErrors',
            errors: [],
            currentError: null
        }

    },
    methods: {
        pushError(error) {
            this.errors.push(error);
        },
        shiftError() {

            this.currentError = this.errors.shift();
            this.$emit('error', this.currentError);
            this.queueState = 'showingError';
        }
    },
    watch: {
        queueState(newQueueState) {

            if(newQueueState === 'ready'){
                this.shiftError();
            }
            else if(newQueueState === 'showingError'){
                setTimeout(() => {
                    this.currentError = null;

                    if(this.errors.length === 0) {
                        this.queueState = 'noErrors';
                        this.$emit('error', null);
                    }
                    else {
                        this.queueState = 'ready';
                    }
                }, 4000);
            }

        },
        errors(newErrors) {

            if(newErrors.length === 1 && this.queueState !== 'showingError') {
                this.queueState = 'ready';
            }
        }
    },
    created() {

        this.$on('pushError', error => {
            this.pushError(error);
        });

    }
});
