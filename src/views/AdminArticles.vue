<template>
  <div class="container mx-auto p-6">
    <h1 class="text-2xl font-bold mb-4">Admin Articles</h1>

    <!-- Search Input -->
    <input
      type="text"
      v-model="searchTerm"
      class="w-full px-3 py-2 rounded-md border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      placeholder="Search..."
    />

    <!-- Loading Indicator -->
    <div v-if="isLoading" class="text-center my-8">
      <p>Loading...</p>
    </div>

    <!-- Vue Good Table -->
    <vue-good-table
      v-if="!isLoading"
      :columns="columns"
      :rows="filteredArticles"
      :pagination-options="paginationOptions"
      @on-page-change="handlePageChange"
    >
      <template v-slot:table-row="props">
        <span v-if="props.column.field === 'image'">
          <img
            :src="props.row.image"
            alt="Article Image"
            class="w-16 h-16 object-cover rounded"
          />
        </span>
        <span v-else-if="props.column.field === 'source_url'">
          <a
            :href="props.row.source_url"
            target="_blank"
            class="text-blue-500 underline"
          >
            {{ props.row.source_url }}
          </a>
        </span>
        <span v-else>
          {{ props.formattedRow[props.column.field] }}
        </span>
      </template>
    </vue-good-table>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import { useAuthStore } from "../stores/auth";
import { VueGoodTable } from "vue-good-table-next";
import "vue-good-table-next/dist/vue-good-table-next.css";

export default {
  components: {
    VueGoodTable,
  },
  setup() {
    const authStore = useAuthStore();
    const articles = ref([]);
    const searchTerm = ref("");
    const currentPage = ref(1);
    const totalPages = ref(1);
    const isLoading = ref(false); // Variable untuk menampilkan loading

    const columns = [
      { label: "Image", field: "image", type: "image" },
      { label: "Title", field: "title" },
      { label: "Source URL", field: "source_url" },
    ];

    const paginationOptions = {
      enabled: true,
      perPage: 10,
    };

    const fetchArticles = async () => {
      isLoading.value = true; // Set isLoading true saat fetch dimulai
      try {
        const response = await axios.get(
          "http://103.164.54.252:8000/api/articles",
          {
            headers: {
              Authorization: `Bearer ${authStore.token}`,
            },
          }
        );
        articles.value = response.data.data;
        totalPages.value = Math.ceil(
          response.data.total / paginationOptions.perPage
        );
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      } finally {
        isLoading.value = false; // Set isLoading false saat fetch selesai atau error
      }
    };

    const filteredArticles = computed(() => {
      if (!searchTerm.value) {
        return articles.value;
      }
      return articles.value.filter((article) =>
        article.title.toLowerCase().includes(searchTerm.value.toLowerCase())
      );
    });

    const handlePageChange = (page) => {
      currentPage.value = page;
      fetchArticles();
    };

    onMounted(() => {
      fetchArticles();
    });

    return {
      columns,
      articles,
      filteredArticles,
      paginationOptions,
      searchTerm,
      handlePageChange,
      isLoading, // Mengembalikan isLoading agar bisa digunakan di template
    };
  },
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
