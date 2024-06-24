<script setup>
import { useNotificationsStore } from "@/stores/notifications"
import { useManpowerStore } from "@/stores/hrms/employee/manpower"
import { useLeaveRequest } from "@/stores/hrms/leaveRequest"
import { useTravelorderStore } from "@/stores/hrms/travelorder"
import { useFailToLogStore } from "@/stores/hrms/attendance/failtolog"
import { useOvertimeStore } from "@/stores/hrms/overtime"
import { usePersonelActionNotice } from "@/stores/hrms/pan"
import { useCashadvanceStore } from "@/stores/hrms/loansAndCash/cashadvance"

const notifStore = useNotificationsStore()
const manpowerStore = useManpowerStore()
const faillogStore = useFailToLogStore()
const panStore = usePersonelActionNotice()
const leavereqStore = useLeaveRequest()
const travelOrder = useTravelorderStore()
const cashadvanceStore = useCashadvanceStore()
const overtimeStore = useOvertimeStore()
const prop = defineProps({
    notification: {
        type: Object,
        required: true,
    }
})
const showModal = ref(false)
const modalData = ref({})
const { allList } = storeToRefs(notifStore)
if (allList.value.length <= 0) {
    notifStore.getAllNotifications()
}
const icons = {
    ManpowerRequest: "ic:round-people-alt",
    FailureToLog: "ic:baseline-flag-circle",
    EmployeePanRequest: "ic:round-add-card",
    LeaveEmployeeRequest: "fluent-mdl2:leave-user",
    TravelOrder: "material-symbols:googler-travel",
    CashAdvance: "material-symbols:dynamic-form-outline-rounded",
    Overtime: "mingcute:time-line",
    GenerateAllowance: "",
    Payroll: "",
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
// }
const openModalNotification = async () => {
    switch (prop.notification.data.type) {
    case "ManpowerRequest":
        modalData.value = await manpowerStore.getOne(prop.notification.data.metadata.id)
        break
    case "FailureToLog":
        modalData.value = await faillogStore.getOne(prop.notification.data.metadata.id)
        break
    case "EmployeePanRequest":
        modalData.value = await panStore.getOne(prop.notification.data.metadata.id)
        break
    case "LeaveEmployeeRequest":
        modalData.value = await leavereqStore.getOne(prop.notification.data.metadata.id)
        break
    case "TravelOrder":
        modalData.value = await travelOrder.getOne(prop.notification.data.metadata.id)
        break
    case "CashAdvance":
        modalData.value = await cashadvanceStore.getOne(prop.notification.data.metadata.id)
        break
    case "Overtime":
        modalData.value = await overtimeStore.getOne(prop.notification.data.metadata.id)
        break
    case "GenerateAllowance":
        modalData.value = await leavereqStore.getOne(prop.notification.data.metadata.id)
        break
    case "Payroll":
        modalData.value = await leavereqStore.getOne(prop.notification.data.metadata.id)
        break
    default:
        break
    }
    showModal.value = true
}
watch(showModal, (newValue, oldValue) => {
    if (oldValue && !newValue) {
        notifStore.setSingleNotifAsRead(prop.notification.id)
    }
})
</script>
<template>
    <a
        :key="'AllNotifs'"
        href="#"
        class="flex py-3 px-4 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600"
    >
        <div class="flex-shrink-0">
            <div class="w-11 h-11 rounded-full">
                <Icon :name="icons[notification.data.type]" class="w-full h-full" />
            </div>
        </div>
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
                        <Icon name="material-symbols:notifications-unread" color="blue" class="w-5 h-5" />
                    </button>
                    <button
                        v-else
                        title="Mark As Unread"
                        @click="notifStore.setSingleNotifAsUnread(notification.id)"
                    >
                        <Icon name="material-symbols:notifications" color="gray" class="w-5 h-5" />
                    </button>
                    <button
                        title="View Notification"
                        @click.prevent="openModalNotification"
                    >
                        <Icon name="material-symbols:visibility-rounded" color="blue" class="w-5 h-5" />
                    </button>
                </div>
            </div>

        </div>
    </a>
    <div v-if="showModal">
        <template v-if=" prop.notification.data.type === 'LeaveEmployeeRequest'">
            <HrmsLeaveInfoModal
                v-model:showModal="showModal"
                :data="modalData.data"
            />
        </template>
        <template v-if=" prop.notification.data.type === 'TravelOrder'">
            <HrmsTravelOrderInfoModal
                v-model:showModal="showModal"
                :data="modalData.data"
            />
        </template>
        <template v-if=" prop.notification.data.type === 'Payroll'">
            <HrmsPayrollInfoModal
                v-model:showModal="showModal"
                :show-approvals="prop.notification.data.action_type === 'Approve'"
                :data="modalData.data"
            />
        </template>
        <template v-if=" prop.notification.data.type === 'FailureToLog'">
            <HrmsAttendanceFailtologInfoModal
                v-model:showModal="showModal"
                :show-approvals="prop.notification.data.action_type === 'Approve'"
                :data="modalData.data"
            />
        </template>
        <template v-if=" prop.notification.data.type === 'Overtime'">
            <HrmsOvertimeInfoModal
                v-model:showModal="showModal"
                :data="modalData.data"
            />
        </template>
        <template v-if=" prop.notification.data.type === 'EmployeePanRequest'">
            <HrmsTravelOrderInfoModal
                v-model:showModal="showModal"
                :show-approvals="prop.notification.data.action_type === 'Approve'"
                :data="modalData.data"
            />
        </template>
        <template v-if=" prop.notification.data.type === 'ManpowerRequest'">
            <HrmsTravelOrderInfoModal
                v-model:showModal="showModal"
                :show-approvals="prop.notification.data.action_type === 'Approve'"
                :data="modalData.data"
            />
        </template>
        <template v-if=" prop.notification.data.type === 'GenerateAllowance'">
            <HrmsTravelOrderInfoModal
                v-model:showModal="showModal"
                :show-approvals="prop.notification.data.action_type === 'Approve'"
                :data="modalData.data"
            />
        </template>
    </div>
</template>
