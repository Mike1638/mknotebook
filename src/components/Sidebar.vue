<template>
  <div id="sidebar">
      <Avatar/>
    <div class="icons">
        <router-link to="/note" title="笔记"> <i class="iconfont icon-note"></i></router-link>
        <router-link to="/notebooks" title="笔记本"><i class="iconfont icon-notebook"></i></router-link>
        <router-link to="/trash" title="回收站"><i class="iconfont icon-trash"></i></router-link>
    </div>
    <div class="logout" >
        <i class="iconfont icon-logout" @click="onlogout"></i>
    </div>
  </div>
</template>

<script>
import Avatar from "./Avatar.vue";
import Auth  from "@/apis/auth"
export default {
methods:{
    onlogout(){
        console.log('logout');
        Auth.logout()
         .then(data=>{
           this.$router.push({path:'login'})
           console.log(data)
         })
    }
},
components:{Avatar},
};
</script>

<style lang="less" scoped>
#sidebar{
   position: relative;
   width: 56px;
   text-align: center;
   background-color: #0c4c7d;
}
.icons {
  margin-top: 15px;
a {
  padding: 6px 0;
  display: block;
}
  .router-link-active {
  background-color: #5e6266;
}
}

.logout{
    position: absolute;
    bottom: 20px;
    width: 100%;
    text-align: center;
    cursor: pointer;
   
}
 .iconfont{
    color:#fff  
}
</style>