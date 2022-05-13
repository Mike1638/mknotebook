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
import Auth from "@/apis/auth";
import Markdown from "markdown-it";
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
let md = new Markdown()
export default {
  name: "Login",
  data() {
    return {
      // currentTrashNote: {
      //   id: 22,
      //   title: "我的笔记",
      //   content: "## hello",
      //   friendlyCreateAt: "2小时",
      //   friendlyUpdateAt: "2小时",
      // },
      belongTo:'我的笔记',
      // trashNotes:[
      //   {
      //   id: 22,
      //   title: "我的笔记",
      //   content: "## hello",
      //   friendlyCreateAt: "2小时",
      //   friendlyUpdateAt: "2小时",
      // },
      // {
      //   id: 23,
      //   title: "我的笔记",
      //   content: "## hello",
      //   friendlyCreateAt: "2小时",
      //   friendlyUpdateAt: "2小时",
      // },
      // {
      //   id: 24,
      //   title: "我的笔记",
      //   content: "## hello",
      //   friendlyCreateAt: "2小时",
      //   friendlyUpdateAt: "2小时",
      // },
      // {
      //   id: 25,
      //   title: "我的笔记",
      //   content: "## hello",
      //   friendlyCreateAt: "2小时",
      //   friendlyUpdateAt: "2小时",
      // }
      // ]
    };
  },
  created() {
    Auth.getinfo().then((data) => {
      if (!data.isLogin) {
        this.$router.push({ path: "/login" });
      }
    });
    this.getTrashNotes()
  },
  computed:{
    ...mapGetters([
      'trashNotes',
      'currentTrashNote'
    ]),
    compiledMarkdown(){
        return md.render(this.currentTrashNote.content || "");
    }
  },
  methods:{
    ...mapActions([
      'getTrashNotes',
    ]),
    ...mapMutations([
      'setcurrentTrashNote',
    ]),
    onRevert(){
      console.log('OnRevert');
      console.log(this.trashNotes);
    },
    onDelete(){
      console.log('onDelete');
    }
  },
  beforeRouteUpdate(to, from, next) {
    console.log(to.query.noteId, from.query.noteId, next);
    this.setcurrentTrashNote({noteId:to.query.noteId})
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