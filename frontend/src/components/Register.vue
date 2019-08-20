<template>
    <div>
        <h3>Register</h3>
        <form @submit.prevent="register">
            <input required type="email" v-model="input.email" id="email" placeholder="Email">
            <input required type="password" v-model="input.password" id="password" placeholder="Password">
            <input type="submit" name="submit" id="submit">
        </form>
        <p>Already have an account? Login <router-link to="/login" class="auth-link">here</router-link></p>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: "Register",
        data() {
        // any variables you use above must be defined here
        return {
            user: "",
            input: {
                email: "",
                password: "",
            },
            is_admin: null,
        }
    },
    methods: {
        register () {
            let data = {
            email: this.input.email,
            password: this.input.password,
            is_admin: this.is_admin
            }
            this.$store.dispatch('register', data)
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