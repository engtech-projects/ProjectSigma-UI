<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useDepartmentStore } from "@/stores/departments";

const departments = useDepartmentStore();
const { department, errorMessage, successMessage } = storeToRefs(departments);

const addDepartment = () => {
  departments.createDepartment();
};

</script>

<template>
  <LayoutBoards title="Department List" class="w-96 h-52 p-4">
    <div class="text-gray-500 mt-2">
      <form @submit.prevent="addDepartment">
        <div class="space-y-2">
          <label for="departmentName" class="text-xs italic"
            >Department Name</label
          >
          <input
            type="text"
            v-model="department.department_name"
            id="departmentName"
            class="w-full rounded-lg"
          />
        </div>

        <div class="flex justify-end">
          <button type="submit"
            class="flex-1 text-white p-2 rounded bg-teal-600 content-center mt-5"
          >
            <Icon name="mingcute:department-fill" class="mr-2" />Add Department
          </button>
        </div>
      </form>
      <p class="text-red-600 text-center font-semibold">{{ errorMessage }}</p>
      <p
        v-show="successMessage"
        class="text-green-600 text-center font-semibold"
      >
        {{ successMessage }}
      </p>
    </div>

  </LayoutBoards>
</template>
