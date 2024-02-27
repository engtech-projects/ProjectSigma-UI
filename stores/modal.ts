import { defineStore } from "pinia"

export const useModalStore = defineStore("modalStore", {
    state: () => ({
        show: false,
        title: ""
    }),
    actions: {
        showModal () {
            this.show = true
        },
        hideModal () {
            this.show = false
        }
    },
})
