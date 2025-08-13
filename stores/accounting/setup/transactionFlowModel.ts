import { defineStore } from "pinia"

export interface TransactionFlowModel {
    id: number,
    name: string,
    unique_name: string,
    category: string,
    description: string,
    status: string,
    priority: string,
    created_at: string,
    updated_at: string,
}

export const useTransactionFlowStore = defineStore("transactionFlowStore", {
    state: () => ({
        TransactionFlowList: [] as TransactionFlowModel[],
        selectedId: null,
        status: "done",
        errorMessage: null,
        successMessage: null,
        isLoading: false,
    }),
    actions: {
        async getTransactionFlow () {
            this.isLoading = true
            const { data, error } = await useAccountingApi(
                "/api/transaction-flow-model",
                {
                    method: "GET",
                    onResponse: ({ response }) => {
                        this.isLoading = false
                        this.TransactionFlowList = response._data.data
                    },
                }
            )
            if (data) {
                return data
            } else if (error) {
                return error
            }
        },
        async updateTransactionFlow (id: number) {
            this.isLoading = true
            const { data, error } = await useAccountingApi(
                "/api/update-transaction-flow",
                {
                    method: "POST",
                    body: {
                        user_id: this.selectedId,
                        flow_id: id,
                        update_type: "user"
                    },
                    watch: false,
                }
            )
            if (data.value) {
                await this.getTransactionFlow()
                this.successMessage = "Transaction flow successfully updated."
                this.selectedId = null
                return data
            } else if (error.value) {
                this.errorMessage = error.value.data.message
                return error
            }
        },
        async updateTransactionFlowStatus (flowId: number, userId: number) {
            this.isLoading = true
            const { data, error } = await useAccountingApi(
                "/api/update-transaction-flow",
                {
                    method: "POST",
                    body: {
                        flow_id: flowId,
                        status: this.status,
                        update_type: "status",
                        user_id: userId
                    },
                    watch: false,
                }
            )
            if (data.value) {
                await this.getTransactionFlow()
                this.successMessage = "Transaction flow successfully updated."
                this.selectedId = null
                return data
            } else if (error.value) {
                this.errorMessage = error.value.data.message
                return error
            }
        },

    }
})
