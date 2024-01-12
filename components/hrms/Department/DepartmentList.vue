<script setup lang="ts">

import { useDepartmentStore } from '@/stores/departments';

const departments = useDepartmentStore();
const { list: departmentList, isEdit, department } = storeToRefs(departments)

const setEdit = (acc) => {
    isEdit.value = true
    department.value = acc
}



const headers = [
  { text: "ID", value: "id" },
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
              <span v-if="!editMode">{{ department.name }}</span>
              <input v-else v-model="department.name" />
            </td>
            <td class="border p-2">
              <button @click="setEdit(department)">{{ editMode ? 'Cancel' : 'Edit' }}</button>
              <button v-if="editMode" @click="saveChanges">Save</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

      <!-- <EasyDataTable
        show-index
        :headers="headers"
        :items="departmentStore.department"
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
