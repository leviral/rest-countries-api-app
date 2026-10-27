import MainLayout from '@/layout/MainLayout.vue';
import DetailsView from '@/views/DetailsView.vue';
import HomeView from '@/views/HomeView.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView,
        },
        {
          path: ':id/',
          name: 'details',
          component: DetailsView,
        },
      ],
    },
  ],
});

export default router;
