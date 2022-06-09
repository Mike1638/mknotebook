import request from "@/helpers/request";
import friendlyDate from "@/helpers/util";

const URL = {
  GET: "/notebooks",
  ADD: "/notebooks",
  UPDATE: "/notebooks/:id",
  DELETTE: "/notebooks/:id"
};

export default {
  getAll() {
    return new Promise((resolve, reject) => {
      request(URL.GET)
        .then(res => {
          res.data
            .sort((a, b) => (a.createAt > b.createAt ? 1 : -1))
            .forEach(item => {
              item.friendlyCreateAt = friendlyDate(item.createdAt);
              item.friendlyUpdateAt = friendlyDate(item.updatedAt);
            });
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
    //    return  request(URL.GET)
  },
  addNotebook({ title = "" } = { title: "" }) {
    return new Promise((resolve,reject)=>{
       request(URL.ADD, "POST", { title })
       .then(res=>{
      res.data.friendlyCreateAt = friendlyDate(res.data.createdAt)
      res.data.friendlyUpdateAt = friendlyDate(res.data.updatedAt)
      resolve(res)
       })
       .catch(err=>{
         reject(err)
       })
    })
  },
  updateNotebook(notebookId, { title = "" } = { title: "" }) {
    return request(URL.UPDATE.replace(":id", notebookId), "PATCH", { title });
  },
  deleteNotebook(notebookId) {
    console.log('deleteNotebook', notebookId)
    return request(URL.DELETTE.replace(":id", notebookId), "DELETE");
  }
};
