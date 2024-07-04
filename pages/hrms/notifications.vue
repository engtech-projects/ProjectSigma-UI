<script setup>
import { useNotificationsStore } from "@/stores/notifications"

useHead({
    title: "Notifications"
})

const notifStore = useNotificationsStore()
const { allList, pagination, getParams } = storeToRefs(notifStore)
if (allList.value.length <= 0) {
    notifStore.getAllNotifications()
}
const changePaginate = (newParams) => {
    getParams.value.page = newParams.page ?? ""
}
</script>
<template>
    <div class="flex flex-col border-2 mt-6 p-2 w-full md:w-1/2 max-w-full bg-white border-gray-200 rounded-lg shadow sm:p-6 md:p-2 dark:bg-gray-800 dark:border-gray-700 mx-auto">
        <h5 class="text-xl font-medium text-gray-900 dark:text-white border-b flex items-center justify-between">
            All Notifications
        </h5>

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
            <CustomPagination :links="pagination" @change-params="changePaginate" />
        </div>
    </div>
</template>
