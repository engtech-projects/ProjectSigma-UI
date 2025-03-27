<template>
    <ModalContainer
        :show="showModal"
        :local="true"
        :header="false"
        size="modal-lg"
        @hide="emit('hideModal')"
    >
        <div class="flex flex-col">
            <div class="flex justify-end mb-2">
                <Icon name="material-symbols:close-small" class="w-6 h-6 text-gray-500 cursor-pointer hover:text-black" @click="emit('hideModal')" />
            </div>
            <div class="flex flex-col border">
                <div id="tabContainer" class="flex h-9 mb-4 select-none justify-around border-b">
                    <span
                        v-for="tab in tabs"
                        :key="tab.name"
                        :class="{active: tab.name === currentTab?.name}"
                        class="text-xs cursor-pointer text-gray-500 font-bold h-full flex items-center border-b-2 border-white cursor-pointerhover:border-gray-300 hover:text-gray-900 hover:border-b-2 "
                        @click="currentTab=tab"
                    >
                        {{ tab.name }}
                    </span>
                </div>
                <div class="min-h-[20rem]">
                    <component :is="currentTabComponent" :key="currentTab?.name" />
                </div>
            </div>
        </div>
    </ModalContainer>
</template>

<script lang="ts" setup>
import ProjectsCreateUploadJvAgreement from "../create/upload/JvAgreement.vue"
import ProjectsCreateUploadJvLicense from "../create/upload/JvLicense.vue"
import ProjectsCreateUploadBioDocsAgency from "../create/upload/BioDocsAgency.vue"
import ProjectsCreateUploadBidDocsSubmitted from "../create/upload/BidDocsSubmitted.vue"
import ProjectsCreateUploadNoaContract from "../create/upload/NoaContract.vue"

defineProps({
    showModal: {
        type: Boolean,
        required: true,
        default: false
    }
})
const emit = defineEmits(["hideModal"])
const currentTab = ref(null)
const tabs = ref([
    {
        name: "JV Agreement",
        component: markRaw(ProjectsCreateUploadJvAgreement),
    },
    {
        name: "JV License",
        component: markRaw(ProjectsCreateUploadJvLicense),
    },
    {
        name: "Bio Docs (Agency)",
        component: markRaw(ProjectsCreateUploadBioDocsAgency),
    },
    {
        name: "Bid Docs (Submitted)",
        component: markRaw(ProjectsCreateUploadBidDocsSubmitted),
    },
    {
        name: "NOA Contract NTPCSHP",
        component: markRaw(ProjectsCreateUploadNoaContract)
    }
])
const currentTabComponent = computed(() => {
    return tabs.value.find(tab => tab.name === currentTab.value?.name)?.component
})
onMounted(() => {
    currentTab.value = tabs.value[0] ?? null
})
</script>

<style>

</style>
