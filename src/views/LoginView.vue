<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
      <h2 class="text-3xl font-bold text-slate-950 mb-1 text-center">
        Login an account
      </h2>
      <h4 class="font-thin mb-6 text-sm text-slate-600 text-center">
        Enter your Username and Password below to login
      </h4>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label class="block text-slate-900 font-medium">Username</label>
          <input
            v-model="username"
            type="username"
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-slate-600"
          />
        </div>
        <div class="mb-4">
          <label class="block text-slate-900 font-medium">Password</label>
          <input
            v-model="password"
            type="password"
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-slate-600"
          />
        </div>
        <div class="flex items-center justify-between">
          <button
            type="submit"
            class="w-full bg-slate-900 text-white py-2 px-4 rounded-lg hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";

export default {
  setup() {
    const username = ref("");
    const password = ref("");
    const authStore = useAuthStore();
    const router = useRouter();

    const login = async () => {
      try {
        await authStore.login(username.value, password.value);
        alert("Login successful!");

        // Check if the logged-in user is admin
        if (authStore.username === "admin") {
          router.push("/home"); // Redirect to Home page for admin
        } else {
          router.push("/articles"); // Redirect to Articles page for other users
        }
      } catch (error) {
        alert("Login failed. Please check your credentials and try again.");
      }
    };

    return {
      username,
      password,
      login,
    };
  },
};
</script>

<style scoped>
/* Tambahkan style tambahan jika diperlukan */
</style>
