import Vue from 'vue';
import VueRouter from 'vue-router';
import Homepage from '@/views/Homepage/Homepage.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Homepage',
    component: Homepage,
    children: [
      {
        path: 'games',
        component: () => import('@/views/Homepage/components/Game.vue')
      }
    ]
  },
  {
    path: '/more',
    name: 'MoreNews',
    component: () => import('@/views/MoreContent/MoreNews.vue')
  },

  {
    path: '/news/:articleId',
    component: () => import('@/views/NewsPage/NewsPage.vue'),
    props: true
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
