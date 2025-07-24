<script setup>
import { useNotificationsStore } from "@/stores/notifications"

useHead({
    title: "Notifications"
})

const notifStore = useNotificationsStore()
const { allList, allListLoading, pagination, getParams } = storeToRefs(notifStore)
onMounted(() => {
    if (allList.value.length <= 0) {
        notifStore.getAllNotifications()
    }
})
const changePaginate = (newParams) => {
    getParams.value.page = newParams.page ?? ""
}
</script>
<template>
    <LayoutBoards title="All Notifications" :loading="allListLoading" class="md:w-1/2 mx-auto">
        <div class="notification-list">
            <template v-if="allList.length <= 0">
                <div href="#" class="flex py-3 px-4 border-b dark:hover:bg-gray-600 dark:border-gray-600">
                    <div class="pl-3 w-full">
                        <div class="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">
                            No Notifications.
                        </div>
                    </div>
                </div>
            </template>
            <template v-for="notif, index in allList" :key="'navNotif'+index">
                <LayoutNotificationNotifItem :notification="notif" />
            </template>
            <!-- End of dynamic data section -->
        </div>
        <div class="flex justify-center mx-auto pt-2">
            <PsCustomPagination :links="pagination" @change-params="changePaginate" />
        </div>
    </LayoutBoards>
</template>
