<template>
  <div id="app" class="flex min-h-screen h-hdv">
    <aside
      v-if="isAuthenticated && !isLoginPage"
      class="bg-slate-800 text-white w-64 flex-shrink-0 flex flex-col p-4 fixed h-full"
    >
      <div class="flex-grow">
        <ul class="space-y-4">
          <li class="flex justify-center items-center mb-10">
            <img
              class="h-8"
              src="https://gamatecha.com/wp-content/uploads/2024/06/Horizontal-Putih-Merah0-2-980x166.png"
              alt="gamatecha"
            />
          </li>
          <li v-if="isAdmin">
            <router-link
              to="/home"
              class="block py-2 px-4 rounded hover:bg-gray-700"
              exact-active-class="bg-gray-700"
            >
              Users
            </router-link>
          </li>
          <li v-if="isAdmin">
            <router-link
              to="/admin-articles"
              class="block py-2 px-4 rounded hover:bg-gray-700"
              exact-active-class="bg-gray-700"
            >
              Articles
            </router-link>
          </li>
          <li v-if="isOwner">
            <router-link
              to="/articles"
              class="block py-2 px-4 rounded hover:bg-gray-700"
              exact-active-class="bg-gray-700"
            >
              Articles
            </router-link>
          </li>
          <li v-if="isOwner">
            <router-link
              to="/profile"
              class="block py-2 px-4 rounded hover:bg-gray-700"
              exact-active-class="bg-gray-700"
            >
              Profile
            </router-link>
          </li>
        </ul>
      </div>
      <button
        @click="logout"
        class="mt-auto bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 w-full"
      >
        Logout
      </button>
    </aside>
    <main
      class="flex-grow p-6 bg-gray-100"
      :class="{ 'ml-64': isAuthenticated && !isLoginPage }"
    >
      <router-view />
    </main>
  </div>
</template>

<script>
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "./stores/auth";

export default {
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const route = useRoute();

    const isAuthenticated = computed(() => authStore.isAuthenticated);
    const isAdmin = computed(() => authStore.username === "admin");
    const isOwner = computed(() => authStore.username === "demo1");

    const isLoginPage = computed(() => route.path === "/");

    const logout = () => {
      authStore.logout();
      alert("Logout successful!");
      router.push("/");
    };

    return {
      isAuthenticated,
      isAdmin,
      isOwner,
      isLoginPage,
      logout,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
