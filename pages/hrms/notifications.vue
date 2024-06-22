<script setup>
import { useNotificationsStore } from "@/stores/notifications"

useHead({
    title: "Notifications"
})

const notifStore = useNotificationsStore()
const { allList } = storeToRefs(notifStore)
if (allList.value.length <= 0) {
    notifStore.getAllNotifications()
}
const possibleLocations = {
    LeaveRequest: "/hrms/leave",
}
const visitNotification = (notif) => {
    navigateTo({
        path: possibleLocations[notif.data.type],
        query: {
            id: notif.data.metadata.id,
            notifId: notif.id,
            type: "view",
        },
    })
    // notifStore.setSingleNotifAsRead(notif.id)
}
</script>
<template>
    <div class="flex flex-col border-2 mt-6 p-2 w-full md:w-1/2 max-w-full bg-white border-gray-200 rounded-lg shadow sm:p-6 md:p-2 dark:bg-gray-800 dark:border-gray-700 mx-auto">
        <h5 class="text-xl font-medium text-gray-900 dark:text-white border-b flex items-center justify-between">
            All Notifications
        </h5>

        <div class="notification-list">
            <!-- Replace this section with your dynamic data -->
            <a
                v-for="notification, index in allList"
                :key="'AllNotifs' + index"
                href="#"
                class="flex py-3 px-4 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600"
                @click.prevent="visitNotification(notif)"
            >
                <!-- <div class="flex-shrink-0">
                    <img
                        class="w-11 h-11 rounded-full"
                        :src="notification.avatar"
                        :alt="notification.name + ' avatar'"
                    >
                    <div
                        class="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5"
                        :class="notification.badgeClass"
                    >
                        <svg
                            aria-hidden="true"
                            class="w-3 h-3 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path :d="notification.badgeIcon" />
                        </svg>
                    </div>
                </div> -->
                <div class="pl-3 w-full">
                    <div
                        class="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400"
                    >
                        <span class="font-semibold text-gray-900 dark:text-white">
                            {{ notification.data.message }}
                        </span>
                    </div>
                    <div
                        class="flex text-xs font-medium text-primary-600 dark:text-primary-500"
                    >
                        {{ notification.created_at_human }}
                        <div class="flex justify-end ml-auto">
                            <button
                                v-if="!notification.read_at"
                                title="Mark As Read"
                                @click="notifStore.setSingleNotifAsRead(notification.id)"
                            >
                                <Icon name="material-symbols:visibility-rounded" color="blue" class="w-5 h-5" />
                            </button>
                            <button
                                v-else
                                title="Mark As Unread"
                                @click="notifStore.setSingleNotifAsUnread(notification.id)"
                            >
                                <Icon name="material-symbols:visibility-rounded" color="gray" class="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                </div>
            </a>
            <!-- End of dynamic data section -->

            <!-- View all button -->
            <a
                href="#"
                class="block py-2 text-md font-medium text-center text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-600 dark:text-white dark:hover:underline"
            />
        </div>
    </div>
</template>
