<script setup>
import { useNotificationsStore } from "@/stores/notifications"
import { useLeaveRequest } from "@/stores/hrms/leaveRequest"
import { useTravelorderStore } from "@/stores/hrms/travelorder"

leavereqStore = useLeaveRequest()
travelOrder = useTravelorderStore()
const prop = defineProps({
    notification: {
        type: Object,
        required: true,
    }
})
const showModal = ref(false)
const notifStore = useNotificationsStore()
const { allList } = storeToRefs(notifStore)
if (allList.value.length <= 0) {
    notifStore.getAllNotifications()
}
// const possibleLocations = {
//     LeaveRequest: "/hrms/leave",
// }
// const visitNotification = () => {
//     navigateTo({
//         path: possibleLocations[prop.notification.data.type],
//         query: {
//             id: prop.notification.data.metadata.id,
//             type: prop.notification.data.action_type,
//             notifId: prop.notification.id,
//         },
//     })
//     // notifStore.setSingleNotifAsRead(notif.id)
// }
const openModalNotification = () => {
    showModal.value = true
}
</script>
<template>
    <a
        :key="'AllNotifs' + index"
        href="#"
        class="flex py-3 px-4 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600"
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
                    <button
                        title="View Notification"
                        @click.prevent="openModalNotification"
                    >
                        <Icon name="material-symbols:visibility-rounded" color="gray" class="w-5 h-5" />
                    </button>
                </div>
            </div>

        </div>
    </a>
    <div v-if="showModal">
        <template v-if=" prop.notification.data.type === 'LeaveEmployeeRequest'">
            <HrmsLeaveInfoModal
                v-model:showModal="showModal"
                :show-approvals="prop.notification.data.action_type === 'Approve'"
                :data="leavereqStore.payload"
            />
        </template>
        <template v-if=" prop.notification.data.type === 'TravelOrder'">
            <HrmsTravelOrderInfoModal
                v-model:showModal="showModal"
                :show-approvals="prop.notification.data.action_type === 'Approve'"
                :data="leavereqStore.payload"
            />
        </template>
        <template v-if=" prop.notification.data.type === 'Payroll'">
            <HrmsPayrollInfoModal
                v-model:showModal="showModal"
                :show-approvals="prop.notification.data.action_type === 'Approve'"
                :data="leavereqStore.payload"
            />
        </template>
        <template v-if=" prop.notification.data.type === 'FailureToLog'">
            <HrmsAttendanceFailtologInfoModal
                v-model:showModal="showModal"
                :show-approvals="prop.notification.data.action_type === 'Approve'"
                :data="leavereqStore.payload"
            />
        </template>
        <template v-if=" prop.notification.data.type === 'Overtime'">
            <HrmsOvertimeInfoModal
                v-model:showModal="showModal"
                :show-approvals="prop.notification.data.action_type === 'Approve'"
                :data="leavereqStore.payload"
            />
        </template>
        <template v-if=" prop.notification.data.type === 'EmployeePanRequest'">
            <HrmsTravelOrderInfoModal
                v-model:showModal="showModal"
                :show-approvals="prop.notification.data.action_type === 'Approve'"
                :data="leavereqStore.payload"
            />
        </template>
        <template v-if=" prop.notification.data.type === 'ManpowerRequest'">
            <HrmsTravelOrderInfoModal
                v-model:showModal="showModal"
                :show-approvals="prop.notification.data.action_type === 'Approve'"
                :data="leavereqStore.payload"
            />
        </template>
        <template v-if=" prop.notification.data.type === 'GenerateAllowance'">
            <HrmsTravelOrderInfoModal
                v-model:showModal="showModal"
                :show-approvals="prop.notification.data.action_type === 'Approve'"
                :data="leavereqStore.payload"
            />
        </template>
    </div>
</template>
