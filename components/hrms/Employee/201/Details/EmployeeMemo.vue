<script setup>

const headers = [
    { text: "MEMO NAME", value: "memo_name" },
    { text: "ACTIONS", value: "actions" },
]

const items = [
    {
        memo_name: "Memo Example 1",

    },
    {
        memo_name: "Memo Example 2",

    },
    {
        memo_name: "Memo Example 3",

    },

]

const selectedItemDetailsMemo = ref(null)

const viewItemMemo = (item) => {
    selectedItemDetailsMemo.value = item
}

const downloadItemMemo = (item) => {
    const fileUrl = item.file_url // Replace 'file_url' with the actual property name

    const downloadLink = document.createElement("a")
    downloadLink.href = fileUrl
    downloadLink.download = item.document_name // Set the file name for download

    document.body.appendChild(downloadLink)
    downloadLink.click()

    document.body.removeChild(downloadLink)
}

const closeViewModal = () => {
    selectedItemDetailsMemo.value = null
}

</script>

<template>
    <div
        class="shadow-md p-4 bg-white mb-3 border border-gray-200 rounded-lg w-full md:w-1/2"
    >
        <div class="pb-2 text-black font-medium text-lg">
            <div>
                <p>MEMO</p>
            </div>
            <div>
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-center" for="file_input">Upload Application Document Files</label>
                <input id="memo_multiple_file" class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="file" accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" multiple>
                <p id="file_input_help" class="mt-1 text-sm text-gray-500 dark:text-gray-300">
                    Allowed file types: .DOC, .PDF, Images
                </p>
            </div>
        </div>
        <EasyDataTable
            show-index
            :headers="headers"
            :items="items"
            class="mt-5 z-0"
        >
            <template #item-actions="item">
                <div class="flex gap-4">
                    <button
                        @click="viewItemMemo(item)"
                    >
                        <Icon name="material-symbols:visibility-rounded" color="teal" class="w-4 h-4 " />
                    </button>
                    <button
                        @click="downloadItemMemo(item)"
                    >
                        <Icon name="ic:sharp-file-download" color="green" class="w-4 h-4 " />
                    </button>
                </div>
            </template>
        </EasyDataTable>

        <div v-if="selectedItemDetailsMemo">
            <Teleport to="body">
                <div class="fixed inset-1 bg-black opacity-70" />
                <div class="fixed inset-0 flex items-center justify-center ">
                    <div class="bg-white p-4 max-w-lg rounded-lg border border-slate-300">
                        <h2 class="text-lg font-semibold ">
                            Item Details
                        </h2>
                        <hr>
                        <ul class="mt-4">
                            <li><strong class="text-teal-500">Memo Name:</strong> {{ selectedItemDetailsMemo.memo_name }}</li>
                            <li><strong class="text-teal-500">Action Taken:</strong> {{ selectedItemDetailsMemo.action_taken }}</li>
                        </ul>
                        <button class="mt-4 bg-gray-600 px-2 rounded text-white" @click="closeViewModal">
                            Close
                        </button>
                    </div>
                </div>
            </Teleport>
        </div>
    </div>
</template>
