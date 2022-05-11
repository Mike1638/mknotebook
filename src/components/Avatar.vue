<template>
<span :title="username">{{slug}}</span>
</template>
<script>
import Auth from '@/apis/auth'
import Bus from "@/helpers/bus"
export default{
   data(){
       return {
       username:'无'
       }
   },
   created(){
        Bus.$on('getinfo', user => {
        this.username = user.username
      })
        Auth.getinfo().then(res=>{
            if(res.isLogin){
                this.username  = res.data.username
            }
        })
   },
   computed:{
        slug(){
          return this.username.charAt(0)
        }
        
    }
}
</script>

<style scoped>
span{
display: inline-block;
width: 30px;
height: 30px;
text-align: center;
line-height: 32px;
border-radius: 50%;
background: #f2b81c;
color: #fff;
text-shadow: 1px 0 1px #795c19;
font-weight: bold;
text-transform: uppercase;
font-size: 18px;
margin-top: 15px;
}
</style>
