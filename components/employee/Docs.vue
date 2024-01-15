<script setup>

const headers = [
    { text: "DOCUMENT NAME", value: "document_name" },
    { text: "ACTIONS", value: "actions" },
]

const items = [
    {
        document_name: "Docs Example 1",

    },
    {
        document_name: "Docs Example 2",

    },
    {
        document_name: "Docs Example 3",

    },

]

const selectedItemDetailsDocs = ref(null)

const viewItemDocs = (item) => {
    // console.log('Selected Item Details:', item);
    selectedItemDetailsDocs.value = item
}

const downloadItemDocs = (item) => {
    const fileUrl = item.file_url // Replace 'file_url' with the actual property name

    const downloadLink = document.createElement("a")
    downloadLink.href = fileUrl
    downloadLink.download = item.document_name // Set the file name for download

    document.body.appendChild(downloadLink)
    downloadLink.click()

    document.body.removeChild(downloadLink)
}

const closeViewModal = () => {
    selectedItemDetailsDocs.value = null
}

</script>

<template>
    <div
        class="shadow-md p-4 bg-white mb-3 border border-gray-200 rounded-lg w-full md:w-1/2"
    >
        <div class="pb-2 text-black font-medium text-lg">
            DOCUMENTS
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
                        @click="viewItemDocs(item)"
                    >
                        <Icon name="material-symbols:visibility-rounded" color="teal" class="w-4 h-4 " />
                    </button>
                    <button
                        @click="downloadItemDocs(item)"
                    >
                        <Icon name="ic:sharp-file-download" color="green" class="w-4 h-4 " />
                    </button>
                </div>
            </template>
        </EasyDataTable>

        <div v-if="selectedItemDetailsDocs">
            <Teleport to="body">
                <div class="fixed inset-1 bg-black opacity-70" />
                <div class="fixed inset-1 flex items-center justify-center">
                    <div class="bg-white p-4 max-w-lg rounded-lg border border-slate-300">
                        <h2 class="text-lg font-semibold">
                            Item Details
                        </h2>
                        <hr>
                        <ul class="mt-4">
                            <li><strong class="text-teal-500">Document Name:</strong> {{ selectedItemDetailsDocs.document_name }}</li>
                            <li><strong class="text-teal-500">Action Taken:</strong> {{ selectedItemDetailsDocs.action_taken }}</li>
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
