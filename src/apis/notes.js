import request from "../helpers/request";
import friendlyDate  from "../helpers/util";
const URL ={
    add:'/notes/to/:notebookId',
    get:'/notes/from/:notebookId',
    delete:'/notes/:noteId',
    edit:'/notes/:noteId',
}

export  default {
   getAll({notebookId}){
    return  new Promise((resolve,reject)=>{
        request(URL.get.replace(':notebookId',notebookId))
        .then(res=>{
            res.data.sort((a,b)=>a.updatedAt < b.updatedAt ?  1 : -1)
            .forEach(item=>{
                item.friendlyUpdateAt = friendlyDate(item.updatedAt)
                item.friendlycreateAt = friendlyDate(item.createdAt)
            })
            resolve(res)
        }).catch(err=>{
            reject(err)
        })       
    })
   },
   addNotes({notebookId},{title,content}){
       return new Promise((resolve,reject)=>{
         request(URL.add.replace(':notebookId',notebookId),"POST",{title,content})
         .then(res=>{
             res.data.friendlyUpdateAt = friendlyDate(res.data.updatedAt)
             res.data.friendlyCreateAt = friendlyDate(res.data.createdAt)
             resolve(res)
         })
         .catch(err=>{
             reject(err)
         })  
       })
   },
    updateNotes({noteId},{title,content}){
    return request(URL.edit.replace(':noteId',noteId),"PATCH",{title,content})
   },
   deleteNotes({noteId}){
    return request(URL.delete.replace(':noteId',noteId),"DELETE")
   }
}
