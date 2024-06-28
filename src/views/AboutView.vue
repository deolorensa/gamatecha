<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Articles</h1>
    <div v-if="isLoading" class="text-center my-8">
      <p>Loading...</p>
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="article in articles"
        :key="article.id"
        class="bg-white p-5 rounded-xl shadow-lg flex flex-col hover:scale-105 transition duration-200"
      >
        <div class="flex-grow">
          <img
            :src="article.image"
            alt="Article Image"
            class="w-full h-48 object-cover mb-4 rounded-lg"
          />
          <h2 class="text-sm font-semibold mb-4">
            {{ article.title }}
          </h2>
        </div>
        <div class="mt-auto">
          <a
            class="flex justify-end items-center gap-x-2 py-1 px-3 bg-slate-200 font-semibold rounded-xl text-sm mt-auto hover:bg-slate-300"
            :href="article.source_url"
            target="_blank"
            >Read More<svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-arrow-right"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
    <div v-if="articles.length === 0 && !isLoading" class="text-center my-8">
      <p>No articles found.</p>
    </div>
    <div
      v-if="articles.length > 0 && !isLoading"
      class="mt-6 flex justify-end gap-x-5"
    >
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="flex items-center justify-center gap-x-2 bg-slate-600 font-semibold text-white px-4 py-2 rounded-xl hover:bg-slate-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-chevron-left"
        >
          <path d="m15 18-6-6 6-6" /></svg
        >Previous
      </button>
      <button
        @click="nextPage"
        class="flex items-center justify-center gap-x-2 bg-slate-600 font-semibold text-white px-4 py-2 rounded-xl hover:bg-slate-700"
      >
        Next<svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-chevron-right"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useAuthStore } from "../stores/auth";
import { ref, computed, onMounted } from "vue";

export default {
  setup() {
    const authStore = useAuthStore();
    const articles = ref([]);
    const isLoading = ref(false);
    const currentPage = ref(1);
    const perPage = 10;
    const totalPages = ref(2);

    const fetchArticles = async () => {
      isLoading.value = true;
      try {
        const response = await axios.get(
          `http://103.164.54.252:8000/api/articles?page=${currentPage.value}&limit=${perPage}`,
          {
            headers: {
              Authorization: `Bearer ${authStore.token}`,
            },
          }
        );
        articles.value = response.data.data;
        totalPages.value = Math.ceil(response.data.total / perPage);
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      } finally {
        isLoading.value = false;
      }
    };

    const prevPage = () => {
      currentPage.value--;
      fetchArticles();
    };

    const nextPage = () => {
      currentPage.value++;
      fetchArticles();
    };

    const hasMorePages = computed(() => currentPage.value < totalPages.value);

    onMounted(fetchArticles);

    return {
      articles,
      isLoading,
      currentPage,
      totalPages,
      prevPage,
      nextPage,
      hasMorePages,
    };
  },
};
</script>

<style>
/* CSS styling can be added here for additional customization */
</style>
