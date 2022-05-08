<template>
  <div class="detail" id="notebook-list">
  <header>
    <a href="#" class="btn" @click="onCreate"> <i class="iconfont icon-plus"></i> 新建笔记本</a>
  </header>
   <main>
     <div class="layout">
       <h3>笔记本列表({{notebooksList.length}})</h3>
       <div class="book-list">
         <router-link v-for="(item,index) in notebooksList" :key="index" to="/note/6128" class="notebook">
           <div>
             <span class="iconfont icon-notebook"></span> {{item.title}}
             <span>{{item.noteCounts}}</span>
             <span class="action" @click.stop.prevent="onEdit(item)">编辑</span>
             <span class="action" @click.stop.prevent="onDelete(item)">删除</span>
             <span class="date">{{item.friendlyCreateAt}}</span>
           </div>
         </router-link>
       </div>
     </div>
   </main>
</div>
</template>

<script>
import Auth from '@/apis/auth'
import Notebooks from '@/apis/notebooks'
import friendlyDate from '@/helpers/util'

export default {
  data(){
    return{
      notebooksList:[]
    }
  },
  name: "Login",
  methods:{
    onCreate(){
     let title = window.prompt('请输入笔记本名：')
     console.log(title);
     if(title === null || title.trim() === ''){alert('名称不能为空'); return}
     Notebooks.addNotebook({title}).then(res=>{
       console.log(res);
       res.data.friendlyCreateAt = friendlyDate(res.data.createdAt) 
       this.notebooksList.unshift(res.data)
    })
    },
    onEdit(notebook){
     let title = window.prompt('请输入笔记本名：',notebook.title)
     if(title.trim() === ''|| title === null){alert('名称不能为空'); return}
     Notebooks.updateNotebook(notebook.id,{title}).then(data=>{console.log(data)})
     notebook.title = title
    },
    onDelete(notebook){
      let isconfirm = window.confirm('确认删除？')
      if(isconfirm){
      Notebooks.deleteNotebook(notebook.id).then(data=>{console.log(data)})
      console.log(this.notebooksList)
      let index = this.notebooksList.indexOf(notebook)
      this.notebooksList.splice(index,1)
      alert('删除成功')
      }else{
        return 
      }
    }
  },
  created(){
    Auth.getinfo().then(data=>{
      if(!data.isLogin){
        this.$router.push({path:'/login'})
      }
    })
    Notebooks.getAll().then(res=>{this.notebooksList = res.data;console.log(res)})

  },
};
</script>

<style lang="less" scoped>
@import url(../assets/css/notebook-list.less);
</style>