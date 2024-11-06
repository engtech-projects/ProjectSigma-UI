<script setup>
const { data: userData } = useAuth()
</script>
<template>
    <div class="flex flex-col gap-8">
        <span>PREPARED BY:</span>
        <div class="flex flex-col gap-1">
            <span class="font-bold underline uppercase">
                {{ userData.type === "Administrator" ? userData.name : userData.employee.fullname_first }}
            </span>
            <span>
                {{ userData.type === "Administrator" ? "ADMINISTRATOR" : userData.employee.current_position }}
            </span>
        </div>
    </div>
</template>
