import Vue from 'vue';
import VueRouter from 'vue-router';
import MainContent from '@/views/MainContent/MainContent.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'MainContent',
    component: MainContent,
    children: [
      {
        path: 'games',
        component: () => import('@/views/MainContent/components/Game.vue')
      }
    ]
  },
  {
    path: '/more',
    name: 'MoreNews',
    component: () => import('@/views/MoreContent/MoreNews.vue')
  },

  {
    path: '/news/:newsID',
    component: () => import('@/views/MainContent/components/NewsPage.vue'),
    props: true
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
