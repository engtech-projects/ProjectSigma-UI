<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useDepartmentStore } from '@/stores/departments';

const departments = useDepartmentStore();
departments.getDepartment()

const { list: departmentList, isEdit, department } = storeToRefs(departments)

const setEdit = (dept) => {
    isEdit.value = true
    department.value = dept
}

const saveChanges = () => {
    isEdit.value = false
};

const headers = [
  { text: "ID", value: "department_id" },
  { text: "DEPARTMENT NAME", value: "department.name" },
  { text: 'Actions', value: 'actions' },
];

</script>

<template>
  <LayoutBoards title="Department List" class="w-full p-4">
    
    <div class="pb-2 text-gray-500">
      <table class="table-auto w-full border-collapse">
        <thead>
          <tr>
            <th hidden class="border p-2">#</th>
            <th class="p-2">Department Name</th>
            <th class="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(department, index) in departmentList" :key="index" >
            <td hidden class="border p-2">{{ index + 1 }}</td>
            <td class="border p-2">
              <span >{{ department.department_name }}</span>
            </td>
            <td class="border p-2 flex gap-2 justify-center">
              <button @click="setEdit(department)">{{department.isEdit ? 'Cancel' : 'Edit'}}</button>
              <button @click="saveChanges()">Save</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

      <!-- <EasyDataTable
        show-index
        :headers="headers"
        :items="data.value"
        class="mt-5"
        >
        <template #item-actions="item">
          <button @click="departmentStore.deleteItem(item)">
          </button>
          <button @click="departmentStore.editItem(item)">
          </button>
        </template>
      </EasyDataTable> -->
  </LayoutBoards>
</template>
