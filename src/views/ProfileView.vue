<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Profile</h1>
    <div
      class="bg-slate-600 h-60 rounded-2xl mb-4 flex items-center justify-center"
    >
      <img
        src="https://gamatecha.com/wp-content/uploads/2024/06/Horizontal-Putih-Merah0-2-980x166.png"
        alt="asd"
        class="w-[1000px] p-10 object-cover mb-4 rounded"
      />
    </div>
    <p>Username: {{ username }}</p>
  </div>
</template>

<script>
import { useAuthStore } from "@/stores/auth"; // Sesuaikan path dengan lokasi store Anda

export default {
  setup() {
    const authStore = useAuthStore();
    const username = authStore.username; // Mengakses username dari state store

    console.log(username); // Outputkan username ke console untuk tujuan debugging

    return {
      username,
    };
  },
};
</script>

<style>
/* CSS styling can be added here */
</style>
