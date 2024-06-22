import { defineStore } from "pinia"

export const useNotificationsStore = defineStore("notificationsStore", {
    state: () => ({
        unreadList: [],
        streamingList: false,
    }),
    actions: {
        getUnreadNotifications () {
            useHRMSApi("api/notifications/unread", {
                onResponseError: ({ response } : any) => {
                    throw new Error(response._data.message)
                },
                onResponse: ({ response } : any) => {
                    if (response.ok) {
                        this.unreadList = response._data.data ?? []
                    }
                },
            })
        },
        getUnreadNotificationsStream () {
            useHRMSApi("api/notifications/unread-stream", {
                onResponseError: ({ response } : any) => {
                    throw new Error(response._data.message)
                },
                onResponse: ({ response } : any) => {
                    if (response.ok) {
                        this.unreadList = response._data.data ?? []
                    }
                },
            })
        },
        setAllUnreadAsRead () {
            useHRMSApi("api/notifications/mark-read", {
                method: "PUT"
            })
        },
        setSingleNotifAsRead (notifId: any) {
            useHRMSApi("api/notifications/read/" + notifId, {
                method: "PUT"
            })
        },
    },
})
