import { computed } from "vue"
import { useAuthStore } from "@/stores/auth"
import { AccessibilityTypes } from "@/types/accessibility"

export function useCheckAccessibility (): { hasVoucherDisbursementApprovalAccess: globalThis.ComputedRef<any> } {
    const authStore = useAuthStore()

    const hasVoucherDisbursementApprovalAccess = computed(() => {
        return authStore.user?.permissions?.includes(AccessibilityTypes.VOUCHER_DISBURSEMENT_APPROVAL) || false
    })

    return {
        hasVoucherDisbursementApprovalAccess
    }
}
