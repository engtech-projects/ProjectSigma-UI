<template>
    <div class="flex flex-col gap-6 p-2">
        <h1 class="text-2xl mb-4">
            Project Creation Form
        </h1>
        <div class="flex flex-col gap-4">
            <div class="grid grid-cols-4 gap-6">
                <div class="flex flex-col gap-1">
                    <label for="" class="text-sm text-gray-700">
                        Location
                    </label>
                    <input type="text" class="border rounded-lg border-gray-300 h-10" placeholder="Location">
                </div>
                <div class="flex flex-col gap-1">
                    <label for="" class="text-sm text-gray-700">
                        Project Name
                    </label>
                    <input type="text" class="border rounded-lg border-gray-300 h-10" placeholder="Project Name">
                </div>
                <div class="flex flex-col gap-1">
                    <label for="" class="text-sm text-gray-700">
                        Contract Amount
                    </label>
                    <input type="text" class="border rounded-lg border-gray-300 h-10" placeholder="0.00">
                </div>
                <div class="flex flex-col gap-1">
                    <label for="" class="text-sm text-gray-700">
                        Duration
                    </label>
                    <input type="text" class="border rounded-lg border-gray-300 h-10" placeholder="Duration">
                </div>
            </div>

            <div class="grid grid-cols-4 gap-6">
                <div class="flex flex-col gap-1">
                    <label for="" class="text-sm text-gray-700">
                        Nature of Work
                    </label>
                    <input type="text" class="border rounded-lg border-gray-300 h-10" placeholder="Nature of Work">
                </div>
                <div class="flex flex-col gap-1">
                    <label for="" class="text-sm text-gray-700">
                        Implementing Office
                    </label>
                    <input type="text" class="border rounded-lg border-gray-300 h-10" placeholder="Implementing Office">
                </div>
                <div class="flex flex-col gap-1">
                    <label for="" class="text-sm text-gray-700">
                        Contract ID
                    </label>
                    <input type="text" class="border rounded-lg border-gray-300 h-10" placeholder="Contract ID">
                </div>
                <div class="flex flex-col gap-1">
                    <label for="" class="text-sm text-gray-700">
                        License
                    </label>
                    <input type="text" class="border rounded-lg border-gray-300 h-10" placeholder="License">
                </div>
            </div>
            <div class="grid grid-cols-4 gap-6">
                <div class="flex flex-col gap-1">
                    <label for="" class="text-sm text-gray-700">
                        Designation
                    </label>
                    <input type="text" class="border rounded-lg border-gray-300 h-10" placeholder="Designation">
                </div>
            </div>

            <div class="flex justify-end gap-4 items-center">
                <div class="flex items-center gap-1 border-b border-green-800 h-6 cursor-pointer hover:border-green-800 select-none" @click="showUploadModal = true">
                    <Icon name="mdi:paperclip" class="text-green-800" />
                    <span class="text-green-600 hover:text-green-400 active:text-green-600">File Attachments</span>
                </div>
                <button class="bg-green-500 hover:bg-green-600 active:bg-green-700 select-none text-white rounded-lg text-sm w-36 h-10">
                    Save Project
                </button>
            </div>
        </div>
        <ProjectsModalsUpload :show-modal="showUploadModal" @hide-modal="showUploadModal = false" />
    </div>
</template>

<script lang="ts" setup>
const showUploadModal = ref(false)
</script>

<style>
#tabContainer span.active {
    border-bottom-color: rgb(28 100 242);
    color: rgb(28 100 242);
}
</style>
