import Trash from "@/apis/trash"
import { Message } from "element-ui"
const state ={
  trashNotes:null,
  currentTrashNoteId:null,
}
const getters = {
   trashNotes:state=> state.trashNotes || [],
   currentTrashNote :(state,getters) =>{
       if(!state.currentTrashNoteId){
           return getters.trashNotes[0] || {} 
        } 
       return state.trashNotes.find(note=>note.id == state.currentTrashNoteId) || {}
    },
    belongTo:(state,getters,rootState,rootGetters)=>{
    //    console.log(rootGetters.notebooksList);
    //    console.log(getters.currentTrashNote.notebookId);
       let nootbook = rootGetters.notebooksList.find(notebook=>notebook.id == getters.currentTrashNote.notebookId) || []
       return nootbook.title  || ''
    }
}

const mutations = {
    setTrashNotes(state,payload){
        state.trashNotes = payload.trashNotes
    },
    addTrashNote(state,payload){
        setTrashNotes.unshift(payload.note)
    },
    deleteTrashNote(state, payload) {
        state.trashNotes = state.trashNotes.filter(note => note.id != payload.noteId)
    },
    setcurrentTrashNote(state, payload) {
        console.log(payload.currentTrashNoteId);
        state.currentTrashNoteId = payload.currentTrashNoteId
        console.log(state.currentTrashNoteId);
    }
}

const actions={
     getTrashNotes({commit}){
         return Trash.getAll()
         .then(res=>{
             commit('setTrashNotes',{trashNotes:res.data})
         })
     },
     deleteTrashNote({commit},payload){
        return Trash.deleteNote({noteId:payload.noteId})
        .then(res=>{
        commit("deleteTrashNote",{noteId:payload.noteId})
        Message.success(res.msg)
        })
     },
     revertTrashNote({commit},payload){
         return Trash.revertNote({noteId:payload.noteId})
         .then(res=>{
             commit("deleteTrashNote",{noteId:payload.noteId})
             Message.success(res.msg)
         })
     }
}

export default {
    state,
    getters,
    mutations,
    actions,
}