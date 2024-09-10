<script setup lang="ts">
import { useHMOStore } from "@/stores/hrms/setup/hmo"
const hmostore = useHMOStore()
hmostore.showHmo(useRoute().query.hmo_id)
</script>
<template>
    <div>
        <HrmsHmoRenew />
    </div>
</template>
