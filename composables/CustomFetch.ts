import { ofetch } from "ofetch"
import { defu } from "defu"
import type { AsyncDataOptions, UseFetchOptions } from "#app"
const config = useRuntimeConfig()
const cookieExpiry = new Date()
cookieExpiry.setFullYear(cookieExpiry.getFullYear() + 1)
const portalToken = useCookie("portal_token",
    {
        expires: cookieExpiry
    }
)
const portalToken2 = useCookie("portal_token_backup",
    {
        expires: cookieExpiry
    }
)
const tokencopy = portalToken.value === "Resetting" ? portalToken2.value : portalToken.value
if (portalToken.value) {
    if (portalToken.value === "Resetting") {
        portalToken.value = portalToken2.value
    }
    setTimeout(() => {
        portalToken2.value = portalToken.value
        portalToken.value = "Resetting"
        setTimeout(() => {
            portalToken.value = tokencopy
        }, 100)
    }, 100)
}
const { token } = useAuth()
export interface CallBackData {
    data: {
        message: String,
        data: {}[],
    },
    error: {
        message: String,
        data: {}[],
    },
}
export interface CallBackDataO {
        data: {
            value: {
                message: string,
                data: {}[],
            }
        },
        error: {
            value: {
                message: string,
                data: {}[],
            }
        },
}
export function useHRMSApi<T> (url: string, options: AsyncDataOptions<T>|UseFetchOptions<T> = {}) {
    const defaults: UseFetchOptions<T> = {
        baseURL: config.public.HRMS_API_URL,
        key: url,
        headers: {
            Authorization: token.value + "",
            Accept: "application/json"
        },
        dedupe: "cancel",
        onResponse (_ctx) {
            // _ctx.response._data = new myBusinessResponse(_ctx.response._data)
        },
        onResponseError (_ctx) {
            // throw new myBusinessError()
        },
        // server: false,
        // lazy: true,
    }
    const params = defu(options, defaults)
    return useFetch(url, params)
}
export function useHRMSApiO (url: string, params: any) {
    const ofetchApi = ofetch.create({
        baseURL: config.public.HRMS_API_URL,
        headers: {
            Authorization: token.value + "",
            Accept: "application/json"
        },
    })
    return ofetchApi(url, params)
}
export function useAttendancePortalApi<T> (url: string, options: AsyncDataOptions<T>|UseFetchOptions<T> = {}) {
    const ptoken = portalToken.value === "Resetting" ? tokencopy : portalToken.value
    const cookieHeaders = useRequestHeaders(["cookie"])
    const defaults: UseFetchOptions<T> = {
        server: false,
        baseURL: config.public.HRMS_API_URL,
        key: url,
        headers: {
            ...cookieHeaders,
            Accept: "application/json",
            Portal_token: ptoken + "",
            Authorization: "Bearer " + ptoken,
            Cookie: "portal_token=" + ptoken + ";"
        },
        dedupe: "cancel",
        onResponse (_ctx) {
            // _ctx.response._data = new myBusinessResponse(_ctx.response._data)
        },
        onResponseError (_ctx) {
            // throw new myBusinessError()
        }
    }
    const params = defu(options, defaults)
    return useFetch(url, params)
}
export function useAttendancePortalApiO (url: string, params: any) {
    const ptoken = portalToken.value === "Resetting" ? tokencopy : portalToken.value
    const cookieHeaders = useRequestHeaders(["cookie"])
    const ofetchApi = ofetch.create({
        baseURL: config.public.HRMS_API_URL,
        headers: {
            ...cookieHeaders,
            Accept: "application/json",
            Portal_token: ptoken + "",
            Authorization: "Bearer " + ptoken,
            Cookie: "portal_token=" + ptoken + ";"
        },
    })
    return ofetchApi(url, params)
}
export function useProjectsApi<T> (url: string, options: AsyncDataOptions<T>|UseFetchOptions<T> = {}) {
    const defaults: UseFetchOptions<T> = {
        baseURL: config.public.PROJECTS_API_URL,
        key: url,
        headers: {
            Authorization: token.value + "",
            Accept: "application/json"

        },
        dedupe: "cancel",
        onResponse (_ctx) {
            // _ctx.response._data = new myBusinessResponse(_ctx.response._data)
        },
        onResponseError (_ctx) {
            // throw new myBusinessError()
        }
    }
    const params = defu(options, defaults)
    return useFetch(url, params)
}
export function useProjectsApiO (url: string, params: any) {
    const ofetchApi = ofetch.create({
        baseURL: config.public.PROJECTS_API_URL,
        headers: {
            Authorization: token.value + "",
            Accept: "application/json"
        },
    })
    return ofetchApi(url, params)
}
export function useAccountingApi<T> (url: string, options: AsyncDataOptions<T>|UseFetchOptions<T> = {}) {
    const defaults: UseFetchOptions<T> = {
        baseURL: config.public.ACCOUNTING_API_URL,
        key: url,
        headers: {
            Authorization: token.value + "",
            Accept: "application/json"
        },
        dedupe: "cancel",
        onResponse (_ctx) {
            // _ctx.response._data = new myBusinessResponse(_ctx.response._data)
        },
        onResponseError (_ctx) {
            // throw new myBusinessError()
        }
    }
    const params = defu(options, defaults)
    return useFetch(url, params)
}
export function useAccountingApiO (url: string, params: any) {
    const ofetchApi = ofetch.create({
        baseURL: config.public.ACCOUNTING_API_URL,
        headers: {
            Authorization: token.value + "",
            Accept: "application/json"
        },
    })
    return ofetchApi(url, params)
}
export function useInventoryApi<T> (url: string, options: AsyncDataOptions<T>|UseFetchOptions<T> = {}) {
    const defaults: UseFetchOptions<T> = {
        baseURL: config.public.INVENTORY_API_URL,
        key: url,
        headers: {
            Authorization: token.value + "",
            Accept: "application/json"
        },
        dedupe: "cancel",
        onResponse (_ctx) {
            // _ctx.response._data = new myBusinessResponse(_ctx.response._data)
        },
        onResponseError (_ctx) {
            // throw new myBusinessError()
        }
    }
    const params = defu(options, defaults)
    return useFetch(url, params)
}
export function useInventoryApiO (url: string, params: any) {
    const ofetchApi = ofetch.create({
        baseURL: config.public.INVENTORY_API_URL,
        headers: {
            Authorization: token.value + "",
            Accept: "application/json"
        },
    })
    return ofetchApi(url, params)
}
