import { createRouter, createWebHistory } from 'vue-router'

import DefaultLayout from '@/layouts/DefaultLayout.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: DefaultLayout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'about',
        component: () => import('@/views/HomeView.vue'),
      },
      {
        path: '/overtime-form',
        name: 'OvertimeForm',
        component: () => import('@/views/OvertimeView.vue')
      },
      {
        path: '/ot-form',
        name: 'OTFormView',
        component: () => import('@/views/pages/OvertimeFormView.vue')
      },
    ],
  },
  {
    path: '/data',
    name: 'Data',
    component: DefaultLayout,
    redirect: '/data/overtime-analytics',
    children: [
      // {
      //   path: 'overtime-analytics',
      //   name: 'OvertimeAnalytics',
      //   component: () => import('@/views/HomeView.vue'),
      // },
      {
        path: 'overtime-history',
        name: 'OvertimeHistory',
        component: () => import('@/views/pages/OvertimeHistoryView.vue')
      },
      {
        path: 'employees',
        name: 'Employees',
        component: () => import('@/components/ot/data/EmployeeList.vue'),
      },
      {
        path: 'projects',
        name: 'Projects',
        component: () => import('@/components/ot/data/ProjectList.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Page404',
    component: () => import('@/views/pages/Error404View.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
})

export default router
