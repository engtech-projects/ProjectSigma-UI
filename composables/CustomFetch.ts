import { ofetch } from "ofetch"
import { defu } from "defu"
import type { AsyncDataOptions, UseFetchOptions } from "#app"
const config = useRuntimeConfig()
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
export const useHRMSApiO = ofetch.create({
    baseURL: config.public.HRMS_API_URL,
    headers: {
        Authorization: token.value + "",
        Accept: "application/json"
    },
})
export function useProjectsApi<T> (url: string, options: AsyncDataOptions<T>|UseFetchOptions<T> = {}) {
    const defaults: UseFetchOptions<T> = {
        baseURL: config.public.PROJECT_API_URL,
        key: url,
        headers: {
            Authorization: token.value + "",
            Accept: "application/json"
        },
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
export const useProjectsApiO = ofetch.create({
    baseURL: config.public.PROJECT_API_URL,
    headers: {
        Authorization: token.value + "",
        Accept: "application/json"
    },
})
export function useAccountingApi<T> (url: string, options: AsyncDataOptions<T>|UseFetchOptions<T> = {}) {
    const defaults: UseFetchOptions<T> = {
        baseURL: config.public.ACCOUNTING_API_URL,
        key: url,
        headers: {
            Authorization: token.value + "",
            Accept: "application/json"
        },
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
export const useAccountingApiO = ofetch.create({
    baseURL: config.public.ACCOUNTING_API_URL,
    headers: {
        Authorization: token.value + "",
        Accept: "application/json"
    },
})
export function useInventoryApi<T> (url: string, options: AsyncDataOptions<T>|UseFetchOptions<T> = {}) {
    const defaults: UseFetchOptions<T> = {
        baseURL: config.public.INVENTORY_API_URL,
        key: url,
        headers: {
            Authorization: token.value + "",
            Accept: "application/json"
        },
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
export const useInventoryApiO = ofetch.create({
    baseURL: config.public.INVENTORY_API_URL,
    headers: {
        Authorization: token.value + "",
        Accept: "application/json"
    },
})
