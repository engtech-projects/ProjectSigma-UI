import { defineStore } from "pinia"

const config = useRuntimeConfig()
const { token } = useAuth()

export const useNotificationsStore = defineStore("notificationsStore", {
    state: () => ({
        allList: [],
        unreadList: [],
        streamingList: false,
    }),
    actions: {
        getAllNotifications () {
            useHRMSApi("api/notifications/all", {
                onResponseError: ({ response } : any) => {
                    throw new Error(response._data.message)
                },
                onResponse: ({ response } : any) => {
                    if (response.ok) {
                        this.allList = response._data.data ?? []
                    }
                },
            })
        },
        async getNotificationsStream () {
            const response = await $fetch<ReadableStream>("/api/notifications/unread-stream", {
                headers: {
                    Authorization: token.value + "",
                },
                method: "GET",
                responseType: "stream",
                baseURL: config.public.HRMS_API_URL,
                keepalive: true,
                onResponseError: () => {
                    response.cancel()
                    this.getNotificationsStream()
                },
            })
            // Create a new ReadableStream from the response with TextDecoderStream to get the data as text
            const reader = response.pipeThrough(new TextDecoderStream()).getReader()

            // Read the chunk of data as we get it
            while (true) {
                try {
                    const { value, done } = await reader.read()
                    if (done) { break }
                    const readData = value.trim().split(":")
                    const event = JSON.parse(readData[readData.length - 1])
                    this.unreadList = event.notifs ?? []
                } finally {
                    this.unreadList = this.unreadList ?? []
                }
            }
        },
        async setAllUnreadAsRead () {
            await useHRMSApi("api/notifications/read-all", {
                method: "PUT"
            })
            this.loadDatas()
        },
        async setSingleNotifAsRead (notifId: any) {
            await useHRMSApi("api/notifications/read/" + notifId, {
                method: "PUT"
            })
            this.loadDatas()
        },
        async setSingleNotifAsUnread (notifId: any) {
            await useHRMSApi("api/notifications/unread/" + notifId, {
                method: "PUT"
            })
            this.loadDatas()
        },
        loadDatas () {
            if (this.allList.length > 0) {
                this.getAllNotifications()
            }
        }
    },
})
