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
        errorMessage: null as string | null,
        successMessage: null as string | null,
        isLoading: false,
    }),
    actions: {
        async getTransactionFlow () {
            this.successMessage = ""
            this.errorMessage = ""
            await useAccountingApiO(
                "/api/transaction-flow-model",
                {
                    method: "GET",
                    watch: false,
                    onRequest: () => {
                        this.isLoading = true
                    },
                    onResponseError: ({ response } : any) => {
                        this.errorMessage = response._data.message
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }: any) => {
                        this.isLoading = false
                        if (response.ok) {
                            this.TransactionFlowList = response._data.data
                            this.successMessage = response._data.message
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async updateTransactionFlow (id: number) {
            this.successMessage = ""
            this.errorMessage = ""
            await useAccountingApiO(
                "/api/update-transaction-flow",
                {
                    method: "POST",
                    body: {
                        user_id: this.selectedId,
                        flow_id: id,
                        update_type: "user"
                    },
                    watch: false,
                    onRequest: () => {
                        this.isLoading = true
                    },
                    onResponseError: ({ response } : any) => {
                        this.errorMessage = response._data.message
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }: any) => {
                        this.isLoading = false
                        if (response.ok) {
                            this.successMessage = response._data.message
                            this.selectedId = null
                            return response
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
        async updateTransactionFlowStatus (flowId: number, userId: number) {
            this.successMessage = ""
            this.errorMessage = ""
            await useAccountingApiO(
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
                    onRequest: () => {
                        this.isLoading = true
                    },
                    onResponseError: ({ response } : any) => {
                        this.errorMessage = response._data.message
                        throw new Error(response._data.message)
                    },
                    onResponse: ({ response }: any) => {
                        this.isLoading = false
                        if (response.ok) {
                            this.successMessage = response._data.message
                            this.selectedId = null
                            return response
                        } else {
                            this.errorMessage = response._data.message
                            throw new Error(response._data.message)
                        }
                    },
                }
            )
        },
    }
})
