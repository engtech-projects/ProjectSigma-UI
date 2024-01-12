<template>
    <div class="mt-5 edit-item w-full max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-6 overflow-auto">
        <label for="" class="text-xl font-semibold text-gray-900">Leave List</label>
        <div class="mt-5 mb-6">
            <EasyDataTable
                class="mt-5"
                table-class-name="customize-table"
                show-index
                :headers="headers"
                :items="items"
            >
                <template #item-actions="item">
                    <div class="flex flex-row gap-1">
                        <button
                            @click="approved(item)"
                        >
                            <Icon class="text-lg" name="mingcute:check-fill" />
                        </button>
                        <button
                            @click="reject(item)"
                        >
                            <Icon class="text-lg" name="fa-solid:times" />
                        </button>
                        <button
                            @click="deleted(item)"
                        >
                            <Icon class="text-lg" name="mdi:trash" />
                        </button>
                    </div>
                </template>
            </EasyDataTable>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Header, Item } from "vue3-easy-data-table"

const headers: Header[] = [
    { text: "Leave Name", value: "leave_name" },
    { text: "Amount Leaves", value: "amt_leaves" },
    { text: "Awardees", value: "awardees" },
    { text: "Action", value: "actions" },
]

const items: Item[any] = ref([
    {
        leave_name: "Lorem 1",
        amt_leaves: "10",
        awardees: "All",
    },
])

const approved = (val: Item) => {
}

const deleted = (val: Item) => {
}

const reject = (val: Item) => {
}
</script>

  <style>
  .customize-table {
    --easy-table-header-item-padding: 10px 15px;
  }
  </style>
