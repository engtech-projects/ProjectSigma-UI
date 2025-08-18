<script setup>
import { useNotificationsStore } from "@/stores/notifications"
const notifStore = useNotificationsStore()
const { unreadList } = storeToRefs(notifStore)
onMounted(() => {
    notifStore.getNotificationsStream()
})
const reposPage = () => {
    window.scrollBy(0, 1)
}
</script>
<template>
    <div class="overflow-hidden z-50 my-4 max-w-sm text-base list-none bg-white divide-y divide-gray-100 shadow-lg dark:divide-gray-600 dark:bg-gray-700 rounded-xl">
        <div
            class="block py-2 px-4 text-base font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-600 dark:text-gray-300"
        >
            Unread Notifications
        </div>
        <div class="overflow-y-auto max-h-72 scroll-smooth">
            <template v-if="unreadList.length <= 0">
                <div href="#" class="flex py-3 px-4 border-b dark:hover:bg-gray-600 dark:border-gray-600">
                    <div class="pl-3 w-full">
                        <div class="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">
                            No Unread Notifications.
                        </div>
                    </div>
                </div>
            </template>
            <template v-for="notif, index in unreadList" :key="'navNotif'+index">
                <LayoutNotificationNotifItem :notification="notif" />
            </template>
        </div>
        <NuxtLink
            to="/hrms/notifications"
            class="block py-2 text-md font-medium text-center text-gray-900 bg-gray-50 dark:bg-gray-600 dark:text-white dark:hover:underline"
            @click="reposPage"
        >
            <div class="inline-flex items-center">
                <svg
                    aria-hidden="true"
                    class="mr-2 w-4 h-4 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path
                        fill-rule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clip-rule="evenodd"
                    />
                </svg>
                View all
            </div>
        </NuxtLink>
    </div>
</template>
<style scoped>
/* width */
::-webkit-scrollbar {
  width: 4px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
