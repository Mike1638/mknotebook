<template>
  <div id="login">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import Auth from '@/apis/auth'
export default {
  name: "Login",
  data() {
    return {
      msg: "This is NoteDetail page",
    };
  },
  created(){
    Auth.getinfo().then(data=>{
      if(!data.isLogin){
        this.$router.push({path:'/login'})
      }
    })
  }
};
</script>

<style scoped>
h1 {
  color: red;
}
</style>