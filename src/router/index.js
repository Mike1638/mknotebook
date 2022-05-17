import Vue from 'vue'
import Router from 'vue-router'
// import Login from '@/components/Login'
// import NotebookList from '@/components/NotebookList'
// import TrashDetail from '@/components/TrashDetail'
// import NoteDetail from '@/components/NoteDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      alias:'/notebooks',
      name: 'notebooks',
      component: ()=>import('@/components/NotebookList')
    },
    {
      path: '/login',
      name: 'Login',
      component: ()=>import('@/components/Login')
    },
    {
      path: '/note',
      name: 'NoteDetail',
      component: ()=>import('@/components/NoteDetail')
    },
    {
      path: '/trash',
      name: 'TrashDetail',
      component: ()=>import('@/components/TrashDetail')
    },
  ]
})
