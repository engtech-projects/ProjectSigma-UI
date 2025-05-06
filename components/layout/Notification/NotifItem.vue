<script setup>
import { useNotificationsStore } from "@/stores/notifications"
import { useManpowerStore } from "@/stores/hrms/employee/manpower"
import { useLeaveRequest } from "@/stores/hrms/leaveRequest"
import { useTravelorderStore } from "@/stores/hrms/travelorder"
import { useFailToLogStore } from "@/stores/hrms/attendance/failtolog"
import { useOvertimeStore } from "@/stores/hrms/overtime"
import { usePersonelActionNotice } from "@/stores/hrms/pan"
import { useCashadvanceStore } from "@/stores/hrms/loansAndCash/cashadvance"
import { useGenerateAllowanceStore } from "@/stores/hrms/payroll/generateAllowance"
import { useGeneratePayrollStore } from "@/stores/hrms/payroll/generatePayroll"
import { useItemProfileStore } from "@/stores/inventory/itemprofiles"
import { useBOMStore } from "@/stores/inventory/bom"
import { useSupplierStore } from "@/stores/inventory/suppliers"
import { useRequestStockStore } from "@/stores/inventory/requeststock"
import { usePaymentRequestStore } from "@/stores/accounting/requests/paymentrequest"
import { useVoucherStore } from "@/stores/accounting/vouchers/voucher"

// HRMS STORES
const notifStore = useNotificationsStore()
const manpowerStore = useManpowerStore()
const faillogStore = useFailToLogStore()
const panStore = usePersonelActionNotice()
const leavereqStore = useLeaveRequest()
const travelOrder = useTravelorderStore()
const cashadvanceStore = useCashadvanceStore()
const overtimeStore = useOvertimeStore()
const genAllowanceStore = useGenerateAllowanceStore()
const genPayrollStore = useGeneratePayrollStore()
const itemProfileStore = useItemProfileStore()
const BOMStore = useBOMStore()
const SupplierStore = useSupplierStore()
const RequestStockStore = useRequestStockStore()
const PaymentRequestStore = usePaymentRequestStore()
const voucherStore = useVoucherStore()
// INVENTORY STORES
// ACCOUNTING STORES
// PROJECTS STORES
const prop = defineProps({
    notification: {
        type: Object,
        required: true,
    }
})
const showModal = ref(false)
const modalData = ref({})
const loading = ref(false)
const icons = {
    ManpowerRequest: "ic:round-people-alt",
    FailureToLog: "ic:baseline-flag-circle",
    EmployeePanRequest: "ic:round-add-card",
    LeaveEmployeeRequest: "fluent-mdl2:leave-user",
    TravelOrder: "material-symbols:googler-travel",
    CashAdvance: "material-symbols:dynamic-form-outline-rounded",
    Overtime: "mingcute:time-line",
    GenerateAllowance: "tabler:pig-money",
    GeneratePayroll: "carbon:money",
    RequestItemProfiling: "material-symbols:inventory-2-outline",
    RequestBOM: "i-carbon:request-quote",
    RequestStock: "i-carbon:request-quote",
    ACCOUNTING_PAYMENT_REQUEST: "iconoir:credit-card-2",
    ACCOUNTING_DISBURSEMENT_REQUEST: "material-symbols:dynamic-form-outline-rounded",
    ACCOUNTING_CASH_REQUEST: "iconoir:money-square"

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
    loading.value = true
    try {
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
            modalData.value = await genAllowanceStore.getOne(prop.notification.data.metadata.id)
            break
        case "GeneratePayroll":
            modalData.value = await genPayrollStore.getOne(prop.notification.data.metadata.id)
            break
        case "RequestItemProfiling":
            modalData.value = await itemProfileStore.getOne(prop.notification.data.metadata.id)
            break
        case "RequestBOM":
            modalData.value = await BOMStore.getOne(prop.notification.data.metadata.id)
            break
        case "RequestSupplier":
            modalData.value = await SupplierStore.getOne(prop.notification.data.metadata.id)
            break
        case "RequestStock":
            modalData.value = await RequestStockStore.getOne(prop.notification.data.metadata.id)
            break
        case "ACCOUNTING_PAYMENT_REQUEST":
            modalData.value = await PaymentRequestStore.getOne(prop.notification.data.metadata.id)
            break
        case "ACCOUNTING_DISBURSEMENT_REQUEST":
            modalData.value = await voucherStore.getOne(prop.notification.data.metadata.id, "disbursement")
            break
        case "ACCOUNTING_CASH_REQUEST":
            modalData.value = await voucherStore.getOne(prop.notification.data.metadata.id, "cash")
            break
        default:
            break
        }
        showModal.value = true
        window.scrollBy(0, 1)
    } finally {
        loading.value = false
    }
}
const setAsRead = async (id) => {
    loading.value = true
    await notifStore.setSingleNotifAsRead(id)
    loading.value = false
    window.scrollBy(0, 1)
}
const setAsUnread = async (id) => {
    loading.value = true
    await notifStore.setSingleNotifAsUnread(id)
    loading.value = false
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
        class="relative flex py-3 px-4 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600"
    >
        <div class="flex-shrink-0">
            <div class="w-11 h-11 rounded-full">
                <Icon :name="icons[notification.data.type]" class="w-full h-full" />
            </div>
        </div>
        <div class="pl-3 w-full ">
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
                {{ notification.data.module?.toUpperCase() ?? "HRMS" }}:
                {{ notification.created_at_human }}
                <div class="flex justify-end ml-auto">
                    <button
                        v-if="!notification.read_at"
                        title="Mark As Read"
                        @click="setAsRead(notification.id)"
                    >
                        <Icon name="material-symbols:notifications-unread" color="blue" class="w-5 h-5" />
                    </button>
                    <button
                        v-else
                        title="Mark As Unread"
                        @click="setAsUnread(notification.id)"
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
        <div v-if="loading" class="absolute p-8 inset-0 flex items-center justify-center bg-black bg-opacity-10 z-50">
            <span><Icon name="eos-icons:three-dots-loading" color="teal" class="w-12 h-12" /></span>
        </div>
    </a>
    <div v-if="showModal">
        <template v-if=" prop.notification.data.type === 'ManpowerRequest'">
            <HrmsEmployeeManpowerInfoModal
                v-model:showModal="showModal"
                :data="modalData.data"
            />
        </template>
        <template v-if=" prop.notification.data.type === 'FailureToLog'">
            <HrmsAttendanceFailtologInfoModal
                v-model:showModal="showModal"
                :data="modalData.data"
            />
        </template>
        <template v-if=" prop.notification.data.type === 'EmployeePanRequest'">
            <HrmsEmployeePanInfoModal
                v-model:showModal="showModal"
                :data="modalData.data"
            />
        </template>
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
        <template v-if=" prop.notification.data.type === 'CashAdvance'">
            <HrmsCashadvanceInfoModal
                v-model:showModal="showModal"
                :data="modalData.data"
            />
        </template>
        <template v-if=" prop.notification.data.type === 'Overtime'">
            <HrmsOvertimeInfoModal
                v-model:showModal="showModal"
                :data="modalData.data"
            />
        </template>
        <template v-if=" prop.notification.data.type === 'GenerateAllowance'">
            <HrmsPayrollAllowanceInfoModal
                v-model:showModal="showModal"
                :data="modalData.data"
            />
        </template>
        <template v-if=" prop.notification.data.type === 'GeneratePayroll'">
            <HrmsPayrollSalaryGeneratePayrollInfoModal
                v-model:showModal="showModal"
                :data="modalData.data"
            />
        </template>
        <template v-if=" prop.notification.data.type === 'RequestItemProfiling'">
            <InventoryItemProfileInfoModal
                v-model:showModal="showModal"
                :data="modalData.data"
            />
        </template>
        <template v-if=" prop.notification.data.type === 'RequestBOM'">
            <InventoryBomInfoModal
                v-model:showModal="showModal"
                :data="modalData.data"
            />
        </template>
        <template v-if=" prop.notification.data.type === 'RequestSupplier'">
            <InventorySuppliersInfoModal
                v-model:showModal="showModal"
                :data="modalData.data"
            />
        </template>
        <template v-if=" prop.notification.data.type === 'RequestStock'">
            <InventorySuppliersInfoModal
                v-model:showModal="showModal"
                :data="modalData.data"
            />
        </template>
        <template v-if=" prop.notification.data.type === 'ACCOUNTING_PAYMENT_REQUEST'">
            <AccountingRequestNonPurchaseRequestInfoModal
                v-model:showModal="showModal"
                :payment-data="modalData.data.data"
            />
        </template>
        <template v-if=" prop.notification.data.type === 'ACCOUNTING_DISBURSEMENT_REQUEST'">
            <AccountingVoucherDisbursementInfoModal
                v-model:showModal="showModal"
                :voucher-data="modalData.data.data"
            />
        </template>
        <template v-if=" prop.notification.data.type === 'ACCOUNTING_CASH_REQUEST'">
            <AccountingVoucherCashInfoModal
                v-model:showModal="showModal"
                :voucher-data="modalData.data.data"
            />
        </template>
    </div>
</template>
