<template>
    <div class="mt-5 edit-item w-full max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-6 overflow-auto">
        <label for="" class="text-xl font-semibold text-gray-900">Overtime Authorization Form</label>
        <div class="mt-5">
            <div>
                <label for="form" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Form</label>
                <input id="form" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
            </div>
        </div>

        <EasyDataTable
            id="overtime_form"
            class="mt-5"
            table-class-name="customize-table"
            :headers="headers"
            :items="items"
        >
            <template #item-name="item">
                <div v-for="(data, index) in AddItem" :key="index" class="flex flex-row gap-5">
                    <div class="flex-grow shrink-0">
                        <input
                            id="type"
                            v-model="data.type"
                            placeholder="Type of Approval / Position"
                            type="text"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                        >
                    </div>
                    <div class="flex-grow shrink-0">
                        <input id="user_selector" type="radio" value="1" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="user_selector" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">User Selector</label>
                    </div>
                    <div class="flex-grow shrink-0 flex flex-row gap-2">
                        <input id="users" type="radio" value="2" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <select id="users_list" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                            <option value="">
                                Users
                            </option>
                            <option value="lorem1">
                                Lorem 1
                            </option>
                            <option value="lorem2">
                                Lorem 2
                            </option>
                            <option value="lorem3">
                                Lorem 3
                            </option>
                        </select>
                    </div>
                    <div class="flex flex-row justify-between gap-2">
                        <button
                            :id="&quot;add-employee-btn-&quot;+index"
                            :class="{'add-btn-not-active':data.addisnotActive}"
                            class=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm w-full sm:w-auto px-2 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            @click="AddEmployeeItem(index)"
                        >
                            <Icon class="text-lg" name="ic:baseline-plus" />
                        </button>
                        <button
                            :id="&quot;remove-employee-btn-&quot;+index"
                            :class="{'remove-btn-not-active':data.removeisnotActive}"
                            class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium text-sm w-full sm:w-auto px-2 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                            @click="RemoveEmployeeItem(index)"
                        >
                            <Icon class="text-lg" name="ic:baseline-minus" />
                        </button>
                    </div>
                </div>
            </template>
            <!-- <template #item-actions="item" >
              <div class="flex flex-row gap-1 justify-end">
                <button
                  @click="AddEmployeeItem()"
                >
                  <Icon class="text-lg" name="ic:baseline-plus" />
                </button>
              </div>
            </template> -->
        </EasyDataTable>

        <div class="max-w-full flex flex-row-reverse mt-5">
            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" @click="submitAdd">
                Add
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Header, Item } from "vue3-easy-data-table"
import { ref, reactive } from "vue"

const headers: Header[] = [
    {
        text: "Approvals", value: "name",
    },
]

const items: Item[any] = ref([
    {

    }
])

const AddItem = ref([
    {
        type: "",
        user_selector: "",
        users_list: "",
        addisnotActive: false,
        removeisnotActive: true
    }
])

const deleteItem = (val: Item) => {
//   items.value.splice(val.id,1);
}

const submitEdit = () => {
    // const item = items.value.find((item: { id: number; }) => item.id === editingItem.id);
    // item.name = editingItem.name;
}

const submitAdd = () => {

}

const AddEmployeeItem = (index:any) => {
    AddItem.value[index].addisnotActive = true
    AddItem.value[index].removeisnotActive = false
    AddItem.value.push(
        {
            type: "",
            user_selector: "",
            users_list: "",
            addisnotActive: false,
            removeisnotActive: true
        }
    )
    console.log(AddItem.value)
    // isActive.value = !isActive.value;
}
const RemoveEmployeeItem = (index:any) => {
    AddItem.value.splice(index, 1)
}
</script>

<style>
.customize-table {
  --easy-table-body-row-hover-font-color:none !important;
  --easy-table-body-row-hover-background-color:none !important;
}
#overtime_form .vue3-easy-data-table__footer{
  display: none !important;
}

.add-btn-not-active, .remove-btn-not-active{
  display: none;
}
</style>
