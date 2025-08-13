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
                `/api/transaction-flow-model/${id}`,
                {
                    method: "PATCH",
                    body: {
                        user_id: this.selectedId,
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
        async updateTransactionFlowStatus (id: number) {
            this.isLoading = true
            const { data, error } = await useAccountingApi(
                `/api/transaction-flow-model/${id}`,
                {
                    method: "PATCH",
                    body: {
                        status: this.status,
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
