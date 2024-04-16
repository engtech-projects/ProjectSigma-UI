import VueSignaturePad from "vue3-signature-pad"

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component("VueSignaturePad", VueSignaturePad)
})
