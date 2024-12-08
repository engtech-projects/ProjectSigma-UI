<script lang="ts" setup>
defineProps({
    message: {
        type: String,
        default: "Page unavailable."
    }
})
const router = useRouter()
const goBackOrHome = () => {
    if (router.options.history.state.back) {
        router.back()
    } else {
        navigateTo("/")
    }
}
</script>
<template>
    <div class="flex flex-col">
        <p class="text-2xl m-auto">
            <span>
                {{ message }}
            </span>
            Click
            <span class="text-blue-600 underline cursor-pointer" @click="goBackOrHome">
                Here
            </span>
            to go {{ router.options.history.state.back ? 'back to previous page' : "to homepage" }}
        </p>
    </div>
</template>
