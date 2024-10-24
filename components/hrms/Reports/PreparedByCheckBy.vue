<script setup>
const { data: userData } = useAuth()
</script>
<template>
    <div class="justify-around flex">
        <div class="flex flex-col gap-12">
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
        <div class="flex flex-col gap-12">
            <span>CHECKED BY</span>
            <div class="flex flex-col gap-1">
                <span class="font-bold underline">
                    __________________________________
                </span>
                <span>
                    HEAD, HUMAN RESOURCE
                </span>
            </div>
        </div>
    </div>
</template>
