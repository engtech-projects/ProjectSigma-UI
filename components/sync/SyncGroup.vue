<script lang="ts" setup>
const props = defineProps({
    name: {
        type: String,
        default: ""
    },
    url: {
        type: String,
        default: ""
    }
})
const loading = ref(false)
const snackbar = useSnackbar()

const sync = async () => {
    loading.value = true
    const { data, error } = await useHRMSApi(
        props.url,
        {
            method: "POST",
            watch: false,
            onResponse: () => {
                loading.value = false
            },
        }
    )
    if (data) {
        snackbar.add({
            type: "success",
            text: data.value.message
        })
    } else if (error) {
        snackbar.add({
            type: "error",
            text: data.value.message
        })
    }
    loading.value = false
}
</script>

<template>
    <div class="border bg-white rounded-md relative">
        <AccountingLoadScreen :is-loading="loading" class="z-30" />
        <div class="px-6 py-3 flex justify-between items-center bg-gray-100 font-bold border">
            <h2>
                {{ props.name }}
            </h2>
            <button
                class="border border-2-green-600 rounded-md px-3 py-1 flex items-center gap-2 bg-green-500 text-white hover:bg-green-600 active:bg-green-500"
                @click="sync"
            >
                <Icon name="iconoir:refresh-double" />
                <span class="text-xs">
                    Sync {{ props.name }}
                </span>
            </button>
        </div>
        <div>
            <slot />
        </div>
    </div>
</template>
