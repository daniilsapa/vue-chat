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

                <input-field :fieldValue="user.firstName"
                             :setter="setField"
                             fieldTitle="First name"
                             titleInData="firstName"
                             url="/private/users/change/firstName"
                             validationRules="alpha_spaces">
                </input-field>

                <input-field :fieldValue="user.lastName"
                             :setter="setField"
                             fieldTitle="Last name"
                             titleInData="lastName"
                             url="/private/users/change/lastName"
                             validationRules="alpha_spaces">
                </input-field>

                <input-field :fieldValue="user.username"
                             :setter="setField"
                             fieldTitle="Username"
                             titleInData="username"
                             url="/private/users/change/username"
                             :validationRules="`alpha_dash|usernameExists`">
                </input-field>

                <input-field :fieldValue="user.email"
                             :setter="setField"
                             fieldTitle="Email"
                             titleInData="email"
                             url="/private/users/change/email"
                             validationRules="email|emailExists">
                </input-field>

                <input-field :fieldValue="user.phone"
                             :setter="setField"
                             fieldTitle="Phone"
                             titleInData="phone"
                             url="/private/users/change/phone"
                             validationRules="numeric|max:12">
                </input-field>

            </div>

        </div>
    </div>
</template>

<script>
    //IMPORTED MAPPERS
    import { mapMutations } from 'vuex';

    export default {
        props: ['user'],
        methods: {
            ...mapMutations({ setField: 'SESSION_M_SET_FIELD' }),
        }
    }
</script>

<style lang="scss" scoped>
    .nav-link{
        color: rgba(180, 180, 180, 1);
    }
</style>