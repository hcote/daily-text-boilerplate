<template>
  <div class="subscribe-form">
    <h3>Subscribe</h3>
    <form action="http://localhost:3000/api/subscribe" method="POST">
      <label for="">Phone Number</label>
      <input type="text" name="number" id="" placeholder="555 555 5555"><br>
      <label for="">Time To Recieve Text (EST)</label>
      <input type="time" name="time" id=""><br>
      <input type="submit" value="Next">
    </form>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
    name: "Home",
    data() { return {} },
}
</script>

<style scoped>
    div {
      max-width: 500px;
      margin: 20px auto;
      box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.5);
      border-radius: 7px;
      padding: 20px 0;
    }

    input {
      margin: 20px;
      
    }

</style>
