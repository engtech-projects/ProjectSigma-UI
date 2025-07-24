<template>
    <table class="w-full">
        <thead>
            <tr>
                <th class="pb-12 px-10">
                    <DocumentTemplatesIsoHeader :page="{currentPage: 1, totalPages: 1}" />
                </th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>
                    <slot />
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts" setup>

</script>

<style>

</style>
