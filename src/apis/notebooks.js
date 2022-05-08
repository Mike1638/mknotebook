import request from '@/helpers/request'
import friendlyDate from '@/helpers/util'

const URL ={
    GET : '/notebooks',
    ADD : '/notebooks',
    UPDATE : '/notebooks/:id',
    DELETTE : '/notebooks/:id',
}

export default {
   getAll(){
    return new Promise((resolve,reject)=>{
        request(URL.GET).then(res=>{
         res.data.sort((notebook1, notebook2) => notebook1.createAt > notebook2.createAt ? 1 : -1)
         .forEach(item=>{item.friendlyCreateAt = friendlyDate(item.createdAt)})
         resolve(res)
        }).catch(err=>{
            reject(err)
        })
     })
    //    return  request(URL.GET)
   },
   addNotebook({title=''} = {title:''}){
       return request(URL.ADD,'POST',{title})
   },
   updateNotebook(notebookId,{title=''}={title:''}){
       return request(URL.UPDATE.replace(':id',notebookId),'PATCH',{title})
   },
   deleteNotebook(notebookId){
       return request(URL.DELETTE.replace(':id',notebookId),'DELETE')
   }
}