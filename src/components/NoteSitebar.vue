<template>
  <div class="note-sidebar">
    <span class="btn add-note" @click="onaddNote">添加笔记</span>
    <el-dropdown
      class="notebook-title"
      @command="handleCommand"
      placement="bottom"
    >
      <span class="el-dropdown-link">
        {{ currentBook.title }}<i class="iconfont icon-down"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          v-for="(item, index) in notebooksList"
          :key="index"
          :command="item.id"
          >{{ item.title }}</el-dropdown-item
        >
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
import Notebooks from "@/apis/notebooks";
import Notes from "@/apis/notes";
import Bus from "../helpers/bus";
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      //  notes:[],
      //  notebooks:[],
      //  currentBook:{}
    };
  },
  created() {
    this.getNotebooks()
      .then((res) => {
        this.setCurrentBook({ currentBookId: this.$route.query.notebookId });
        //  this.$store.commit('setCurrentBook',{currentBookId:this.$route.query.notebookId})
        return this.getNotes({ notebookId: this.currentBook.id });
      })
      .then(() => {
        this.setCurrentNote({ currentNoteId: this.$route.query.noteId });
        // this.$store.commit('setCurrentNote',{currentNoteId:this.$route.query.notebookId})
          if(this.currentNote.id != this.$route.query.noteId){
            this.$router.replace({
              path:'/note',
              query:{
                noteId:this.currentNote.id,
                notebookId:this.currentBook.id
              }
            })
          }
      });

    //   Notebooks.getAll()
    //   .then(res=>{
    //      this.notebooks = res.data
    //      this.currentBook =  this.notebooks.find(item=>item.id == this.$route.query.notebookId)  || this.notebooks[0]  || {}
    //      Notes.getAll({notebookId:this.currentBook.id}).then(res=>{
    //         console.log(res)
    //         this.notes = res.data
    //         this.$emit('update:notes',this.notes)
    //         Bus.$emit('update:notes',this.notes)
    //     })
    //  })
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
        this.$message("click on item " + notebookId);
        // this.setCurrentBook({currentBookId:notebookId})
        this.$store.commit("setCurrentBook", { currentBookId: notebookId });
        // this.currentBook =  this.notebooksList.find(item=>item.id == notebookId)  || {}
       
        // Notes.getAll({notebookId}).then(res=>{
        // console.log('xxxxx')
        // console.log(res);
        // this.notes = res.data
        // Bus.$emit('update:notes',this.notes)
        // })
    
        this.getNotes({ notebookId })
        .then(()=>{
          this.setCurrentNote();
          console.log(this.currentNote.id);
          console.log(this.$route.query.noteId);
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

      // console.log(this.$route.query.notebookId);
      //   this.getNotes({ notebookId:this.$route.query.notebookId})
      //   .then(()=>{
      //     this.setCurrentNote();
      //     console.log(this.currentNote.id);
      //     console.log(this.$route.query.noteId);
      //     // if(this.currentNote.id != this.$route.query.noteId){
      //       this.$router.replace({
      //         path:'/note',
      //         query:{
      //           noteId:this.currentNote.id,
      //           notebookId:this.currentBook.id
      //         }
      //       })
      //     // }
      //   })


      // Notes.addNotes({notebookId:this.currentBook.id},{title:'',content:''})
      // .then(res=>{
      //     console.log(res)
      //      this.notes.unshift(res.data)
      //   })
      // .catch(err=>{
      //   console.log(err);
      //   })
    },
  },
};
</script>


<style lang="less" >
@import url(../assets/css/note-sidebar.less);
</style>

