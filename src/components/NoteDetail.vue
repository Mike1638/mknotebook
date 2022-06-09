<template>
  <div id="note" class="detail">
    <NoteSidebar :notes.sync="notes" />
    <div class="note-detail">
      <div class="note-empty" v-if="!currentBook.id">
       无笔记本无笔记请新建笔记本
      </div>
      <div class="note-empty" v-if="!currentNote.id">
       有笔记本无笔记请添加笔记
      </div>
      <div class="note-detail-ct" v-show="currentNote.id">
        <div class="note-bar">
          <span>创建日期:{{ currentNote.friendlyCreatedAt }}</span>
          <span>更新日期:{{ currentNote.friendlyUpdateAt }}</span>
          <span>{{ statusText }}</span>
          <span class="iconfont icon-delete" @click="onDeleteNote"></span>
          <span class="iconfont icon-fullscreen" @click="showMarkdown"></span>
        </div>
        <div class="note-title">
          <input
            type="text"
            v-model="currentNote.title"
            placeholder="输入标题"
            @input="onUpdateNote"
            @keydown="statusText = '编辑中'"
          />
        </div>
        <div class="editer">
          <textarea
            v-show="!isShowPreview"
            v-model="currentNote.content"
            placeholder="输入内容,支持markdown语法"
            @input="onUpdateNote"
            @keydown="statusText = '编辑中'"
          ></textarea>
          <div
            class="preview markdown-body"
            v-show="isShowPreview"
            v-html="preview"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NoteSidebar from "./NoteSitebar.vue"; 
import _ from "lodash";
import { Message } from "element-ui";
import Markdown from "markdown-it";
import {  mapGetters,  mapActions } from "vuex";

let md = new Markdown();
export default {
  name: "Login",
  components: { NoteSidebar },
  data() {
    return {
      statusText: "笔记未改动",
      isShowPreview: false,
    };
  },
  computed: {
    ...mapGetters(["notes", "currentNote",'currentBook']),
    preview() {
      return md.render(this.currentNote.content || "");
    },
  },
  methods: {
    ...mapActions(["updateNote", "deleteNote",'checkLogin']),
    onUpdateNote: _.debounce(function () {
      this.updateNote({
        noteId: this.currentNote.id,
        title: this.currentNote.title,
        content: this.currentNote.content,
      })
        .then((res) => {
          this.statusText = "已保存";
        })
        .catch((err) => {
          this.statusText = "未保存";
        });
    }, 300),

    onDeleteNote() {
      this.deleteNote({ noteId: this.currentNote.id })
        .then((res) => {
          if(this.notes.length !=0){
            this.$router.replace({
            path: "/note",
            query:{
              noteId:this.notes[0].id,
              notebookId :this.$route.query.notebookId,
            }
           });
          }else{
            this.$router.replace({
            path: "/note",
           })
          }
        })
        .catch((err) => {
          Message.error(err.msg);
        });
    },
    showMarkdown() {
      this.isShowPreview = !this.isShowPreview;
    },
  },
  created() {
    this.checkLogin({path:'/login'})
  },
  beforeRouteUpdate(to, from, next) {
    this.$store.commit("setCurrentNote", { currentNoteId: to.query.noteId });
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