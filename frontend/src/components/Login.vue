<template>
    <div>
        <h3>Login</h3>
        <form @submit.prevent="login">
            <input required type="email" v-model="input.email" id="email" placeholder="Email">
            <input required type="password" v-model="input.password" id="password" placeholder="Password">
            <input type="submit" name="submit" id="submit">
        </form>
        <p>Don't have an account? Register <router-link to="/register" class="auth-link">here</router-link></p>
        <!-- the line below adds a second App component to the page -->
        <!-- but it also loads the register component at /register -->
        <router-view></router-view>

        <!-- uncomment line below for get request example date to show -->
        <!-- <p>API data: {{user}}</p> -->
    </div>
</template>

<script>
// import axios from "axios";

export default {
    name: "Login",
    // data represents the state of this component
    data() {
        // any variables you use above must be defined here
        return {
            user: "",
            input: {
                email: "",
                password: "",
            },
            token: "",
        }
    },

    // ===== EXAMPLE OF A GET REQUEST =====
    // mounted(){
    //    axios({ method: "GET", "url": "http://localhost:3000/api/user/4"})
    //     .then(result => {
    //         this.user = result.data.user.email;
    //     }, error => {
    //         /* eslint-disable */
    //         console.error(error);
    //     });
    // },

    methods: {
        login() {
            let email = this.input.email
            let password = this.input.password
            // let password = this.password 
            this.$store.dispatch('login', { email, password })
                .then(() => this.$router.push('/'))
                // eslint-disable-next-line
                .catch(err => console.log(err))
        }
    }
}
</script>

<style scoped>

    p {
        font-size: .5em;
    }

    input {
        width: 20em;
        height: 2.2em;
        display: block;
        margin: 1em auto;
    }

    input[type=submit] {
        /* width is hard coded - need a better solution */
        width: 220px;
        padding: 0px;
        background: #42b883;
        color: #FFF;
        font-size: .55em;
        border-radius: .2em;
    }

    * {
        box-sizing: border-box;
    }

    .auth-link {
        text-decoration: none;
        color: #42b883;
    }

</style>
