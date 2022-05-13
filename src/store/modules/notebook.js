import Notebooks from '@/apis/notebooks'
import {Message} from "element-ui"
const state = {
    notebooksList:null,
    currentBookId:null
}

const getters ={
    notebooksList:state=>state.notebooksList || [],
    currentBook:state=>{
        if(!Array.isArray(state.notebooksList)) return  {}
        if(!state.currentBookId) return state.notebooksList[0] || {}
        return state.notebooksList.find(notebook=>notebook.id == state.currentBookId) || {}
    }
}

const mutations = {
  setNotebooks(state,payload){
      state.notebooksList = payload.notebooksList
  },
  addNotebook(state,payload){
     state.notebooksList.unshift(payload.notebooksList)
  },
  updateNotebook(state,payload){
      let notebook = state.notebooksList.find(notebook=>notebook.id == payload.notebookId) || {}
      notebook.title = payload.title
  },
  deleteNotebook(state,payload){
    state.notebooksList =  state.notebooksList.filter(notebook=>notebook.id != payload.notebookId)
  },
  setCurrentBook(state,payload){
      state.currentBookId =  payload.currentBookId   
  }
}

const actions ={
   getNotebooks({commit}){
     return  Notebooks.getAll()
       .then(res=>{
        commit('setNotebooks',{notebooksList:res.data})
       })
       .catch(err=>{

       })
   },
   addNotebook({commit},payload){
     return  Notebooks.addNotebook({title:payload.title})
       .then(res=>{
       commit('addNotebook',{notebooksList:res.data})
       Message.success(res.msg)
       })
       .catch(err=>{

       })
   },
   updateNotebook({commit},payload){
     return   Notebooks.updateNotebook(payload.notebookId,{title:payload.title})
       .then(res=>{
         commit('updateNotebook',{notebookId:payload.notebookId,title:payload.title})
         Message.success(res.msg)
       })
       .catch(err=>{

       })
   },
   deleteNotebook({commit},payload){
    return    Notebooks.deleteNotebook(payload.notebookId)
       .then(res=>{
        commit('deleteNotebook',{notebookId:payload.notebookId})
        Message.success(res.msg)
       })
       .catch(err=>{

       })
   }

}

export default {
  state,
  getters,
  mutations,
  actions
}