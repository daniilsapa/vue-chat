<template>
    <div class="user-profile">

        <div class="row justify-content-center">

            <div class="col-lg-10">
                <ul class="nav text-center">
                    <li class="nav-item">
                        <router-link tag="a" class="nav-link" active-class="active" to="/profile" exact>Profile</router-link>
                    </li>
                </ul>
            </div>

            <div class="col-lg-10">
                <hr/>
                <div class="profile-field">
                    <h5>username</h5>
                    <p>{{ user.username }}</p>
                </div>
                <div class="profile-field">
                    <h5>email</h5>
                    <p>{{ user.email }}</p>
                </div>
                <div class="profile-field">
                    <h5>phone</h5>
                    <p>{{ user.phone }}</p>
                </div>
            </div>

        </div>


    </div>
</template>

<script>

    export default {
        props: ['user'],
        computed: {

        },
        components: {

        }

    }

</script>

<style lang="scss" scoped>

    $grey180: rgba(180, 180, 180, 1);

    .user-profile {

        background: rgba(255, 255, 255, 1);

        border: 1px solid $grey180;
        border-radius: 10px;

        padding: 15px 0 100px 0;

    }

    .profile-field {
        h5 {
            color: rgba(130, 130, 130, 1);
        }
        p {
            color: rgba(150, 150, 150, 1);
        }
    }

    .active {
        color: rgba(0, 119, 71, 1) !important;

    }

    .nav-link{
        color: $grey180;
    }

</style>