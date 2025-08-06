<script lang="ts" setup>
const props = defineProps<{ prevPage: string }>()
const router = useRouter()
const goBackOrHome = () => {
    if (router.options.history.state.back) {
        router.back()
    } else {
        navigateTo(props.prevPage)
    }
}
</script>
<template>
    <div @click="goBackOrHome">
        X
    </div>
</template>
