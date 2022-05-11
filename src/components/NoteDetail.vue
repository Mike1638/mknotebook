<template>
  <div id="note" class="detail">
    <NoteSidebar :notes.sync="notes" />
    <div class="note-detail">
      <div class="note-empty" v-show="!currentNote.id">请选择标签</div>
      <div class="note-detail-ct" v-show="currentNote.id">
        <div class="note-bar">
          <span>创建日期:{{ currentNote.friendlyCreatedAt }}</span>
          <span>更新日期:{{ currentNote.friendlyUpdateAt }}</span>
          <span>{{statusText}}</span>
          <span class="iconfont icon-delete" @click="deleteNote"></span>
          <span class="iconfont icon-fullscreen" @click="showMarkdown"></span>
        </div>
        <div class="note-title">
          <input
            type="text"
            v-model="currentNote.title"
            placeholder="输入标题"
            @input="updateNote"
            @keydown="statusText='编辑中'"
          />
        </div>
        <div class="editer">
          <textarea
            v-show="!isShowPreview"
            v-model="currentNote.content"
            placeholder="输入内容,支持markdown语法"
            @input="updateNote"
            @keydown="statusText='编辑中'"
          ></textarea>
          <div class="preview markdown-body" v-show="isShowPreview" v-html="preview"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Auth from "@/apis/auth";
import NoteSidebar from "./NoteSitebar.vue";
import Bus from "@/helpers/bus";
import _ from 'lodash'
import Notes from "../apis/notes";
import { Message } from "element-ui";
import Markdown from 'markdown-it'
let md = new Markdown()
console.log(md);
export default {
  name: "Login",
  components: { NoteSidebar },

  data() {
    return {
      currentNote: {},
      notes: [],
      statusText:'笔记未改动',
      isShowPreview:false
    };
  },
  computed:{
    preview(){
      return md.render(this.currentNote.content || '')
    }
  },
  methods:{
   updateNote:_.debounce(function(){
      Notes.updateNotes({noteId:this.currentNote.id},{title:this.currentNote.title,content:this.currentNote.content}) 
      .then(res=>{
        console.log(res)
        this.statusText = '已保存'
      })
      .catch(err=>{
        console.log(err);
        this.statusText = '未保存'
      })
   },300),
    deleteNote(){
      let a
      Notes.deleteNotes({noteId:this.currentNote.id})
      .then(res=>{
        Message.success(res.msg)
        a = this.notes.indexOf(this.notes.find(item =>item.id == this.currentNote.id))    
        this.notes.splice(a,1)
        this.$router.replace({path:"/note"})
      })
      .catch(err=>{
         Message.error(err.msg)
      })
    },
    showMarkdown(){
      this.isShowPreview = !this.isShowPreview
    }
  },
  created() {
    Auth.getinfo().then((data) => {
      if (!data.isLogin) {
        this.$router.push({ path: "/login" });
      }
    });
    Bus.$on("update:notes", (val) => {
      console.log(val);
      console.log(this.$route.query.noteId);
      this.currentNote =
        val.find((note) => note.id == this.$route.query.noteId) || {};
    });
    console.log(this.currentNote);
  },
  mounted() {
    console.log(this.notes);
    console.log(this.currentNote);
  },
  beforeRouteUpdate(to, from, next) {
    console.log("beforeRouterUpdate");
    console.log(to.query.noteId, from.query.noteId, next);
    this.currentNote = this.notes.find((item) => item.id == to.query.noteId);
    next();
  },
};
</script>

<style lang="less">
@import url(../assets/css/note-detail.less);
#note {
  display: flex;
  align-items: stretch;
  background-color: #fff;
  flex: 1;
}
</style>