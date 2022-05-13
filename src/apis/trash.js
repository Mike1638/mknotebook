import request from "../helpers/request";
import friendlyDate  from "../helpers/util";
const URL ={
    revert:'/notes/:noteId/revert',
    get:'/notes/trash',
    delete:'/notes/:noteId/confirm',
}

export default{
    getAll(){
       return new Promise((resolve,reject)=>{
           request(URL.get)
           .then(res=>{
               res.data = res.data.sort((a,b)=>a.createdAt < b.createdAt ? 1 : -1)
               res.data.forEach(item=>{
                item.friendlyUpdateAt = friendlyDate(item.updatedAt)
                item.friendlycreateAt = friendlyDate(item.createdAt)
               }) 
               resolve(res)
           })
           .catch(err=>{
               reject(err)
           })  
       })
    },
    deleteNote({noteId}){
        return  request(URL.delete.replace(':noteId',noteId),'DELETE',)
    },
    revertNote({noteId}){
         return request(URL.revert.replace(':noteId',noteId),"PATCH")
    }
}