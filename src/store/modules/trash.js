import Trash from "@/apis/trash"

const state ={
  trashNotes:null,
  currentTrashNoteId:null
}
const getters = {
   trashNotes:state=> state.trashNotes || [],
   currentTrashNote :(state,getters) =>{
       if(!state.currentTrashNoteId) return getters.trashNotes[0] || {}
       return state.trashNotes.find(note=>note.id == state.currentTrashNoteId) || {}

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
        state.currentTrashNoteId = payload.currentTrashNoteId
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
        })
     },
     revertTrashNote({commit},payload){
         return Trash.revertNote({noteId:payload.noteId})
         .then(res=>{
             commit("deleteTrashNote",{noteId:payload.noteId})
         })
     }
}

export default {
    state,
    getters,
    mutations,
    actions,
}