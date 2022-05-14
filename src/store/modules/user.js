import Auth from "@/apis/auth"
import router from "@/router"
window.router = router
const state ={
   user:null
}
const getters  ={
   username:state=> state.user === null ? "未登录" : state.user.username ,
   slug:state=> state.user === null ? "未" : state.user.username.charAt(0)
}
const mutations ={
    setUser(state,payload){
     state.user = payload.user
    } 
}
const actions = {
    login({commit},payload){
      console.log(payload);
      return  Auth.login({username:payload.username,password:payload.password})
      .then(res=>{
        console.log('wwwwwwwwwww');
        commit('setUser',{user:res.data})
        console.log(res.data);
      })
      // .catch(err=>{
      //   console.log('catch');
      // console.log(err);
      // })           
    },
    register({commit},payload){
      return Auth.register({username:payload.username,password:payload.password})
      .then(res=>{
          console.log(res);
          commit('setUser',{user:res.data})
      })
    },
    checkLogin({commit,state},payload){
      if(state.user != null) return Promise.resolve()
      return Auth.getinfo()
      .then(res=>{
        console.log(res.data);
        console.log(payload);
        if(!res.isLogin){
          console.log('jump')
          router.push(payload)
         }else{
          commit('setUser',{user:res.data})
        }
      })
    }
}

export default {
  state,
  getters,
  mutations,
  actions
}