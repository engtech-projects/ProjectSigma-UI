<template>
    <div class="grid grid-cols-5 pb-4">
        <div class="flex flex-col col-span-2">
            <h5 class="text-center font-bold mb-4">
                DESCRIPTION
            </h5>
            <div class="flex flex-col gap-2">
                <div class="flex gap-1">
                    <span class="font-bold text-md flex-1 text-right">
                        File Type:
                    </span>
                    <span class="flex-1">
                        PDF
                    </span>
                </div>
                <div class="flex gap-1">
                    <span class="font-bold text-md flex-1 text-right">
                        Name:
                    </span>
                    <span class="flex-1">
                        Sample Name
                    </span>
                </div>
                <div class="flex gap-1">
                    <span class="font-bold text-md flex-1 text-right">
                        File Size:
                    </span>
                    <span class="flex-1">
                        123 KB
                    </span>
                </div>
                <div class="flex flex-col">
                    <div class="flex">
                        <span class="font-bold text-md flex-1 text-right">
                            Description:
                        </span>
                        <span class="flex-1" />
                    </div>
                    <span class="px-4 py-2 text-xs">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur rem placeat ipsum hic repellendus ea atque praesentium accusantium recusandae architecto? Consectetur tempora ducimus facilis labore dolorum nisi, culpa quas mollitia!
                    </span>
                </div>
            </div>
        </div>
        <div class="col-span-3 border-4 border-dashed mr-4 flex flex-col items-center justify-center gap-4">
            <Icon name="iconoir:cloud-upload" class="w-12 h-12 text-gray-400" />
            <span class="text-2xl text-gray-400">
                Drag & Drop files here
            </span>
            <span class="text-gray-400 text-lg">
                or
            </span>
            <button class="border-[3px] border-sky-400 text-sky-400 px-8 py-1 rounded-lg">
                Browse Files
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>

</script>

<style>

</style>
