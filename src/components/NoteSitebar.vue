<template>
  <div class="note-sidebar">
    <span v-if="currentBook.id" class="btn add-note" @click="onaddNote">添加笔记</span>
    <span v-if="!currentBook.id" class="notebook-title">暂无笔记</span>
    <el-dropdown v-if="currentBook.id"  class="notebook-title"  @command="handleCommand"  placement="bottom" >
      <span class="el-dropdown-link">
        {{ currentBook.title }}<i class="iconfont icon-down"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="(item, index) in notebooksList"    :key="index"  :command="item.id" >{{ item.title }}</el-dropdown-item   >
        <el-dropdown-item command="trash">回收站</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div class="menu">
      <div>更新时间</div>
      <div>标题</div>
    </div>
    <ul class="notes">
      <li v-for="(note, index) in notes" :key="index">
        <router-link :to="`/note?noteId=${note.id}&notebookId=${currentBook.id}`">
          <span class="date">{{ note.friendlyUpdateAt }}</span>
          <span class="title">{{ note.title }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  created() {
    this.getNotebooks()
      .then(() => {
        this.setCurrentBook({ currentBookId: this.$route.query.notebookId });
        if(this.currentBook.id) 
        return this.getNotes({ notebookId: this.currentBook.id });
      })
      .then(() => {
        this.setCurrentNote({ currentNoteId: this.$route.query.noteId });
          if(this.currentNote.id != this.$route.query.noteId){
            this.$router.replace({
              path:'/note',
              query:{
                noteId:this.currentNote.id,
                notebookId:this.currentBook.id
              }
            })
          }
      }).catch(()=>{
      });
  },
  computed: {
    ...mapGetters(["notes", "currentBook", "notebooksList","currentNote"]),
  },
  methods: {
    ...mapMutations(["setCurrentBook", "setCurrentNote"]),
    ...mapActions(["getNotebooks", "getNotes", "addNote"]),
    handleCommand(notebookId) {
      if (notebookId == "trash") {
        this.$router.push("/trash");
      } else {
        this.$message("切换成功");
        this.$store.commit("setCurrentBook", { currentBookId: notebookId });
        this.getNotes({ notebookId })
        .then(()=>{
          this.setCurrentNote();
          if(this.currentNote.id != this.$route.query.noteId){
            this.$router.replace({
              path:'/note',
              query:{
                noteId:this.currentNote.id,
                notebookId:this.currentBook.id
              }
            })
          }
        })
      }
    },
    onaddNote() {
      this.addNote(
        { notebookId: this.currentBook.id },
        { title: "", content: "" }
      )
    },
  },
};
</script>


<style lang="less" >
@import url(../assets/css/note-sidebar.less);
</style>

