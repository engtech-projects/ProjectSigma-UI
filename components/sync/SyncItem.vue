<script lang="ts" setup>
const props = defineProps({
    name: {
        type: String,
        default: ""
    },
    url: {
        type: String,
        default: ""
    },
})
const snackbar = useSnackbar()
const loading = ref(false)

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
    <div class="flex items-center justify-between px-6 py-2 border-b hover:bg-green-50 relative">
        <AccountingLoadScreen :is-loading="loading" />
        <span>
            {{ props.name }}
        </span>
        <button class="p-2 border flex gap-2 items-center rounded-md text-xs hover:bg-gray-200 active:bg-white" @click="sync">
            <Icon name="iconoir:refresh-double" />
            <span>
                Sync
            </span>
        </button>
    </div>
</template>

<style>

</style>
