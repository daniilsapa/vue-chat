<template>
    <div class="user-profile">
        <div class="row justify-content-center">

            <div class="col-lg-10">
                <ul class="nav text-center">

                    <li class="nav-item">
                        <router-link tag="a" class="nav-link" active-class="text-info" to="/profile" exact>Profile</router-link>
                    </li>

                    <li class="nav-item">
                        <router-link tag="a" class="nav-link" active-class="active" to="/profile/edit" exact>Edit</router-link>
                    </li>

                </ul>
            </div>

            <div class="col-lg-10">

                <hr/>

                <div class="profile-field">
                    <h5>First name</h5>
                    <p>{{ user.firstName }}</p>
                </div>

                <div class="profile-field">
                    <h5>Last name</h5>
                    <p>{{ user.lastName }}</p>
                </div>

                <div class="profile-field">
                    <h5>Username</h5>
                    <p>{{ user.username }}</p>
                </div>

                <div class="profile-field">
                    <h5>Email</h5>
                    <p>{{ user.email }}</p>
                </div>

                <div class="profile-field">
                    <h5>Phone</h5>
                    <p>{{ user.phone }}</p>
                </div>

            </div>

        </div>
    </div>
</template>

<script>
    export default {
        props: ['user'],
    }
</script>

<style lang="scss" scoped>
    .user-profile {
        margin-bottom: 195px;
    }
    .profile-field {
        h5 {
            color: rgba(130, 130, 130, 1);
        }
        p {
            color: rgba(150, 150, 150, 1);
        }
    }

    .nav-link{
        color: rgba(190, 190, 190, 1);
    }
</style>