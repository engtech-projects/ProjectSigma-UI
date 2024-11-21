<template>
    <div class="flex flex-col gap-4 pt-4">
        <div class="flex justify-between items-center w-full bg-gray-100 hover:bg-gray-200 active:bg-gray-100 py-2 px-2" @click="collapse = !collapse">
            <h1 class="font-bold">
                {{ upperFirst(props.title) }}
            </h1>
            <Icon v-if="collapse" name="iconoir:nav-arrow-down" class="cursor-pointer" />
            <Icon v-else name="iconoir:nav-arrow-right" class="cursor-pointer" />
        </div>
        <div v-if="collapse">
            <div v-for="aa,p in props.data" :key="p" class="flex flex-col">
                <div class="flex items-end justify-between pb-2">
                    <h2 class="w-full text-md text-blue-500 px-5 mt-8">
                        {{ upperFirst(p) }}
                    </h2>
                    <button class="text-xs w-12 py-[2px] rounded-sm block bg-green-500 hover:bg-green-600 active:bg-green-500 text-white" @click="emit('addAccount', aa)">
                        + ADD
                    </button>
                </div>
                <div v-for="act in aa" :key="act.id" class="flex flex-col">
                    <div class="flex items-center hover:bg-green-100">
                        <h3 class="w-full text-xs px-8 py-1 border flex-1 h-full">
                            {{ upperFirst(act.account_number) }}
                        </h3>
                        <h3 class="w-full text-xs px-8 py-1 border flex-3 md:flex-4 h-full">
                            {{ upperFirst(act.account_name) }}
                        </h3>
                        <h3 class="w-full text-xs px-8 py-1 border flex-2 md:flex-1 h-full">
                            {{ upperFirst(act.account_type?.balance_type) + " ( " + act.account_type?.notation + " ) " }}
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(["addAccount"])
const props = defineProps({
    title: {
        type: String,
        default: ""
    },
    data: {
        type: Object,
        default: null
    },
})
const collapse = ref(true)
</script>

<style scoped>
    .flex-2 {
        flex: 2
    }
    .flex-3 {
        flex: 3
    }
    .flex-4 {
        flex: 4
    }
    .flex-5 {
        flex: 5
    }
</style>
