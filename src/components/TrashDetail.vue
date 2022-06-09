<template>
  <div id="trash" class="datail">
    <div class="note-sidebar">
      <h3 class="notebook-title">回收站</h3>
      <div class="menu">
        <div>更新时间</div>
        <div>标题</div>
      </div>
      <ul class="notes">
        <li v-for="(note, index) in trashNotes" :key="index">
          <router-link :to="`/trash?noteId=${note.id}`">
            <span class="date">{{ note.friendlyUpdateAt }}</span>
            <span class="title">{{ note.title }}</span>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="note-detail">
      <div class="note-bar" v-if="true">
        <span> 创建日期: {{ currentTrashNote.friendlyCreateAt }}</span>
        <span> | </span>
        <span> 更新日期: {{ currentTrashNote.friendlyUpdateAt }}</span>
        <span> | </span>
        <span> 所属笔记本: {{ belongTo }}</span>
        <a class="btn action" @click="onRevert">恢复</a>
        <a class="btn action" @click="onDelete">彻底删除</a>
      </div>
      <div class="note-title">
        <span>{{ currentTrashNote.title }}</span>
      </div>
      <div class="editor">
        <div class="preview markdown-body" v-html="compiledMarkdown"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Markdown from "markdown-it";
import {mapGetters,mapMutations,mapActions} from 'vuex'
let md = new Markdown()
export default {
  name: "Login",
  data() {
    return {
      
    };
  },
  created() {
    this.checkLogin({ path: "/login" })
    this.getNotebooks()
    this.getTrashNotes()
    .then(()=>{
      this.setcurrentTrashNote({currentTrashNoteId:this.$route.query.noteId})
      if(this.currentTrashNote.id != this.$route.query.noteId){
        this.$router.replace({
          path:"/trash",
          query:{
            noteId : this.currentTrashNote.id
          }
        })
      }
    })
    
  },
  computed:{
    ...mapGetters([
      'trashNotes',
      'currentTrashNote',
      'belongTo',
    ]),
    compiledMarkdown(){
        return md.render(this.currentTrashNote.content || "");
    }
  },
  methods:{
    ...mapActions([
      'getTrashNotes',
      'deleteTrashNote',
      'revertTrashNote',
      'getNotebooks',
      'checkLogin'
    ]),
    ...mapMutations([
      'setcurrentTrashNote'
    ]),
    onRevert(){
      this.revertTrashNote({noteId:this.currentTrashNote.id})
      .then(()=>{
      this.setcurrentTrashNote({})
        this.$router.replace({
          path:'/trash',
          query:{
            noteId:this.currentTrashNote.id
          }
        })
      })
    },
    onDelete(){
      this.$confirm('删除后将无法恢复','确定彻底删除?',{
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        type:'warning'
      })
      .then(()=>{
      this.deleteTrashNote({noteId:this.currentTrashNote.id})
      .then(()=>{
      this.setcurrentTrashNote({})
      this.$router.replace({
        path:'/trash',
        query:{
          noteId:this.currentTrashNote.id
        }
      })
      })
      })
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.setcurrentTrashNote({currentTrashNoteId:to.query.noteId})
    next();
  },
};
</script>

<style lang="less">
@import url(../assets/css/note-sidebar.less);
@import url(../assets/css/note-detail.less);

#trash{
  display: flex;
  align-items: stretch;
  background-color:#fff;
  flex: 1;
  .note-bar{
    .action{
      float:right;
      margin-left: 10px;
      padding:2px 4px;
      font-size:12px;
    }
  }
}

</style>