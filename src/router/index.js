/* global process */
import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth";
import Login from "../views/LoginView.vue";
import Home from "../views/HomeView.vue";
import About from "../views/AboutView.vue";
import Profile from "../views/ProfileView.vue";
import AdminArticles from "../views/AdminArticles.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: "/articles",
    name: "About",
    component: About,
    meta: { requiresAuth: true },
  },
  {
    path: "/admin-articles",
    name: "AdminArticles",
    component: AdminArticles,
    meta: { requiresAuth: true },
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const isAuthenticated = authStore.isAuthenticated;
  const isAdmin = authStore.username === "admin";
  const isDemo1 = authStore.username === "demo1";

  if (to.meta.requiresAdmin && (!isAuthenticated || !isAdmin)) {
    next("/home"); // Redirect jika tidak memenuhi syarat admin
  } else if (to.meta.requiresDemo1 && (!isAuthenticated || !isDemo1)) {
    next("/articles"); // Redirect jika tidak memenuhi syarat demo1
  } else {
    next(); // Lanjutkan navigasi
  }
});

export default router;
