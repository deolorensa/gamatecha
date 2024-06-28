<template>
  <div class="container mx-auto p-6">
    <h1 class="text-2xl font-bold mb-4">Users</h1>
    <vue-good-table
      :columns="columns"
      :rows="apiData"
      :pagination-options="paginationOptions"
    >
      <template v-slot:table-row="props">
        <span v-if="props.column.field === 'actions'">
          <button
            @click="openEditModal(props.row)"
            class="bg-blue-500 text-white px-2 py-1 rounded"
          >
            Edit
          </button>
          <button
            @click="confirmDeleteUser(props.row.id)"
            class="bg-red-500 text-white px-2 py-1 rounded ml-2"
          >
            Delete
          </button>
        </span>
        <span v-else>
          {{ props.formattedRow[props.column.field] }}
        </span>
      </template>
    </vue-good-table>

    <!-- Modal Edit User -->
    <div
      v-if="showEditModal"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-white p-6 rounded shadow-lg w-1/3">
        <h2 class="text-xl font-bold mb-4">Edit User</h2>
        <form @submit.prevent="updateUser">
          <div class="mb-4">
            <label class="block text-gray-700">Name</label>
            <input
              type="text"
              v-model="editUserForm.name"
              class="w-full px-3 py-2 border rounded"
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Email</label>
            <input
              type="email"
              v-model="editUserForm.email"
              class="w-full px-3 py-2 border rounded"
            />
          </div>
          <div class="flex justify-end">
            <button
              type="button"
              @click="showEditModal = false"
              class="bg-gray-500 text-white px-3 py-2 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="bg-blue-500 text-white px-3 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
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
    const apiData = ref([]);
    const showEditModal = ref(false);
    const editUserForm = ref({ id: "", name: "", email: "" });

    const columns = [
      { label: "Id", field: "id" },
      { label: "Name", field: "firstname" },
      { label: "Email", field: "email" },
      { label: "Actions", field: "actions", sortable: false },
    ];

    const paginationOptions = {
      enabled: true,
      perPage: 10,
    };

    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://103.164.54.252:8000/api/users",
          {
            headers: {
              Authorization: `Bearer ${authStore.token}`,
            },
          }
        );

        apiData.value = response.data.map((user) => ({
          id: user.id,
          firstname: user.first_name,
          email: user.email,
        }));
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    const openEditModal = (user) => {
      editUserForm.value = {
        id: user.id,
        name: user.firstname,
        email: user.email,
      };
      showEditModal.value = true;
    };

    const updateUser = async () => {
      try {
        await axios.put(
          `http://103.164.54.252:8000/api/users/${editUserForm.value.id}`,
          {
            first_name: editUserForm.value.name,
            email: editUserForm.value.email,
          },
          {
            headers: {
              Authorization: `Bearer ${authStore.token}`,
            },
          }
        );
        fetchData();
        showEditModal.value = false;
        alert("User updated successfully!");
      } catch (error) {
        console.error("Failed to update user:", error);
        alert("Failed to update user. Please try again.");
      }
    };

    const confirmDeleteUser = (id) => {
      if (window.confirm("Are you sure you want to delete this user?")) {
        deleteUser(id);
      }
    };

    const deleteUser = async (id) => {
      try {
        await axios.delete(`http://103.164.54.252:8000/api/users/${id}`, {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        });
        fetchData();
        alert("User deleted successfully!");
      } catch (error) {
        console.error("Failed to delete user:", error);
        alert("Failed to delete user. Please try again.");
      }
    };

    onMounted(() => {
      fetchData();
    });

    return {
      columns,
      apiData,
      paginationOptions,
      showEditModal,
      editUserForm,
      openEditModal,
      updateUser,
      confirmDeleteUser,
    };
  },
};
</script>

<style scoped>
/* Tambahkan style tambahan jika diperlukan */
</style>
