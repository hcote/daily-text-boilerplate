<template>
    <div>
    <p>User: {{user}}</p>
    <p>Subscription: {{sub}}</p>
    <p>Member Since: {{created_on}}</p>
    <button>Change password</button>
    </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "Profile",
    // data represents the state of this component
    data() {
        // any variables you use above must be defined here
        return {
            user: "",
            sub: "",
            created_on: "",
        }
    },
     mounted(){
       axios({ method: "GET", "url": "http://localhost:3000/api/user/4"})
        .then(result => {
            this.user = result.data.user.email;
            this.sub = result.data.user.active_sub;
            this.created_on = result.data.user.created_on;
        }, error => {
            /* eslint-disable */
            console.error(error);
        });
    },
}
</script>

<style scoped>

</style>   

  
