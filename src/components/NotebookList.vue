<template>
  <div class="detail" id="notebook-list">
  <header>
    <a href="#" class="btn" @click.prevent="onCreate"><i class="iconfont icon-plus"></i> 新建笔记本</a>
  </header>
   <main>
     <div class="layout">
       <h3>笔记本列表({{notebooksList.length}})</h3>
       <div class="book-list">
         <router-link v-for="(item,index) in notebooksList" :key="index" :to="`/note?notebookId=${item.id}`" class="notebook">
           <div>
             <span class="iconfont icon-notebook"></span> {{item.title}}
             <span>{{item.noteCounts}}</span>
             <span type="text" class="action" @click.stop.prevent="onEdit(item)">编辑</span>
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
import {mapState,mapActions,mapGetters} from 'vuex'

export default {
  data(){
    return{
      
    }
  },
  name: "Login",
  methods:{
    ...mapActions([
    'getNotebooks', 
    'addNotebook', 
    'updateNotebook', 
    'deleteNotebook', 
    'checkLogin'
    ]),
    onCreate(){
       this.$prompt('请输入笔记本名', '新建笔记本', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern:/^.{1,30}$/,
          inputErrorMessage: '名称不能为空,且不超过30个字符',
        }).then(({ value }) => {
          this.addNotebook({title:value})
            // return Notebooks.addNotebook({title:value})
        })
        
        // .then(res=>{
        //    console.log(res);
        //    res.data.friendlyCreateAt = friendlyDate(res.data.createdAt) 
        //    this.notebooksList.unshift(res.data)
        //   this.$message({
        //     type: 'success',
        //     message: '笔记本名为: ' + res.data.title
        //   });
        // })
    },
    onEdit(notebook){
       let title  = ''
        this.$prompt('请输入笔记本名', '修改笔记本', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern:/^.{1,35}$/,
          inputErrorMessage: '名称不能为空,且不超过30个字符',
          inputValue:notebook.title,
        }).then(({ value }) => {
          title = value
          this.updateNotebook({notebookId:notebook.id,title:title})
        //  return  Notebooks.updateNotebook(notebook.id,{title})
        })
        
        
        // .then(res=>{
        //   notebook.title = title
        //   this.$message({
        //     type: 'success',
        //     message: '笔记本名修改为: ' + title
        //   });
        // }).catch(err=>{
        //   this.$message({
        //     type: 'error',
        //     message: '取消修改'
        //   });
        // })
    },
    onDelete(notebook){
      this.$confirm('确认删除笔记, 是否继续?', '删除笔记本', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          this.deleteNotebook({notebookId:notebook.id})
            // return  Notebooks.deleteNotebook(notebook.id)
        })
        
        // .then(res => {
        //   let index = this.notebooksList.indexOf(notebook)
        //   this.notebooksList.splice(index,1)
        //   this.$message({
        //     type: 'success',
        //     message: res.msg
        //   });
        // })
    }
  },
  created(){
    this.checkLogin({ path:'/login' })
    // Auth.getinfo().then(data=>{
    //   if(!data.isLogin){
    //     this.$router.push({path:'/login'})
    //   }
    // })
    
    // Notebooks.getAll().then(res=>{this.notebooksList = res.data;console.log(res)})
   this.$store.dispatch('getNotebooks') 

  },
  computed:{
    ...mapGetters(['notebooksList'])
  }
};
</script>

<style lang="less" scoped>
@import url(../assets/css/notebook-list.less);
</style>