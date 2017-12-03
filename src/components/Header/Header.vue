<template>
    <div>
        <session-bar></session-bar>
        <nav class="navbar navbar-expand-lg navbar-light">
            <router-link tag="div" to="/" exact class="navbar-brand" href="#">Werewolf</router-link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <router-link tag="div" class="nav-link" active-class="active" to="/" exact>Home</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link tag="div" class="nav-link" active-class="active" to="/chats">Chats</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link tag="div" class="nav-link" active-class="active" to="/profile">Profile</router-link>
                    </li>
                </ul>
            </div>
        </nav>

    </div>
</template>

<script>

    import SessionBar from './SessionBar.vue';

    export default {
        components: {
            'session-bar': SessionBar
        }
    }

</script>

<style>
    .navbar {
        color: rgba(255, 255, 255, 1);
    }

    .navbar  a{
        color: rgba(255, 255, 255, 1);
    }

    .navbar-brand {
        cursor: pointer;
        color: rgba(0, 119, 71, 1) !important;
    }

    .nav-item {
        cursor: pointer;
    }
</style>