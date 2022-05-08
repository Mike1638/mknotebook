import axios from 'axios'
import BaseURLconfig from './config-baseURL'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.baseURL = BaseURLconfig.baseURL
axios.defaults.withCredentials = true
export default  function request(url,type = 'GET',data = {}){
    return new Promise((resolve,reject)=>{
      let option = {
          url,
          method:type,
          ValidityState(status){
              return (status>=200 && status <300) || status === 400
          }
      }
      if(type.toLowerCase() === 'get'){
          option.params = data
      }else{
          console.log(data)
          option.data  = data
      }
      axios(option).then(res=>{
          if(res.status === 200){
              resolve(res.data)
          }else{
              reject(res.data)
          }
      }).catch(err=>{
          reject({msg:'密码错误'})
      })
    })
}