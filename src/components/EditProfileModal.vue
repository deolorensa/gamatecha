<template>
  <div
    class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center"
  >
    <div class="bg-white rounded-lg p-6 w-full max-w-md">
      <h2 class="text-2xl font-bold mb-4">Edit Profile</h2>
      <form @submit.prevent="save">
        <div class="mb-4">
          <label for="username" class="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            id="username"
            v-model="editedProfile.username"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div class="flex justify-end space-x-4">
          <button
            type="button"
            @click="$emit('close')"
            class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    username: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      editedProfile: {
        username: this.username,
      },
    };
  },
  methods: {
    save() {
      this.$emit("save", this.editedProfile);
    },
  },
};
</script>

<style scoped>
/* Optional CSS styling for modal */
</style>
