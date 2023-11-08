<template>
  <div class="mt-8 flex justify-end">
    <div>
      <button
        type="button"
        :class="saveButtonClass"
        @click="handleSaveClick"
      >
        <Icon name="bi:save" color="white" /> {{ saveButtonText }}
      </button>
      <button
        type="button"
        :class="activeButtonClass"
        @click="handleActiveClick"
      >
        {{ activeButtonText }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSaved: false,
      isActive: false,
    };
  },
  computed: {
    saveButtonClass() {
      return {
        'text-white': true,
        'bg-blue-700': !this.isSaved,
        'bg-green-500': this.isSaved,
        'hover:bg-blue-800': !this.isSaved,
        'hover:bg-green-600': this.isSaved,
        'focus:ring-4': true,
        'focus:ring-blue-300': !this.isSaved,
        'focus:ring-green-300': this.isSaved,
        'font-medium': true,
        'rounded-lg': true,
        'text-sm': true,
        'px-5': true,
        'py-2.5': true,
        'mr-2': true,
        'mb-2': true,
        'dark:bg-blue-600': !this.isSaved,
        'dark:bg-green-600': this.isSaved,
        'dark:hover:bg-blue-700': !this.isSaved,
        'dark:hover:bg-green-700': this.isSaved,
        'focus:outline-none': true,
        'dark:focus:ring-blue-800': !this.isSaved,
        'dark:focus:ring-green-800': this.isSaved,
      };
    },
    saveButtonText() {
      return this.isSaved ? 'Saved' : 'Save';
    },
    activeButtonClass() {
      return {
        'text-white': true,
        'bg-red-700': !this.isActive,
        'bg-blue-700': this.isActive,
        'hover:bg-red-800': !this.isActive,
        'hover:bg-blue-500': this.isActive,
        'focus:ring-4': true,
        'focus:ring-red-300': !this.isActive,
        'focus:ring-gray-300': this.isActive,
        'font-medium': true,
        'rounded-lg': true,
        'text-sm': true,
        'px-5': true,
        'py-2.5': true,
        'mr-2': true,
        'mb-2': true,
        'dark:bg-red-600': !this.isActive,
        'dark:bg-gray-500': this.isActive,
        'dark:hover:bg-red-700': !this.isActive,
        'dark:hover:bg-gray-600': this.isActive,
        'focus:outline-none': true,
        'dark:focus:ring-red-800': !this.isActive,
        'dark:focus:ring-gray-800': this.isActive,
      };
    },
    activeButtonText() {
      return this.isActive ? 'Set as Inactive' : 'Set as Active';
    },
  },
  methods: {
    handleSaveClick() {
      this.isSaved = true;
    },
    handleActiveClick() {
      this.isActive = !this.isActive;
    },
  },
};
</script>
