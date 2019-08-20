<template>

  <div id="app">
    <ul>
        <li v-if="isLoggedIn"><router-link to="/" class="nav-link">Home</router-link></li>
        <li v-if="!isLoggedIn"><router-link to="/login" class="nav-link">Login</router-link></li>
        <li v-if="!isLoggedIn"><router-link to="/register" class="nav-link">Register</router-link></li>
        <li v-if="isAdmin"><router-link to="/admin" class="nav-link">Admin</router-link></li>
        <li v-if="isLoggedIn"><router-link to="/profile" class="nav-link">Profile</router-link></li>
        <li v-if="isLoggedIn"><a  class="nav-link" @click="logout">Logout</a></li>
    </ul>
    <img alt="Vue logo" src="../assets/logo.png">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
    name: "Nav",
    computed : {
        isLoggedIn : function(){ 
            return this.$store.getters.isLoggedIn
        },
        isAdmin : function(){ 
            return this.$store.getters.isAdmin
        }
    },
    methods: {
        logout: function () {
            this.$store.dispatch('logout')
            .then(() => {
                this.$router.push('/login')
            })
        }
    },
}
</script>

<style scoped>

    #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    /* margin-top: 60px; */
    }

    div {
        top: 0;
        width: 100%;
        display: block;
    }

    .nav-link {
        text-decoration: none;
        color: #42b883;
    }

    li {
        display: inline;
        padding: 1em;
        font-size: .6em;
    }

    li:visited {
        list-style-type: none;
        text-decoration: none;
        color: gray;
    }

    li:hover {
        list-style-type: none;
        text-decoration: none;
        color: gray;
    }

    ul {
        padding-left: 0;
        list-style-type: none;
        text-decoration: none;
        background-color: #000;
        margin-top: 0;
        /* border-bottom: 1px solid #707070; */
        height: 1.75em;
        text-align: right;
        box-shadow: 0px .5px 6px 0px #707070;
    }

</style>

