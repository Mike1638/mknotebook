import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import NotebookList from '@/components/NotebookList'
import TrashDetail from '@/components/TrashDetail'
import NoteDetail from '@/components/NoteDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'NoteDetail',
      component: NoteDetail
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/note/:noteId',
      name: 'NoteDetail',
      component: NoteDetail
    },
    {
      path: '/trash/:noteId',
      name: 'TrashDetail',
      component: TrashDetail
    },
    {
      path:'/notebooks',
      name:'NotebookList',
      component:NotebookList
    }
  ]
})
