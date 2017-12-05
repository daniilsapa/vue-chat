<template>
    <div class="profile-edit">

        <div class="row justify-content-center">

            <div class="col-lg-10">
                <ul class="nav text-center">
                    <li class="nav-item">
                        <router-link tag="a" class="nav-link" active-class="text-info" to="/profile" exact>Profile</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link tag="a" class="nav-link" active-class="text-info" to="/profile/edit">Edit</router-link>
                    </li>
                </ul>
            </div>

            <div class="col-lg-10">
                <hr/>
                <profile-field-edit v-for="field in profileFields" :field="field"></profile-field-edit>
            </div>
        </div>

    </div>
</template>

<script>

    //IMPORTED COMPONENTS
    import ProfileFieldEdit from './ProfileFieldEdit/ProfileFieldEdit.vue';

    export default {
        props: ['user'],
        computed: {
            profileFields() {

                const fieldsArray = [],
                      neededFields = new RegExp(/username|email|phone|password/);

                for(let key in this.user){
                    if(key.match(neededFields)) {
                        fieldsArray.push({
                            name: key,
                            value: this.user[key]
                        })
                    }
                }

                return fieldsArray;

            }
        },
        components: {
            ProfileFieldEdit
        }

    }

</script>

<style lang="scss" scoped>

    .nav-link{
        color: rgba(180, 180, 180, 1);
    }

</style>