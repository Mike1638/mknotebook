import Auth from "@/apis/auth"
import router from "@/router"
window.router = router

const state ={
   user:null
}
const getters  ={
   username:state=> state.user === null ? "F" : state.user.username ,
   slug:state=> state.user === null ? "F" : state.user.username.charAt(0)
}
const mutations ={
    setUser(state,payload){
     state.user = payload.user
    } 
}
const actions = {
    login({commit},payload){
      return  Auth.login({username:payload.username,password:payload.password})
      .then(res=>{
        commit('setUser',{user:res.data})
      })
    },
    register({commit},payload){
      return Auth.register({username:payload.username,password:payload.password})
      .then(res=>{
          commit('setUser',{user:res.data})
      })
    },
    checkLogin({commit,state},payload){
      if(state.user != null) return Promise.resolve()
      return Auth.getinfo()
      .then(res=>{
        if(!res.isLogin){
          payload &&  router.push(payload)
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