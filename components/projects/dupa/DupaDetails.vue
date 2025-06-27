<script setup>
import { useResourceStore } from "~/stores/project-monitoring/resource"
const router = useRouter()
const snackbar = useSnackbar()
const resourceStore = useResourceStore()
const showCategoryModal = ref(false)
try {
    await resourceStore.getResourceUnits()
} catch (error) {
    snackbar.add({
        type: "error",
        text: error || "something went wrong."
    })
}
const goBackOrHome = () => {
    if (router.options.history.state.back) {
        router.back()
    } else {
        navigateTo("/project-monitoring/marketing")
    }
}
</script>
<template>
    <div class="flex flex-col p-2 bg-white">
        <div class="flex items-center mb-4">
            <div class="flex-1 flex items-center gap-2 text-gray-500 cursor-pointer">
                <div class="flex items-center border hover:bg-gray-500 hover:text-white gap-1 bg-gray-100 rounded-lg px-4 py-1 cursor-pointer" @click="goBackOrHome">
                    <Icon name="material-symbols:arrow-back-rounded" />
                    <span>
                        BACK
                    </span>
                </div>
            </div>
        </div>
        <ProjectsDetailsTask />
        <ProjectsModalsCategory :show-modal="showCategoryModal" @hide-modal="showCategoryModal = false" />
    </div>
</template>
